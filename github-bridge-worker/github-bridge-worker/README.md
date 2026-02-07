# 🌉 GitHub Bridge Worker

> Cloudflare Worker ที่ให้ Claude.ai push/commit ไฟล์ไป GitHub ได้โดยตรง

---

## 🚀 Deploy (ทำครั้งเดียว)

```bash
cd github-bridge-worker
chmod +x deploy-worker.sh
./deploy-worker.sh
```

Script จะ:
1. Deploy Worker ขึ้น Cloudflare
2. ถาม GitHub PAT → เก็บเป็น secret
3. Generate BRIDGE_API_KEY → เก็บเป็น secret

---

## 🔐 Secrets ที่ต้องตั้ง

| Secret | วิธีสร้าง |
|--------|----------|
| `GITHUB_PAT` | [github.com/settings/tokens/new](https://github.com/settings/tokens/new) → scope: `repo` (full) |
| `BRIDGE_API_KEY` | Auto-generated ตอน deploy หรือ `openssl rand -hex 32` |

---

## 📡 API Endpoints

### Health Check
```bash
curl https://github-bridge.<subdomain>.workers.dev/health
```

### อ่านไฟล์
```bash
curl -H "Authorization: Bearer <API_KEY>" \
  https://github-bridge.<subdomain>.workers.dev/repos/bowbozaa/ADMIN/contents/README.md
```

### สร้าง/อัปเดตไฟล์
```bash
curl -X PUT -H "Authorization: Bearer <API_KEY>" \
  -d '{"content": "# Hello World", "message": "update readme"}' \
  https://github-bridge.<subdomain>.workers.dev/repos/bowbozaa/ADMIN/contents/README.md
```

### Batch Push (หลายไฟล์ 1 commit) ⭐
```bash
curl -X POST -H "Authorization: Bearer <API_KEY>" \
  -d '{
    "files": [
      {"path": "file1.md", "content": "# File 1"},
      {"path": "src/app.js", "content": "console.log(1)"},
      {"path": "old.txt", "delete": true}
    ],
    "message": "batch update via bridge",
    "branch": "main"
  }' \
  https://github-bridge.<subdomain>.workers.dev/repos/bowbozaa/ADMIN/push
```

### Trigger Workflow
```bash
curl -X POST -H "Authorization: Bearer <API_KEY>" \
  -d '{"workflow": "daily-claude.yml", "inputs": {"task": "daily-check"}}' \
  https://github-bridge.<subdomain>.workers.dev/repos/bowbozaa/ADMIN/dispatch
```

### List Workflows
```bash
curl -H "Authorization: Bearer <API_KEY>" \
  https://github-bridge.<subdomain>.workers.dev/repos/bowbozaa/ADMIN/workflows
```

---

## 🤖 การใช้กับ Claude.ai

หลัง deploy เสร็จ บอก Claude.ai:

> "จำไว้นะ Worker URL คือ https://github-bridge.xxx.workers.dev
> BRIDGE_API_KEY คือ xxx
> ใช้ web_fetch เรียก Worker นี้เวลาต้อง push ไฟล์ไป GitHub"

Claude.ai จะใช้ `web_fetch` tool เรียก Worker endpoints ได้เลย

---

## 📁 Project Structure

```
github-bridge-worker/
├── src/
│   └── index.js          # Worker code
├── wrangler.toml          # Cloudflare config
├── package.json
├── deploy-worker.sh       # One-click deploy
└── README.md
```
