#!/bin/bash
# Test Monitoring Alerts

echo "🧪 Testing MOSSES Monitoring System"
echo "===================================="

# Load config
if [ -f .env ]; then
  source .env
fi

# Test 1: LINE Notify
echo ""
echo "[Test 1/3] Testing LINE Notify..."
if [ -z "$LINE_NOTIFY_TOKEN" ]; then
  echo "❌ LINE_NOTIFY_TOKEN not set"
  exit 1
fi

curl -X POST https://notify-api.line.me/api/notify \
  -H "Authorization: Bearer $LINE_NOTIFY_TOKEN" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "message=🧪 MOSSES Monitoring Test

✅ LINE Notify integration working!

Time: $(date '+%Y-%m-%d %H:%M:%S')

This is a test message from monitoring system."

echo ""
echo "✅ LINE message sent! Check your LINE app"

# Test 2: Health Check
echo ""
echo "[Test 2/3] Testing Health Check..."
if [ -n "$WORKER_URL" ]; then
  response=$(curl -s -o /dev/null -w "%{http_code}" "$WORKER_URL/health")
  if [ "$response" = "200" ]; then
    echo "✅ Health check endpoint responding: $response"
  else
    echo "⚠️  Health check returned: $response"
  fi
else
  echo "⚠️  WORKER_URL not set, skipping"
fi

# Test 3: Database Connection
echo ""
echo "[Test 3/3] Testing Database..."
if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_KEY" ]; then
  response=$(curl -s -w "%{http_code}" -o /dev/null \
    "$SUPABASE_URL/rest/v1/metrics?limit=1" \
    -H "apikey: $SUPABASE_KEY")
  
  if [ "$response" = "200" ]; then
    echo "✅ Database connection OK: $response"
  else
    echo "⚠️  Database returned: $response"
  fi
else
  echo "⚠️  Supabase credentials not set, skipping"
fi

echo ""
echo "===================================="
echo "✅ Tests Complete!"
echo "===================================="
echo ""
echo "Check your LINE app for the test message."
echo ""
