# LINE Notify Setup Guide

## 1. Get LINE Notify Token

1. ไปที่ https://notify-bot.line.me/
2. Login ด้วย LINE account
3. คลิก "Generate token"
4. ตั้งชื่อ: "MOSSES Monitoring"
5. เลือก group ที่จะรับ notification
6. Copy token (จะแสดงครั้งเดียว!)

## 2. Set Token in Cloudflare Workers

```bash
# Set secret
wrangler secret put LINE_NOTIFY_TOKEN
# Paste token when prompted
```

## 3. Set Token in Supabase

```bash
# Add to .env
LINE_NOTIFY_TOKEN=your_token_here
```

## 4. Test LINE Notify

```bash
curl -X POST https://notify-api.line.me/api/notify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "message=🎖️ MOSSES Monitoring ทดสอบการแจ้งเตือน"
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

### ℹ️ Info (ส่งทุกชั่วโมง)
- Daily summary
- Performance report
- System health

## 6. Message Format

LINE messages use this format:

```
🔴 MOSSES Alert

Service: Supabase
Status: DOWN
Response Time: 5234ms
Time: 08/02/2026 18:24:15

Details: HTTP 503

กรุณาตรวจสอบด่วน!
```

## 7. Notification Schedule

| Time | Type | Content |
|------|------|---------|
| 06:00 | ℹ️ Info | Morning health check |
| Every 5min | 🔴/⚠️ | Real-time alerts |
| 22:00 | ℹ️ Info | Daily summary |

## 8. LINE Group Setup

Recommended to create 2 LINE groups:

1. **MOSSES Alerts** — Critical alerts only
2. **MOSSES Reports** — Daily summaries and info

Add LINE Notify bot to each group with different tokens.

## 9. Troubleshooting

### Token not working
- Check token is correct
- Token expires if not used for 30 days
- Generate new token if needed

### Not receiving alerts
- Check LINE Notify bot is in the group
- Check token is set in Workers: `wrangler secret list`
- Check logs: `wrangler tail`

### Too many alerts
- Adjust thresholds in `health-check.ts`
- Add rate limiting
- Change cron schedule

## 10. Next Steps

- ✅ Deploy monitoring Worker
- ✅ Test alerts
- ✅ Monitor for 24 hours
- ✅ Adjust thresholds
- ✅ Add more services
