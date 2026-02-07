# 🤖 รัน Agent Ecosystem อัตโนมัติ 24 ชม. (สั่งครั้งแรกอย่างเดียว)

เอกสารนี้อธิบายวิธีตั้งค่าให้ **Mosses Multi-Agent Ecosystem** ทำงานคิดงานเองได้ตลอด 24 ชม. โดยคุณแค่ **สั่งครั้งแรก** (เปิดระบบ) จากนั้นระบบจะรันตาม schedule ที่กำหนดเอง

---

## 1. ภาพรวม

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  สั่งครั้งแรก = เปิด (Activate) Workflow ใน n8n                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  n8n Schedule Trigger (ทุก X ชม. หรือทุกวัน 09:00)                       │
│  → รันต่อเนื่อง 24/7 ตามที่ตั้งไว้                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ขั้นที่ 1: เรียก Orchestrator (Claude API)                              │
│  พร้อม context: วันเวลา, งานที่รันล่าสุด, ปฏิทิน                        │
│  → ได้ "รายการงานที่ควรทำตอนนี้" (task list)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ขั้นที่ 2: สำหรับแต่ละ task ใน list                                     │
│  → เรียก Agent ที่ตรง (DevOps / Data Analyst / Content / ...) ผ่าน API  │
│  → เก็บผลลัพธ์ (Supabase / log) + แจ้ง LINE (ถ้าตั้งไว้)                 │
└─────────────────────────────────────────────────────────────────────────┘
```

**ผลลัพธ์:** ไม่ต้องมาสั่งทีละครั้ง — ระบบจะ "คิดงานเอง" ตาม pipeline และ schedule (เช่น เช็ค health, สร้างรายงาน, ตรวจ compliance, วางแผน content) แล้วรันให้เอง

---

## 2. สิ่งที่ต้องมี

| สิ่งที่ต้องมี | ใช้ทำอะไร |
| ------------- | --------- |
| **n8n** (n8n Cloud หรือ self-hosted) | รัน workflow 24/7, Schedule Trigger, เรียก Claude API |
| **Anthropic API Key** (Claude) | ให้ Orchestrator + แต่ละ Agent "คิด" และส่งออก task/ผลลัพธ์ |
| **Supabase** (ถ้าต้องการ) | เก็บ log การรัน, ผลลัพธ์, สถานะ (optional แต่แนะนำ) |
| **LINE Notify / LINE OA** (ถ้าต้องการ) | แจ้งผลหรือสรุปงานที่ทำแล้ว (optional) |

ไม่มี API key → จะรันแบบ "คิดงานเอง" ตลอด 24 ชม. ไม่ได้ ต้องมีอย่างน้อย **Anthropic API key** สำหรับเรียก Claude ใน n8n

---

## 3. สั่งครั้งแรก — ทำอะไรบ้าง

เป้าหมาย: **เปิดระบบให้รันตามเวลาเองได้เรื่อยๆ**

### วิธีที่ 1: ใช้ n8n (แนะนำ)

1. **สร้างหรือ Import Workflow** ใน n8n ชื่อเช่น `Mosses Autonomous Loop` (โครงตัวอย่างอยู่ด้านล่าง)
2. **ตั้ง Schedule Trigger**  
   - ตัวอย่าง: ทุก 6 ชม. หรือทุกวัน 09:00  
   - หรือ: ทุก 1 ชม. ถ้าอยากให้คิดงานบ่อย
3. **ใส่ Credentials**  
   - Anthropic API key ไว้ใน n8n Credentials  
   - (ถ้าใช้) Supabase, LINE ใส่ใน Credentials ของ n8n
4. **กด Activate** workflow ครั้งเดียว  

จากนั้น n8n จะรัน workflow ตาม schedule ตลอด 24 ชม. โดยไม่ต้องสั่งซ้ำ — **นี่คือการ "สั่งครั้งแรก"**

### วิธีที่ 2: เรียก API ครั้งเดียวเพื่อ "เริ่มต้น"

ถ้ามี endpoint ที่ทำหน้าที่ "start scheduler" (เช่น เปิด flag ใน DB หรือ trigger workflow ครั้งแรก) ก็เรียก API นั้นครั้งเดียวได้ แต่การรันซ้ำตามเวลายังต้องอยู่ที่ **n8n Schedule** อยู่ดี ดังนั้นในทางปฏิบัติ การสั่งครั้งแรก = **Activate workflow ใน n8n**

---

## 4. โครง Workflow ใน n8n (คิดงานเองได้)

ลำดับคร่าวๆ ใน n8n:

```text
[Schedule Trigger]
       │
       ▼
