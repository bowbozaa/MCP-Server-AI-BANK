# MOSSES ARMY — Multi-Agent Ecosystem

> **ระบบหน่วยรบ AI 17 หน่วย** ที่ทำงานประสานกันแบบกองทัพ — จาก Architect ถึง DevOps ทุกหน่วยฉลาดที่สุด พูดภาษาไทยเก่งที่สุด เขียน Code ทุกภาษา แก้ปัญหาทุกระดับ

**Last Updated:** 2026-02-08
**Version:** 4.0 (17 Active Agents)

---

## Source of truth and docs

- `.claude/agents/` is the runtime prompt directory used by tooling.
- `Mosses Multi-Agent Ecosystem/` contains long-form docs and guides.
- Agent names are lowercase and hyphenated; keep names stable across tools.
- Update this file and the docs when adding or renaming agents.

---

## Agent Directory

| # | Agent | Role | Model | Codename | Status |
|---|-------|------|-------|----------|--------|
| 1 | **Orchestrator** | จอมทัพ — Supreme Commander, วางยุทธศาสตร์ทั้งหมด | Opus | CMDR-001 | Active |
| 2 | **Architect** | นายพลยุทธศาสตร์ — System Design & Architecture | Opus | COL-ARCH-001 | Active |
| 3 | **n8n Engineer** | หน่วยสงครามอัตโนมัติ — Workflow Automation | Sonnet | COL-N8N-002 | Active |
| 4 | **Frontend Dev** | หน่วยจู่โจมส่วนหน้า — UI/UX Development | Sonnet | COL-FE-003 | Active |
| 5 | **Code Reviewer** | หน่วยข่าวกรอง — Code Intelligence & QA | Sonnet | COL-CR-004 | Active |
| 6 | **Debugger** | หน่วยปฏิบัติการพิเศษ — Bug Hunting & Forensics | Sonnet | COL-DBG-005 | Active |
| 7 | **Deployer** | หน่วยส่งกำลังรบ — Release Management | Sonnet | COL-DPL-006 | Active |
| 8 | **Content Strategist** | หน่วยปฏิบัติการจิตวิทยา — Content & Marketing | Sonnet | COL-CNT-007 | Active |
| 9 | **SEO Optimizer** | หน่วยเรดาร์ — SEO/AIO Optimization | Sonnet | COL-SEO-008 | Active |
| 10 | **Data Engineer** | กองพลวิศวกรรม — Database & Data Pipeline | Sonnet | COL-DE-009 | Active |
| 11 | **DevOps** | หน่วยป้อมปราการ — Infrastructure & CI/CD | Sonnet | COL-DO-010 | Active |
| 12 | **Data Analyst** | ศูนย์วิเคราะห์ข่าวกรอง — Analytics & BI | Sonnet | COL-DA-011 | Active |
| 13 | **Marketing Compliance** | หน่วยตำรวจทหาร — Policy & Legal Compliance | Sonnet | COL-MC-012 | Active |
| 14 | **Code Agent** | Development Specialist — Coding, Refactor, Audit | Sonnet | COL-CODE-014 | Active |
| 15 | **Content Agent** | Bangkok 3099 — AI Video Content Pipeline | Sonnet | COL-CONT-015 | Active |
| 16 | **Business Agent** | Sabi Shop — Operations Automation | Sonnet | COL-BIZ-016 | Active |
| 17 | **Security Agent** | Monitoring & Security — Vuln Scans, Key Rotation | Sonnet | COL-SEC-017 | Active |

---

## Agent Interaction Map

```
                         ┌─────────────────┐
                         │   ORCHESTRATOR   │
                         │   (CMDR-001)     │
                         │   Supreme        │
                         │   Commander      │
                         └────────┬────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    ┌─────▼─────┐          ┌─────▼─────┐          ┌─────▼─────┐
    │  PLANNING  │          │  BUILDING  │          │ OPERATING  │
    │   Layer    │          │   Layer    │          │   Layer    │
    └─────┬─────┘          └─────┬─────┘          └─────┬─────┘
          │                      │                      │
   ┌──────┼──────┐        ┌──────┼──────┐        ┌──────┼──────┐
   │      │      │        │      │      │        │      │      │
┌──▼─┐ ┌──▼─┐ ┌─▼──┐  ┌──▼─┐ ┌──▼─┐ ┌─▼──┐  ┌──▼─┐ ┌──▼─┐ ┌─▼──┐
│Arch│ │Cont│ │Comp│  │n8n │ │FE  │ │Data│  │DevO│ │Data│ │Depl│
│itec│ │ent │ │lian│  │Eng │ │Dev │ │Eng │  │ps  │ │Anly│ │oyer│
│t   │ │Str │ │ce  │  │    │ │    │ │    │  │    │ │st  │ │    │
└────┘ └────┘ └────┘  └────┘ └────┘ └────┘  └────┘ └────┘ └────┘
                              │      │
                        ┌─────┼──────┐
                        │            │
                     ┌──▼─┐       ┌──▼─┐
                     │Code│       │Debu│
                     │Revw│       │gger│
                     └────┘       └────┘

Domain Specialists:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Code Agent│ │Content   │ │Business  │ │Security  │
│(Dev)     │ │Agent     │ │Agent     │ │Agent     │
│          │ │(BKK3099) │ │(Sabi)    │ │(Monitor) │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

---

## Pipeline Workflows

### Formation ALPHA: Feature Development (End-to-End)

```text
Trigger: "สร้าง", "build", "implement", "feature ใหม่"

