# 🧪 MOSSES ARMY Testing Checklist

ใช้ checklist นี้ทดสอบว่า agents ทั้งหมดทำงานได้ถูกต้อง

---

## 📋 Agent Testing Checklist

### ✅ Basic Tests (ทดสอบพื้นฐาน)

#### 1. Orchestrator (CMDR-001)
- [ ] ตอบคำถามพื้นฐาน
  ```bash
  claude --agent orchestrator "แนะนำตัวเอง"
  ```
- [ ] วิเคราะห์งานง่าย
  ```bash
  claude --agent orchestrator "วิเคราะห์ว่าควรใช้ agent ไหนสำหรับสร้าง landing page"
  ```
- [ ] ประสานงานหลาย agents
  ```bash
  claude --agent orchestrator "วางแผนสร้าง feature: chatbot LINE"
  ```

#### 2. Architect (COL-ARCH-001)
- [ ] Lv1: แนะนำ tech stack ง่าย
  ```bash
  claude --agent architect "แนะนำ tech stack สำหรับ blog ส่วนตัว"
  ```
- [ ] Lv3: ออกแบบ architecture ปานกลาง
  ```bash
  claude --agent architect "ออกแบบ architecture สำหรับ e-commerce ที่รองรับ 10K users"
  ```
- [ ] Lv5: ระบบซับซ้อน
  ```bash
  claude --agent architect "ออกแบบ real-time analytics dashboard"
  ```

#### 3. n8n Engineer (COL-N8N-002)
- [ ] Lv1: workflow ง่าย
  ```bash
  claude --agent n8n-engineer "สร้าง workflow รับ webhook แล้วบันทึก Supabase"
  ```
- [ ] Lv3: workflow ซับซ้อน
  ```bash
  claude --agent n8n-engineer "สร้าง workflow รับ order จาก LINE → validate → บันทึก DB → ส่ง notification"
  ```

#### 4. Frontend Dev (COL-FE-003)
- [ ] Lv1: หน้าเดียวง่าย
  ```bash
  claude --agent frontend-dev "สร้างหน้า landing page สำหรับโปรโมชั่น"
  ```
- [ ] Lv3: multi-page app
  ```bash
  claude --agent frontend-dev "สร้าง dashboard แสดง analytics พร้อม charts"
  ```

#### 5. Code Reviewer (COL-CR-004)
- [ ] Review code ง่าย
  ```bash
  claude --agent code-reviewer "review code: [ใส่ code snippet]"
  ```
- [ ] Security audit
  ```bash
  claude --agent code-reviewer "ตรวจ security ของ API endpoint นี้"
  ```

#### 6. Debugger (COL-DBG-005)
- [ ] หา bug จาก error message
  ```bash
  claude --agent debugger "แก้บัค: TypeError: Cannot read property 'name' of undefined"
  ```
- [ ] Root cause analysis
  ```bash
  claude --agent debugger "วิเคราะห์ว่าทำไม API response ช้า"
  ```

#### 7. Deployer (COL-DPL-006)
- [ ] Deploy plan ง่าย
  ```bash
  claude --agent deployer "วางแผน deploy Worker ไป Cloudflare"
  ```
- [ ] Rollback strategy
  ```bash
  claude --agent deployer "สร้าง rollback plan สำหรับ production deployment"
  ```

#### 8. Content Strategist (COL-CNT-007)
- [ ] สร้าง content ภาษาไทย
  ```bash
  claude --agent content-strategist "เขียน ad copy สำหรับ Valentine campaign"
  ```
- [ ] Content calendar
  ```bash
  claude --agent content-strategist "วางแผน content calendar เดือนมีนาคม"
  ```

#### 9. SEO Optimizer (COL-SEO-008)
- [ ] On-page SEO
  ```bash
  claude --agent seo-optimizer "ปรับ SEO หน้าแรกของ [URL]"
  ```
- [ ] Structured data
  ```bash
  claude --agent seo-optimizer "สร้าง schema.org markup สำหรับ product page"
  ```