[1] ดึง context (ถ้ามี)
    → อ่านจาก Supabase: last_run_at, last_tasks, alerts
    → หรือใช้แค่ timestamp + วันในสัปดาห์
       │
       ▼
[2] เรียก Claude API — Orchestrator
    • System prompt = เนื้อหาจาก orchestrator.md (บทบาท Orchestrator)
    • User message = บอกวันเวลา + context + คำสั่งดังนี้ (หรือใกล้เคียง):

      "ตอนนี้เวลา [ISO timestamp] วัน [วันในสัปดาห์] 
       ตาม Pipeline ใน ECOSYSTEM (health check, รายงาน, content, compliance, infra audit ฯลฯ)
       ให้กำหนดว่างานอะไรที่ควรทำในรอบนี้
       ส่งออกเป็น JSON เท่านั้น ในรูปแบบ:
       {\"tasks\": [{\"agent\": \"ชื่อ agent\", \"prompt\": \"ข้อความที่ให้ agent นั้นทำ\"}, ...]}"

    • Parse JSON จาก response
       │
       ▼
[3] Loop แต่ละ task ใน tasks[]
    │
    ├─► [3a] เรียก Claude API — Agent ตาม task.agent
    │         • System prompt = เนื้อหาจากไฟล์ agent นั้น (devops.md / data-analyst.md / ...)
    │         • User message = task.prompt
    │
    ├─► [3b] เก็บผลลัพธ์ (เขียน Supabase หรือแค่ผ่านไป node ถัดไป)
    │
    └─► [3c] (Optional) ส่ง LINE สรุปว่า task ไหนทำแล้ว ผลเป็นอย่างไร
       │
       ▼
[4] อัปเดต last_run_at ใน Supabase (ถ้าใช้)
       │
       ▼
[5] (Optional) ส่ง LINE สรุปทั้งรอบ: จำนวน task, สำเร็จ/ล้มเหลว
```

- **Orchestrator** = "สมอง" ที่ตัดสินใจว่ารอบนี้ควรทำอะไร (คิดงานเอง)  
- **แต่ละ Agent** = ทำงานตาม prompt ที่ Orchestrator ส่งมา  
- **Schedule** = ทำให้รันซ้ำทุก X ชม. หรือทุกวัน → 24 ชม. โดยไม่ต้องสั่งซ้ำ

---

## 5. Prompt แนะนำสำหรับ Orchestrator (ให้ส่งออกเป็น Task List)

ใช้กับ node ที่เรียก Claude API (Orchestrator) — ใส่ใน **User message** (ปรับเวลาและ context ตามที่ n8n ส่งเข้าไป):

```text
ตอนนี้เวลา {{ $now.toISO() }} (วัน{{ dayOfWeek }})
ข้อมูลรอบล่าสุด (ถ้ามี): {{ $json.last_run_summary }}

คุณเป็น Orchestrator ของ Mosses ตาม ECOSYSTEM.md
ให้พิจารณา Pipeline เหล่านี้และกำหนดว่ารอบนี้ควรทำงานอะไรบ้าง (อาจเป็น 0–5 งาน):
- Pipeline 1: Feature/Deploy → health check, smoke test
- Pipeline 2: Content → ตรวจ content ที่จะโพสต์
- Pipeline 4: Incident → ตรวจ anomaly / error rate
- Pipeline 6: Monthly → รายงานรายสัปดาห์/เดือน, compliance audit, infra audit

ส่งออกเฉพาะ JSON เท่านั้น ไม่มีข้อความอื่น:
{"tasks": [{"agent": "devops", "prompt": "เช็ค health check ทุก service และสรุปสถานะ"}, ...]}
ถ้าไม่มีงานที่ต้องทำในรอบนี้ ส่ง: {"tasks": []}
```

- ชื่อ `agent` ควรตรงกับที่คุณใช้ใน workflow (เช่น `devops`, `data-analyst`, `marketing-compliance`) เพื่อให้ n8n รู้ว่าจะเอา system prompt ของ agent ไหนไปใส่ในขั้น "เรียก Agent"

---

## 6. เก็บ API Key ไว้ที่เดียว (แนะนำ)

เพื่อไม่ให้ใส่ Anthropic API key หลายที่ แนะนำให้มี **Agent Runner กลาง** (เช่น Cloudflare Worker หรือ backend เล็กๆ) ที่:

- รับ HTTP request จาก n8n (พร้อม auth ของคุณ เช่น Bearer token)
- ภายใน Worker/backend ใส่ Anthropic API key
- รับ body เช่น `{ "role": "orchestrator" | "devops" | "data-analyst" | ..., "userMessage": "..." }`
- ภายในเรียก Anthropic API ด้วย system prompt ของ role นั้น + user message
- ส่ง response กลับให้ n8n

จากนั้น n8n แค่เรียก Worker นี้โดยไม่ต้องเก็บ API key ใน n8n — โครงสร้างยังเหมือนเดิม แค่เปลี่ยนจาก "เรียก Anthropic โดยตรง" เป็น "เรียก Worker → Worker เรียก Anthropic"

---

## 7. ตาราง Supabase (Optional แต่มีประโยชน์)

ใช้เก็บสถานะและ log เพื่อให้ Orchestrator "คิดงานเอง" อย่างมี context (เช่น ไม่ให้รันงานหนักซ้ำในรอบเดียวกัน):

```sql
-- ตัวอย่าง
create table if not exists mosses_autonomous_log (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  trigger_type text,           -- 'schedule' | 'manual'
  orchestrator_output jsonb,   -- task list ที่ Orchestrator ส่งออก
  task_results jsonb,         -- ผลแต่ละ task
  line_notified boolean default false
);

-- อ่านรอบล่าสุดสำหรับ context
-- select * from mosses_autonomous_log order by run_at desc limit 1;
```

ใน n8n: node อ่าน `mosses_autonomous_log` ล่าสุดส่งเข้า Orchestrator เป็น `last_run_summary` แล้วเขียน row ใหม่หลังรันแต่ละรอบ

---

## 8 สรุป Checklist — สั่งครั้งแรกแล้วรัน 24 ชม

- [ ] มี n8n (Cloud หรือ self-hosted) ที่รันได้ 24/7  
- [ ] มี Anthropic API key และใส่ใน n8n (หรือใน Agent Runner กลาง)  
- [ ] สร้าง workflow ตามโครงด้านบน (Schedule → Orchestrator → Loop เรียก Agent → Log/LINE)  
- [ ] ใส่ System prompt ของ Orchestrator + แต่ละ Agent จากไฟล์ .md ในโฟลเดอร์ Mosses  
- [ ] ตั้ง Schedule ตามต้องการ (ทุก 6 ชม. / ทุกวัน 09:00 ฯลฯ)  
- [ ] (Optional) สร้างตาราง `mosses_autonomous_log` ใน Supabase และต่อใน n8n  
- [ ] (Optional) ต่อ LINE สำหรับแจ้งผล  
- [ ] **กด Activate workflow ใน n8n ครั้งเดียว**  

หลังจากนั้นระบบจะ **คิดงานเองและรันตาม schedule ตลอด 24 ชม.** โดยคุณไม่ต้องสั่งซ้ำ — การ "สั่งครั้งแรก" คือการเปิด (Activate) workflow นี้

---

## 10 ไฟล์ในโฟลเดอร์นี้ที่เกี่ยวกับรัน 24 ชม

| ไฟล์ | ความหมาย |
| ---- | -------- |
| `AUTONOMOUS-RUN.md` | คู่มือนี้ — ภาพรวม, สั่งครั้งแรก, โครง workflow |
| `n8n-mosses-autonomous-template.json` | ตัวอย่าง workflow สำหรับ import เข้า n8n (ต้องตั้ง Schedule + Credentials เอง) |
| `agent-runner-api-spec.md` | สเปก API ของ Worker กลาง (optional) ถ้าอยากเก็บ Anthropic API key นอก n8n |

---

## 9 ปัญหาที่พบบ่อย

| ปัญหา | แนวทางแก้ |
| ------ | --------- |
| Workflow ไม่รันตามเวลา | เช็ค timezone ของ n8n, ตรวจว่า Activate แล้ว และไม่มี error ใน execution |
| Claude API error / 429 | ลดความถี่ schedule หรือลดจำนวน task ต่อรอบ, ตรวจ quota |
| ได้ task list ไม่ใช่ JSON | กำหนดใน prompt ให้ส่ง "เฉพาะ JSON" และเพิ่มขั้น parse/validate ใน n8n |
| อยากให้คิดงานเองมากขึ้น | เพิ่ม context ใน Orchestrator (ปฏิทิน, งานค้าง, KPI ล่าสุด) และปรับ prompt ให้ระบุว่าอาจส่ง 0 งานถ้าไม่มีอะไรต้องทำ |

---

Last updated: 2026-02-07 — สอดคล้องกับ ECOSYSTEM.md และ Pipeline ใน Mosses Multi-Agent Ecosystem
