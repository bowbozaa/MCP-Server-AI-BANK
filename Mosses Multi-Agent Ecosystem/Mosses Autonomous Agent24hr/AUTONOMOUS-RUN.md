# 🤖 Mosses Autonomous Agent System
## สั่งครั้งเดียว — รันเอง 24 ชม.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    n8n (Always Running)                  │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ Schedule  │───▶│ Orchestrator │───▶│ Task Router  │  │
│  │ Trigger   │    │   (Claude)   │    │   (Switch)   │  │
│  │ ทุก 6 ชม. │    │              │    │              │  │
│  └──────────┘    └──────────────┘    └──────┬───────┘  │
│                                             │          │
│         ┌───────────┬───────────┬───────────┤          │
│         ▼           ▼           ▼           ▼          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Content  │ │ Health   │ │Analytics │ │Compliance│  │
│  │ Pipeline │ │ Check    │ │ Report   │ │ Audit    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       │             │            │             │        │
│       └─────────────┴────────────┴─────────────┘        │
│                          │                              │
│                    ┌─────▼─────┐                        │
│                    │  Log to   │                        │
│                    │ Supabase  │                        │
│                    └─────┬─────┘                        │
│                          │                              │
│                    ┌─────▼─────┐                        │
│                    │  LINE     │                        │
│                    │  Notify   │                        │
│                    └───────────┘                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🗓️ Schedule Design (แนะนำ)

| รอบ | เวลา | งานหลัก | Agent ที่ใช้ |
|-----|------|---------|-------------|
| 🌅 เช้า | 06:00 | Health check + Daily plan | DevOps, Orchestrator |
| 📝 สาย | 09:00 | สร้าง Content + ตรวจ Compliance | Content Strategist, Compliance |
| 📊 บ่าย | 14:00 | Analytics report + Optimization | Data Analyst, SEO |
| 🔧 เย็น | 18:00 | System maintenance + Backup | DevOps, Data Engineer |
| 📈 ดึก | 22:00 | Performance summary + Next day plan | Data Analyst, Orchestrator |

---

## 🔧 Setup Guide (ทำครั้งเดียว)

### Step 1: เตรียม Credentials ใน n8n

```
n8n Credentials ที่ต้องมี:
├── Anthropic API (Claude) → สำหรับ Orchestrator brain
├── Supabase API → สำหรับ log & data
├── LINE Messaging API → สำหรับ notify
├── (Optional) OpenAI API → สำหรับ content generation
├── (Optional) Google Sheets → สำหรับ reporting
└── (Optional) Facebook/TikTok API → สำหรับ social media
```

### Step 2: สร้าง Supabase Tables สำหรับ Log

```sql
-- Table: agent_runs (เก็บ log ทุกรอบที่รัน)
CREATE TABLE agent_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id TEXT NOT NULL,
  schedule_round TEXT NOT NULL,        -- 'morning', 'content', 'analytics', 'maintenance', 'summary'
  agent_name TEXT NOT NULL,            -- 'orchestrator', 'devops', 'content-strategist', etc.
  task_type TEXT NOT NULL,             -- 'health_check', 'content_create', 'report', etc.
  input_summary TEXT,                  -- สรุป input ที่ส่งให้ agent
  output_summary TEXT,                 -- สรุป output ที่ได้
  status TEXT DEFAULT 'running',       -- 'running', 'success', 'failed', 'skipped'
  error_message TEXT,
  tokens_used INTEGER DEFAULT 0,
  execution_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Table: agent_tasks (task queue สำหรับ agent)
CREATE TABLE agent_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_description TEXT NOT NULL,
  assigned_agent TEXT,
  priority TEXT DEFAULT 'normal',      -- 'critical', 'high', 'normal', 'low'
  status TEXT DEFAULT 'pending',       -- 'pending', 'in_progress', 'done', 'failed'
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by TEXT DEFAULT 'orchestrator'
);

-- Table: daily_reports (สรุปรายวัน)
CREATE TABLE daily_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_date DATE DEFAULT CURRENT_DATE,
  report_type TEXT NOT NULL,           -- 'health', 'content', 'analytics', 'summary'
  content JSONB NOT NULL,
  highlights TEXT[],
  alerts TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_agent_runs_created ON agent_runs(created_at DESC);
CREATE INDEX idx_agent_runs_status ON agent_runs(status);
CREATE INDEX idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX idx_daily_reports_date ON daily_reports(report_date DESC);

-- RLS (Row Level Security)
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
```

### Step 3: Import n8n Workflow

Import ไฟล์ `n8n-mosses-autonomous.json` เข้า n8n แล้ว:
1. ใส่ Credentials (Anthropic, Supabase, LINE)
2. ปรับ Schedule ตามต้องการ
3. กด **Activate** → ระบบรันเองตลอด

