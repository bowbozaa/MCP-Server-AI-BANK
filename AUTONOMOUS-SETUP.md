# 🤖 Autonomous System Setup Guide

ระบบที่ทำให้ AI คุยกับ AI และทำงานอัตโนมัติ 24 ชม.

---

## 🎯 What You'll Get

```
คุณสั่งครั้งเดียว: "สร้าง chatbot LINE"
        ↓
n8n Autonomous System เริ่มทำงาน
        ↓
┌─────────────────────────────────┐
│  Orchestrator (via API)         │
│  ↓                               │
│  สั่ง → Architect (API call)    │ ← AI คุยกับ AI
│  ↓                               │
│  สั่ง → n8n Engineer (API call) │ ← AI คุยกับ AI  
│  ↓                               │
│  สั่ง → Code Reviewer (API call)│ ← AI คุยกับ AI
│  ↓                               │
│  สั่ง → DevOps (API call)       │ ← AI คุยกับ AI
│  ↓                               │
│  Claude Code execute commands   │ ← PowerShell ขยับ!
│  ↓                               │
│  ✅ Deploy complete              │
│  ↓                               │
│  📱 LINE notification            │
└─────────────────────────────────┘
```

---

## 📋 Setup Steps

### Step 1: Deploy Agent Runner Worker

```bash
cd agent-runner-worker

# Install
npm install

# Set secrets
wrangler secret put ANTHROPIC_API_KEY
# Paste: sk-ant-xxx

wrangler secret put RUNNER_API_KEY
# Paste: your-secure-key (generate with: openssl rand -hex 32)

wrangler secret put LINE_NOTIFY_TOKEN
# Paste: your-line-token

# Create D1 database
wrangler d1 create agent_runs
# Copy database_id → wrangler.toml

# Create KV
wrangler kv:namespace create AGENT_CACHE
# Copy id → wrangler.toml

# Deploy
wrangler deploy
```

**Result:** Worker running at `https://mosses-agent-runner.your-subdomain.workers.dev`

---

### Step 2: Setup n8n Workflow

1. **Import workflow to n8n**
   - Go to: https://mossad.app.n8n.cloud
   - Click "Import from file"
   - Select: `autonomous-n8n-workflow.json`

2. **Configure credentials**
   - Agent Runner API Key (HTTP Header Auth)
   - Supabase API
   - LINE Notify token

3. **Update Worker URL**
   - In "Call Agent Runner" node
   - Replace with your Worker URL

4. **Activate workflow**
   - Click "Active" toggle
   - Workflow will run at: 06:00, 09:00, 14:00, 18:00, 22:00

---

### Step 3: Test Single Run

```bash
# Test via API
curl -X POST https://mosses-agent-runner.your-subdomain.workers.dev/run \
  -H "Authorization: Bearer YOUR_RUNNER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "orchestrator",
    "userMessage": "แนะนำตัวเอง"
  }'
```

**Expected:** JSON response with agent output

---

### Step 4: Test n8n Manual Run

1. Go to n8n workflow
2. Click "Execute Workflow"
3. Check:
   - ✅ Agent Runner called
   - ✅ Response logged to Supabase
   - ✅ LINE notification sent

---

### Step 5: Verify Autonomous Mode

Wait for next scheduled run (06:00, 09:00, etc.) and check:
- ✅ n8n executes automatically
- ✅ Correct agent called based on time
- ✅ Response logged
- ✅ LINE notification received

---

## 🎬 How It Works

### Morning Run (06:00)

```
n8n Schedule → Determine Round → agent=devops, task=health check
    ↓
Call Agent Runner Worker API
    ↓
Worker calls Claude API with "devops" system prompt
    ↓
Claude (DevOps agent) responds with health check
    ↓
Log to Supabase
    ↓
Send LINE: "🌅 Morning Health Check: All services OK"
```

### Content Run (09:00)

```
n8n Schedule → agent=content-agent
    ↓
Worker calls Claude with content-agent prompt
    ↓
Content Agent generates Bangkok 3099 video brief
    ↓
Log + LINE notification
```

### And so on...

---

## 🔄 Agent Communication Flow

### Multi-Agent Orchestration

When Orchestrator receives complex task:

```json
{
  "agent": "orchestrator",
  "userMessage": "สร้าง chatbot LINE"
}
```

Orchestrator response includes sub-tasks:

```
1. Call Architect API for design
2. Call n8n Engineer API for workflow
3. Call Code Reviewer API for review
4. Call DevOps API for deployment
```

Then n8n can execute these sequentially:

```
n8n → Agent Runner (architect) → Response
   ↓
n8n → Agent Runner (n8n-engineer) → Response (uses architect output)
   ↓
n8n → Agent Runner (code-reviewer) → Response
   ↓
n8n → Agent Runner (devops) → Response
   ↓
LINE: "✅ Chatbot LINE deployed!"
```

---

## 📊 Monitoring

### View Agent Performance

```bash
# Via API
curl https://mosses-agent-runner.your-subdomain.workers.dev/stats

# Via D1
wrangler d1 execute agent_runs \
  --command="SELECT * FROM agent_performance"
```

### Check Logs

```bash
# Worker logs
wrangler tail

# n8n logs
# Go to n8n → Executions tab
```

---

## 🎯 Advanced: Full Autonomous Pipeline

For complex multi-agent tasks, create n8n sub-workflow:

```
Main Workflow → Call Orchestrator
    ↓
Orchestrator returns plan: [step1, step2, step3]
    ↓
Loop through steps:
    ↓
    Call Agent Runner for each step
    ↓
    Pass output to next step
    ↓
Aggregate results
    ↓
LINE: Full report
```

---

## 🚀 Result

**สั่งครั้งเดียว → ทำงานเอง 24 ชม.**

- ✅ n8n รันอัตโนมัติ 5 รอบ/วัน
- ✅ Agent Runner execute agents ผ่าน API
- ✅ Agents คุยกันผ่าน Worker
- ✅ Claude Code execute commands
- ✅ LINE alerts อัตโนมัติ
- ✅ Log ทุกอย่างใน Supabase

---

## 📞 Support

- [AGENTS.md](./AGENTS.md) — Agent details
- [COMMAND-PROTOCOL.md](./COMMAND-PROTOCOL.md) — Command system
- Agent Runner Worker: `agent-runner-worker/README.md`

---

**🎖️ MOSSES ARMY — Fully Autonomous!**