Phase 1 — RECON (ลาดตระเวน)
  └── Architect: วิเคราะห์สนามรบ, ออกแบบ architecture, กำหนดอาวุธ (tech stack)

Phase 2 — ASSAULT (จู่โจม) [parallel]
  ├── n8n Engineer: สร้าง automation pipeline
  └── Frontend Dev: สร้าง UI/interface

Phase 3 — VERIFY (ตรวจสอบ)
  └── Code Reviewer: ตรวจทุก line, scan security, performance audit

Phase 4 — DEPLOY (ส่งกำลัง)
  └── DevOps: deploy staging → production, health check, rollback plan

Phase 5 — MONITOR (เฝ้าระวัง)
  └── Data Analyst: ติดตาม metrics, anomaly detection, report
```

### Formation BRAVO: Content & Campaign

```text
Trigger: "content", "โฆษณา", "campaign", "โพสต์"

Phase 1 — INTEL (ข่าวกรอง)
  └── Content Strategist: วางแผน, เขียน copy, กำหนด channel

Phase 2 — CLEARANCE (ตรวจอาวุธ)
  └── Marketing Compliance: ตรวจกฎหมาย, platform policy, PDPA

Phase 3 — AMPLIFY (ขยายพลัง)
  └── SEO Optimizer: optimize visibility, structured data, keywords

Phase 4 — LAUNCH (ยิง)
  └── DevOps: deploy landing page, n8n: auto-publish

Phase 5 — TRACK (ติดตามผล)
  └── Data Analyst: ROAS, engagement, conversion tracking
```

### Formation CHARLIE: Incident Response

```text
Trigger: "bug", "error", "ล่ม", "พัง", "ไม่ทำงาน", "incident"

Phase 1 — ALERT (แจ้งเตือน)
  └── Data Analyst: ตรวจจับ anomaly, รวบรวม error context

Phase 2 — STRIKE (โจมตีปัญหา)
  └── Debugger: root cause analysis ระดับลึก, เสนอ fix

Phase 3 — VERIFY (ตรวจสอบ fix)
  └── Code Reviewer: review fix, ตรวจ side effects

Phase 4 — HOTFIX (ส่งกำลังเสริม)
  └── DevOps: hotfix deploy + rollback plan + monitoring

Phase 5 — CONFIRM (ยืนยันชัยชนะ)
  └── Data Analyst: ยืนยัน metrics กลับปกติ
```

### Formation DELTA: Product Launch

```text
Trigger: "launch", "เปิดตัว", "product ใหม่", "service ใหม่"

Architect → [n8n Engineer + Frontend Dev] → Code Reviewer → Marketing Compliance
→ Content Strategist → DevOps → Data Analyst
```

### Formation ECHO: Monthly Review

```text
Trigger: "สรุปเดือน", "monthly", "review", "audit"

Data Analyst → Content Strategist → Marketing Compliance → DevOps → Orchestrator (สรุป action plan)
```

### Formation FOXTROT: Security Audit

```text
Trigger: "security", "penetration test", "audit security", "hardening"

