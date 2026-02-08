# 🤖 MOSSES Agent Runner Worker

Cloudflare Worker ที่รัน MOSSES ARMY agents ผ่าน HTTP API

---

## 🚀 Features

- ✅ รัน 17 agents ผ่าน REST API
- ✅ Batch execution (sequential)
- ✅ Response caching (KV)
- ✅ Run logging (D1)
- ✅ LINE alerts on errors
- ✅ Performance tracking

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Set secrets
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put RUNNER_API_KEY
wrangler secret put LINE_NOTIFY_TOKEN

# Create D1 database
wrangler d1 create agent_runs
# Copy database_id to wrangler.toml

# Create KV namespace
wrangler kv:namespace create AGENT_CACHE
# Copy id to wrangler.toml

# Run migrations
wrangler d1 execute agent_runs --file=./schema.sql

# Deploy
npm run deploy
```

---

## 🔌 API Endpoints

### Run Single Agent

```bash
curl -X POST https://mosses-agent-runner.your-subdomain.workers.dev/run \
  -H "Authorization: Bearer YOUR_RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "devops",
    "userMessage": "Check service health"
  }'
```

### Run Batch

```bash
curl -X POST https://mosses-agent-runner.your-subdomain.workers.dev/run/batch \
  -H "Authorization: Bearer YOUR_RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tasks": [
      {"agent": "devops", "prompt": "Health check"},
      {"agent": "data-analyst", "prompt": "Daily report"}
    ]
  }'
```

### List Agents

```bash
curl https://mosses-agent-runner.your-subdomain.workers.dev/agents
```

### Health Check

```bash
curl https://mosses-agent-runner.your-subdomain.workers.dev/health
```

---

## 🔗 Integration with n8n

Use HTTP Request node:

```json
{
  "method": "POST",
  "url": "https://mosses-agent-runner.your-subdomain.workers.dev/run",
  "headers": {
    "Authorization": "Bearer {{$credentials.RUNNER_API_KEY}}",
    "Content-Type": "application/json"
  },
  "body": {
    "agent": "{{$json.agent}}",
    "userMessage": "{{$json.prompt}}"
  }
}
```

---

## 📊 Available Agents

1. orchestrator — Master coordinator
2. architect — System design
3. n8n-engineer — Workflow automation
4. frontend-dev — UI development
5. code-reviewer — Code QA
6. debugger — Bug hunting
7. deployer — Release management
8. content-strategist — Content planning
9. seo-optimizer — SEO optimization
10. data-engineer — Database & pipelines
11. devops — Infrastructure & CI/CD
12. data-analyst — Analytics & reporting
13. marketing-compliance — Legal compliance
14. code-agent — Development specialist
15. content-agent — Bangkok 3099 content
16. business-agent — Sabi Shop operations
17. security-agent — Security monitoring

---

## 🛡️ Security

- API key authentication required
- Rate limiting via Cloudflare
- Secrets stored in Workers environment
- Audit logging to D1

---

## 📈 Monitoring

```bash
# View logs
wrangler tail

# Query D1 for agent runs
wrangler d1 execute agent_runs --command="SELECT * FROM agent_performance"
```

---

## 🔧 Development

```bash
# Local development
npm run dev

# Deploy
npm run deploy

# Tail logs
npm run tail
```

---

[← Back to Main Repo](../)
