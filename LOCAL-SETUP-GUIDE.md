# 🔧 Local Setup Guide

คู่มือสำหรับการ sync และจัดการไฟล์ local กับ repository

---

## 🔄 Sync Repository กับ Local Machine

### Step 1: Pull Latest Changes

```bash
# เปิด terminal ที่ D:\MCP Server AI BANK\
cd "D:\MCP Server AI BANK"

# Pull changes ล่าสุดจาก remote
git pull origin cursor/agents-markdown-file-a8e1
```

### Step 2: ตรวจสอบ Untracked Files

```bash
# ดูไฟล์ที่ยังไม่ได้ track
git status

# จะแสดงไฟล์สีแดง/ส้มที่เป็น untracked
```

---

## 📋 ไฟล์ที่เห็นเป็นสีส้ม (U) — คำแนะนำ

### ✅ ไฟล์ที่ควร Commit (ถ้ามีประโยชน์)

| File | Purpose | Action |
|------|---------|--------|
| `Dockerfile` | Docker configuration | ✅ `git add Dockerfile` |
| `docker-compose.yml` | Docker compose config | ✅ `git add docker-compose.yml` |
| `.dockerignore` | Docker ignore patterns | ✅ `git add .dockerignore` |

**คำสั่ง:**
```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "Add Docker configuration"
git push
```

### 🚫 ไฟล์ที่ควร Ignore (ไม่ควร commit)

| File | Reason | Action |
|------|--------|--------|
| `Claude.dmg` | Binary file (ขนาดใหญ่) | 🚫 Already in .gitignore |
| `compose.debug.yaml` | Debug configuration | 🚫 Already in .gitignore |
| `*.log` | Log files | 🚫 Already in .gitignore |
| `.vscode/` | Editor settings | 🚫 Already in .gitignore |
| `node_modules/` | Dependencies | 🚫 Already in .gitignore |

**คำสั่ง:**
```bash
# ไม่ต้องทำอะไร - .gitignore จะจัดการให้อัตโนมัติ
# ถ้ายังเห็นใน VS Code ให้รีสตาร์ท VS Code
```

### ⚠️ ไฟล์ที่ต้องตรวจสอบก่อน

| File | Check | Action |
|------|-------|--------|
| `*.yaml` | มี credentials? | ตรวจสอบก่อน commit |
| `*.json` | มี secrets? | ตรวจสอบก่อน commit |
| `*.env` | Environment vars | 🚫 **NEVER commit** |

---

## 🧹 Clean Up Untracked Files

### Option 1: ลบไฟล์ที่ไม่ต้องการ

```bash
# ดูว่าจะลบอะไรบ้าง (ไม่ได้ลบจริง)
git clean -n

# ลบไฟล์ที่ไม่ต้องการ (ระวัง!)
git clean -f

# ลบทั้งไฟล์และ folders
git clean -fd
```

### Option 2: เก็บไว้แต่ไม่ track

```bash
# ไฟล์จะอยู่ที่ local แต่ git จะไม่ track
# ใช้ .gitignore (ทำแล้ว)
```

---

## 📦 Updated .gitignore

ผมได้อัพเดท `.gitignore` ให้ครอบคลุม:

```gitignore
# Docker files
docker-compose*.yml
compose*.yaml

# Binary files  
*.dmg
*.exe
*.app

# macOS
.DS_Store

# Allow specific files
!docker-compose.yml
!Dockerfile
```

**Pull เพื่อรับ .gitignore ใหม่:**
```bash
git pull origin cursor/agents-markdown-file-a8e1
```

---

## ✅ ตรวจสอบว่า Sync สำเร็จ

```bash
# 1. Pull ล่าสุด
git pull

# 2. ตรวจสอบ status
git status

# ควรเห็น: "nothing to commit, working tree clean"
# หรือเห็นแต่ไฟล์ที่อยู่ใน .gitignore
```

---

## 🎯 Recommended Workflow

### สำหรับไฟล์ใหม่ที่สร้างขึ้น:

1. **ตรวจสอบว่าควร commit หรือไม่**
   ```bash
   git status
   ```

2. **ถ้าควร commit:**
   ```bash
   git add <filename>
   git commit -m "Add <description>"
   git push
   ```

3. **ถ้าไม่ควร commit:**
   - เพิ่มใน `.gitignore`
   - หรือลบทิ้งถ้าไม่ต้องการ

### สำหรับไฟล์ที่มีอยู่แล้ว:

1. **Pull changes ก่อนเสมอ**
   ```bash
   git pull
   ```

2. **แก้ไข → Commit → Push**
   ```bash
   git add .
   git commit -m "Update: <description>"
   git push
   ```

---

## 🔍 Common Issues

### Issue 1: VS Code แสดงไฟล์สีส้มเยอะ

**Solution:**
```bash
# Pull ล่าสุด
git pull

# Restart VS Code
# File → Exit → เปิดใหม่
```

### Issue 2: Git pull conflict

**Solution:**
```bash
# ถ้ามี conflicts
git stash           # เก็บ changes ชั่วคราว
git pull            # Pull ล่าสุด
git stash pop       # นำ changes กลับมา
# แก้ conflicts ที่เกิดขึ้น
```

### Issue 3: ไฟล์ถูก ignore แต่ยังเห็นใน VS Code

**Solution:**
```bash
# Restart VS Code หรือ
# Source Control → Refresh
```

---

## 📞 Need Help?

### Quick Commands

```bash
# ดู status
git status

# ดูว่าอะไร ignore อยู่
git status --ignored

# ดู diff
git diff

# Undo changes
git checkout -- <file>
```

### ติดต่อสอบถาม

- ถาม Orchestrator: `claude --agent orchestrator "ปัญหา git: ..."`
- GitHub Issues
- Documentation: [README.md](./README.md)

---

## ✨ Tips

1. **Pull ก่อนเสมอ** — ก่อนเริ่มทำงาน
2. **Commit บ่อยๆ** — แบ่งเป็นงานย่อยๆ
3. **Message ชัดเจน** — อธิบายว่าทำอะไร
4. **ตรวจสอบก่อน push** — `git status` เสมอ
5. **ไม่ commit secrets** — ใช้ .env และ .gitignore

---

**Last Updated:** 2026-02-08  
**Branch:** cursor/agents-markdown-file-a8e1

[← Back to README](./README.md)