Security Agent → Debugger → Code Reviewer → DevOps → Architect → Orchestrator (security posture report)
```

---

## Infrastructure Stack

| Layer | Technology | Managed By |
|-------|-----------|------------|
| **Edge** | Cloudflare Workers (Flybridge) | DevOps |
| **Frontend** | Vercel, Lovable | Frontend Dev |
| **Backend** | Cloudflare Workers, Supabase | n8n Engineer, Data Engineer |
| **Database** | Supabase Postgres 17.x, D1, KV | Data Engineer |
| **Storage** | R2, Supabase Storage | DevOps |
| **Automation** | n8n Cloud | n8n Engineer |
| **AI** | Claude API (Anthropic) | Orchestrator |
| **Messaging** | LINE OA, Telegram | n8n Engineer |
| **Analytics** | Supabase + Custom | Data Analyst |
| **Version Control** | GitHub (Flybridge) | DevOps |
| **DNS/CDN** | Cloudflare | DevOps |
| **CI/CD** | GitHub Actions, Wrangler | DevOps |

---

## Quick Start Guide

### Using Agents

```bash
# General command pattern
claude --agent <agent-name> "<your request>"

# Examples by agent
claude --agent orchestrator "วางแผนสร้างฟีเจอร์ใหม่: ระบบแชทบอท"
claude --agent architect "ออกแบบ architecture สำหรับ real-time dashboard"
claude --agent n8n-engineer "สร้าง workflow รับ order จาก LINE"
claude --agent frontend-dev "สร้างหน้า landing page สำหรับโปรโมชั่น"
claude --agent code-reviewer "review code ใน PR #123"
claude --agent debugger "แก้บัค: LINE webhook ไม่ตอบกลับ"
claude --agent deployer "deploy staging → production"
claude --agent content-strategist "วางแผน content calendar เดือนนี้"
claude --agent seo-optimizer "ปรับ SEO หน้าแรก"
claude --agent data-engineer "ออกแบบ schema สำหรับ orders table"
claude --agent devops "เช็ค health check ทุก service"
claude --agent data-analyst "สรุปยอดขายสัปดาห์นี้"
claude --agent marketing-compliance "ตรวจ ad copy ก่อน launch"
claude --agent code-agent "Refactor this module and run security audit"
claude --agent content-agent "Plan Bangkok 3099 social posts for this week"
claude --agent business-agent "Design employee tracking for Sabi Shop"
claude --agent security-agent "Scan dependencies and check API key rotation"
```

### Using Pipelines (via Orchestrator)

```bash
claude --agent orchestrator "สร้าง feature: LINE chatbot สำหรับ customer service"
claude --agent orchestrator "launch campaign: Valentine Sale 2026"
claude --agent orchestrator "แก้เร่งด่วน: payment webhook ล่ม"
claude --agent orchestrator "สรุปประจำเดือนกุมภาพันธ์"
claude --agent orchestrator "ตรวจสอบ security ทั้งระบบ"
```

### Using Agent Runner Worker (API)

```bash
# Single agent call
curl -X POST https://mosses-agent-runner.<subdomain>.workers.dev/run \
  -H "Authorization: Bearer $RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"agent":"devops","userMessage":"Check service health and summarize"}'

# Batch call (sequential)
curl -X POST https://mosses-agent-runner.<subdomain>.workers.dev/run/batch \
  -H "Authorization: Bearer $RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tasks":[{"agent":"devops","prompt":"Health check"},{"agent":"data-analyst","prompt":"Daily report"}]}'

# List agents (no auth)
curl https://mosses-agent-runner.<subdomain>.workers.dev/agents
```

---

## Domain Specialist Agents

| Agent | Role | Tasks |
| ----- | ----- | ----- |
| **code-agent** | Development specialist | Code review, optimization, debugging, refactoring, security audits |
| **content-agent** | Bangkok 3099 specialist | Spiritual/philosophical AI video (Sora, GPT-4, DALL-E), 6h cycle, YouTube/FB/TikTok/LINE, analytics, n8n + LINE Thai |
| **business-agent** | Sabi Shop specialist | Employee tracking, inventory, customer service automation |
| **security-agent** | Monitoring & security | Vulnerability scans, API key rotation, alerts |

---

## File Structure

```
mosses-agents/
├── AGENTS.md                        # This file — Main documentation
├── .claude/
│   └── agents/
│       ├── orchestrator.md          # Supreme Commander
│       ├── architect.md             # System Design
│       ├── n8n-engineer.md          # Workflow Automation
│       ├── frontend-dev.md          # UI Development
│       ├── code-reviewer.md         # Code QA
│       ├── debugger.md              # Bug Hunting
│       ├── deployer.md              # Release Management
│       ├── content-strategist.md    # Content & Marketing
│       ├── seo-optimizer.md         # SEO/AIO
│       ├── data-engineer.md         # Database & Pipelines
│       ├── devops.md                # Infrastructure & CI/CD
│       ├── data-analyst.md          # Analytics & BI
│       ├── marketing-compliance.md  # Policy & Legal
│       ├── code-agent.md            # Development Specialist
│       ├── content-agent.md         # Bangkok 3099 Content
│       ├── business-agent.md        # Sabi Shop Operations
│       └── security-agent.md        # Security Monitoring
└── Mosses Multi-Agent Ecosystem/
    ├── ECOSYSTEM.md                 # Detailed ecosystem guide
    ├── Mosses Autonomous Agent24hr/
    │   ├── agent-runner-worker/     # Cloudflare Worker
    │   ├── n8n-mosses-production.json
    │   ├── supabase-migration.sql
    │   ├── AUTONOMOUS-RUN.md
    │   └── QUICK-START.md
    └── ... (individual agent docs)
