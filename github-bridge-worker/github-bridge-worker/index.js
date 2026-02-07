/**
 * GitHub Bridge Worker + MCP Server
 * ═══════════════════════════════════════════════
 * Cloudflare Worker: proxy ระหว่าง Claude.ai/Cursor → GitHub API
 * 
 * 🔹 REST API — สำหรับ Claude.ai (web_fetch)
 * 🔹 MCP Server — สำหรับ Cursor IDE (SSE transport)
 *
 * Auth: Bearer <BRIDGE_API_KEY> header
 * Secrets: GITHUB_PAT, BRIDGE_API_KEY
 */

const GITHUB_API = "https://api.github.com";
const MCP_SERVER_INFO = { name: "flybridge", version: "1.2.0" };

// Active MCP sessions (in-memory, resets on worker restart)
const sessions = new Map();

// ─── Main Router ────────────────────────────────────────────
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return corsResponse(new Response(null, { status: 204 }));
    }

    try {
      const url = new URL(request.url);

      // MCP endpoints — Streamable HTTP (POST) + Legacy SSE (GET)
      if (url.pathname === "/mcp/sse" || url.pathname === "/mcp") {
        const authError = checkAuth(request, env);
        if (authError) return corsResponse(authError);

        if (request.method === "POST") {
          // Streamable HTTP: direct JSON-RPC request/response
          return handleStreamableHttp(request, env);
        }
        if (request.method === "GET") {
          // Legacy SSE transport
          return handleMcpSse(request, env);
        }
      }
      if (url.pathname === "/mcp/message" && request.method === "POST") {
        const authError = checkAuth(request, env);
        if (authError) return corsResponse(authError);
        return handleMcpMessage(request, env, url);
      }

      // REST: auth check (skip health)
      if (url.pathname !== "/health") {
        const authError = checkAuth(request, env);
        if (authError) return corsResponse(authError);
      }

      return corsResponse(await restRoute(request, env));
    } catch (err) {
      return corsResponse(jsonRes({ error: err.message }, 500));
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// MCP SERVER — Streamable HTTP Transport (Primary for Cursor)
// ═══════════════════════════════════════════════════════════════

async function handleStreamableHttp(request, env) {
  const rpcRequest = await request.json();

  // Handle JSON-RPC batch (array) or single request
  if (Array.isArray(rpcRequest)) {
    const results = [];
    for (const req of rpcRequest) {
      const res = await dispatchJsonRpc(req, env);
      if (res) results.push(res);
    }
    return corsResponse(new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }));
  }

  // Single request
  const response = await dispatchJsonRpc(rpcRequest, env);

  // Notifications (no id) return 202 with no body
  if (!response) {
    return corsResponse(new Response(null, { status: 202 }));
  }

  return corsResponse(new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  }));
}

// ═══════════════════════════════════════════════════════════════
// MCP SERVER — Legacy SSE Transport (Fallback)
// ═══════════════════════════════════════════════════════════════

function handleMcpSse(request, env) {
  const sessionId = crypto.randomUUID();
  const url = new URL(request.url);
  const messageUrl = `${url.origin}/mcp/message?sessionId=${sessionId}`;

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  sessions.set(sessionId, { writer, encoder, alive: true });

  // Send endpoint event
  writer.write(encoder.encode(`event: endpoint\ndata: ${messageUrl}\n\n`)).catch(() => {});

  // Auto-cleanup 30 min
  setTimeout(() => {
    sessions.delete(sessionId);
    writer.close().catch(() => {});
  }, 30 * 60 * 1000);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

async function handleMcpMessage(request, env, url) {
  const sessionId = url.searchParams.get("sessionId");
  const session = sessions.get(sessionId);

  if (!session) {
    return corsResponse(jsonRes({ error: "Session not found. Connect to /mcp/sse first." }, 404));
  }

  const rpcRequest = await request.json();
  const response = await dispatchJsonRpc(rpcRequest, env);

  if (response) {
    const sseData = `event: message\ndata: ${JSON.stringify(response)}\n\n`;
    try {
      await session.writer.write(session.encoder.encode(sseData));
    } catch {
      sessions.delete(sessionId);
    }
  }

  return corsResponse(new Response("accepted", { status: 202 }));
}

async function dispatchJsonRpc(req, env) {
  const { id, method, params } = req;

  switch (method) {
    case "initialize":
      return rpcOk(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: MCP_SERVER_INFO,
      });
    case "notifications/initialized":
      return null;
    case "ping":
      return rpcOk(id, {});
    case "tools/list":
      return rpcOk(id, { tools: mcpToolsDef() });
    case "tools/call":
      return await execMcpTool(id, params, env);
    default:
      return rpcErr(id, -32601, `Method not found: ${method}`);
  }
}

