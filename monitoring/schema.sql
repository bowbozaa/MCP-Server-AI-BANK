-- Monitoring Database Schema
-- For Supabase or D1

-- Metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tags JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_metrics_name ON metrics(name);
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_tags ON metrics USING GIN(tags);

-- Health check results table
CREATE TABLE IF NOT EXISTS health_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  response_time INTEGER NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_health_service ON health_checks(service);
CREATE INDEX IF NOT EXISTS idx_health_timestamp ON health_checks(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_health_status ON health_checks(status);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type VARCHAR(100) NOT NULL,
  severity VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_at TIMESTAMPTZ,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_sent ON alerts(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_ack ON alerts(acknowledged);

-- View for recent errors
CREATE OR REPLACE VIEW recent_errors AS
SELECT 
  service,
  COUNT(*) as error_count,
  MAX(timestamp) as last_error,
  AVG(response_time) as avg_response_time
FROM health_checks
WHERE status IN ('down', 'degraded')
  AND timestamp > NOW() - INTERVAL '1 hour'
GROUP BY service
ORDER BY error_count DESC;

-- View for service uptime
CREATE OR REPLACE VIEW service_uptime AS
SELECT 
  service,
  COUNT(CASE WHEN status = 'healthy' THEN 1 END)::FLOAT / COUNT(*)::FLOAT * 100 as uptime_percentage,
  COUNT(*) as total_checks,
  MAX(timestamp) as last_check
FROM health_checks
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY service
ORDER BY uptime_percentage ASC;
