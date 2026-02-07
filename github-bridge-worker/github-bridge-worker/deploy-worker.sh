#!/usr/bin/env bash
# ═══════════════════════════════════════════════
# deploy-worker.sh — Deploy GitHub Bridge Worker
# ═══════════════════════════════════════════════
set -euo pipefail

echo "🚀 GitHub Bridge Worker — Deploy"
echo "═══════════════════════════════════"

# Check wrangler
if ! command -v npx &>/dev/null; then
  echo "❌ ต้องมี Node.js + npm"
  echo "   brew install node หรือ https://nodejs.org"
  exit 1
fi

echo "📦 Installing wrangler..."
npm install -g wrangler 2>/dev/null || true

# Check login
echo ""
echo "🔐 Cloudflare Login"
echo "   ถ้ายังไม่ได้ login จะเปิด browser ให้ authenticate"
npx wrangler whoami 2>/dev/null || npx wrangler login

# Deploy
echo ""
echo "🚀 Deploying worker..."
npx wrangler deploy

echo ""
echo "═══════════════════════════════════"
echo "✅ Worker deployed!"
echo ""

# Set secrets
echo "🔐 ตั้งค่า Secrets"
echo "─────────────────────────────────"

echo ""
echo "1/2: GITHUB_PAT (Personal Access Token)"
echo "  สร้างที่: https://github.com/settings/tokens/new"
echo "  Scopes: repo (full)"
read -p "  ใส่ token: " pat
if [[ -n "$pat" ]]; then
  echo "$pat" | npx wrangler secret put GITHUB_PAT
  echo "  ✅ Set!"
fi

echo ""
echo "2/2: BRIDGE_API_KEY (API key สำหรับ Claude เรียก Worker)"
echo "  จะ generate ให้อัตโนมัติ หรือจะใส่เอง"
read -p "  ใส่ key (Enter=auto generate): " key
if [[ -z "$key" ]]; then
  key=$(openssl rand -hex 32)
  echo "  🔑 Generated: $key"
  echo "  ⚠️  เก็บ key นี้ไว้! ต้องใช้ตอนเรียก Worker"
fi
echo "$key" | npx wrangler secret put BRIDGE_API_KEY
echo "  ✅ Set!"

echo ""
echo "═══════════════════════════════════"
echo "🎉 Setup เสร็จสมบูรณ์!"
echo "═══════════════════════════════════"
echo ""
echo "Worker URL: https://github-bridge.<YOUR_SUBDOMAIN>.workers.dev"
echo ""
echo "ทดสอบ:"
echo "  curl https://github-bridge.<YOUR_SUBDOMAIN>.workers.dev/health"
echo ""
echo "  curl -H 'Authorization: Bearer <BRIDGE_API_KEY>' \\"
echo "    https://github-bridge.<YOUR_SUBDOMAIN>.workers.dev/repos/bowbozaa/ADMIN"
echo ""
echo "⚠️  สำคัญ: บอก BRIDGE_API_KEY + Worker URL ให้ Claude.ai จำไว้"
echo "   เพื่อให้หนูเรียก Worker push ไฟล์แทนได้ในครั้งถัดไป"
