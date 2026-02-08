-- Agent Runner Database Schema (D1)

-- Agent runs log
CREATE TABLE IF NOT EXISTS agent_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL,
  user_message TEXT NOT NULL,
  response TEXT,
  response_time INTEGER,
  success INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_agent_runs_agent ON agent_runs(agent);
CREATE INDEX IF NOT EXISTS idx_agent_runs_created ON agent_runs(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_runs_success ON agent_runs(success);

-- Agent performance view
CREATE VIEW IF NOT EXISTS agent_performance AS
SELECT 
  agent,
  COUNT(*) as total_runs,
  SUM(success) as successful_runs,
  AVG(response_time) as avg_response_time,
  MAX(created_at) as last_run
FROM agent_runs
GROUP BY agent;
