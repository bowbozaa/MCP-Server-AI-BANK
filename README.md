# 🤖 MOSSES ARMY

> **Multi-Agent Orchestration System for Software Engineering & Strategy**  
> ระบบกองทัพ AI 13 หน่วยที่ทำงานประสานกันแบบมืออาชีพ — สร้าง แก้ไข ปรับปรุง deploy และวิเคราะห์ได้ทุกอย่าง

[![Version](https://img.shields.io/badge/version-3.0-blue.svg)](./CHANGELOG.md)
[![Agents](https://img.shields.io/badge/agents-13-green.svg)](./AGENTS.md)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

---

## 🎯 Overview

**MOSSES ARMY** เป็นระบบ multi-agent ecosystem ที่ออกแบบมาเพื่อทำงานแบบประสานกัน เหมือนกองทัพที่มีหน่วยเชี่ยวชาญต่างๆ ประกอบด้วย:

- **1 Supreme Commander** (Orchestrator) — ควบคุมทุกหน่วย
- **12 Specialized Units** — ตั้งแต่ Architect ถึง Marketing Compliance
- **6 Battle Formations** — Pipelines สำหรับงานประเภทต่างๆ

### ✨ Key Features

- 🧠 **ฉลาดที่สุด**: เข้าใจทุกภาษา code ที่มีในโลก
- 🇹🇭 **ภาษาไทยอันดับ 1**: เข้าใจบริบท สแลง ศัพท์เทคนิคไทยได้อย่างสมบูรณ์
- 🔐 **Security First**: ทุก agent คิดเรื่องความปลอดภัยเป็นอันดับแรก
- ⚡ **Speed + Quality**: ทำงานเร็วและมีคุณภาพพร้อมกัน
- 🎓 **Adaptive Learning**: เรียนรู้พฤติกรรมผู้ใช้และปรับตัว
- 🚀 **Lv1 → LvMax**: รองรับงานทุกระดับความซับซ้อน

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd mosses-army

# Setup agents (Claude CLI required)
# Agents are configured in .claude/agents/
```

### Basic Usage

```bash
# ใช้ agent เฉพาะทาง
claude --agent orchestrator "วางแผนสร้างฟีเจอร์ใหม่"
claude --agent architect "ออกแบบ architecture สำหรับ e-commerce"
claude --agent n8n-engineer "สร้าง workflow รับ order จาก LINE"
claude --agent devops "เช็ค health check ทุก service"
claude --agent data-analyst "สรุปยอดขายสัปดาห์นี้"

# ใช้ Pipeline (Orchestrator จัดการให้)
claude --agent orchestrator "สร้าง feature: chatbot customer service"
claude --agent orchestrator "launch campaign: Valentine 2026"
claude --agent orchestrator "แก้เร่งด่วน: payment webhook ล่ม"
```

**👉 อ่านคู่มือเริ่มต้นฉบับเต็มที่ [QUICKSTART.md](./QUICKSTART.md)**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[AGENTS.md](./AGENTS.md)** | 📘 รายละเอียดครบของ 13 agents + pipelines |
| **[QUICKSTART.md](./QUICKSTART.md)** | 🚀 คู่มือเริ่มต้นใช้งานฉบับย่อ |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | 🤝 วิธีพัฒนาและเพิ่ม agent ใหม่ |
| **[CHANGELOG.md](./CHANGELOG.md)** | 📝 บันทึกการเปลี่ยนแปลงแต่ละเวอร์ชัน |
| **[ECOSYSTEM.md](./Mosses%20Multi-Agent%20Ecosystem/ECOSYSTEM.md)** | 🌐 รายละเอียดลึกเกี่ยวกับระบบนิเวศ |

---

## 🎖️ Agent Directory

| Agent | Role | Use Case | Model |
|-------|------|----------|-------|
| **Orchestrator** | จอมทัพ — Supreme Commander | วางแผนและประสานงานทุกหน่วย | Opus |
| **Architect** | นายพลยุทธศาสตร์ | ออกแบบ architecture, tech stack | Opus |
| **n8n Engineer** | หน่วยสงครามอัตโนมัติ | สร้าง automation workflows | Sonnet |
| **Frontend Dev** | หน่วยจู่โจมส่วนหน้า | สร้าง UI/UX, web apps | Sonnet |
| **Code Reviewer** | หน่วยข่าวกรอง | Review code, security audit | Sonnet |
| **Debugger** | หน่วยปฏิบัติการพิเศษ | หา bug, root cause analysis | Sonnet |
| **Deployer** | หน่วยส่งกำลังรบ | Deploy, release management | Sonnet |
| **Content Strategist** | หน่วยปฏิบัติการจิตวิทยา | Content planning, copywriting | Sonnet |
| **SEO Optimizer** | หน่วยเรดาร์ | SEO/AIO optimization | Sonnet |
| **Data Engineer** | กองพลวิศวกรรม | Database design, data pipeline | Sonnet |
| **DevOps** | หน่วยป้อมปราการ | Infrastructure, CI/CD, monitoring | Sonnet |
| **Data Analyst** | ศูนย์วิเคราะห์ข่าวกรอง | Analytics, reports, KPIs | Sonnet |
| **Marketing Compliance** | หน่วยตำรวจทหาร | Policy check, legal compliance | Sonnet |

**👉 ดูรายละเอียดครบที่ [AGENTS.md](./AGENTS.md)**

---

## 🔗 Pipelines (Battle Formations)

### Formation ALPHA: Feature Development
```
Architect → [n8n Engineer + Frontend Dev] → Code Reviewer → DevOps → Data Analyst
```

### Formation BRAVO: Content & Campaign
```
Content Strategist → Marketing Compliance → SEO Optimizer → DevOps → Data Analyst
```

### Formation CHARLIE: Incident Response
```
Data Analyst → Debugger → Code Reviewer → DevOps → Data Analyst
```

### Formation DELTA: Product Launch
```
Full pipeline: Design → Build → QA → Legal → Marketing → Deploy → Track
```

### Formation ECHO: Monthly Review
```
Data Analyst → Content → Compliance → DevOps → Orchestrator
```

### Formation FOXTROT: Security Audit
```
Debugger → Code Reviewer → DevOps → Architect → Orchestrator
```

---

## 🏗️ Tech Stack

MOSSES ARMY ใช้เทคโนโลยีเหล่านี้:

- **Edge**: Cloudflare Workers (Flybridge)
- **Frontend**: Vercel, Next.js, SvelteKit
- **Backend**: Cloudflare Workers, Supabase
- **Database**: Supabase Postgres 17.x, D1, KV
- **Storage**: R2, Supabase Storage
- **Automation**: n8n Cloud
- **AI**: Claude API (Anthropic)
- **Messaging**: LINE OA, Telegram
- **CI/CD**: GitHub Actions, Wrangler

---

## 📦 Project Structure

```
mosses-army/
├── README.md                    # This file
├── AGENTS.md                    # Complete agent documentation
├── QUICKSTART.md                # Quick start guide
├── CONTRIBUTING.md              # Contribution guidelines
├── CHANGELOG.md                 # Version history
├── .claude/
│   └── agents/                  # Agent configuration files
│       ├── orchestrator.md
│       ├── architect.md
│       └── ... (11 more agents)
├── Mosses Multi-Agent Ecosystem/
│   ├── ECOSYSTEM.md             # Detailed ecosystem guide
│   └── ... (additional resources)
└── github-bridge-worker/        # Cloudflare Worker integration
```

---

## 🎓 Mission Complexity Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Lv1** | งานพื้นฐาน | แก้ typo, เพิ่ม comment |
| **Lv2** | งานหลายไฟล์ | เพิ่ม API endpoint + frontend |
| **Lv3** | งาน pipeline | สร้าง feature ครบ flow |
| **Lv4** | ระบบใหม่ | สร้าง microservice ใหม่ |
| **Lv5** | ระดับซับซ้อน | Real-time dashboard + webhooks |
| **LvMax** | ระดับเทพ | Full system redesign, planet-scale |

---

## 🤝 Contributing

เรายินดีรับการพัฒนาจากทุกคน! อ่านคู่มือที่ [CONTRIBUTING.md](./CONTRIBUTING.md)

### Quick Contribution Steps

1. Fork repository
2. สร้าง branch ใหม่ (`git checkout -b feature/new-agent`)
3. Commit changes (`git commit -m 'Add new agent'`)
4. Push to branch (`git push origin feature/new-agent`)
5. สร้าง Pull Request

---

## 📝 Version History

- **v3.0** (2026-02-07): เพิ่ม AGENTS.md, ปรับปรุง documentation
- **v2.0** (2026-02-06): เพิ่ม 3 agents (DevOps, Data Analyst, Marketing Compliance)
- **v1.0** (2026-01-01): เปิดตัว 10 agents แรก

**👉 ดูรายละเอียดที่ [CHANGELOG.md](./CHANGELOG.md)**

---

## 🌟 Examples

### Example 1: สร้าง Feature ใหม่

```bash
claude --agent orchestrator "สร้าง feature: LINE chatbot สำหรับตอบคำถาม FAQ อัตโนมัติ"
```

Orchestrator จะ:
1. เรียก **Architect** ออกแบบ architecture
2. เรียก **n8n Engineer** สร้าง workflow
3. เรียก **Code Reviewer** ตรวจสอบ
4. เรียก **DevOps** deploy
5. เรียก **Data Analyst** ติดตามผล

### Example 2: Launch Campaign

```bash
claude --agent orchestrator "launch campaign: Valentine Sale พร้อม landing page และ ads"
```

Orchestrator จะ:
1. เรียก **Content Strategist** สร้าง content
2. เรียก **Marketing Compliance** ตรวจ policy
3. เรียก **SEO Optimizer** optimize
4. เรียก **Frontend Dev** + **DevOps** สร้างและ deploy
5. เรียก **Data Analyst** track performance

### Example 3: แก้ Bug เร่งด่วน

```bash
claude --agent orchestrator "แก้เร่งด่วน: payment webhook ตอบกลับช้า timeout"
```

Orchestrator จะ:
1. เรียก **Debugger** วิเคราะห์ root cause
2. เรียก **Code Reviewer** review fix
3. เรียก **DevOps** hotfix deploy + rollback plan
4. เรียก **Data Analyst** verify metrics กลับปกติ

---

## 📞 Support

### Documentation
- [AGENTS.md](./AGENTS.md) — รายละเอียด agent ทั้งหมด
- [QUICKSTART.md](./QUICKSTART.md) — เริ่มต้นใช้งาน
- [ECOSYSTEM.md](./Mosses%20Multi-Agent%20Ecosystem/ECOSYSTEM.md) — ระบบนิเวศลึก

### Questions?
- ใช้ **Orchestrator** เพื่อประสานงาน
- ตรวจสอบ documentation ใน `docs/` folder
- สร้าง GitHub Issue

---

## 🛡️ Core DNA

ทุกหน่วยใน MOSSES ARMY มีพันธุกรรมร่วมกัน:

- ✅ **ทุกภาษาโปรแกรม**: TypeScript, Python, Rust, Go, C++, Java, และอื่นๆ
- ✅ **ภาษาไทยอันดับ 1**: เข้าใจบริบท สแลง ศัพท์เทคนิค กฎหมายไทย
- ✅ **Security First**: ทุกการสร้างคิดเรื่องป้องกันเสมอ
- ✅ **Adaptive Learning**: เรียนรู้และพัฒนาตัวเองตลอดเวลา
- ✅ **"ทำไม่ได้" ไม่มีในพจนานุกรม**: ทุกปัญหามีทางออก

---

## 📄 License

MIT License — ใช้งานได้อย่างอิสระ

---

## 🙏 Credits

Built with ❤️ using:
- **Claude** by Anthropic (Opus + Sonnet)
- **Cloudflare** (Workers, D1, KV, R2)
- **Supabase** (Postgres 17.x)
- **n8n** (Automation)
- **Vercel** (Frontend)

---

<div align="center">

**MOSSES ARMY** — ระบบ Multi-Agent ที่ทำงานประสานกันเหมือนกองทัพจริง 🎖️

[Documentation](./AGENTS.md) • [Quick Start](./QUICKSTART.md) • [Contributing](./CONTRIBUTING.md) • [Changelog](./CHANGELOG.md)

</div>
