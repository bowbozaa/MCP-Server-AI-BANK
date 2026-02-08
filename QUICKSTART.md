# 🚀 MOSSES ARMY — Quick Start Guide

เริ่มต้นใช้งาน MOSSES ARMY ได้ใน 5 นาที!

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [First Commands](#-first-commands)
- [Common Use Cases](#-common-use-cases)
- [Choosing the Right Agent](#-choosing-the-right-agent)
- [Pipeline Usage](#-pipeline-usage)
- [Tips & Best Practices](#-tips--best-practices)
- [Troubleshooting](#-troubleshooting)
- [Next Steps](#-next-steps)

---

## ✅ Prerequisites

ก่อนเริ่มต้น ตรวจสอบว่าคุณมี:

- **Claude CLI** ติดตั้งแล้ว ([Installation Guide](https://claude.ai))
- **Git** สำหรับ version control
- **Node.js** (ถ้าใช้งาน n8n Engineer หรือ Frontend Dev)
- **Access** ไปยัง Cloudflare, Supabase (ถ้าต้องการ deploy)

---

## 📦 Installation

### Step 1: Clone Repository

```bash
git clone <your-repo-url>
cd mosses-army
```

### Step 2: Verify Agents

```bash
# ตรวจสอบ agent ที่มี
ls .claude/agents/

# Output ควรแสดง:
# orchestrator.md, architect.md, n8n-engineer.md, ... (13 files)
```

### Step 3: Test Connection

```bash
# ทดสอบ agent ใดก็ได้
claude --agent orchestrator "สวัสดี"
```

✅ **Done!** ถ้าได้คำตอบ แสดงว่าพร้อมใช้งาน

---

## 🎯 First Commands

### 1. ทดสอบ Orchestrator (จอมทัพ)

```bash
claude --agent orchestrator "แนะนำตัวเอง"
```

**Output:** Orchestrator จะแนะนำตัวและบอกความสามารถ

### 2. ถาม Architect (สถาปนิก)

```bash
claude --agent architect "แนะนำ tech stack สำหรับ e-commerce site"
```

**Output:** Architect จะแนะนำ architecture พร้อมเหตุผล

### 3. ถาม Data Analyst (นักวิเคราะห์)

```bash
claude --agent data-analyst "KPI ไหนบ้างที่สำคัญสำหรับ e-commerce"
```

**Output:** Data Analyst จะแนะนำ metrics ที่ควรติดตาม

---

## 💡 Common Use Cases

### Use Case 1: สร้าง Feature ใหม่

```bash
claude --agent orchestrator "สร้าง feature: LINE chatbot สำหรับ customer service"
```

**สิ่งที่เกิดขึ้น:**
1. Orchestrator วิเคราะห์งาน
2. เรียก Architect ออกแบบ
3. เรียก n8n Engineer สร้าง workflow
4. เรียก Code Reviewer ตรวจสอบ
5. เรียก DevOps deploy
6. เรียก Data Analyst ติดตามผล

### Use Case 2: แก้ Bug

```bash
claude --agent debugger "แก้บัค: LINE webhook ตอบกลับช้า timeout"
```

**สิ่งที่เกิดขึ้น:**
1. Debugger วิเคราะห์ root cause
2. เสนอวิธีแก้พร้อมอธิบาย
3. แนะนำวิธีป้องกันซ้ำ

### Use Case 3: Deploy

```bash
claude --agent devops "deploy staging → production พร้อม health check"
```

**สิ่งที่เกิดขึ้น:**
1. DevOps ตรวจสอบ staging
2. Deploy ไป production
3. Run health check
4. ส่ง alert ไป LINE (ถ้าตั้งค่าไว้)
5. บอก rollback plan

### Use Case 4: วิเคราะห์ข้อมูล

```bash
claude --agent data-analyst "สรุปยอดขายสัปดาห์นี้ เปรียบเทียบสัปดาห์ก่อน"
```

**สิ่งที่เกิดขึ้น:**
1. Data Analyst query database
2. คำนวณ metrics (revenue, AOV, orders)
3. เปรียบเทียบ WoW
4. หา anomaly
5. ให้ recommendation

### Use Case 5: สร้าง Content

```bash
claude --agent content-strategist "เขียน ad copy สำหรับ Valentine campaign"
```

**สิ่งที่เกิดขึ้น:**
1. Content Strategist สร้าง copy หลายแบบ
2. แนะนำ CTA
3. แนะนำ visual direction
4. ส่งต่อ Marketing Compliance ตรวจ (ถ้าใช้ pipeline)

---

## 🎯 Choosing the Right Agent

### งาน Architecture & Design
```bash
claude --agent architect "ออกแบบ..."
```

### งาน Automation & Workflow
```bash
claude --agent n8n-engineer "สร้าง workflow..."
```

### งาน UI/Frontend
```bash
claude --agent frontend-dev "สร้างหน้า..."
```

### งาน Review Code
```bash
claude --agent code-reviewer "review code ใน..."
```

### งาน Debug & Fix
```bash
claude --agent debugger "แก้บัค..."
```

### งาน Deploy
```bash
claude --agent deployer "deploy..."
```
หรือ
```bash
claude --agent devops "deploy พร้อม monitoring..."
```

### งาน Content & Marketing
```bash
claude --agent content-strategist "เขียน..."
```

### งาน SEO
```bash
claude --agent seo-optimizer "ปรับ SEO..."
```

### งาน Database
```bash
claude --agent data-engineer "ออกแบบ schema..."
```

### งาน Infrastructure
```bash
claude --agent devops "ตั้ง CI/CD..."
```

### งาน Analytics
```bash
claude --agent data-analyst "วิเคราะห์..."
```

### งาน Policy & Legal
```bash
claude --agent marketing-compliance "ตรวจ policy..."
```

### งานซับซ้อน / ไม่แน่ใจ
```bash
claude --agent orchestrator "วางแผน... [บอกปัญหาทั้งหมด]"
```
**Orchestrator จะวิเคราะห์และเรียก agent ที่เหมาะสมเอง**

---

## 🔗 Pipeline Usage (ผ่าน Orchestrator)

แทนที่จะเรียก agent ทีละตัว ใช้ **Orchestrator** วางแผนให้:

### Pipeline ALPHA: Feature Development

```bash
claude --agent orchestrator "สร้าง feature: [feature description]"
```

**Examples:**
```bash
claude --agent orchestrator "สร้าง feature: ระบบรับ order ผ่าน LINE"
claude --agent orchestrator "สร้าง feature: dashboard แสดง real-time sales"
claude --agent orchestrator "สร้าง feature: payment webhook สำหรับ PromptPay"
```

### Pipeline BRAVO: Content & Campaign

```bash
claude --agent orchestrator "launch campaign: [campaign name]"
```

**Examples:**
```bash
claude --agent orchestrator "launch campaign: Valentine Sale 2026"
claude --agent orchestrator "launch campaign: New Product - Smart Watch"
claude --agent orchestrator "สร้าง content calendar เดือนมีนาคม"
```

### Pipeline CHARLIE: Incident Response

```bash
claude --agent orchestrator "แก้เร่งด่วน: [problem description]"
```

**Examples:**
```bash
claude --agent orchestrator "แก้เร่งด่วน: webhook ล่มไม่รับ order"
claude --agent orchestrator "แก้เร่งด่วน: database query ช้ามาก"
claude --agent orchestrator "incident: site down error 503"
```

### Pipeline DELTA: Product Launch

```bash
claude --agent orchestrator "เปิดตัว product: [product name]"
```

**Examples:**
```bash
claude --agent orchestrator "เปิดตัว product: AI Chatbot Service"
claude --agent orchestrator "launch new service: Consultation Platform"
```

### Pipeline ECHO: Monthly Review

```bash
claude --agent orchestrator "สรุปประจำเดือน [month]"
```

**Examples:**
```bash
claude --agent orchestrator "สรุปประจำเดือนกุมภาพันธ์"
claude --agent orchestrator "monthly review February 2026"
```

### Pipeline FOXTROT: Security Audit

```bash
claude --agent orchestrator "ตรวจสอบ security [scope]"
```

**Examples:**
```bash
claude --agent orchestrator "ตรวจสอบ security ทั้งระบบ"
claude --agent orchestrator "security audit payment flow"
claude --agent orchestrator "penetration test API endpoints"
```

---

## 💎 Tips & Best Practices

### 1. เลือก Agent ที่เหมาะสม

- ✅ **งานเดียว** → ใช้ agent เฉพาะทาง
- ✅ **งานหลายขั้นตอน** → ใช้ Orchestrator
- ✅ **ไม่แน่ใจ** → ถาม Orchestrator

### 2. ให้ Context ที่ชัดเจน

❌ **ไม่ดี:**
```bash
claude --agent architect "ออกแบบระบบ"
```

✅ **ดี:**
```bash
claude --agent architect "ออกแบบ architecture สำหรับ e-commerce ที่รองรับ 10K concurrent users พร้อม real-time inventory"
```

### 3. ใช้ภาษาไทยได้เต็มที่

```bash
claude --agent n8n-engineer "สร้าง workflow รับ order จาก LINE แล้วบันทึกลง Supabase พร้อมส่ง notification กลับ"
```

Agents เข้าใจภาษาไทยอันดับ 1 ของโลก! 🇹🇭

### 4. ขอคำแนะนำ

```bash
claude --agent orchestrator "แนะนำวิธีทำ [สิ่งที่ต้องการ]"
```

### 5. ถามได้ทุกระดับความซับซ้อน

- **Lv1** (ง่าย): "แก้ typo ในไฟล์ X"
- **Lv3** (ปานกลาง): "สร้าง REST API พร้อม validation"
- **LvMax** (เทพ): "ออกแบบ distributed system ที่รองรับ 1M users"

---

## 🔧 Troubleshooting

### ปัญหา: Agent ไม่ตอบ

**แก้:**
```bash
# ตรวจสอบว่า agent file มีอยู่
ls .claude/agents/

# ตรวจสอบ syntax
claude --agent orchestrator "test"
```

### ปัญหา: Output ไม่เป็นภาษาไทย

**แก้:**
- Agents ถูกออกแบบให้ตอบภาษาไทยอัตโนมัติ
- ถ้ายังไม่เป็นภาษาไทย ลองถามใหม่เป็นภาษาไทย

### ปัญหา: ไม่แน่ใจจะใช้ agent ไหน

**แก้:**
```bash
claude --agent orchestrator "ช่วยแนะนำว่าควรใช้ agent ไหนสำหรับ [งานที่ต้องการ]"
```

### ปัญหา: งานซับซ้อนเกินไป agent เดียวไม่พอ

**แก้:**
```bash
# ใช้ Orchestrator ประสานงานหลาย agent
claude --agent orchestrator "วางแผนและทำงานนี้: [งานซับซ้อน]"
```

---

## 📚 Next Steps

### 1. อ่านเอกสารเพิ่มเติม

- **[AGENTS.md](./AGENTS.md)** — รายละเอียดครบของ 13 agents
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — วิธีพัฒนา agent ใหม่
- **[ECOSYSTEM.md](./Mosses%20Multi-Agent%20Ecosystem/ECOSYSTEM.md)** — ระบบนิเวศลึก

### 2. ทดลองใช้งาน

เริ่มจากงานจริงในโปรเจกต์ของคุณ:

```bash
# วิเคราะห์โปรเจกต์
claude --agent architect "วิเคราะห์ architecture ของโปรเจกต์นี้"

# สร้าง feature ใหม่
claude --agent orchestrator "สร้าง feature: [ฟีเจอร์ที่ต้องการ]"

# วิเคราะห์ data
claude --agent data-analyst "วิเคราะห์ข้อมูลใน [database/file]"
```

### 3. Customize Agents

อ่านวิธีปรับแต่ง agent ที่ [CONTRIBUTING.md](./CONTRIBUTING.md)

### 4. Join Community

- สร้าง GitHub Issue ถ้ามีคำถาม
- แชร์ use case ที่ประสบความสำเร็จ
- Contribute agent ใหม่

---

## 🎓 Learning Path

### Week 1: เรียนรู้พื้นฐาน
- ใช้ Orchestrator ถาม-ตอบ
- ทดลอง 3-4 agents ที่ชอบ
- อ่าน AGENTS.md ทั้งหมด

### Week 2: ใช้งานจริง
- ใช้แก้งานจริงในโปรเจกต์
- ทดลองใช้ pipelines
- เรียนรู้ best practices

### Week 3: Advanced
- ใช้หลาย agents ร่วมกัน
- Customize agent config
- สร้าง workflow ซับซ้อน

### Week 4: Master
- สร้าง agent ใหม่ (ถ้าต้องการ)
- Contribute กลับ community
- สอนคนอื่นใช้

---

## 📞 Need Help?

### Quick Help
```bash
# ถาม Orchestrator ได้เลย!
claude --agent orchestrator "ฉันต้องการ [สิ่งที่ต้องการ] แต่ไม่รู้จะเริ่มยังไง"
```

### Documentation
- [AGENTS.md](./AGENTS.md) — Agent details
- [README.md](./README.md) — Overview
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Development guide

### Community
- GitHub Issues
- Pull Requests
- Discussions

---

## ✨ Examples Gallery

### Example 1: สร้าง Chatbot

```bash
claude --agent orchestrator "สร้าง LINE chatbot ที่ตอบคำถาม FAQ อัตโนมัติ"
```

**Result:** Architect + n8n Engineer + DevOps ทำงานร่วมกัน สร้าง workflow ครบพร้อม deploy

### Example 2: วิเคราะห์ Performance

```bash
claude --agent data-analyst "วิเคราะห์ performance ของ ads แต่ละ channel"
```

**Result:** สรุป metrics, แนะนำ channel ที่ ROI ดี, เสนอการ optimize

### Example 3: Security Audit

```bash
claude --agent orchestrator "ตรวจสอบ security ของ API endpoints ทั้งหมด"
```

**Result:** Debugger + Code Reviewer + DevOps ตรวจสอบ vulnerability พร้อมแนะนำวิธีแก้

### Example 4: Launch Campaign

```bash
claude --agent orchestrator "launch campaign Valentine 2026 ครบวงจร"
```

**Result:** Content + Compliance + SEO + Frontend + DevOps + Analyst ทำงานร่วมกัน จาก ideation ถึง tracking

---

**🎖️ Ready to Command MOSSES ARMY!**

เริ่มต้นได้เลย — Orchestrator พร้อมรับคำสั่ง!

```bash
claude --agent orchestrator "เริ่มภารกิจแรก: [งานที่ต้องการ]"
```

---

[← Back to README](./README.md) | [View All Agents →](./AGENTS.md)
