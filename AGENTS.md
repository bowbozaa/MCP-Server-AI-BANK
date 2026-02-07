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

## Related docs

- `Mosses Multi-Agent Ecosystem/ECOSYSTEM.md`
- `Mosses Multi-Agent Ecosystem/AUTONOMOUS-RUN.md`
- `Mosses Multi-Agent Ecosystem/agent-runner-api-spec.md`
