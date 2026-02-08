# Quick Start Checklist — Mosses Autonomous Agent v2
## Production Setup

---

### Step 1: Deploy Agent Runner Worker (5 min)

```bash
cd agent-runner-worker
npm install
wrangler login          # if not logged in
wrangler deploy
wrangler secret put RUNNER_API_KEY      # create strong random token
wrangler secret put ANTHROPIC_API_KEY   # your Claude API key
```

- [ ] Worker deployed
- [ ] Secrets set
- [ ] Test: `curl https://mosses-agent-runner.<subdomain>.workers.dev/health`
- [ ] Test: `curl https://mosses-agent-runner.<subdomain>.workers.dev/agents`

### Step 2: Supabase (5 min)

- [ ] Supabase Dashboard -> SQL Editor
- [ ] Copy & run `supabase-migration.sql`
- [ ] Verify: 3 tables (`agent_runs`, `agent_tasks`, `daily_reports`)
- [ ] Verify: 3 views (`v_last_run_per_round`, `v_today_runs`, `v_today_summary`)

### Step 3: n8n (10 min)

- [ ] Import `n8n-mosses-production.json`
- [ ] Set Credentials:
  - [ ] HTTP Header Auth (Agent Runner): Header `Authorization`, Value `Bearer <RUNNER_API_KEY>`
  - [ ] Supabase: URL + service_role key
  - [ ] HTTP Header Auth (LINE): Header `Authorization`, Value `Bearer <LINE_CHANNEL_ACCESS_TOKEN>`
- [ ] Set Environment Variables:
  - [ ] `AGENT_RUNNER_URL` = `https://mosses-agent-runner.<subdomain>.workers.dev`
  - [ ] `LINE_USER_ID` = your LINE user ID
- [ ] Update credential IDs in nodes (replace placeholder IDs)
- [ ] Adjust schedule if needed (default: 06/09/14/18/22)

### Step 4: Test (2 min)

- [ ] Click "Test workflow" on any trigger
- [ ] Claude responds correctly
- [ ] Supabase has log entry
- [ ] LINE received notification

### Step 5: Activate!

- [ ] Toggle **Active** at top-right
- [ ] Done

---

## After Activate:

- Check LINE notifications each round
- CRITICAL -> investigate immediately
- OK -> relax, system handles it
- 22:00 -> full day summary

## Files:

| File | Purpose |
|------|---------|
| `agent-runner-worker/` | Cloudflare Worker (13 agents, centralized API key) |
| `n8n-mosses-production.json` | Production workflow (5 rounds, Supabase + LINE) |
| `supabase-migration.sql` | Tables + indexes + views |
| `AUTONOMOUS-RUN.md` | Architecture & design docs |

## Cost: ~$0.82/day (~28 baht)