// ─── MCP Tools Definition ───────────────────────────────────

function mcpToolsDef() {
  return [
    {
      name: "read_file",
      description: "Read a file or list directory from GitHub repo",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string", description: "GitHub username/org" },
          repo: { type: "string", description: "Repository name" },
          path: { type: "string", description: "File path (empty = root)", default: "" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "write_file",
      description: "Create or update a single file in GitHub repo",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          path: { type: "string", description: "File path" },
          content: { type: "string", description: "File content (plain text)" },
          message: { type: "string", default: "Update via MCP" },
          branch: { type: "string", default: "main" },
        },
        required: ["owner", "repo", "path", "content"],
      },
    },
    {
      name: "batch_push",
      description: "Push multiple files in one atomic commit",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          files: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                content: { type: "string" },
                delete: { type: "boolean", default: false },
              },
              required: ["path"],
            },
          },
          message: { type: "string", default: "Batch update via MCP" },
          branch: { type: "string", default: "main" },
        },
        required: ["owner", "repo", "files"],
      },
    },
    {
      name: "get_repo_info",
      description: "Get repository metadata",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "trigger_workflow",
      description: "Trigger a GitHub Actions workflow",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          workflow: { type: "string", description: "Workflow filename or ID" },
          ref: { type: "string", default: "main" },
          inputs: { type: "object", default: {} },
        },
        required: ["owner", "repo", "workflow"],
      },
    },
    {
      name: "list_workflows",
      description: "List GitHub Actions workflows in a repo",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "search_code",
      description: "Search code within a GitHub repo",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          query: { type: "string", description: "Search query" },
        },
        required: ["owner", "repo", "query"],
      },
    },
    {
      name: "list_branches",
      description: "List all branches in a repo",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
        },
        required: ["owner", "repo"],
      },
    },
  ];
}

// ─── MCP Tool Execution ─────────────────────────────────────

