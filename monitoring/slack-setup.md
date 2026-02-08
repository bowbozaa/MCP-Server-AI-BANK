# Slack Integration Setup Guide

## 1. Create Slack Incoming Webhook

1. ไปที่ https://api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. ตั้งชื่อ: "MOSSES Monitoring"
4. เลือก Workspace
5. ไปที่ "Incoming Webhooks"
6. Activate "Activate Incoming Webhooks"
7. Click "Add New Webhook to Workspace"
8. เลือก channel ที่จะรับ notifications (เช่น #alerts)
9. Copy Webhook URL (จะเป็น https://hooks.slack.com/services/...)

## 2. Set Webhook in Cloudflare Workers

```bash
# Set secret
wrangler secret put SLACK_WEBHOOK_URL
# Paste webhook URL when prompted
```

## 3. Set Webhook in Supabase

```bash
# Add to .env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
```

## 4. Test Slack Integration

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "text": "🎖️ MOSSES Monitoring ทดสอบการแจ้งเตือน",
    "username": "MOSSES Monitor",
    "icon_emoji": ":robot_face:"
  }'
```

## 5. Alert Types

### 🔴 Critical (ส่งทันที)
- Service down
- Error rate > 10%
- Database connection failed

### ⚠️ Warning (ส่งทุก 5 นาที)
- Service degraded
- Response time > 3s
- Error rate > 5%

### ℹ️ Info (ส่งตามตาราง)
- Daily summary (06:00, 22:00)
- Performance report
- System health

## 6. Message Format

Slack messages use this format:

```json
{
  "text": "🔴 MOSSES Alert\n\nService: Supabase\nStatus: DOWN\nResponse Time: 5234ms\nTime: 08/02/2026 18:24:15\n\nDetails: HTTP 503\n\nกรุณาตรวจสอบด่วน!",
  "username": "MOSSES Monitor",
  "icon_emoji": ":robot_face:",
  "attachments": [
    {
      "color": "danger",
      "fields": [
        {"title": "Service", "value": "Supabase", "short": true},
        {"title": "Status", "value": "DOWN", "short": true}
      ]
    }
  ]
}
```

## 7. Slack Channels Recommended

Create these channels:

1. **#mosses-alerts** — Critical alerts only
2. **#mosses-reports** — Daily summaries and reports
3. **#mosses-dev** — Development notifications

Use different webhooks for each channel.

## 8. Advanced Features

### Rich Messages

```typescript
await fetch(webhookUrl, {
  method: 'POST',
  body: JSON.stringify({
    text: '🔴 Service Alert',
    attachments: [{
      color: 'danger',
      title: 'Supabase Down',
      text: 'Service not responding',
      fields: [
        { title: 'Response Time', value: '5234ms', short: true },
        { title: 'Error Rate', value: '15%', short: true }
      ],
      footer: 'MOSSES Monitor',
      ts: Math.floor(Date.now() / 1000)
    }]
  })
});
```

### Interactive Buttons

```json
{
  "text": "🔴 Service Down",
  "attachments": [{
    "fallback": "Service alert",
    "callback_id": "service_alert",
    "actions": [
      {
        "name": "acknowledge",
        "text": "Acknowledge",
        "type": "button",
        "value": "ack"
      },
      {
        "name": "investigate",
        "text": "Investigate",
        "type": "button",
        "url": "https://dashboard.example.com"
      }
    ]
  }]
}
```

## 9. Notification Schedule

| Time | Type | Content |
|------|------|---------|
| 06:00 | ℹ️ Info | Morning health check |
| Every 5min | 🔴/⚠️ | Real-time alerts |
| 22:00 | ℹ️ Info | Daily summary |

## 10. Troubleshooting

### Webhook not working
- Verify webhook URL is correct
- Check Slack app permissions
- Test with curl first

### Not receiving messages
- Check webhook is added to correct channel
- Verify SLACK_WEBHOOK_URL is set: `wrangler secret list`
- Check Worker logs: `wrangler tail`

### Too many notifications
- Adjust thresholds
- Use different channels for different severity
- Add rate limiting

## 11. Comparison: LINE vs Slack

| Feature | LINE Notify | Slack Webhook |
|---------|-------------|---------------|
| Setup | Simple (1 token) | Medium (create app + webhook) |
| Formatting | Basic text | Rich formatting + attachments |
| Channels | Limited | Multiple channels |
| Interactive | No | Yes (buttons, menus) |
| API Limits | 1000/hour | More generous |
| Best for | Simple alerts | Complex notifications |

---

**Slack is better for team collaboration and rich notifications!** 🚀
