# Agent Runner API Spec (Optional)

ใช้เมื่อต้องการให้ n8n เรียก **Worker/Backend กลาง** แทนการเรียก Anthropic API โดยตรง — API key เก็บที่เดียว (ที่ Worker)

---

## Endpoint

### Method

- POST `https://your-agent-runner.workers.dev/run`

---

## Request

### Headers

- `Authorization: Bearer <YOUR_RUNNER_API_KEY>` (ตั้งใน wrangler secret)
- `Content-Type: application/json`

### Body

```json
{
  "agent": "orchestrator | devops | data-analyst | marketing-compliance | content-strategist | seo-optimizer | data-engineer | n8n-engineer | frontend-dev | code-reviewer | debugger | deployer | architect",
  "userMessage": "ข้อความหรือ prompt ที่ให้ agent นั้นทำ"
}
```

- `agent`: ตรงกับชื่อใน ECOSYSTEM (ใช้เลือก system prompt)
- `userMessage`: ข้อความที่ส่งเป็น user message ให้ Claude

---

## Response

### Success (200)

```json
{
  "ok": true,
  "agent": "devops",
  "content": "ข้อความที่ Claude ส่งกลับ (สรุปผลงาน)"
}
```

### Error (4xx/5xx)

```json
{
  "ok": false,
  "error": "ข้อความ error"
}
```

---

## Worker ต้องทำอะไร

1. ตรวจ `Authorization` กับ `RUNNER_API_KEY`
2. จาก `agent` โหลด system prompt (จากไฟล์ .md ใน Mosses หรือ map ชื่อ → prompt)
3. เรียก Anthropic API: `POST https://api.anthropic.com/v1/messages`  
   - Header: `x-api-key: ANTHROPIC_API_KEY`, `anthropic-version: 2023-06-01`  
   - Body: `model`, `max_tokens`, `system` (จากข้อ 2), `messages: [{ role: "user", content: userMessage }]`
4. ดึง `content[0].text` จาก response ส่งกลับใน `content`

### Secrets (wrangler)

- `RUNNER_API_KEY` — ใช้ตรวจเมื่อ n8n เรียก Worker
- `ANTHROPIC_API_KEY` — ใช้เรียก Claude

---

## การใช้ใน n8n

- แทนที่ node "Call Orchestrator (Claude)" และ "Call Agent (Claude)" ด้วย **HTTP Request** ไปที่ `POST https://your-agent-runner.workers.dev/run`
- Body: `{ "agent": "orchestrator", "userMessage": "..." }` หรือ `{ "agent": "devops", "userMessage": "..." }`
- ไม่ต้องเก็บ Anthropic API key ใน n8n

---

## Note

เอกสารนี้เป็น spec สำหรับ implement ภายหลัง — โฟลเดอร์ Mosses ยังไม่มี Worker นี้ใน repo
