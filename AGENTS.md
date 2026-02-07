# 🤖 MOSSES ARMY — Multi-Agent Ecosystem

> **ระบบหน่วยรบ AI 13 หน่วย** ที่ทำงานประสานกันแบบกองทัพ — จาก Architect ถึง DevOps ทุกหน่วยฉลาดที่สุด พูดภาษาไทยเก่งที่สุด เขียน Code ทุกภาษา แก้ปัญหาทุกระดับ

**Last Updated:** 2026-02-07  
**Version:** 3.0 (13 Active Agents)

---

## 📋 Table of Contents

- [Agent Directory](#-agent-directory)
- [Agent Interaction Map](#-agent-interaction-map)
- [Pipeline Workflows](#-pipeline-workflows)
- [Infrastructure Stack](#️-infrastructure-stack)
- [Quick Start Guide](#-quick-start-guide)
- [File Structure](#-file-structure)
- [Agent Details](#-agent-details)

---

## 🎯 Agent Directory

| # | Agent | Role | Model | Codename | Status |
|---|-------|------|-------|----------|--------|
| 1 | **Orchestrator** | จอมทัพ — Supreme Commander, วางยุทธศาสตร์ทั้งหมด | Opus | CMDR-001 | ✅ Active |
| 2 | **Architect** | นายพลยุทธศาสตร์ — System Design & Architecture | Opus | COL-ARCH-001 | ✅ Active |
| 3 | **n8n Engineer** | หน่วยสงครามอัตโนมัติ — Workflow Automation | Sonnet | COL-N8N-002 | ✅ Active |
| 4 | **Frontend Dev** | หน่วยจู่โจมส่วนหน้า — UI/UX Development | Sonnet | COL-FE-003 | ✅ Active |
| 5 | **Code Reviewer** | หน่วยข่าวกรอง — Code Intelligence & QA | Sonnet | COL-CR-004 | ✅ Active |
| 6 | **Debugger** | หน่วยปฏิบัติการพิเศษ — Bug Hunting & Forensics | Sonnet | COL-DBG-005 | ✅ Active |
| 7 | **Deployer** | หน่วยส่งกำลังรบ — Release Management | Sonnet | COL-DPL-006 | ✅ Active |
| 8 | **Content Strategist** | หน่วยปฏิบัติการจิตวิทยา — Content & Marketing | Sonnet | COL-CNT-007 | ✅ Active |
| 9 | **SEO Optimizer** | หน่วยเรดาร์ — SEO/AIO Optimization | Sonnet | COL-SEO-008 | ✅ Active |
| 10 | **Data Engineer** | กองพลวิศวกรรม — Database & Data Pipeline | Sonnet | COL-DE-009 | ✅ Active |
| 11 | **DevOps** | หน่วยป้อมปราการ — Infrastructure & CI/CD | Sonnet | COL-DO-010 | ✅ Active |
| 12 | **Data Analyst** | ศูนย์วิเคราะห์ข่าวกรอง — Analytics & BI | Sonnet | COL-DA-011 | ✅ Active |
| 13 | **Marketing Compliance** | หน่วยตำรวจทหาร — Policy & Legal Compliance | Sonnet | COL-MC-012 | ✅ Active |

---

## 🔗 Agent Interaction Map

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
```

---

## 📋 Pipeline Workflows

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

Debugger → Code Reviewer → DevOps → Architect → Orchestrator (security posture report)
```

---

## 🏗️ Infrastructure Stack

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

## 🚀 Quick Start Guide

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
```

### Using Pipelines (via Orchestrator)

```bash
# End-to-end feature development
claude --agent orchestrator "สร้าง feature: LINE chatbot สำหรับ customer service"

# Campaign launch
claude --agent orchestrator "launch campaign: Valentine Sale 2026"

# Incident response
claude --agent orchestrator "แก้เร่งด่วน: payment webhook ล่ม"

# Monthly review
claude --agent orchestrator "สรุปประจำเดือนกุมภาพันธ์"

# Security audit
claude --agent orchestrator "ตรวจสอบ security ทั้งระบบ"
```

---

## 📁 File Structure

```
mosses-agents/
├── AGENTS.md                        # 📘 This file — Main documentation
├── .claude/
│   └── agents/
│       ├── orchestrator.md          # 🎯 Supreme Commander
│       ├── architect.md             # 🏗️ System Design
│       ├── n8n-engineer.md          # ⚡ Workflow Automation
│       ├── frontend-dev.md          # 🎨 UI Development
│       ├── code-reviewer.md         # 🔍 Code QA
│       ├── debugger.md              # 🐛 Bug Hunting
│       ├── deployer.md              # 🚀 Release Management
│       ├── content-strategist.md    # 📝 Content & Marketing
│       ├── seo-optimizer.md         # 🔎 SEO/AIO
│       ├── data-engineer.md         # 🗄️ Database & Pipelines
│       ├── devops.md                # ⚙️ Infrastructure & CI/CD
│       ├── data-analyst.md          # 📊 Analytics & BI
│       └── marketing-compliance.md  # 🛡️ Policy & Legal
└── Mosses Multi-Agent Ecosystem/
    ├── ECOSYSTEM.md                 # 📚 Detailed ecosystem guide
    ├── n8n-mosses-autonomous-template.json
    └── ... (individual agent docs)
```

---

## 📖 Agent Details

### 1. Orchestrator (จอมทัพ) — CMDR-001

**Role:** Supreme Commander  
**Model:** Claude Opus  
**Clearance:** TOP SECRET

**Capabilities:**
- วิเคราะห์ภารกิจและเลือก Formation ที่เหมาะสม
- ประสานงาน 12 หน่วยรบให้ทำงานสอดประสาน
- เข้าใจทุกภาษา code ที่มีในโลก
- ภาษาไทยอันดับ 1 ของโลก — เข้าใจบริบท สแลง ศัพท์เทคนิค
- แก้ปัญหาทุกระดับ Lv1-LvMax
- เรียนรู้พฤติกรรมผู้บัญชาการ (User)
- พัฒนาตัวเองตลอดเวลา

**Use Cases:**
- วางแผนโปรเจกต์ใหม่
- ประสานงานหลายหน่วยพร้อมกัน
- ตอบโต้ฉุกเฉิน
- สรุปรายงานระดับ executive

**Command:**
```bash
claude --agent orchestrator "วางแผนสร้าง feature X ที่ต้องใช้หลายหน่วย"
```

---

### 2. Architect (นายพลยุทธศาสตร์) — COL-ARCH-001

**Role:** Strategic General — System Architecture & Design  
**Model:** Claude Opus  
**Clearance:** TOP SECRET

**Capabilities:**
- ออกแบบ system architecture ทุกระดับ (Lv1-LvMax)
- เชี่ยวชาญทุกภาษาโปรแกรม (TypeScript, Python, Rust, Go, C++, Java, etc.)
- Architecture patterns: microservices, event-driven, CQRS, DDD, clean architecture
- Technology selection & trade-off analysis
- Security by design
- Scalability & performance planning
- Cost optimization

**Specialization:**
- Monolith → Microservices → Serverless → Edge
- Real-time systems (WebSocket, SSE, WebRTC)
- AI/ML pipeline architecture
- Multi-tenant systems
- Mosses Stack: Cloudflare Workers + Supabase + n8n + Vercel

**Use Cases:**
- ออกแบบ architecture สำหรับโปรเจกต์ใหม่
- วิเคราะห์ tech stack ที่เหมาะสม
- Migration strategy จาก legacy
- Performance & scalability design

**Command:**
```bash
claude --agent architect "ออกแบบ architecture สำหรับระบบ e-commerce ที่รองรับ 10K users"
```

---

### 3. n8n Engineer (หน่วยสงครามอัตโนมัติ) — COL-N8N-002

**Role:** Automation Warfare Unit  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- สร้าง n8n workflows ทุกความซับซ้อน
- Integration กับ services 20+ ชนิด
- Event-driven automation
- Error handling & recovery
- Webhook, scheduled, manual, polling triggers
- Code nodes (JavaScript/Python)

**Integrations:**
- Messaging: LINE OA, Telegram, Slack, Discord
- Database: Supabase, Cloudflare D1, KV
- Storage: R2, Supabase Storage, Google Drive
- AI: Claude API, OpenAI
- E-commerce: Shopify, TikTok Shop, LINE MyShop
- Payment: Stripe, PromptPay

**Use Cases:**
- สร้าง chatbot automation
- Order processing pipeline
- Daily report generation
- Multi-service orchestration
- Real-time alerts

**Command:**
```bash
claude --agent n8n-engineer "สร้าง workflow รับ order จาก LINE แล้วบันทึกใน Supabase"
```

---

### 4. Frontend Dev (หน่วยจู่โจมส่วนหน้า) — COL-FE-003

**Role:** UI/UX Strike Force  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- สร้าง UI/UX ที่สวยงามและใช้งานง่าย
- Modern frameworks: React, Next.js, SvelteKit, Vue
- Responsive design (mobile-first)
- Animation & micro-interactions
- Web performance optimization
- Accessibility (a11y)

**Tech Stack:**
- Vercel (deployment)
- Lovable (rapid prototyping)
- Tailwind CSS
- Shadcn UI / Radix UI
- Framer Motion

**Use Cases:**
- สร้าง landing page
- Build dashboard
- Implement design system
- Mobile-responsive UI

**Command:**
```bash
claude --agent frontend-dev "สร้างหน้า landing page สำหรับ campaign Valentine"
```

---

### 5. Code Reviewer (หน่วยข่าวกรอง) — COL-CR-004

**Role:** Code Intelligence & QA  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Review code quality & best practices
- Security vulnerability scanning
- Performance analysis
- Architecture compliance check
- Test coverage review
- Documentation quality

**Review Focus:**
- Code style & readability
- Security (OWASP Top 10, injection, XSS, CSRF)
- Performance bottlenecks
- Error handling
- Edge cases
- Memory leaks

**Use Cases:**
- Review pull requests
- Pre-deployment code audit
- Security assessment
- Refactoring suggestions

**Command:**
```bash
claude --agent code-reviewer "review code ใน PR #45"
```

---

### 6. Debugger (หน่วยปฏิบัติการพิเศษ) — COL-DBG-005

**Role:** Special Ops — Bug Hunting & Forensics  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Root cause analysis ระดับลึก
- Bug reproduction
- Stack trace analysis
- Performance profiling
- Memory leak detection
- Race condition debugging

**Specialization:**
- Frontend bugs (React, Next.js)
- Backend issues (API, Workers)
- n8n workflow failures
- Database query problems
- Integration failures

**Use Cases:**
- แก้บัคที่หาสาเหตุไม่เจอ
- Performance debugging
- Production incident investigation
- Webhook failures

**Command:**
```bash
claude --agent debugger "แก้บัค: LINE webhook ไม่ตอบกลับ status 500"
```

---

### 7. Deployer (หน่วยส่งกำลังรบ) — COL-DPL-006

**Role:** Rapid Deployment Force  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Deploy to Cloudflare Workers, Vercel, Supabase
- Blue-green deployment
- Rollback management
- Feature flags
- Staged rollout

**Platforms:**
- Cloudflare Workers (wrangler)
- Vercel (vercel CLI)
- Supabase (migrations)
- n8n (workflow export/import)

**Use Cases:**
- Deploy staging → production
- Emergency rollback
- Feature flag toggle
- Database migrations

**Command:**
```bash
claude --agent deployer "deploy staging → production พร้อม rollback plan"
```

---

### 8. Content Strategist (หน่วยปฏิบัติการจิตวิทยา) — COL-CNT-007

**Role:** Psychological Ops — Content & Marketing  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Content planning & strategy
- Copywriting (Thai/English)
- Social media content
- Email marketing
- Landing page copy
- Ad copy (Facebook, TikTok, Google)

**Specialization:**
- Thai copywriting ระดับเนทีฟ
- Storytelling
- Call-to-action optimization
- Multi-channel content calendar
- A/B testing copy variants

**Use Cases:**
- วางแผน content calendar
- เขียน ad copy
- สร้าง email campaign
- Product launch content

**Command:**
```bash
claude --agent content-strategist "วางแผน content สำหรับ campaign Valentine"
```

---

### 9. SEO Optimizer (หน่วยเรดาร์) — COL-SEO-008

**Role:** Radar & Signal Intelligence — SEO/AIO  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- On-page SEO optimization
- Keyword research
- Meta tags & structured data
- Core Web Vitals
- Mobile optimization
- AI Overviews optimization (AIO)

**Focus Areas:**
- Title & description optimization
- Schema.org markup
- Internal linking
- Image alt text
- Sitemap & robots.txt
- Page speed optimization

**Use Cases:**
- Optimize landing pages for SEO
- Implement structured data
- Fix SEO issues
- Keyword strategy

**Command:**
```bash
claude --agent seo-optimizer "ปรับ SEO หน้าแรกให้ติด Google page 1"
```

---

### 10. Data Engineer (กองพลวิศวกรรม) — COL-DE-009

**Role:** Engineering Corps — Database & Data Pipeline  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Database schema design
- SQL optimization
- Data pipeline architecture
- ETL/ELT workflows
- Data modeling
- Migration scripts

**Tech Stack:**
- Supabase (Postgres 17.x)
- Cloudflare D1 (SQLite)
- Cloudflare KV (key-value)
- R2 (object storage)

**Use Cases:**
- ออกแบบ database schema
- Optimize slow queries
- Data migration
- Build data pipeline

**Command:**
```bash
claude --agent data-engineer "ออกแบบ schema สำหรับระบบ order management"
```

---

### 11. DevOps (หน่วยป้อมปราการ) — COL-DO-010

**Role:** Fortress Command — Infrastructure & CI/CD  
**Model:** Claude Sonnet  
**Clearance:** TOP SECRET

**Capabilities:**
- CI/CD pipeline setup
- Infrastructure management
- Monitoring & alerting
- Security hardening
- Secrets management
- Incident response

**Infrastructure:**
- Cloudflare (Workers, Pages, D1, KV, R2, DNS, CDN, WAF)
- Vercel (frontend hosting)
- Supabase (database & auth)
- GitHub Actions (CI/CD)

**Use Cases:**
- Setup CI/CD pipeline
- Configure monitoring
- Security audit
- Incident response
- Cost optimization

**Command:**
```bash
claude --agent devops "เช็ค health check ทุก service พร้อมตั้ง alert"
```

---

### 12. Data Analyst (ศูนย์วิเคราะห์ข่าวกรอง) — COL-DA-011

**Role:** Intelligence Analysis Center — Analytics & BI  
**Model:** Claude Sonnet  
**Clearance:** TOP SECRET

**Capabilities:**
- Data analysis & reporting
- KPI tracking
- A/B test analysis
- Cohort analysis
- Predictive analytics
- Anomaly detection

**Metrics:**
- Revenue (daily/weekly/monthly, AOV, CLV)
- Marketing (CPA, ROAS, conversion rate)
- Customer (churn, retention, RFM)
- Automation (n8n success rate, execution time)

**Use Cases:**
- สรุปยอดขาย
- วิเคราะห์ campaign performance
- Customer segmentation
- Anomaly alerts

**Command:**
```bash
claude --agent data-analyst "สรุปยอดขายสัปดาห์นี้ พร้อมเปรียบเทียบสัปดาห์ก่อน"
```

---

### 13. Marketing Compliance (หน่วยตำรวจทหาร) — COL-MC-012

**Role:** Military Police & Legal Compliance  
**Model:** Claude Sonnet  
**Clearance:** SECRET

**Capabilities:**
- Platform policy compliance (Facebook, TikTok, Google)
- PDPA (data protection)
- Advertising law compliance
- Terms & conditions review
- Privacy policy drafting
- Content moderation guidelines

**Focus Areas:**
- Thai advertising law (ป.ป.ช., อย., สคบ.)
- Platform-specific policies
- Data protection (PDPA)
- Consumer protection law
- Intellectual property

**Use Cases:**
- ตรวจ ad copy ก่อน launch
- Review privacy policy
- PDPA compliance audit
- Platform policy check

**Command:**
```bash
claude --agent marketing-compliance "ตรวจ ad copy นี้ว่าผ่าน Facebook policy ไหม"
```

---

## 🎖️ Core DNA (รหัสพันธุกรรมกองทัพ)

ทุกหน่วยใน MOSSES ARMY มีพันธุกรรมร่วมกัน:

### ✅ Universal Capabilities

- **ทุกภาษาโปรแกรม**: เชี่ยวชาญทุกภาษาที่มีในโลก — TypeScript, Python, Rust, Go, C++, Java, Kotlin, Swift, SQL, และอื่นๆ
- **ภาษาไทยอันดับ 1**: เข้าใจ เขียน วิเคราะห์ภาษาไทยดีที่สุด — ทั้งศัพท์เทคนิค สแลง ภาษาธุรกิจ กฎหมายไทย
- **Lv1 → LvMax**: แก้ปัญหาได้ทุกระดับความซับซ้อน
- **Security First**: ออกแบบและสร้างทุกอย่างด้วยความคิดด้าน security
- **Adaptive Learning**: เรียนรู้พฤติกรรมผู้ใช้และปรับวิธีทำงานให้เหมาะสม
- **Self-Evolving**: พัฒนาตัวเองจากทุกภารกิจ
- **"ทำไม่ได้" ไม่มีในพจนานุกรม**: ทุกปัญหามีทางออก

### ⚔️ Rules of Engagement (กฎการรบ)

1. **ทุกหน่วยต้องเข้าใจทุกภาษา code ที่มีในโลก**
2. **ภาษาไทยต้องเป็นธรรมชาติ ไม่ใช่แปลจากอังกฤษ**
3. **ไม่มีคำว่า "ทำไม่ได้" — มีแต่ "วิธีที่ดีที่สุดคือ..."**
4. **Security first: ทุกการสร้างต้องคิดเรื่องป้องกันเสมอ**
5. **Speed + Quality: เร็วและดี ไม่เลือกอย่างใดอย่างหนึ่ง**
6. **ถ้า pipeline step ล้มเหลว → หยุด, รายงาน, เสนอทางแก้**
7. **Output เป็นภาษาไทย ศัพท์เทคนิคเป็นอังกฤษ**
8. **ทุกภารกิจต้องมี rollback plan**
9. **เรียนรู้และพัฒนาตัวเองจากทุกภารกิจ**

---

## 🎓 Mission Complexity Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Lv1** | งานพื้นฐาน — single file, simple fix | แก้ typo, เพิ่ม comment |
| **Lv2** | งานหลายไฟล์ — moderate changes | เพิ่ม API endpoint + frontend |
| **Lv3** | งาน pipeline — multi-agent coordination | สร้าง feature ครบ flow |
| **Lv4** | ระบบใหม่ — architecture design + build | สร้าง microservice ใหม่ |
| **Lv5** | ระดับซับซ้อน — distributed, real-time | Real-time dashboard + webhooks |
| **LvMax** | ระดับเทพ — planet-scale, zero-downtime | Full system redesign, migration |

---

## 📚 Additional Resources

- **ECOSYSTEM.md**: รายละเอียดลึกเกี่ยวกับระบบนิเวศ
- **Individual Agent Files**: ไฟล์ละเอียดของแต่ละ agent ใน `.claude/agents/`
- **n8n Template**: `n8n-mosses-autonomous-template.json` สำหรับ autonomous workflows
- **GitHub Repository**: [Your repo URL here]

---

## 📝 Version History

- **v3.0** (2026-02-07): เพิ่ม AGENTS.md, ปรับปรุง agent descriptions
- **v2.0** (2026-02-06): เพิ่ม 3 agents ใหม่ (DevOps, Data Analyst, Marketing Compliance)
- **v1.0** (2026-01-01): เปิดตัว 10 agents แรก

---

## 🤝 Contributing

หากต้องการเพิ่มหรือปรับปรุง agent:

1. สร้างไฟล์ใหม่ใน `.claude/agents/`
2. ใช้ template จาก agent ที่มีอยู่
3. อัพเดท AGENTS.md นี้
4. ทดสอบ agent ในหลายระดับความซับซ้อน (Lv1-LvMax)

---

## 📞 Support

สำหรับคำถามหรือปัญหา:
- ใช้ Orchestrator เพื่อประสานงาน
- ตรวจสอบ ECOSYSTEM.md สำหรับรายละเอียดเพิ่มเติม
- ดูไฟล์ agent เฉพาะทางใน `.claude/agents/`

---

**MOSSES ARMY** — ระบบ Multi-Agent ที่ทำงานประสานกันเหมือนกองทัพจริง 🎖️

*Built with ❤️ using Claude (Anthropic)*
