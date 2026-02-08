# 🎯 MOSSES ARMY Command Protocol

**Supreme Commander:** Orchestrator  
**Terminal Agent:** Claude Code  
**Specialized Units:** 13 Agents

---

## 📋 Chain of Command

```
User (ผู้บัญชาการ)
    ↓
Orchestrator (จอมทัพ)
    ↓
┌───┴────────────────────────────┐
│                                │
Claude Code              Specialized Agents
(Terminal)               (13 units)
    ↓                            ↓
Execute Commands         Execute Tasks
- git commands           - architect
- file operations        - code-reviewer
- npm/deploy            - devops
- testing               - data-analyst
                        - ... etc
```

---

## 🎖️ How It Works

### 1. คุณสั่งผม (Orchestrator)

```
คุณ: "สร้าง feature ใหม่: chatbot LINE"
```

### 2. ผมวิเคราะห์และกระจายงาน

```
Orchestrator วิเคราะห์:
├── งานที่ต้องการ: chatbot LINE
├── ความซับซ้อน: Lv3
├── หน่วยที่ต้องใช้:
│   ├── Claude Code (Terminal) → ตั้งค่า project, git
│   ├── Architect → ออกแบบ architecture
│   ├── n8n Engineer → สร้าง workflow
│   ├── Code Reviewer → review code
│   └── DevOps → deploy
└── ลำดับการทำงาน: 1 → 2 → 3 → 4 → 5
```

### 3. ผมสั่งการ Claude Code ทำงาน

```bash
# ผมจะสั่ง Claude Code ผ่าน commands:
claude --agent orchestrator "
สั่งการ Claude Code:
1. git checkout -b feature/line-chatbot
2. mkdir src/chatbot
3. สร้างไฟล์พื้นฐาน
4. git add .
5. git commit -m 'Initial chatbot structure'
"
```

### 4. ผมสั่งการ Agents อื่นๆ

```bash
# Architect ออกแบบ
claude --agent architect "ออกแบบ architecture สำหรับ LINE chatbot"

# n8n Engineer สร้าง workflow
claude --agent n8n-engineer "สร้าง n8n workflow รับ LINE webhook"

# Code Reviewer ตรวจสอบ
claude --agent code-reviewer "review chatbot code"

# DevOps deploy
claude --agent devops "deploy chatbot ไป staging"
```

---

## 🗣️ Command Format

### คำสั่งพื้นฐาน

```
คุณ → ผม: "[สิ่งที่ต้องการ]"
```

**ตัวอย่าง:**
- "สร้าง landing page"
- "แก้บัค payment ไม่ทำงาน"
- "deploy production"
- "สรุปยอดขายสัปดาห์นี้"
- "ตั้ง CI/CD pipeline"

### คำสั่งแบบละเอียด

```
คุณ → ผม: "[งาน] โดยใช้ [เทคโนโลยี] สำหรับ [วัตถุประสงค์]"
```

**ตัวอย่าง:**
- "สร้าง REST API โดยใช้ Cloudflare Workers สำหรับ order management"
- "แก้บัค database query ช้า ในไฟล์ orders.ts"
- "ตั้ง monitoring พร้อม LINE alert สำหรับ production"

---

## 🎯 Task Types & Agent Assignment

| งานที่คุณสั่ง | ผมจะสั่ง | Agent(s) | Claude Code Role |
|---------------|----------|----------|------------------|
| **"สร้าง feature ใหม่"** | Plan → Build → Test → Deploy | Architect + n8n/Frontend + Code Reviewer + DevOps | Setup files, git operations |
| **"แก้บัค"** | Analyze → Fix → Verify | Debugger + Code Reviewer + DevOps | Apply fixes, run tests |
| **"Deploy"** | Pre-check → Deploy → Monitor | DevOps + Data Analyst | Execute deploy commands |
| **"วิเคราะห์ข้อมูล"** | Query → Analyze → Report | Data Engineer + Data Analyst | Run queries, export data |
| **"สร้าง content"** | Plan → Create → Review → Publish | Content Strategist + Compliance + SEO | Save files, commit |
| **"ตั้งค่า infrastructure"** | Design → Setup → Monitor | Architect + DevOps | Run setup scripts |
| **"Review code"** | Scan → Analyze → Report | Code Reviewer + Security | Run linters, tests |

