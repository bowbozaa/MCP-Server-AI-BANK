# 🔗 Cursor ↔ Claude.ai Bridge — Setup Guide

## Architecture

```
┌─────────────┐     REST API      ┌──────────────────────┐     GitHub API     ┌──────────┐
│  Claude.ai  │ ──────────────►   │                      │ ──────────────►    │          │
│  (Flyday)   │   web_fetch       │   Bridge Worker      │                    │  GitHub  │
└─────────────┘                   │   (Cloudflare)       │                    │          │
                                  │                      │                    │          │
┌─────────────┐     MCP/SSE       │  • REST endpoints    │ ◄──────────────    │          │
│  Cursor IDE │ ──────────────►   │  • MCP Server        │                    │          │
│             │   JSON-RPC 2.0    │  • Auth (Bearer)     │                    │          │
└─────────────┘                   └──────────────────────┘                    └──────────┘
```

**ผลลัพธ์**: Claude.ai (Flyday) และ Cursor ใช้ GitHub repo เดียวกันผ่าน Bridge Worker ตัวเดียว

---

## Step 1: Deploy Bridge Worker

```bash
# ถ้ายังไม่ได้ deploy — รัน script นี้
chmod +x deploy-worker.sh
./deploy-worker.sh
```

หรือ deploy manual:

```bash
cd github-bridge-worker
npm install
npx wrangler deploy

# ตั้ง secrets
npx wrangler secret put GITHUB_PAT
npx wrangler secret put BRIDGE_API_KEY
```

## Step 2: ทดสอบ MCP endpoint

```bash
# เปลี่ยน URL เป็นของจริง
WORKER_URL="https://flybridge.YOUR_SUBDOMAIN.workers.dev"
API_KEY="your-bridge-api-key"

# Health check — ต้องเห็น "mcp-server" ใน features
curl -s "$WORKER_URL/health" | jq

# ทดสอบ SSE (จะ hang เพราะ stream — กด Ctrl+C หลัง 2-3 วิ)
curl -N -H "Authorization: Bearer $API_KEY" "$WORKER_URL/mcp/sse"
```

ถ้าเห็น `event: endpoint` แสดงว่า MCP Server ทำงานแล้ว ✅

## Step 3: Config Cursor

### วิธี A: Project-level (แนะนำ)

สร้างไฟล์ `.cursor/mcp.json` ใน root ของ project:

```json
{
  "mcpServers": {
    "flybridge": {
      "url": "https://flybridge.YOUR_SUBDOMAIN.workers.dev/mcp/sse",
      "headers": {
        "Authorization": "Bearer YOUR_BRIDGE_API_KEY"
      }
    }
  }
}
```

### วิธี B: Global (ทุก project)

ไปที่ `Cursor Settings → MCP` แล้วเพิ่ม:
- Name: `flybridge`
- Transport: `SSE`  
- URL: `https://flybridge.YOUR_SUBDOMAIN.workers.dev/mcp/sse`
- Headers: `Authorization: Bearer YOUR_BRIDGE_API_KEY`

## Step 4: ทดสอบใน Cursor

เปิด Cursor → พิมพ์ใน Chat:

```
Use the flybridge MCP to list files in bowbozaa/ADMIN repo
```

Cursor จะเรียก `read_file` tool ผ่าน MCP → Bridge Worker → GitHub API

---

## MCP Tools ที่ใช้ได้ใน Cursor

| Tool | ทำอะไร |
|------|--------|
| `read_file` | อ่านไฟล์ / list directory |
| `write_file` | สร้าง/อัพเดทไฟล์ |
| `batch_push` | Push หลายไฟล์ใน commit เดียว |
| `get_repo_info` | ดูข้อมูล repo |
| `trigger_workflow` | Trigger GitHub Actions |
| `list_workflows` | ดู workflows ทั้งหมด |
| `search_code` | ค้นหาโค้ดใน repo |
| `list_branches` | ดู branches ทั้งหมด |

---

## How Claude.ai + Cursor Work Together

### Scenario 1: Flyday สั่ง → Cursor ทำ
1. คุยกับ Flyday ใน Claude.ai เรื่อง architecture
2. Flyday push spec/plan ไป GitHub ผ่าน REST API
3. Cursor ดึง spec จาก GitHub ผ่าน MCP แล้วเขียนโค้ดจริง

### Scenario 2: Cursor เขียน → Flyday review
1. Cursor เขียนโค้ดแล้ว push ผ่าน MCP
2. Flyday อ่านโค้ดจาก GitHub ผ่าน REST API แล้ว review

### Scenario 3: Shared .cursorrules
1. สร้าง `.cursorrules` ใน repo
2. ทั้ง Cursor และ Flyday อ่าน/เขียนไฟล์นี้ได้
3. ใช้เป็น "shared brain" — coding standards, project context

---

## Security Notes

- ❌ อย่าเอา API key เข้า Git — ใส่ใน `.gitignore`
- ✅ `.cursor/mcp.json` ควรอยู่ใน `.gitignore` เพราะมี API key
- ✅ ใช้ environment variable ได้ถ้า Cursor support
- ✅ Bridge Worker ใช้ Bearer token auth ทุก request

เพิ่มใน `.gitignore`:
```
.cursor/mcp.json
```

---

## Troubleshooting

| ปัญหา | วิธีแก้ |
|--------|---------|
| Cursor ไม่เจอ MCP server | Restart Cursor หลังเพิ่ม config |
| 401 Unauthorized | เช็ค API key ใน mcp.json |
| SSE timeout | Cloudflare Workers มี 30s CPU limit — batch_push ไฟล์มากอาจ timeout |
| Tools ไม่โชว์ | เช็คว่า MCP endpoint URL ถูก (ต้องลงท้าย `/mcp/sse`) |
