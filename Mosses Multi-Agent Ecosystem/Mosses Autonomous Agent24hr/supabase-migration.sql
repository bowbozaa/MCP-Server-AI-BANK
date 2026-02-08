-- ═══════════════════════════════════════════════════════════════
-- Mosses Autonomous Agent System — Supabase Tables
-- Run this in Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- Table 1: agent_runs (log ทุกรอบที่รัน)
CREATE TABLE IF NOT EXISTS agent_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id TEXT NOT NULL,                    -- e.g. 'run_20260208_060000'
  schedule_round TEXT NOT NULL,            -- 'morning', 'content', 'analytics', 'maintenance', 'summary'
  agent_name TEXT NOT NULL,                -- 'orchestrator', 'devops', 'content-strategist', etc.
  task_type TEXT NOT NULL,                 -- 'health_check', 'content_create', 'report', etc.
  input_summary TEXT,                      -- prompt ที่ส่งให้ agent (truncated)
  output_summary TEXT,                     -- response ที่ได้จาก agent
  status TEXT DEFAULT 'running',           -- 'running', 'success', 'failed', 'skipped'
  error_message TEXT,
  tokens_used INTEGER DEFAULT 0,
  execution_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Table 2: agent_tasks (task queue สำหรับ agent)
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_description TEXT NOT NULL,
  assigned_agent TEXT,                     -- agent ที่รับผิดชอบ
  priority TEXT DEFAULT 'normal',          -- 'critical', 'high', 'normal', 'low'
  status TEXT DEFAULT 'pending',           -- 'pending', 'in_progress', 'done', 'failed'
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by TEXT DEFAULT 'orchestrator'
);

-- Table 3: daily_reports (สรุปรายวัน)
CREATE TABLE IF NOT EXISTS daily_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_date DATE DEFAULT CURRENT_DATE,
  report_type TEXT NOT NULL,               -- 'health', 'content', 'analytics', 'maintenance', 'summary'
  content JSONB NOT NULL,                  -- full JSON response from agent
  highlights TEXT[],                       -- key takeaways
  alerts TEXT[],                           -- critical items
  score INTEGER,                           -- daily score 1-10
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES (for fast queries)
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_agent_runs_created ON agent_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_runs_status ON agent_runs(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_round ON agent_runs(schedule_round);
CREATE INDEX IF NOT EXISTS idx_agent_runs_run_id ON agent_runs(run_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent ON agent_tasks(assigned_agent);
CREATE INDEX IF NOT EXISTS idx_daily_reports_date ON daily_reports(report_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_reports_type ON daily_reports(report_type);

-- ═══════════════════════════════════════════════════════════════
-- RLS (Row Level Security) — enable for production
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;

-- Allow service_role (n8n uses service_role key) full access
CREATE POLICY IF NOT EXISTS "service_role_agent_runs" ON agent_runs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "service_role_agent_tasks" ON agent_tasks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "service_role_daily_reports" ON daily_reports
  FOR ALL USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- HELPER VIEWS (optional but useful)
-- ═══════════════════════════════════════════════════════════════

-- View: last run per round
CREATE OR REPLACE VIEW v_last_run_per_round AS
SELECT DISTINCT ON (schedule_round)
  schedule_round,
  run_id,
  agent_name,
  status,
  output_summary,
  created_at
FROM agent_runs
ORDER BY schedule_round, created_at DESC;

-- View: today's runs
CREATE OR REPLACE VIEW v_today_runs AS
SELECT *
FROM agent_runs
WHERE created_at::date = CURRENT_DATE
ORDER BY created_at DESC;

-- View: today's summary for LINE notification
CREATE OR REPLACE VIEW v_today_summary AS
SELECT
  COUNT(*) AS total_runs,
  COUNT(*) FILTER (WHERE status = 'success') AS success_count,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_count,
  ARRAY_AGG(DISTINCT schedule_round) AS rounds_completed,
  MAX(created_at) AS last_run_at
FROM agent_runs
WHERE created_at::date = CURRENT_DATE;
