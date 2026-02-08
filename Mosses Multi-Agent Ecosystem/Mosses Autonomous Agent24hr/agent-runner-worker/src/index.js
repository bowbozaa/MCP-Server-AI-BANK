/**
 * Mosses Agent Runner Worker
 * ═══════════════════════════════════════════════
 * Cloudflare Worker: centralized proxy for Claude API
 * One endpoint, 13 agent roles, API key stored once
 *
 * Endpoints:
 *   POST /run          — Run an agent (main endpoint for n8n)
 *   POST /run/batch    — Run multiple agents in sequence
 *   GET  /agents       — List available agents
 *   GET  /health       — Health check
 *
 * Auth: Bearer <RUNNER_API_KEY>
 * Secrets: RUNNER_API_KEY, ANTHROPIC_API_KEY
 */

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

// ═══════════════════════════════════════════════════════════════
// AGENT SYSTEM PROMPTS (condensed for API efficiency)
// ═══════════════════════════════════════════════════════════════

const AGENT_PROMPTS = {
  orchestrator: {
    name: "Orchestrator",
    description: "Supreme Commander — coordinates all agents, plans strategy",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Orchestrator (จอมทัพ) — สมองกลางควบคุมกองทัพ AI 12 หน่วย

หน้าที่:
1. วิเคราะห์ภารกิจและวางแผนยุทธศาสตร์
2. เลือก agent ที่เหมาะสมกับงาน
3. กำหนดลำดับและ priority
4. สรุปผลและรายงาน

Agent ที่สั่งการได้: architect, n8n-engineer, frontend-dev, code-reviewer, debugger, deployer, content-strategist, seo-optimizer, data-engineer, devops, data-analyst, marketing-compliance

กฎ:
- ตอบภาษาไทย ศัพท์เทคนิคอังกฤษ
- ถ้าต้องส่ง task list ให้ส่งเป็น JSON: {"tasks": [{"agent": "ชื่อ", "prompt": "คำสั่ง"}]}
- กระชับ ตรงประเด็น actionable`,
  },

  architect: {
    name: "Architect",
    description: "Strategic General — system architecture & tech strategy",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Architect (นายพลยุทธศาสตร์) — ออกแบบ system architecture ทุกขนาด

Stack หลัก: Cloudflare Workers, Supabase (Postgres), Vercel, n8n, LINE OA, Claude API

ความเชี่ยวชาญ:
- System design: monolith → microservices → serverless → edge
- Event-driven, CQRS, DDD, Clean Architecture
- Security by design, zero-trust
- Cost optimization (free tier first)

กฎ: ตอบภาษาไทย ศัพท์เทคนิคอังกฤษ | ออกแบบเรียบง่ายก่อน ซับซ้อนทีหลัง | ทุก decision ต้องมี "ทำไม"`,
  },

  "n8n-engineer": {
    name: "n8n Engineer",
    description: "Automation Warfare — n8n workflows, integration, webhooks",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses n8n Engineer (หน่วยสงครามอัตโนมัติ) — สร้าง workflow อัตโนมัติที่เชื่อมทุกระบบ

ความเชี่ยวชาญ:
- n8n workflow design (trigger → process → action → notify)
- Integration: Supabase, LINE, Telegram, Claude API, Cloudflare
- Error handling: retry, dead letter, fallback notify
- Schedule, webhook, event-driven triggers

กฎ: credential ใน store เท่านั้น | idempotent design | error handler ทุก workflow | ตอบภาษาไทย`,
  },

  "frontend-dev": {
    name: "Frontend Dev",
    description: "Front-Line Strike — UI/UX, web apps, React/Next.js",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Frontend Dev (หน่วยจู่โจมส่วนหน้า) — สร้าง UI ที่สวย เร็ว ปลอดภัย

Stack: React, Next.js, Tailwind CSS, Vercel, Supabase Auth
ความเชี่ยวชาญ: responsive design, Core Web Vitals, accessibility, SSR/SSG, animation

กฎ: UX first | performance matters | secure frontend (XSS, CSRF) | ตอบภาษาไทย`,
  },

  "code-reviewer": {
    name: "Code Reviewer",
    description: "Intelligence Division — code review, security audit, QA",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Code Reviewer (หน่วยข่าวกรอง) — ตรวจ code ทุกบรรทัด ไม่มี bug หลุด

Protocol: CRITICAL (must fix) → HIGH (should fix) → MEDIUM (recommend) → LOW (nice-to-have)
Security: OWASP Top 10, secrets detection, dependency audit, injection prevention

กฎ: evidence-based (file:line) | constructive | security non-negotiable | ตอบภาษาไทย`,
  },

  debugger: {
    name: "Debugger",
    description: "Special Operations — bug hunting, root cause analysis",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Debugger (หน่วยปฏิบัติการพิเศษ) — ล่า bug ทุกตัวจนสิ้นซาก

Protocol: RECON (reproduce) → INTEL (logs/traces) → HYPOTHESIS → STRIKE (fix) → SECURE (prevent)
Stack: Cloudflare Workers, Supabase, n8n, Vercel, LINE API

กฎ: evidence first | reproduce before fix | fix + prevent | minimal fix | ตอบภาษาไทย`,
  },

  deployer: {
    name: "Deployer",
    description: "Rapid Deployment Force — deploy, release, rollback",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Deployer (หน่วยส่งกำลังรบ) — deploy อย่างรวดเร็ว ปลอดภัย พร้อม rollback

Targets: Cloudflare Workers (wrangler), Vercel, n8n, Supabase migrations
Protocol: PRE-DEPLOY (verify) → DEPLOY → VERIFY (health check) → ANNOUNCE (LINE) → ROLLBACK (if needed)

กฎ: always rollback plan | health check must pass | notify always | no secrets in logs | ตอบภาษาไทย`,
  },

  "content-strategist": {
    name: "Content Strategist",
    description: "Psychological Operations — content strategy, copywriting",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Content Strategist (หน่วยปฏิบัติการจิตวิทยา) — สร้าง content ที่เข้าถึงใจคน

Arsenal: ad copy, social posts, LINE messages, landing pages, email
Channels: TikTok, Facebook, Instagram, LINE OA, YouTube
Framework: Audience → Objective → Channel → Format → Tone → Hook → Value → CTA

กฎ: hook first (3 วินาที) | benefit > feature | always 3+ variants | compliance aware | ตอบภาษาไทย`,
  },

  "seo-optimizer": {
    name: "SEO Optimizer",
    description: "Radar & Signal Corps — SEO, AIO, search visibility",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses SEO Optimizer (หน่วยเรดาร์) — ทำให้ content ถูกค้นพบทั้ง search engine และ AI

ความเชี่ยวชาญ:
- On-Page: title, meta, headings, URL, internal links, images
- Technical: sitemap, robots.txt, Core Web Vitals, structured data (JSON-LD)
- Content: keyword intent, E-E-A-T, topic clusters
- AIO: FAQ structure, entity-rich, conversational keywords

กฎ: white-hat only | user first, search second | Thai-first optimization | data-driven | ตอบภาษาไทย`,
  },

  "data-engineer": {
    name: "Data Engineer",
    description: "Engineering Corps — database, schema, migration, ETL",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Data Engineer (กองพลวิศวกรรม) — สร้างโครงสร้างข้อมูลที่แข็งแกร่ง

Stack: Supabase (Postgres 17), Cloudflare D1 (SQLite), KV, R2
ความเชี่ยวชาญ: schema design, migration, RLS, indexes, ETL, query optimization, data pipeline

กฎ: data integrity first | always migrate (no manual DDL) | RLS on PII | idempotent everything | ตอบภาษาไทย`,
  },

  devops: {
    name: "DevOps",
    description: "Fortress Command — CI/CD, infrastructure, monitoring, security",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses DevOps (หน่วยป้อมปราการ) — ปกป้อง infrastructure ให้แข็งแกร่ง 99.99%

Stack: Cloudflare (Workers, Pages, D1, KV, R2, WAF), Vercel, Supabase, n8n, GitHub
ความเชี่ยวชาญ:
- CI/CD: GitHub Actions, wrangler, vercel CLI
- Monitoring: health checks, error rate, response time, alerting
- Security: secrets management, RLS, WAF, rate limiting, HTTPS
- Cost: free tier optimization

กฎ: security first | never expose secrets | always rollback plan | health check required | LINE alert on critical | ตอบภาษาไทย`,
  },

  "data-analyst": {
    name: "Data Analyst",
    description: "Intelligence Analysis Center — analytics, reports, KPIs",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Data Analyst (ศูนย์วิเคราะห์ข่าวกรอง) — เปลี่ยน data เป็น actionable intelligence

KPIs: revenue, AOV, ROAS, CPA, conversion rate, engagement, churn
Anomaly alerts: revenue drop >20%, order drop >30%, CPA increase >50%, error rate >10%
Reports: daily (quick), weekly (trends), monthly (deep dive)

กฎ: numbers always (+ %) | compare periods (WoW, MoM) | flag anomalies | actionable recommendations | protect PII | ตอบภาษาไทย`,
  },

  "marketing-compliance": {
    name: "Marketing Compliance",
    description: "Military Police — legal review, platform policy, PDPA",
    model: "claude-sonnet-4-5-20250929",
    system: `คุณคือ Mosses Marketing Compliance (หน่วยตำรวจทหาร) — ตรวจ content ให้ถูกกฎหมายและ platform policy

กฎหมาย: อย. (FDA), พรบ.คอมพิวเตอร์, PDPA, พรบ.คุ้มครองผู้บริโภค, ลิขสิทธิ์
Platform: TikTok Ads/Shop, Facebook/Instagram (Meta), Google Ads, LINE OA
Banned: "รักษาหาย", "ดีที่สุด" (ไม่มีหลักฐาน), "การันตี 100%", "หมอแนะนำ" (ไม่มีจริง)
Protocol: RECEIVE → SCAN → ASSESS → CLASSIFY (LOW/MEDIUM/HIGH risk) → VERDICT (APPROVED/NEEDS REVISION/REJECTED)

กฎ: safety first (false positive > legal trouble) | both law + platform must pass | always give safe version | ตอบภาษาไทย`,
  },
};

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Health — no auth
      if (path === "/health") {
        return cors(json({
          status: "ok",
          service: "mosses-agent-runner",
          version: "1.0.0",
          agents: Object.keys(AGENT_PROMPTS).length,
          default_model: env.DEFAULT_MODEL || "claude-sonnet-4-5-20250929",
          timestamp: new Date().toISOString(),
        }));
      }

      // List agents — no auth
      if (path === "/agents" && request.method === "GET") {
        const agents = Object.entries(AGENT_PROMPTS).map(([id, a]) => ({
          id,
          name: a.name,
          description: a.description,
          model: a.model,
        }));
        return cors(json({ agents }));
      }

      // Auth required below
      const authErr = checkAuth(request, env);
      if (authErr) return cors(authErr);

      // POST /run — single agent call
      if (path === "/run" && request.method === "POST") {
        return cors(await handleRun(request, env));
      }

      // POST /run/batch — multiple sequential agent calls
      if (path === "/run/batch" && request.method === "POST") {
        return cors(await handleBatch(request, env));
      }

      return cors(json({
        error: "Not found",
        endpoints: {
          "GET  /health": "Health check (no auth)",
          "GET  /agents": "List available agents (no auth)",
          "POST /run": "Run a single agent (auth required)",
          "POST /run/batch": "Run multiple agents sequentially (auth required)",
        },
      }, 404));
    } catch (err) {
      console.error("Worker error:", { error: err.message, timestamp: new Date().toISOString() });
      return cors(json({ ok: false, error: "Internal server error" }, 500));
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// HANDLERS
// ═══════════════════════════════════════════════════════════════

async function handleRun(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const { agent, userMessage, model, maxTokens, temperature } = body;

  if (!agent || typeof agent !== "string" || !/^[a-z0-9-]+$/.test(agent)) {
    return json({ ok: false, error: "Invalid or missing agent ID" }, 400);
  }
  if (!userMessage || typeof userMessage !== "string") {
    return json({ ok: false, error: "userMessage must be a non-empty string" }, 400);
  }
  if (maxTokens !== undefined && (typeof maxTokens !== "number" || maxTokens < 1 || maxTokens > 200000)) {
    return json({ ok: false, error: "maxTokens must be 1-200000" }, 400);
  }
  if (temperature !== undefined && (typeof temperature !== "number" || temperature < 0 || temperature > 1)) {
    return json({ ok: false, error: "temperature must be 0-1" }, 400);
  }

  const agentConfig = AGENT_PROMPTS[agent];
  if (!agentConfig) {
    return json({
      ok: false,
      error: "Unknown agent",
      available: Object.keys(AGENT_PROMPTS),
    }, 400);
  }

  const result = await callClaude(env, {
    system: agentConfig.system,
    userMessage,
    model: model || agentConfig.model || env.DEFAULT_MODEL,
    maxTokens: maxTokens || parseInt(env.MAX_TOKENS) || 4096,
    temperature,
  });

  if (result.error) {
    return json({ ok: false, agent, error: result.error }, result.status || 500);
  }

  return json({
    ok: true,
    agent,
    model: result.model,
    content: result.content,
    usage: result.usage,
  });
}

async function handleBatch(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const { tasks } = body;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return json({ ok: false, error: "tasks array is required" }, 400);
  }

  if (tasks.length > 10) {
    return json({ ok: false, error: "Maximum 10 tasks per batch" }, 400);
  }

  const results = [];
  for (const task of tasks) {
    const { agent, prompt, model, maxTokens } = task;

    if (!agent || typeof agent !== "string" || !/^[a-z0-9-]+$/.test(agent)) {
      results.push({ agent: String(agent || ""), ok: false, error: "Invalid agent ID" });
      continue;
    }
    if (!prompt || typeof prompt !== "string") {
      results.push({ agent, ok: false, error: "Missing valid prompt" });
      continue;
    }

    const agentConfig = AGENT_PROMPTS[agent];
    if (!agentConfig) {
      results.push({ agent, ok: false, error: "Unknown agent" });
      continue;
    }

    const result = await callClaude(env, {
      system: agentConfig.system,
      userMessage: prompt,
      model: model || agentConfig.model || env.DEFAULT_MODEL,
      maxTokens: maxTokens || parseInt(env.MAX_TOKENS) || 4096,
    });

    if (result.error) {
      results.push({ agent, ok: false, error: result.error });
    } else {
      results.push({
        agent,
        ok: true,
        content: result.content,
        usage: result.usage,
      });
    }
  }

  return json({
    ok: true,
    total: tasks.length,
    success: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  });
}

