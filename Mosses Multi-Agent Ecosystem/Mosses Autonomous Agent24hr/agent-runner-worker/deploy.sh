#!/bin/bash
# Deploy Mosses Agent Runner Worker to Cloudflare
# ================================================
# Usage: ./deploy.sh
#
# Prerequisites:
#   1. npm install -g wrangler
#   2. wrangler login
#   3. Set secrets (run once):
#      wrangler secret put RUNNER_API_KEY
#      wrangler secret put ANTHROPIC_API_KEY

set -e

echo "=== Mosses Agent Runner — Deploy ==="

# Install deps
npm install

# Deploy
echo "Deploying to Cloudflare Workers..."
npx wrangler deploy

echo ""
echo "=== Deploy complete! ==="
echo ""
echo "Next steps:"
echo "  1. Set secrets (if not done):"
echo "     wrangler secret put RUNNER_API_KEY"
echo "     wrangler secret put ANTHROPIC_API_KEY"
echo ""
echo "  2. Test:"
echo "     curl https://mosses-agent-runner.<your-subdomain>.workers.dev/health"
echo ""
echo "  3. Test agent call:"
echo '     curl -X POST https://mosses-agent-runner.<your-subdomain>.workers.dev/run \'
echo '       -H "Authorization: Bearer <YOUR_RUNNER_API_KEY>" \'
echo '       -H "Content-Type: application/json" \'
echo '       -d '"'"'{"agent":"devops","userMessage":"health check ทุก service"}'"'"''
