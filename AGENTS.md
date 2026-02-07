# AGENTS.md — Mosses Multi-Agent Ecosystem

> Instructions for AI agents (Cursor, Claude, etc.) working on this codebase.

---

## Project Overview

This repository powers the **Mosses Multi-Agent Ecosystem** — a coordinated system of 13 specialized AI agents ("MOSSES ARMY") plus a **GitHub Bridge Worker** (Cloudflare Worker) that proxies between Claude.ai/Cursor and the GitHub API.

### Repository Structure

```
/
├── .claude/agents/              # 13 Claude agent definitions (frontmatter + markdown)
│   ├── orchestrator.md          # Conductor — routes tasks to other agents (Opus)
│   ├── architect.md             # System architecture & design (Opus)
│   ├── n8n-engineer.md          # n8n workflow automation (Sonnet)
│   ├── frontend-dev.md          # UI/UX development (Sonnet)
│   ├── code-reviewer.md         # Code review & security audit (Sonnet)
│   ├── debugger.md              # Bug hunting & root cause analysis (Sonnet)
│   ├── deployer.md              # Release management (Sonnet)
│   ├── content-strategist.md    # Content & marketing (Sonnet)
│   ├── seo-optimizer.md         # SEO/AIO optimization (Sonnet)
│   ├── data-engineer.md         # Database & data pipelines (Sonnet)
│   ├── devops.md                # CI/CD, infra, monitoring, security (Sonnet)
│   ├── data-analyst.md          # Analytics, reports, KPIs (Sonnet)
│   └── marketing-compliance.md  # Legal, PDPA, platform policy (Sonnet)
├── github-bridge-worker/        # Cloudflare Worker — GitHub API proxy + MCP server
│   └── github-bridge-worker/
│       ├── src/index.js         # Main worker source (REST API + MCP Server)
│       ├── wrangler.toml        # Cloudflare Workers config
│       ├── package.json         # Node dependencies
│       └── deploy-worker.sh     # One-click deploy script
├── Mosses Multi-Agent Ecosystem/ # Documentation & ecosystem reference
│   ├── ECOSYSTEM.md             # Full agent directory & interaction map
│   ├── AUTONOMOUS-RUN.md        # Autonomous operation guide
│   ├── agent-runner-api-spec.md # Agent runner API specification
│   └── *.md                     # Individual agent reference docs
├── .gitignore
└── AGENTS.md                    # This file
```

---

## Tech Stack

| Layer         | Technology                         | Purpose                          |
|---------------|------------------------------------|----------------------------------|
| Edge Compute  | Cloudflare Workers                 | GitHub Bridge / Flybridge proxy  |
| Frontend      | Vercel, Lovable                    | Web apps, landing pages          |
| Backend       | Cloudflare Workers, Supabase       | API, serverless functions        |
| Database      | Supabase Postgres, D1, KV          | Primary DB, edge reads, cache    |
| Storage       | R2, Supabase Storage               | Object storage                   |
| Automation    | n8n Cloud                          | Workflow automation              |
| AI            | Claude API (Anthropic), OpenAI     | Agent intelligence               |
| Messaging     | LINE OA, Telegram                  | Notifications & alerts           |
| Version Ctrl  | GitHub (Flybridge)                 | Source code, CI/CD               |

---

## Coding Conventions

### General Rules

- **Language**: Output and comments in Thai, with English technical terms where appropriate.
- **Security first**: Never expose secrets, API keys, tokens, or credentials in code, logs, or output. Use platform-level environment variables and secret stores exclusively.
- **Free tier awareness**: Maximize free tier usage across Cloudflare, Vercel, Supabase, and n8n before scaling to paid tiers.
- **No "impossible"**: Every problem has a solution — find or create one.

### JavaScript / Cloudflare Workers

- The GitHub Bridge Worker (`github-bridge-worker/github-bridge-worker/src/index.js`) is a single-file Cloudflare Worker using ES module syntax (`export default { async fetch(...) }`).
- Runtime is Cloudflare Workers (V8 isolate) — no Node.js built-ins. Use Web APIs (`fetch`, `crypto`, `TextEncoder`, `btoa`, `atob`, `URL`, `Response`, `Request`, `TransformStream`, etc.).
- Secrets are accessed via the `env` parameter (e.g., `env.GITHUB_PAT`, `env.BRIDGE_API_KEY`), not `process.env`.
- All responses must include CORS headers (use the `corsResponse()` wrapper).
- The worker implements two protocols:
  - **REST API** — for Claude.ai (`web_fetch`) and direct HTTP clients.
  - **MCP Server** — for Cursor IDE, supporting both Streamable HTTP (`POST /mcp/sse`) and legacy SSE (`GET /mcp/sse`) transports.
- Auth: Bearer token via `Authorization` header, validated against `env.BRIDGE_API_KEY`. The `/health` endpoint is unauthenticated.
- Deploy with `npx wrangler deploy` from the `github-bridge-worker/github-bridge-worker/` directory.