#### 10. Data Engineer (COL-DE-009)
- [ ] ออกแบบ schema
  ```bash
  claude --agent data-engineer "ออกแบบ database schema สำหรับ order management"
  ```
- [ ] Optimize query
  ```bash
  claude --agent data-engineer "optimize query ที่ช้า: [SQL query]"
  ```

#### 11. DevOps (COL-DO-010)
- [ ] Setup CI/CD
  ```bash
  claude --agent devops "ตั้ง GitHub Actions สำหรับ deploy Worker"
  ```
- [ ] Monitoring setup
  ```bash
  claude --agent devops "สร้าง monitoring พร้อม LINE alert"
  ```

#### 12. Data Analyst (COL-DA-011)
- [ ] Basic analysis
  ```bash
  claude --agent data-analyst "วิเคราะห์ยอดขายสัปดาห์นี้"
  ```
- [ ] Advanced metrics
  ```bash
  claude --agent data-analyst "คำนวณ cohort retention rate"
  ```

#### 13. Marketing Compliance (COL-MC-012)
- [ ] ตรวจ ad copy
  ```bash
  claude --agent marketing-compliance "ตรวจ ad copy: [text]"
  ```
- [ ] PDPA check
  ```bash
  claude --agent marketing-compliance "ตรวจ privacy policy ว่าผ่าน PDPA"
  ```

---

## 🔗 Pipeline Testing

### Pipeline ALPHA: Feature Development
```bash
claude --agent orchestrator "สร้าง feature: form รับข้อมูล customer"
```
**Expected:** Architect → Frontend Dev → Code Reviewer → DevOps

### Pipeline BRAVO: Content Campaign
```bash
claude --agent orchestrator "launch campaign: Spring Sale 2026"
```
**Expected:** Content → Compliance → SEO → DevOps → Analyst

### Pipeline CHARLIE: Incident Response
```bash
claude --agent orchestrator "แก้เร่งด่วน: webhook ไม่ตอบกลับ"
```
**Expected:** Debugger → Code Reviewer → DevOps → Analyst

---

## 📊 Test Results Template

| Agent | Basic | Intermediate | Advanced | Notes |
|-------|-------|--------------|----------|-------|
| Orchestrator | ⬜ | ⬜ | ⬜ | |
| Architect | ⬜ | ⬜ | ⬜ | |
| n8n Engineer | ⬜ | ⬜ | ⬜ | |
| Frontend Dev | ⬜ | ⬜ | ⬜ | |
| Code Reviewer | ⬜ | ⬜ | ⬜ | |
| Debugger | ⬜ | ⬜ | ⬜ | |
| Deployer | ⬜ | ⬜ | ⬜ | |
| Content Strategist | ⬜ | ⬜ | ⬜ | |
| SEO Optimizer | ⬜ | ⬜ | ⬜ | |
| Data Engineer | ⬜ | ⬜ | ⬜ | |
| DevOps | ⬜ | ⬜ | ⬜ | |
| Data Analyst | ⬜ | ⬜ | ⬜ | |
| Marketing Compliance | ⬜ | ⬜ | ⬜ | |

---

## 🐛 Bug Report Template

พบปัญหาขณะทดสอบ ให้บันทึก:

```markdown
**Agent:** [ชื่อ agent]
**Level:** Lv1 / Lv2 / Lv3 / Lv4 / LvMax
**Command:** [คำสั่งที่ใช้]
**Expected:** [ผลลัพธ์ที่คาดหวัง]
**Actual:** [ผลลัพธ์จริง]
**Error:** [error message ถ้ามี]
**Screenshot:** [ถ้ามี]
```

---

## ✅ Success Criteria

ถือว่าผ่านการทดสอบเมื่อ:
- [ ] ทุก agent ตอบสนองได้ (ไม่ error)
- [ ] Output เป็นภาษาไทย (ยกเว้นศัพท์เทคนิค)
- [ ] ตอบตรงประเด็น (relevant)
- [ ] มีคุณภาพ (actionable)
- [ ] Pipeline ทำงานได้
- [ ] ไม่มี critical bugs

---

[← Back to README](./README.md)