---

## 📋 Workflow Design (แต่ละรอบ)

### รอบ 1: 🌅 Morning Health Check (06:00)

```
[Schedule 06:00]
  ↓
[Claude Orchestrator] → System prompt:
  "คุณคือ DevOps Agent ของ Mosses
   ตรวจสอบสถานะทุก service และรายงาน"
  ↓
[HTTP Request: Health Checks]
  ├── Cloudflare Workers → GET /health
  ├── Supabase → SELECT 1
  ├── n8n → GET /healthz
  └── Vercel → GET /api/health
  ↓
[Claude: Analyze Results]
  "วิเคราะห์ผล health check:
   - Service ไหน UP/DOWN
   - Response time ปกติไหม
   - มีอะไรต้องแก้ไขด่วนไหม
   - วางแผนงานวันนี้"
  ↓
[Supabase: Log Results]
  ↓
[LINE: ส่งสรุปเช้า]
  "🌅 Morning Report
   ✅ Workers: OK (120ms)
   ✅ Supabase: OK (45ms)
   ✅ n8n: OK
   ⚠️ Vercel: Slow (2.1s)
   📋 แผนวันนี้: [auto-generated]"
```

### รอบ 2: 📝 Content Production (09:00)

```
[Schedule 09:00]
  ↓
[Claude: Content Strategist]
  "คุณคือ Content Strategist ของ Mosses
   วันนี้วัน [day_of_week]
   ดูจาก content calendar แล้ว:
   1. สร้าง content brief สำหรับวันนี้
   2. เขียน hook + caption สำหรับแต่ละ platform
   3. แนะนำ best time to post"
  ↓
[Claude: Marketing Compliance]
  "ตรวจสอบ content ที่สร้าง:
   - เช็ค policy TikTok/FB/IG
   - เช็คกฎหมายไทย (อย., PDPA)
   - แนะนำแก้ไขถ้ามีปัญหา"
  ↓
[IF: Approved?]
  ├── YES → [Store Content → Supabase]
  │         → [LINE: "📝 Content พร้อม publish"]
  └── NO  → [LINE: "⚠️ Content ต้องแก้ไข: [reasons]"]
```

### รอบ 3: 📊 Analytics (14:00)

```
[Schedule 14:00]
  ↓
[Supabase: Query Data]
  ├── SELECT orders today
  ├── SELECT content performance
  └── SELECT ad metrics
  ↓
[Claude: Data Analyst]
  "คุณคือ Data Analyst ของ Mosses
   วิเคราะห์ข้อมูลวันนี้:
   1. ยอดขายเทียบเมื่อวาน
   2. Content ไหน perform ดี/ไม่ดี
   3. Ad ROAS เป็นยังไง
   4. มี anomaly อะไรไหม
   5. แนะนำ action items"
  ↓
[Supabase: Save Report]
  ↓
[LINE: ส่งสรุปบ่าย]
  "📊 Afternoon Analytics
   💰 Revenue: ฿12,500 (+15% vs yesterday)
   📦 Orders: 23 (+3)
   🎯 Top Product: [name]
   📱 Best Content: [title] (5.2K views)
   ⚡ Action: [recommendation]"
```

### รอบ 4: 🔧 Maintenance (18:00)

```
[Schedule 18:00]
  ↓
[Claude: DevOps]
  "ตรวจสอบ infrastructure:
   1. Database size & performance
   2. Error logs วันนี้
   3. API rate limit usage
   4. Storage usage (R2, Supabase)
   5. ทำ cleanup ถ้าจำเป็น"
  ↓
[Execute Sub-workflows]
  ├── Backup workflow (ถ้าถึงเวลา)
  ├── Clean old logs (> 30 days)
  └── Check SSL certificates
  ↓
[Supabase: Log Maintenance]
  ↓
[LINE: แจ้งผลซ่อมบำรุง (ถ้ามีปัญหา)]
```

### รอบ 5: 📈 Daily Summary (22:00)

```
[Schedule 22:00]
  ↓
[Supabase: Get All Today's Data]
  ├── agent_runs (ทุกรอบวันนี้)
  ├── daily_reports (ทุก report)
  └── agent_tasks (completed tasks)
  ↓
[Claude: Orchestrator]
  "สรุปทุกอย่างที่เกิดขึ้นวันนี้:
   1. Health status ตลอดวัน
   2. Content ที่สร้าง/publish
   3. ยอดขายรวม
   4. ปัญหาที่เจอ + วิธีแก้
   5. วางแผนพรุ่งนี้
   6. ให้คะแนนวันนี้ (1-10)"
  ↓
[Supabase: Save Daily Summary]
  ↓
[LINE: ส่งสรุปวัน]
  "📈 Daily Summary — [DATE]
   
   🏥 System Health: 99.8% uptime
   📝 Content: 3 pieces created, 2 published
   💰 Revenue: ฿28,700 (+12% vs yesterday)
   🔧 Issues: 1 minor (fixed)
   📊 Score: 8/10
   
   📋 Tomorrow's Plan:
   - สร้าง TikTok content ธีม [X]
   - ปรับ ad budget [campaign]
   - Deploy feature [Y]
   
   💤 Good night, Mosses!"
```