async function execMcpTool(id, params, env) {
  const { name, arguments: args } = params;

  try {
    const handlers = {
      read_file: async ({ owner, repo, path = "" }) => {
        const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/contents/${path}`);
        if (status !== 200) return { error: data.message || "Not found", status };
        if (Array.isArray(data)) {
          return {
            type: "directory",
            path: path || "/",
            entries: data.map((e) => ({ name: e.name, type: e.type, size: e.size, path: e.path })),
          };
        }
        if (data.content && data.encoding === "base64") {
          return { type: "file", path: data.path, size: data.size, content: b64decode(data.content) };
        }
        return data;
      },

      write_file: async ({ owner, repo, path, content, message, branch = "main" }) => {
        let sha;
        const existing = await ghFetch(env, `/repos/${owner}/${repo}/contents/${path}`);
        if (existing.status === 200) sha = existing.data.sha;

        const payload = {
          message: message || `Update ${path} via MCP`,
          content: btoa(unescape(encodeURIComponent(content))),
          branch,
        };
        if (sha) payload.sha = sha;

        const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/contents/${path}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        return {
          success: status === 200 || status === 201,
          path,
          sha: data?.content?.sha,
          commit: data?.commit?.sha,
          action: sha ? "updated" : "created",
        };
      },

      batch_push: async ({ owner, repo, files, message, branch = "main" }) => {
        const mockReq = { json: async () => ({ files, message, branch }) };
        const resp = await batchPush(env, owner, repo, mockReq);
        return JSON.parse(await resp.clone().text());
      },

      get_repo_info: async ({ owner, repo }) => {
        const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}`);
        if (status !== 200) return { error: data.message, status };
        return {
          name: data.name, full_name: data.full_name, description: data.description,
          private: data.private, default_branch: data.default_branch, language: data.language,
          size: data.size, open_issues: data.open_issues_count, stars: data.stargazers_count,
          forks: data.forks_count, updated_at: data.updated_at, html_url: data.html_url,
        };
      },

      trigger_workflow: async ({ owner, repo, workflow, ref = "main", inputs = {} }) => {
        const { status, data } = await ghFetch(
          env, `/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
          { method: "POST", body: JSON.stringify({ ref, inputs }) }
        );
        return { success: status === 204, workflow, ref, message: status === 204 ? "Triggered!" : "Failed" };
      },

      list_workflows: async ({ owner, repo }) => {
        const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/actions/workflows`);
        if (status !== 200) return { error: data.message, status };
        return { workflows: (data.workflows || []).map((w) => ({ id: w.id, name: w.name, path: w.path, state: w.state })) };
      },

      search_code: async ({ owner, repo, query }) => {
        const { status, data } = await ghFetch(env, `https://api.github.com/search/code?q=${encodeURIComponent(query)}+repo:${owner}/${repo}`);
        if (status !== 200) return { error: data.message, status };
        return { total: data.total_count, items: (data.items || []).slice(0, 20).map((i) => ({ name: i.name, path: i.path, url: i.html_url })) };
      },

      list_branches: async ({ owner, repo }) => {
        const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/branches`);
        if (status !== 200) return { error: data.message, status };
        return { branches: (data || []).map((b) => ({ name: b.name, protected: b.protected, sha: b.commit.sha })) };
      },
    };

    const handler = handlers[name];
    if (!handler) return rpcErr(id, -32602, `Unknown tool: ${name}`);

    const result = await handler(args);
    return rpcOk(id, { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
  } catch (err) {
    return rpcOk(id, { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true });
  }
}

// ═══════════════════════════════════════════════════════════════
// REST API
// ═══════════════════════════════════════════════════════════════

async function restRoute(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === "/health") {
    return jsonRes({
      status: "ok",
      service: "flybridge",
      version: MCP_SERVER_INFO.version,
      features: ["rest-api", "mcp-server"],
      mcp_endpoint: "/mcp/sse",
      active_sessions: sessions.size,
      timestamp: new Date().toISOString(),
    });
  }

  const m = path.match(/^\/repos\/([^/]+)\/([^/]+)(?:\/(.+))?$/);
  if (!m) return jsonRes({ error: "Not found", usage: endpointList() }, 404);

  const [, owner, repo, rest] = m;

  if (!rest && method === "GET") {
    const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}`);
    return jsonRes(data, status);
  }

  if (rest?.startsWith("contents") && method === "GET") {
    const fp = rest.replace(/^contents\/?/, "") || "";
    const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/contents/${fp}`);
    if (data.content && data.encoding === "base64") data.decoded_content = b64decode(data.content);
    return jsonRes(data, status);
  }

  if (rest?.startsWith("contents") && method === "PUT") {
    const fp = rest.replace(/^contents\/?/, "") || "";
    return putFile(env, owner, repo, fp, request);
  }

  if (rest === "push" && method === "POST") return batchPush(env, owner, repo, request);
  if (rest === "dispatch" && method === "POST") return restDispatch(env, owner, repo, request);
  if (rest === "workflows" && method === "GET") return restWorkflows(env, owner, repo);

  return jsonRes({ error: "Not found", usage: endpointList() }, 404);
}

async function putFile(env, owner, repo, path, request) {
  const body = await request.json();
  if (!body.content) return jsonRes({ error: "content is required" }, 400);

  let sha = body.sha;
  if (!sha) {
    const ex = await ghFetch(env, `/repos/${owner}/${repo}/contents/${path}`);
    if (ex.status === 200) sha = ex.data.sha;
  }

  const payload = {
    message: body.message || `Update ${path} via flybridge`,
    content: btoa(unescape(encodeURIComponent(body.content))),
    branch: body.branch || "main",
  };
  if (sha) payload.sha = sha;

  const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return jsonRes({ success: status === 200 || status === 201, path, sha: data?.content?.sha, commit: data?.commit?.sha }, status);
}

async function batchPush(env, owner, repo, request) {
  const body = await request.json();
  const { files, message, branch = "main" } = body;

  if (!files?.length) return jsonRes({ error: "files array required" }, 400);

  const refRes = await ghFetch(env, `/repos/${owner}/${repo}/git/ref/heads/${branch}`);
  if (refRes.status !== 200) return jsonRes({ error: `Branch '${branch}' not found` }, 404);

  const latestSha = refRes.data.object.sha;
  const commitRes = await ghFetch(env, `/repos/${owner}/${repo}/git/commits/${latestSha}`);
  const baseTree = commitRes.data.tree.sha;

  const tree = [];
  for (const file of files) {
    if (file.delete) {
      tree.push({ path: file.path, mode: "100644", type: "blob", sha: null });
    } else {
      const blob = await ghFetch(env, `/repos/${owner}/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
      });
      if (blob.status !== 201) return jsonRes({ error: `Blob failed: ${file.path}` }, 500);
      tree.push({ path: file.path, mode: file.executable ? "100755" : "100644", type: "blob", sha: blob.data.sha });
    }
  }

  const treeRes = await ghFetch(env, `/repos/${owner}/${repo}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTree, tree }),
  });
  if (treeRes.status !== 201) return jsonRes({ error: "Tree creation failed" }, 500);

  const commitNew = await ghFetch(env, `/repos/${owner}/${repo}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message: message || `Batch update ${files.length} files`,
      tree: treeRes.data.sha,
      parents: [latestSha],
    }),
  });
  if (commitNew.status !== 201) return jsonRes({ error: "Commit failed" }, 500);

  await ghFetch(env, `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commitNew.data.sha }),
  });

  return jsonRes({
    success: true,
    commit: commitNew.data.sha,
    branch,
    files_pushed: files.length,
    files: files.map((f) => ({ path: f.path, action: f.delete ? "deleted" : "pushed" })),
  });
}

async function restDispatch(env, owner, repo, request) {
  const { workflow, ref = "main", inputs = {} } = await request.json();
  if (!workflow) return jsonRes({ error: "workflow required" }, 400);

  const { status } = await ghFetch(
    env,
    `/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
    { method: "POST", body: JSON.stringify({ ref, inputs }) }
  );
  return jsonRes({ success: status === 204, workflow, ref });
}

