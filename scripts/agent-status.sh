#!/usr/bin/env bash
# =====================================================
# Mosses AI Army — Agent Status Checker
# สคริปต์ตรวจสอบสถานะ Agent ทั้ง 13 หน่วย
# Created by: Cloud Agent (Cursor)
# Date: 2026-02-08
# =====================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

AGENTS_DIR=".claude/agents"
DOCS_DIR="Mosses Multi-Agent Ecosystem"

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   MOSSES AI ARMY — Agent Status Report          ║${NC}"
echo -e "${CYAN}║   กองทัพ AI Mosses — รายงานสถานะหน่วยรบ          ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# Expected agents
AGENTS=(
  "orchestrator"
  "architect"
  "n8n-engineer"
  "frontend-dev"
  "code-reviewer"
  "debugger"
  "deployer"
  "content-strategist"
  "seo-optimizer"
  "data-engineer"
  "devops"
  "data-analyst"
  "marketing-compliance"
)

TOTAL=${#AGENTS[@]}
ACTIVE=0
MISSING=0

echo -e "${YELLOW}Scanning ${TOTAL} agents...${NC}"
echo ""
echo "AGENT                     RUNTIME         DOCS"
echo "-------------------------+---------------+---------------"

for agent in "${AGENTS[@]}"; do
  runtime_label="MISSING"
  runtime_color="${RED}"
  docs_label="MISSING"
  docs_color="${RED}"

  # Check runtime prompt
  if [ -f "${AGENTS_DIR}/${agent}.md" ]; then
    runtime_label="READY"
    runtime_color="${GREEN}"
  fi

  # Check documentation
  if [ -f "${DOCS_DIR}/${agent}.md" ]; then
    docs_label="READY"
    docs_color="${GREEN}"
  fi

  # Count active (both files present)
  if [ -f "${AGENTS_DIR}/${agent}.md" ] && [ -f "${DOCS_DIR}/${agent}.md" ]; then
    ACTIVE=$((ACTIVE + 1))
  else
    MISSING=$((MISSING + 1))
  fi

  # Print row with colors
  echo -e " ${agent}$(printf '%*s' $((25 - ${#agent})) '')${runtime_color}${runtime_label}${NC}$(printf '%*s' $((15 - ${#runtime_label})) '')${docs_color}${docs_label}${NC}"
done

echo ""
echo -e "${CYAN}──────────────────────────────────────────────────${NC}"
echo -e "${GREEN}  Total Agents: ${TOTAL}${NC}"
echo -e "${GREEN}  Fully Ready:  ${ACTIVE}${NC}"
if [ ${MISSING} -gt 0 ]; then
  echo -e "${YELLOW}  Incomplete:   ${MISSING}${NC}"
fi
echo ""

# Check health report
if [ -f "agent-health-check.json" ]; then
  echo -e "${GREEN}  Health report: agent-health-check.json found${NC}"
else
  echo -e "${YELLOW}  Health report: not generated yet${NC}"
fi

echo ""
echo -e "${CYAN}  Report generated at: $(date -u '+%Y-%m-%d %H:%M:%S UTC')${NC}"
echo -e "${BLUE}  กองทัพ AI Mosses พร้อมรับคำสั่ง!${NC}"
echo ""