### Agent Definition Files (`.claude/agents/*.md`)

- Each agent file uses YAML frontmatter with fields: `name`, `description`, `tools`, `model`.
- `model` is either `opus` (for Orchestrator and Architect) or `sonnet` (all others).
- `tools` lists the Claude tools the agent is permitted to use.
- The markdown body defines the agent's role, specialization, mission levels (Lv1 through LvMax), output format, and rules of engagement.
- The MOSSES ARMY theming (military unit names, ranks, clearance levels) is intentional and should be maintained when editing or creating agents.
- Agents are invoked via `claude --agent <agent-name> "<task>"`.

---

## Agent Architecture

### Interaction Layers

```
                    ┌─────────────────┐
                    │   ORCHESTRATOR   │  (Opus — routes all tasks)
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
   ┌─────▼─────┐      ┌─────▼─────┐      ┌─────▼─────┐
   │  PLANNING  │      │  BUILDING  │      │ OPERATING  │
   └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
         │                   │                   │
  Architect           n8n Engineer         DevOps
  Content Strategist  Frontend Dev         Data Analyst
  Marketing Compliance Data Engineer       Deployer
                      Code Reviewer
                      Debugger
                      SEO Optimizer
```

### Key Pipelines

1. **Feature Development**: Architect → n8n/Frontend → Code Reviewer → DevOps → Data Analyst
2. **Content Production**: Content Strategist → Marketing Compliance → Publish → Data Analyst
3. **Bug Fix / Incident**: Data Analyst (alert) → Debugger → Code Reviewer → DevOps (hotfix) → Data Analyst (verify)
4. **Product Launch**: Architect → Build agents → Code Reviewer → Marketing Compliance → Content Strategist → DevOps → Data Analyst

---

## GitHub Bridge Worker (Flybridge)

### REST Endpoints

| Method | Path                                | Description            |
|--------|-------------------------------------|------------------------|
| GET    | `/health`                           | Health check (no auth) |
| GET    | `/repos/:owner/:repo`               | Repository info        |
| GET    | `/repos/:owner/:repo/contents/:path`| Read file/directory    |
| PUT    | `/repos/:owner/:repo/contents/:path`| Create/update file     |
| POST   | `/repos/:owner/:repo/push`          | Batch push (atomic)    |
| POST   | `/repos/:owner/:repo/dispatch`      | Trigger GH Actions     |
| GET    | `/repos/:owner/:repo/workflows`     | List workflows         |

### MCP Endpoints

| Method | Path            | Description                              |
|--------|-----------------|------------------------------------------|
| POST   | `/mcp/sse`      | Streamable HTTP (JSON-RPC, primary)      |
| GET    | `/mcp/sse`      | SSE stream (legacy fallback for Cursor)  |
| POST   | `/mcp/message`  | JSON-RPC messages (legacy SSE sessions)  |

### MCP Tools Exposed

`read_file`, `write_file`, `batch_push`, `get_repo_info`, `trigger_workflow`, `list_workflows`, `search_code`, `list_branches`

---

## Secrets & Environment Variables

| Secret            | Where Used            | How to Set                                    |
|-------------------|-----------------------|-----------------------------------------------|
| `GITHUB_PAT`      | GitHub Bridge Worker  | `wrangler secret put GITHUB_PAT`              |
| `BRIDGE_API_KEY`  | GitHub Bridge Worker  | `wrangler secret put BRIDGE_API_KEY`          |

Never hardcode these values. They are injected at runtime by the Cloudflare Workers platform.

---

## Development Workflow

1. **Editing agents**: Modify files in `.claude/agents/`. Maintain the YAML frontmatter format and the MOSSES ARMY theming.
2. **Editing the bridge worker**: Edit `github-bridge-worker/github-bridge-worker/src/index.js`. Test locally with `npx wrangler dev`. Deploy with `npx wrangler deploy`.
3. **Documentation**: Reference docs live in `Mosses Multi-Agent Ecosystem/`. The canonical agent definitions are in `.claude/agents/`.
4. **Git**: Use descriptive commit messages. Push to the appropriate branch. The bridge worker repo is nested — be mindful of the doubled directory path.

---

## Important Warnings

- **Do not commit secrets** — `.env`, `.dev.vars`, credentials, and API keys are in `.gitignore`. Double-check before committing.
- **Cloudflare Workers runtime** — No Node.js APIs (`fs`, `path`, `http`, `Buffer`, etc.). Use Web Standard APIs only.
- **MCP sessions are in-memory** — They reset on worker restart. This is by design for the edge runtime.
- **Agent model selection** — Only Orchestrator and Architect use `opus`. All other agents use `sonnet` to optimize cost.
- **Thai + English mix** — All user-facing output should be in Thai with English technical terms. Code, variable names, and API contracts remain in English.
