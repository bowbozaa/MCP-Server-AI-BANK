# 🤖 Mosses Multi-Agent Ecosystem
## Complete Agent Directory

### Last Updated: 2026-02-08

---

## 🎯 Domain specialist agents (high-level)

| Agent | Role | Tasks |
| ----- | ----- | ----- |
| **Orchestrator** (Master Agent) | ประสานงานระหว่าง agents ทั้งหมด | Task distribution, monitoring, scaling |
| **Code Agent** | Development specialist | Code review, optimization, debugging, refactoring, security audits |
| **Content Agent** (Bangkok 3099) | Content pipeline | Spiritual/philosophical AI video (Sora, GPT-4, DALL-E), 6h cycle, YouTube/FB/TikTok/LINE, analytics & n8n |
| **Business Agent** (Sabi Shop) | Business operations | Employee tracking, inventory, customer service automation |
| **Security Agent** | Monitoring & security | Vulnerability scans, API key rotation, alerts |

---

## 🏢 Multi-business context (Master Agent)

| Business | Scope | Key metrics |
|----------|--------|-------------|
| **Bangkok 3099** | Content pipeline (AI video, social, analytics) | Automated content **every 6 hours** |
| **Sabi Shop** | Operations (employees, inventory, customer service) | **9 employees**, **60–80K THB/month** revenue |

- **n8n**: `https://mossad.app.n8n.cloud` — production workflows (Morning 06:00, Content 09:00, Analytics 14:00, Maintenance 18:00, Summary 22:00).
- **LINE**: Important updates and daily summaries sent via n8n LINE Notify node.

---

## 🎯 Agent Overview

| # | Agent | Role | Model | Status |
|---|-------|------|-------|--------|
| 1 | **Orchestrator** | ตัวกลางประสานงานทุก Agent | Opus | ✅ Active |
| 2 | **Architect** | ออกแบบ System Architecture | Opus | ✅ Active |
| 3 | **n8n Engineer** | สร้าง/แก้ n8n Workflows | Sonnet | ✅ Active |
| 4 | **Frontend Dev** | สร้าง UI, Web Apps | Sonnet | ✅ Active |
| 5 | **Code Reviewer** | Review & QA Code | Sonnet | ✅ Active |
| 6 | **Debugger** | หา Bug & Root Cause Analysis | Sonnet | ✅ Active |
| 7 | **Deployer** | Deploy & Release Management | Sonnet | ✅ Active |
| 8 | **Content Strategist** | วางแผน & สร้าง Content | Sonnet | ✅ Active |
| 9 | **SEO Optimizer** | SEO/AIO Optimization | Sonnet | ✅ Active |
| 10 | **Data Engineer** | Database & Data Pipeline | Sonnet | ✅ Active |
| 11 | **DevOps** | CI/CD, Infra, Monitoring, Security | Sonnet | ✅ **NEW** |
| 12 | **Data Analyst** | Analytics, Reports, BI, KPI | Sonnet | ✅ **NEW** |
| 13 | **Marketing Compliance** | Policy Check, กฎหมาย, PDPA | Sonnet | ✅ Active |
| 14 | **Code Agent** | Development specialist | Sonnet | ✅ Active |
| 15 | **Content Agent** | Bangkok 3099 — spiritual/philosophical video, 6h gen, Sora/GPT-4/DALL-E, social + LINE, n8n | Sonnet | ✅ Active |
| 16 | **Business Agent** | Sabi Shop operations | Sonnet | ✅ Active |
| 17 | **Security Agent** | Monitoring & security | Sonnet | ✅ Active |

---

## 🔗 Agent Interaction Map

```
                         ┌─────────────────┐
                         │   ORCHESTRATOR   │
                         │   (Conductor)    │
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
```

---

## 📋 Pipeline Workflows

### Pipeline 1: Feature Development (End-to-End)
```
Architect → n8n Engineer / Frontend Dev → Code Reviewer → DevOps (Deploy) → Data Analyst (Monitor)
```

