# AGENTS

This repository ships a multi-agent prompt set for the Mosses ecosystem.
Use this file as the canonical index of available agents and how to invoke
them. The runtime prompts live in `.claude/agents/`.

## Source of truth and docs

- `.claude/agents/` is the runtime prompt directory used by tooling.
- `Mosses Multi-Agent Ecosystem/` contains long-form docs and guides.
- Agent names are lowercase and hyphenated; keep names stable across tools.
- Update this file and the docs when adding or renaming agents.

## Domain specialist agents (high-level)

| Agent | Role | Tasks |
| ----- | ----- | ----- |
| **orchestrator** (Master Agent) | ประสานงานระหว่าง agents ทั้งหมด | Task distribution, monitoring, scaling |
| **code-agent** | Development specialist | Code review, optimization, debugging, refactoring, security audits |
| **content-agent** | Bangkok 3099 specialist | Spiritual/philosophical AI video (Sora, GPT-4, DALL-E), 6h cycle, YouTube/FB/TikTok/LINE, analytics, n8n + LINE Thai |
| **business-agent** | Sabi Shop specialist | Employee tracking, inventory, customer service automation |
| **security-agent** | Monitoring & security | Vulnerability scans, API key rotation, alerts |

Use `orchestrator` to route work to these specialists or run them directly (see agent names below).

## Available agents

| Agent name | Primary focus | Typical use |
| ---------- | ------------- | ----------- |
| orchestrator | Overall coordination and task routing | Multi-step or multi-domain work |
| architect | System architecture and design | New systems, major refactors |
| n8n-engineer | Automation and workflows | n8n builds, integrations |
| frontend-dev | UI and frontend implementation | Web UI, UX tasks |
| code-reviewer | QA and code review | Risk checks, audits |
| debugger | Root-cause analysis | Bugs, incidents, failures |
| deployer | Release and deployment | Shipping, rollbacks |
| content-strategist | Content planning and copy | Content, messaging |
| seo-optimizer | SEO and discovery | SEO, metadata, search |
| data-engineer | Data models and pipelines | DBs, ETL, storage |
| devops | Infra, CI/CD, monitoring | Cloud, pipelines, ops |
| data-analyst | Reporting and analytics | KPIs, dashboards |
| marketing-compliance | Policy and legal checks | Compliance reviews |
| code-agent | Development specialist (coding, refactor, audit) | Code tasks, security audits |
| content-agent | Bangkok 3099 content pipeline | AI video (Sora/GPT-4/DALL-E), 6h gen, social + LINE, analytics, n8n |
| business-agent | Sabi Shop operations | Employee, inventory, customer service |
| security-agent | Security monitoring & hardening | Vuln scans, key rotation, alerts |

## Quick start

Run an agent directly:

```bash
claude --agent orchestrator "Plan and coordinate a new feature"
claude --agent devops "Check service health and summarize"
claude --agent code-reviewer "Review this change for regressions"
claude --agent code-agent "Refactor this module and run security audit"
claude --agent content-agent "Plan Bangkok 3099 social posts for this week"
claude --agent business-agent "Design employee tracking for Sabi Shop"
claude --agent security-agent "Scan dependencies and check API key rotation"
```

Run via the Agent Runner Worker (see
`Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/agent-runner-worker/`):

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

## Usage guidelines

- Use `orchestrator` when the task spans multiple domains or requires a plan.
- Prefer the most specific agent for focused tasks.
- When adding or updating agents:
  - Update `.claude/agents/<agent>.md`.
  - Update `Mosses Multi-Agent Ecosystem/<agent>.md` if present.
  - Reflect changes in `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`.
  - Keep this file in sync.

## Autonomous 24hr system

The autonomous system runs 5 rounds per day via n8n + Agent Runner Worker.
See `Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/` for:

| File | Purpose |
| ---- | ------- |
| `agent-runner-worker/` | Cloudflare Worker (13 agents, centralized API key) |
| `n8n-mosses-production.json` | Production n8n workflow (5 rounds, Supabase + LINE) |
| `supabase-migration.sql` | Database tables + indexes + views |
| `AUTONOMOUS-RUN.md` | Architecture docs |
| `QUICK-START.md` | 5-step setup checklist |

## Related docs

- `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`
- `Mosses Multi-Agent Ecosystem/AUTONOMOUS-RUN.md`
- `Mosses Multi-Agent Ecosystem/agent-runner-api-spec.md`
- `Mosses Multi-Agent Ecosystem/Mosses Autonomous Agent24hr/QUICK-START.md`