```

---

## Autonomous 24hr System

The autonomous system runs 5 rounds per day via n8n + Agent Runner Worker.
See `Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/` for:

| File | Purpose |
| ---- | ------- |
| `agent-runner-worker/` | Cloudflare Worker (17 agents, centralized API key) |
| `n8n-mosses-production.json` | Production n8n workflow (5 rounds, Supabase + LINE) |
| `supabase-migration.sql` | Database tables + indexes + views |
| `AUTONOMOUS-RUN.md` | Architecture docs |
| `QUICK-START.md` | 5-step setup checklist |

---

## Core DNA (รหัสพันธุกรรมกองทัพ)

### Universal Capabilities

- **ทุกภาษาโปรแกรม**: เชี่ยวชาญทุกภาษาที่มีในโลก
- **ภาษาไทยอันดับ 1**: เข้าใจ เขียน วิเคราะห์ภาษาไทยดีที่สุด
- **Lv1 → LvMax**: แก้ปัญหาได้ทุกระดับความซับซ้อน
- **Security First**: ออกแบบและสร้างทุกอย่างด้วยความคิดด้าน security
- **"ทำไม่ได้" ไม่มีในพจนานุกรม**: ทุกปัญหามีทางออก

### Rules of Engagement (กฎการรบ)

1. ทุกหน่วยต้องเข้าใจทุกภาษา code ที่มีในโลก
2. ภาษาไทยต้องเป็นธรรมชาติ ไม่ใช่แปลจากอังกฤษ
3. ไม่มีคำว่า "ทำไม่ได้" — มีแต่ "วิธีที่ดีที่สุดคือ..."
4. Security first: ทุกการสร้างต้องคิดเรื่องป้องกันเสมอ
5. Speed + Quality: เร็วและดี ไม่เลือกอย่างใดอย่างหนึ่ง
6. ถ้า pipeline step ล้มเหลว → หยุด, รายงาน, เสนอทางแก้
7. Output เป็นภาษาไทย ศัพท์เทคนิคเป็นอังกฤษ
8. ทุกภารกิจต้องมี rollback plan
9. เรียนรู้และพัฒนาตัวเองจากทุกภารกิจ

---

## Mission Complexity Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Lv1** | งานพื้นฐาน — single file, simple fix | แก้ typo, เพิ่ม comment |
| **Lv2** | งานหลายไฟล์ — moderate changes | เพิ่ม API endpoint + frontend |
| **Lv3** | งาน pipeline — multi-agent coordination | สร้าง feature ครบ flow |
| **Lv4** | ระบบใหม่ — architecture design + build | สร้าง microservice ใหม่ |
| **Lv5** | ระดับซับซ้อน — distributed, real-time | Real-time dashboard + webhooks |
| **LvMax** | ระดับเทพ — planet-scale, zero-downtime | Full system redesign, migration |

---

## Usage Guidelines

- Use `orchestrator` when the task spans multiple domains or requires a plan.
- Prefer the most specific agent for focused tasks.
- When adding or updating agents:
  - Update `.claude/agents/<agent>.md`.
  - Reflect changes in `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`.
  - Keep this file in sync.

---

## Related Docs

- `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`
- `Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/AUTONOMOUS-RUN.md`
- `Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/QUICK-START.md`

---

## Version History

- **v4.0** (2026-02-08): เพิ่ม 4 agents ใหม่ (code-agent, content-agent, business-agent, security-agent) รวม 17 agents
- **v3.0** (2026-02-07): เพิ่ม AGENTS.md, ปรับปรุง agent descriptions
- **v2.0** (2026-02-06): เพิ่ม 3 agents ใหม่ (DevOps, Data Analyst, Marketing Compliance)
- **v1.0** (2026-01-01): เปิดตัว 10 agents แรก

---

**MOSSES ARMY** — ระบบ Multi-Agent ที่ทำงานประสานกันเหมือนกองทัพจริง

*Built with Claude (Anthropic)*
