# AGENTS

This repository ships a multi-agent prompt set for the Mosses ecosystem.
Use this file as the canonical index of available agents and how to invoke
them. The runtime prompts live in `.claude/agents/`.

## Source of truth and docs

- `.claude/agents/` is the runtime prompt directory used by tooling.
- `Mosses Multi-Agent Ecosystem/` contains long-form docs and guides.
- Agent names are lowercase and hyphenated; keep names stable across tools.
- Update this file and the docs when adding or renaming agents.

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

## Quick start

Run an agent directly:

```
claude --agent orchestrator "Plan and coordinate a new feature"
claude --agent devops "Check service health and summarize"
claude --agent code-reviewer "Review this change for regressions"
```

Run via an agent-runner API (see
`Mosses Multi-Agent Ecosystem/agent-runner-api-spec.md`):

```
curl -X POST https://example-agent-runner.workers.dev/run \
  -H "Authorization: Bearer $RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"agent":"devops","userMessage":"Check service health and summarize"}'
```

## Usage guidelines

- Use `orchestrator` when the task spans multiple domains or requires a plan.
- Prefer the most specific agent for focused tasks.
- When adding or updating agents:
  - Update `.claude/agents/<agent>.md`.
  - Update `Mosses Multi-Agent Ecosystem/<agent>.md` if present.
  - Reflect changes in `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`.
  - Keep this file in sync.

## Agent health check

Run the status checker to verify all agents are operational:

```bash
bash scripts/agent-status.sh
```

Or inspect the JSON health report:

```bash
cat agent-health-check.json
```

The health check verifies that every agent has both a **runtime prompt**
(`.claude/agents/<name>.md`) and **documentation**
(`Mosses Multi-Agent Ecosystem/<name>.md`).

## Related docs

- `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`
- `Mosses Multi-Agent Ecosystem/AUTONOMOUS-RUN.md`
- `Mosses Multi-Agent Ecosystem/agent-runner-api-spec.md`

## Cursor Cloud specific instructions

### Repository overview

This repo contains two things: (1) markdown-based agent prompts/docs for the Mosses AI Army (13 agents), and (2) a single deployable Cloudflare Worker called **Flybridge** (`github-bridge-worker/github-bridge-worker/`). The Worker is the only runnable service. There are no linters, formatters, or automated test suites configured in this repo.

### Running the Bridge Worker locally

```bash
cd github-bridge-worker/github-bridge-worker
npm install
npx wrangler dev --port 8787
```

For authenticated endpoints, create `github-bridge-worker/github-bridge-worker/.dev.vars` with:

```
BRIDGE_API_KEY=<any-test-key>
GITHUB_PAT=<real-or-dummy-token>
```

The `.dev.vars` file is auto-read by wrangler. The `/health` endpoint does not require auth; all other endpoints do.

### Agent health check

Run `bash scripts/agent-status.sh` from the repo root. This verifies all 13 agents have both a runtime prompt (`.claude/agents/<name>.md`) and docs (`Mosses Multi-Agent Ecosystem/<name>.md`).

### Gotchas

- The `package.json` in the worker directory has **no dependencies listed** — wrangler is the only dev dependency needed and is installed via `npm install --save-dev wrangler` or invoked via `npx`.
- When restarting `wrangler dev`, you must kill the old process first or use a different port; it does not auto-release the port.
- The Worker uses in-memory session storage (`Map`) for legacy SSE MCP sessions; sessions reset on every restart.