---

## 🧠 Orchestrator Prompt (Core Brain)

```
คุณคือ Mosses Autonomous Orchestrator

คุณรันอัตโนมัติทุก 6 ชั่วโมง ทำหน้าที่:
1. ตรวจสอบสถานะระบบทั้งหมด
2. ดำเนินงานตาม schedule ของรอบนั้น
3. วิเคราะห์ข้อมูลและตัดสินใจ
4. รายงานผลให้ Mosses ผ่าน LINE

Agent ที่คุณเรียกใช้ได้:
- DevOps: health check, deploy, backup
- Content Strategist: สร้าง content, วางแผน
- Marketing Compliance: ตรวจ policy
- Data Analyst: วิเคราะห์ข้อมูล
- SEO Optimizer: ปรับ SEO

กฎสำคัญ:
- ถ้าเจอปัญหา CRITICAL → แจ้ง LINE ทันที ไม่ต้องรอรอบ
- ถ้างานปกติ → ทำตาม schedule
- ถ้ามี task ค้างจากรอบก่อน → ทำต่อก่อน
- บันทึกทุกอย่างลง Supabase
- ใช้ภาษาไทย ย่อ กระชับ
```

---

## 🔔 LINE Notification Templates

```
# Critical Alert (ส่งทันที)
🚨 CRITICAL ALERT
Service: [name]
Issue: [description]
Impact: [what's affected]
Action: [what orchestrator is doing]
Mosses ต้องทำ: [if manual action needed]

# Daily Summary (22:00)
📈 สรุปวัน [DATE]
🏥 Health: [status]
📝 Content: [count] ชิ้น
💰 Revenue: ฿[amount] ([%] vs yesterday)
🔧 Issues: [count]
📊 Score: [X]/10
📋 พรุ่งนี้: [plan]

# Content Ready (09:00)
📝 Content พร้อม!
Platform: [TikTok/FB/IG]
Hook: "[first line]"
Status: ✅ Compliance ผ่าน
Action: [publish now / schedule at X]
```

---

## ⚡ Quick Start (3 Steps)

### 1. สร้าง Tables ใน Supabase
→ Copy SQL จาก Step 2 ด้านบน ไปรันใน Supabase SQL Editor

### 2. Import Workflow ใน n8n
→ Import `n8n-mosses-autonomous.json`
→ ใส่ Credentials: Anthropic, Supabase, LINE

### 3. Activate!
→ กด toggle **Active** ใน n8n
→ ระบบเริ่มรันเอง ตาม schedule
→ Mosses นั่งดู LINE notification 🎉

---

## 🎛️ Configuration Options

```yaml
# ปรับใน n8n workflow
schedule:
  morning_health: "0 6 * * *"      # ทุกวัน 06:00
  content_production: "0 9 * * *"   # ทุกวัน 09:00
  analytics: "0 14 * * *"           # ทุกวัน 14:00
  maintenance: "0 18 * * *"         # ทุกวัน 18:00
  daily_summary: "0 22 * * *"       # ทุกวัน 22:00

# ปรับ model
ai_model: "claude-sonnet-4-5-20250929"  # ประหยัด cost
# ai_model: "claude-opus-4-5-20250929"  # ฉลาดกว่า แต่แพงกว่า

# LINE notification level
notify_level: "all"        # ทุกรอบ
# notify_level: "important"  # เฉพาะ critical + daily summary
# notify_level: "critical"   # เฉพาะ critical alert
```

---

## 💰 Estimated Cost (ต่อวัน)

| Item | Usage | Est. Cost |
|------|-------|-----------|
| Claude API (Sonnet) | ~5 calls × 4K tokens | ~$0.15/day |
| Claude API (Opus) | ~1 call × 8K tokens | ~$0.40/day |
| Supabase | Free tier | $0 |
| n8n Cloud | Starter plan | ~$0.67/day |
| LINE API | Free tier | $0 |
| **Total** | | **~$1.22/day (~฿42/วัน)** |

---

## 🚀 Upgrade Path

```
Phase 1 (ตอนนี้): Schedule-based → รัน 5 รอบ/วัน
Phase 2: Event-driven → รันเมื่อมี trigger (order, error, mention)
Phase 3: Multi-agent chain → agent เรียก agent อัตโนมัติ
Phase 4: Self-improving → agent เรียนรู้จาก feedback ปรับตัวเอง
```
