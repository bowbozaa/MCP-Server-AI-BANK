#!/bin/bash
# Deploy Monitoring Stack

set -e

echo "🎖️ MOSSES Monitoring Deployment"
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check dependencies
echo -e "${YELLOW}[1/6] Checking dependencies...${NC}"
command -v wrangler >/dev/null 2>&1 || { echo "Error: wrangler not installed"; exit 1; }
command -v psql >/dev/null 2>&1 || echo "Warning: psql not found (optional)"
echo -e "${GREEN}✓ Dependencies OK${NC}"

# Step 2: Deploy database schema
echo -e "${YELLOW}[2/6] Deploying database schema...${NC}"
if [ -n "$SUPABASE_DB_URL" ]; then
  psql "$SUPABASE_DB_URL" < schema.sql
  echo -e "${GREEN}✓ Schema deployed to Supabase${NC}"
else
  echo -e "${YELLOW}⚠ SUPABASE_DB_URL not set, skipping schema deployment${NC}"
fi

# Step 3: Set secrets
echo -e "${YELLOW}[3/6] Setting secrets...${NC}"
if [ -n "$LINE_NOTIFY_TOKEN" ]; then
  echo "$LINE_NOTIFY_TOKEN" | wrangler secret put LINE_NOTIFY_TOKEN
  echo -e "${GREEN}✓ LINE_NOTIFY_TOKEN set${NC}"
else
  echo -e "${RED}✗ LINE_NOTIFY_TOKEN not found in environment${NC}"
  echo "Please run: export LINE_NOTIFY_TOKEN=your_token"
  exit 1
fi

# Step 4: Deploy Worker
echo -e "${YELLOW}[4/6] Deploying Cloudflare Worker...${NC}"
wrangler deploy
echo -e "${GREEN}✓ Worker deployed${NC}"

# Step 5: Test deployment
echo -e "${YELLOW}[5/6] Testing deployment...${NC}"
WORKER_URL=$(wrangler deployments list --json | jq -r '.[0].url' 2>/dev/null || echo "")
if [ -n "$WORKER_URL" ]; then
  echo "Worker URL: $WORKER_URL"
  echo -e "${GREEN}✓ Deployment successful${NC}"
else
  echo -e "${YELLOW}⚠ Could not get Worker URL${NC}"
fi

# Step 6: Setup cron monitoring
echo -e "${YELLOW}[6/6] Verifying cron trigger...${NC}"
wrangler deployments list | grep -q "cron" && echo -e "${GREEN}✓ Cron trigger active${NC}" || echo -e "${YELLOW}⚠ Cron trigger not found${NC}"

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Check Worker logs: wrangler tail"
echo "2. Test LINE alert: curl -X POST $WORKER_URL/test"
echo "3. Monitor metrics in Supabase dashboard"
echo ""
