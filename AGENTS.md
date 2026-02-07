# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.

## Repository map (high-signal)

- **`.claude/agents/`**: Agent role prompts (e.g. `architect.md`, `devops.md`, `orchestrator.md`).
- **`Mosses Multi-Agent Ecosystem/`**: Published/working docs for the Mosses ecosystem (Thai/English mix). Folder name contains spaces—quote paths in shell commands.
- **`github-bridge-worker/github-bridge-worker/`**: Cloudflare Worker project (“flybridge”) that provides:
  - REST endpoints for Claude.ai usage
  - MCP server endpoints for Cursor (SSE + streamable HTTP)

## Golden rules

- **Do not commit secrets**. This repo ignores common secret files already (`.env`, `.dev.vars`, etc.). Never add credentials, API keys, PATs, or tokens to git.
- **Prefer small, reviewable commits** with descriptive messages.
- **Match existing structure**. Don’t rename or reorganize directories unless explicitly requested.
- **When touching agent docs**, keep terminology consistent across:
  - `.claude/agents/`
  - `Mosses Multi-Agent Ecosystem/` (if it mirrors the same agent role content)

## GitHub Bridge Worker (Cloudflare Worker) workflow

Project location: `github-bridge-worker/github-bridge-worker/`

### Requirements

- Node.js + npm
- Wrangler (via `npx wrangler` or global install)

### Install

```bash
cd "github-bridge-worker/github-bridge-worker"
npm install
```

### Local development

```bash
cd "github-bridge-worker/github-bridge-worker"
npm run dev
```

This runs `wrangler dev` (long-lived process).

### Deploy

```bash
cd "github-bridge-worker/github-bridge-worker"
npm run deploy
```

Or use the guided script:

```bash
cd "github-bridge-worker/github-bridge-worker"
chmod +x deploy-worker.sh
./deploy-worker.sh
```

### Required secrets (Cloudflare Worker)

Set via `wrangler secret put` (never commit these):

- **`GITHUB_PAT`**: GitHub Personal Access Token used by the worker to call GitHub APIs.
- **`BRIDGE_API_KEY`**: Bearer token required by clients calling the worker.

### Quick health check

- `GET /health` returns `features` including `rest-api` and `mcp-server`.

## Cursor / MCP configuration notes

- The worker exposes MCP endpoints at **`/mcp/sse`**.
- If you create a local `.cursor/mcp.json`, **do not commit it** (it can contain `BRIDGE_API_KEY`). Prefer keeping it untracked or excluded.

## Documentation conventions

- Many docs are Thai-first; preserve tone and intent when editing.
- Keep headings stable; avoid large rewrites unless asked.
- Use code fences for commands and JSON; quote paths with spaces.

## What to run before shipping changes

- If you changed the worker:
  - `npm install` (if dependencies changed)
  - `npm run dev` for a quick smoke check (manual)
- If you changed docs only:
  - Ensure links and code blocks are valid and copy-pasteable.