async function restWorkflows(env, owner, repo) {
  const { status, data } = await ghFetch(env, `/repos/${owner}/${repo}/actions/workflows`);
  if (status !== 200) return jsonRes(data, status);
  return jsonRes({ workflows: (data.workflows || []).map((w) => ({ id: w.id, name: w.name, path: w.path, state: w.state })) });
}

// ─── GitHub Fetch ───────────────────────────────────────────

async function ghFetch(env, path, options = {}) {
  const url = path.startsWith("http") ? path : `${GITHUB_API}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "flybridge/1.1",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

// ─── Auth ───────────────────────────────────────────────────

function checkAuth(request, env) {
  if (!env.BRIDGE_API_KEY) return jsonRes({ error: "BRIDGE_API_KEY not configured" }, 500);
  const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (token !== env.BRIDGE_API_KEY) return jsonRes({ error: "Unauthorized" }, 401);
  return null;
}

// ─── Utils ──────────────────────────────────────────────────

function b64decode(s) {
  try { return decodeURIComponent(escape(atob(s.replace(/\n/g, "")))); }
  catch { return atob(s.replace(/\n/g, "")); }
}

function jsonRes(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function rpcOk(id, result) { return { jsonrpc: "2.0", id, result }; }
function rpcErr(id, code, message) { return { jsonrpc: "2.0", id, error: { code, message } }; }

function corsResponse(response) {
  const h = new Headers(response.headers);
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  return new Response(response.body, { status: response.status, headers: h });
}

function endpointList() {
  return {
    rest: {
      "GET /health": "Health + MCP status",
      "GET /repos/:o/:r": "Repo info",
      "GET /repos/:o/:r/contents/:p": "Read file",
      "PUT /repos/:o/:r/contents/:p": "Write file",
      "POST /repos/:o/:r/push": "Batch push",
      "POST /repos/:o/:r/dispatch": "Trigger workflow",
      "GET /repos/:o/:r/workflows": "List workflows",
    },
    mcp: {
      "POST /mcp/sse": "Streamable HTTP (JSON-RPC, primary)",
      "GET /mcp/sse": "SSE stream (legacy fallback)",
      "POST /mcp/message": "JSON-RPC messages (legacy SSE)",
    },
  };
}
