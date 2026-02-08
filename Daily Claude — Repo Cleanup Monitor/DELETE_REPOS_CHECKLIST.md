# 🗑️ Repository Deletion Checklist

> **Created:** 2026-01-04 16:47:09 UTC  
> **Last Updated:** 2026-02-07  
> **Author:** bowbozaa  
> **Status:** ⚠️ RESCHEDULED — Original phases overdue, consolidated into new waves

---

## 📊 Summary

| Metric | Value |
|--------|-------|
| Total repos to delete | 9 |
| Private repos | 7 |
| Public repos | 2 |
| Total size | ~21.4 MB |
| Total open issues | 18 |
| Completed | 0 |
| **New deadline** | **2026-02-28** |

---

## 🔄 Consolidated Wave Schedule

> Phase 1 (Jan 15), Phase 2 (Jan 20), Phase 3 (Feb 1) เลยกำหนดทั้งหมด
> จึง consolidate ใหม่เป็น 3 waves ตาม risk level

---

### 🟢 Wave 1: Immediate — No Dependencies (Feb 8-10)

| # | Repository | Visibility | Language | Size | Issues | Original Date |
|---|-----------|------------|----------|------|--------|---------------|
| 1 | `temp-build-artifacts` | Private | — | 8 MB | 0 | ~~Jan 10~~ |
| 2 | `legacy-project-1` | Private | Python | 2 MB | 0 | ~~Jan 15~~ |
| 3 | `test-repo-archive` | Private | JavaScript | 512 KB | 2 | ~~Jan 15~~ |
| 4 | `migration-test-repo` | Private | Shell | 256 KB | 1 | ~~Jan 15~~ |

**Reason:** ไม่มี dependencies, ไม่มี forks, private ทั้งหมด → ลบได้เลย

**Pre-deletion checklist:**
- [ ] Run `./backup_repos.sh --wave 1`
- [ ] Verify backup files + checksums
- [ ] Close open issues: `test-repo-archive` (2), `migration-test-repo` (1)
- [ ] Delete repos: `gh repo delete bowbozaa/<name> --yes`
- [ ] Update status below to ✅

| Task | temp-build-artifacts | legacy-project-1 | test-repo-archive | migration-test-repo |
|------|:---:|:---:|:---:|:---:|
| Backed up | ⬜ | ⬜ | ⬜ | ⬜ |
| Issues closed/migrated | N/A | N/A | ⬜ (2) | ⬜ (1) |
| Dependencies verified | ⬜ | ⬜ | ⬜ | ⬜ |
| **Deleted** | ⬜ | ⬜ | ⬜ | ⬜ |

---

### 🟡 Wave 2: Low Risk — Check Dependencies (Feb 12-14)

| # | Repository | Visibility | Language | Size | Issues | Original Date |
|---|-----------|------------|----------|------|--------|---------------|
| 5 | `experimental-feature-branch` | Private | TypeScript | 768 KB | 3 | ~~Jan 15~~ |
| 6 | `prototype-sandbox` | Private | Go | 1.5 MB | 7 | ~~Jan 15~~ |
| 7 | `old-documentation` | Private | Markdown | 1 MB | 5 | ~~Jan 20~~ |

**Reason:** มี open issues ค่อนข้างเยอะ (15 issues) ต้อง migrate/close ก่อน

**Pre-deletion checklist:**
- [ ] Run `./backup_repos.sh --wave 2`
- [ ] Close/migrate issues: `experimental-feature-branch` (3), `prototype-sandbox` (7), `old-documentation` (5)
- [ ] Verify `prototype-sandbox` features moved to main project
- [ ] Verify `old-documentation` content migrated to wiki/internal docs
- [ ] Search codebase: `grep -r "experimental-feature-branch\|prototype-sandbox\|old-documentation"`
- [ ] Delete repos → Update status to ✅