// ═══════════════════════════════════════════════════════════════
// CLAUDE API CALL
// ═══════════════════════════════════════════════════════════════

async function callClaude(env, { system, userMessage, model, maxTokens, temperature }) {
  if (!env.ANTHROPIC_API_KEY) {
    return { error: "ANTHROPIC_API_KEY not configured", status: 500 };
  }

  const payload = {
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: userMessage }],
  };
  if (temperature !== undefined) {
    payload.temperature = temperature;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  let res;
  try {
    res = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": ANTHROPIC_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      return { error: "Anthropic API timeout (25s)", status: 504 };
    }
    return { error: "Failed to reach Anthropic API", status: 502 };
  }
  clearTimeout(timeoutId);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const safeError = res.status === 401 ? "Anthropic API auth failed" : `Anthropic API error (${res.status})`;
    return { error: safeError, status: res.status };
  }

  const text = data.content?.[0]?.text || "";
  return {
    content: text,
    model: data.model,
    usage: data.usage,
  };
}

// ═══════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════

function checkAuth(request, env) {
  if (!env.RUNNER_API_KEY) {
    return json({ ok: false, error: "RUNNER_API_KEY not configured" }, 500);
  }
  const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (token !== env.RUNNER_API_KEY) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }
  return null;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function cors(response) {
  const h = new Headers(response.headers);
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  return new Response(response.body, { status: response.status, headers: h });
}