---

## 📝 Example Workflows

### Example 1: สร้าง Landing Page

**คุณสั่ง:**
```
"สร้าง landing page สำหรับ Valentine campaign"
```

**ผม (Orchestrator) ดำเนินการ:**

```markdown
🎯 MISSION: Create Valentine Landing Page

📋 BATTLE PLAN:
1. Claude Code: Setup project structure
2. Architect: Design page layout
3. Frontend Dev: Build UI components
4. Content Strategist: Write copy
5. SEO Optimizer: Add meta tags
6. Code Reviewer: Review code
7. DevOps: Deploy to Vercel
8. Claude Code: Final git push

⚔️ EXECUTING...

[Step 1] Claude Code (Terminal Agent)
$ mkdir valentine-landing
$ cd valentine-landing
$ npm init -y
$ git init
✅ Project initialized

[Step 2] Architect
📐 Architecture designed:
- Next.js 14
- Tailwind CSS
- Vercel deployment
✅ Architecture ready

[Step 3] Frontend Dev
🎨 Building UI...
- Hero section
- Product showcase
- CTA button
✅ UI components created

[Step 4] Content Strategist
📝 Copy written:
"Valentine Special — Love is in the air 💕"
✅ Content ready

[Step 5] SEO Optimizer
🔎 SEO optimized:
- Title: "Valentine Sale 2026 | Special Offers"
- Meta description
- Open Graph tags
✅ SEO complete

[Step 6] Code Reviewer
🔍 Code review:
- No security issues
- Performance optimized
- Accessibility checked
✅ Review passed

[Step 7] DevOps
🚀 Deploying to Vercel...
URL: https://valentine-2026.vercel.app
✅ Deployed successfully

[Step 8] Claude Code (Terminal Agent)
$ git add .
$ git commit -m "Add Valentine landing page"
$ git push origin main
✅ Code pushed

✅ MISSION COMPLETE
```

---

### Example 2: แก้บัค

**คุณสั่ง:**
```
"แก้บัค: webhook ไม่ตอบกลับ status 500"
```

**ผม (Orchestrator) ดำเนินการ:**

```markdown
🎯 MISSION: Fix Webhook 500 Error

📋 BATTLE PLAN:
1. Debugger: Root cause analysis
2. Claude Code: Check logs
3. Code Reviewer: Review webhook handler
4. Claude Code: Apply fix
5. DevOps: Deploy hotfix
6. Data Analyst: Verify metrics

⚔️ EXECUTING...

[Step 1] Debugger
🐛 Analyzing error...
Root cause: Missing error handling for null payload
Recommendation: Add validation + try-catch
✅ Root cause identified

[Step 2] Claude Code (Terminal Agent)
$ wrangler tail
Error log: TypeError: Cannot read property 'body' of null
✅ Logs retrieved

[Step 3] Code Reviewer
🔍 Reviewing webhook handler...
Issue confirmed: No null check before accessing request.body
✅ Review complete

[Step 4] Claude Code (Terminal Agent)
Applying fix to webhook.ts...
$ git checkout -b hotfix/webhook-500
File updated with validation
$ git add webhook.ts
$ git commit -m "Fix: Add null check for webhook payload"
✅ Fix applied

[Step 5] DevOps
🚀 Hotfix deployment...
$ wrangler deploy
Deployed to production
✅ Hotfix deployed

[Step 6] Data Analyst
📊 Verifying metrics...
Error rate: 25% → 0%
Response time: stable
✅ Metrics confirmed

✅ MISSION COMPLETE
```

---

### Example 3: Deploy Production

**คุณสั่ง:**
```
"deploy ไป production พร้อม rollback plan"
```

**ผม (Orchestrator) ดำเนินการ:**