| Task | experimental-feature-branch | prototype-sandbox | old-documentation |
|------|:---:|:---:|:---:|
| Backed up | ⬜ | ⬜ | ⬜ |
| Issues closed/migrated | ⬜ (3) | ⬜ (7) | ⬜ (5) |
| Content migrated | N/A | ⬜ features → main | ⬜ docs → wiki |
| Dependencies verified | ⬜ | ⬜ | ⬜ |
| **Deleted** | ⬜ | ⬜ | ⬜ |

---

### 🔴 Wave 3: Public Repos — Extended Notice (Feb 18-28)

| # | Repository | Visibility | Language | Size | Stars | Forks | Original Date |
|---|-----------|------------|----------|------|-------|-------|---------------|
| 8 | `deprecated-api-v1` | **PUBLIC** | Java | 4 MB | 5 ⭐ | 1 | ~~Feb 1~~ |
| 9 | `client-legacy-sdk` | **PUBLIC** | C# | 3.5 MB | 12 ⭐ | 3 | Mar 1 |

**Reason:** Public repos มี external users, stars, forks → ต้อง notify + migration guide

**Pre-deletion checklist:**
- [ ] Run `./backup_repos.sh --wave 3`
- [ ] **`deprecated-api-v1`:** deprecation README + migration guide + notify 1 fork owner + wait 7 days
- [ ] **`client-legacy-sdk`:** deprecation README + SDK v2 migration guide + notify 3 fork owners + 4 watchers + wait 14 days
- [ ] Get final sign-off from Mosses
- [ ] Delete repos → Update status to ✅

| Task | deprecated-api-v1 | client-legacy-sdk |
|------|:---:|:---:|
| Backed up | ⬜ | ⬜ |
| Deprecation notice in README | ⬜ | ⬜ |
| Migration guide published | ⬜ | ⬜ |
| Fork owners notified | ⬜ (1) | ⬜ (3) |
| Notice period elapsed | ⬜ (7d) | ⬜ (14d) |
| Final sign-off | ⬜ | ⬜ |
| **Deleted** | ⬜ | ⬜ |

---

## 📦 Backup Locations

| Repository | S3 Backup | Retention |
|-----------|-----------|-----------|
| temp-build-artifacts | `s3://backup-bucket/bowbozaa/temp-build-artifacts/` | 30 days |
| legacy-project-1 | `s3://backup-bucket/bowbozaa/legacy-project-1/` | 90 days |
| test-repo-archive | `s3://backup-bucket/bowbozaa/test-repo-archive/` | 90 days |
| migration-test-repo | `s3://backup-bucket/bowbozaa/migration-test-repo/` | 90 days |
| experimental-feature-branch | `s3://backup-bucket/bowbozaa/experimental-feature-branch/` | 90 days |
| prototype-sandbox | `s3://backup-bucket/bowbozaa/prototype-sandbox/` | 90 days |
| old-documentation | `s3://backup-bucket/bowbozaa/old-documentation/` | 90 days |
| deprecated-api-v1 | `s3://backup-bucket/bowbozaa/deprecated-api-v1/` | 180 days |
| client-legacy-sdk | `s3://backup-bucket/bowbozaa/client-legacy-sdk/` | 180 days |

---

## ✅ Compliance

| Requirement | Status |
|-------------|--------|
| GDPR Compliant | ✅ |
| Backup Encryption | AES-256 |
| Backup Replication | Multi-region |
| Approval | bowbozaa (2026-01-04) |

---

## ✍️ Sign-Off

| Milestone | Signed By | Date |
|-----------|-----------|------|
| All backups verified | | |
| Wave 1 complete | | |
| Wave 2 complete | | |
| Wave 3 complete | | |
| **Final sign-off** | | |

---

## 📝 Changelog

| Date | Action |
|------|--------|
| 2026-01-04 | Initial checklist created |
| 2026-01-06 | Updated with dependency audit |
| 2026-02-07 | ⚠️ Rescheduled: Consolidated overdue phases into Wave 1-3 by risk |

*Synced with `repos_deletion_export.json` — 9 repositories total*