### Pipeline 2: Content Production
```
Content Strategist → Marketing Compliance (Review) → [Publish] → Data Analyst (Performance)
```

### Pipeline 3: Ad Campaign Launch
```
Content Strategist (Ad Copy) → Marketing Compliance (Policy Check) → DevOps (Landing Page Deploy) → Data Analyst (ROAS Tracking)
```

### Pipeline 4: Bug Fix / Incident
```
Data Analyst (Anomaly Alert) → Debugger → Code Reviewer → DevOps (Hotfix Deploy) → Data Analyst (Verify Fix)
```

### Pipeline 5: New Product/Service Launch
```
Architect (Design) → n8n Engineer + Frontend Dev (Build) → Code Reviewer (QA) → Marketing Compliance (Legal) → Content Strategist (Launch Content) → DevOps (Deploy) → Data Analyst (Track)
```

### Pipeline 6: Monthly Review & Optimization
```
Data Analyst (Monthly Report) → Content Strategist (Content Audit) → Marketing Compliance (Policy Audit) → DevOps (Infra Audit) → Orchestrator (Action Plan)
```

---

## 🏗️ Infrastructure Stack

| Layer | Technology | Managed By |
|-------|-----------|------------|
| Edge | Cloudflare Workers | DevOps |
| Frontend | Vercel, Lovable | Frontend Dev |
| Backend | Cloudflare Workers, Supabase | n8n Engineer, Data Engineer |
| Database | Supabase Postgres, D1, KV | Data Engineer |
| Storage | R2, Supabase Storage | DevOps |
| Automation | n8n Cloud | n8n Engineer |
| AI | Claude API, OpenAI, Runway ML | Orchestrator |
| Messaging | LINE OA, Telegram | n8n Engineer |
| Analytics | Supabase + Custom | Data Analyst |
| Version Control | GitHub (Flybridge) | DevOps |

---

## 🚀 Quick Start Commands

```bash
# ใช้ Agent เฉพาะทาง
claude --agent orchestrator "วางแผนสร้างฟีเจอร์ใหม่"
claude --agent devops "เช็ค health check ทุก service"
claude --agent data-analyst "สรุปยอดขายสัปดาห์นี้"
claude --agent marketing-compliance "ตรวจ ad copy นี้ก่อน launch"
claude --agent content-strategist "วางแผน content เดือนหน้า"
claude --agent code-agent "review โค้ดนี้และเสนอ optimization"
claude --agent content-agent "วางแผนโพสต์ Bangkok 3099 สัปดาห์หน้า"
claude --agent business-agent "ออกแบบระบบติดตามพนักงาน Sabi Shop"
claude --agent security-agent "สแกน vulnerability และเช็ค API key rotation"

# ใช้ Pipeline
claude --agent orchestrator "สร้าง feature ใหม่: [description]"
claude --agent orchestrator "launch campaign: [campaign details]"
```

---

## 📁 File Structure

```
mosses-agents/
└── .claude/
    └── agents/
        ├── orchestrator.md          # 🎯 Main Conductor
        ├── architect.md             # 🏗️ System Design
        ├── n8n-engineer.md          # ⚡ Workflow Automation
        ├── frontend-dev.md          # 🎨 UI Development
        ├── code-reviewer.md         # 🔍 Code QA
        ├── debugger.md              # 🐛 Bug Hunting
        ├── deployer.md              # 🚀 Release Management
        ├── content-strategist.md    # 📝 Content & Marketing
        ├── seo-optimizer.md         # 🔎 SEO/AIO
        ├── data-engineer.md         # 🗄️ Database & Pipelines
        ├── devops.md                # ⚙️ Infrastructure & CI/CD  [NEW]
        ├── data-analyst.md          # 📊 Analytics & BI
        ├── marketing-compliance.md  # 🛡️ Policy & Legal
        ├── code-agent.md            # 🔧 Development specialist
        ├── content-agent.md         # 🎬 Bangkok 3099 content
        ├── business-agent.md       # 🏪 Sabi Shop operations
        └── security-agent.md       # 🔐 Monitoring & security
```