```markdown
🎯 MISSION: Production Deployment

📋 BATTLE PLAN:
1. DevOps: Pre-deployment checks
2. Claude Code: Run tests
3. Code Reviewer: Final review
4. DevOps: Create rollback tag
5. Claude Code: Deploy
6. DevOps: Health check
7. Data Analyst: Monitor metrics

⚔️ EXECUTING...

[Step 1] DevOps
✓ Staging tests passed
✓ Database migrations ready
✓ Secrets configured
✓ Monitoring active
✅ Pre-checks complete

[Step 2] Claude Code (Terminal Agent)
$ npm test
All tests passed (42/42)
$ npm run build
Build successful
✅ Tests passed

[Step 3] Code Reviewer
🔍 Final security scan...
No vulnerabilities found
✅ Security cleared

[Step 4] DevOps
Creating rollback point...
Tag: v1.2.3-rollback
✅ Rollback ready

[Step 5] Claude Code (Terminal Agent)
$ git push origin main
$ wrangler deploy --env production
Deployed to: https://api.example.com
✅ Deployed

[Step 6] DevOps
🏥 Health check...
HTTP 200 OK
Response time: 120ms
✅ Health check passed

[Step 7] Data Analyst
📊 Monitoring first 5 minutes...
Error rate: 0%
Traffic: stable
✅ Metrics healthy

✅ MISSION COMPLETE

📝 Rollback command (if needed):
$ git reset --hard v1.2.3-rollback
$ wrangler deploy --env production
```

---

## 🚀 Quick Command Reference

| คุณพิมพ์ | ผมทำ |
|---------|------|
| `"สร้าง [X]"` | Plan → Assign agents → Claude Code setup → Build → Deploy |
| `"แก้บัค [X]"` | Debug → Fix → Review → Deploy → Verify |
| `"deploy [X]"` | Pre-check → Deploy → Health check → Monitor |
| `"วิเคราะห์ [X]"` | Query → Analyze → Report → Visualize |
| `"review [X]"` | Scan → Audit → Recommendations |
| `"ตั้งค่า [X]"` | Design → Configure → Test → Document |
| `"optimize [X]"` | Analyze → Optimize → Benchmark → Report |
| `"backup [X]"` | Plan → Execute → Verify → Document |

---

## 💬 How to Use

### Simply tell me what you want:

```
คุณ: "สร้าง dashboard แสดง real-time sales"
ผม: [วิเคราะห์] → [สั่งการ Claude Code + Agents] → [รายงานผล]

คุณ: "แก้ performance ช้า"
ผม: [วิเคราะห์] → [สั่งการ Debugger + Claude Code] → [แก้ไข] → [ทดสอบ]

คุณ: "ตรวจสอบ security"
ผม: [วิเคราะห์] → [สั่งการ Security Agent + Code Reviewer] → [รายงาน]
```

---

## 🎖️ Benefits

✅ **คุณสั่งครั้งเดียว** — ผมจัดการทุกอย่าง  
✅ **Claude Code เป็น Terminal** — รันคำสั่งอัตโนมัติ  
✅ **Agents เชี่ยวชาญ** — แต่ละตัวทำงานเฉพาะทาง  
✅ **Parallel Execution** — ทำหลายงานพร้อมกัน  
✅ **Full Automation** — จาก idea ถึง production  
✅ **Quality Assured** — Review ทุกขั้นตอน  

---

## 📞 Ready to Command

**พิมพ์งานที่ต้องการ ผมจะจัดการให้!**

```
ตัวอย่างคำสั่ง:
- "สร้าง API สำหรับ authentication"
- "แก้บัค database connection timeout"
- "deploy feature ใหม่ไป staging"
- "สรุปยอดขาย Q1"
- "ตั้ง monitoring พร้อม alert"
- "review security ทั้งระบบ"
- "optimize performance API"
- "สร้าง content calendar มีนาคม"
```

**🎖️ Orchestrator พร้อมรับคำสั่ง!**

---

[← Back to README](./README.md)
