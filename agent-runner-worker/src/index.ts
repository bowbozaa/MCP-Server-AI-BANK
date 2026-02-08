/**
 * MOSSES Agent Runner Worker
 * Cloudflare Worker that executes MOSSES ARMY agents via API
 * 
 * Endpoints:
 * - POST /run - Run single agent
 * - POST /run/batch - Run multiple agents sequentially
 * - GET /agents - List available agents
 * - GET /health - Health check
 */

import Anthropic from '@anthropic-ai/sdk';

interface Env {
  ANTHROPIC_API_KEY: string;
  RUNNER_API_KEY: string;
  LINE_NOTIFY_TOKEN: string;
  AGENT_CACHE: KVNamespace;
  DB: D1Database;
}

interface AgentRunRequest {
  agent: string;
  userMessage: string;
  context?: Record<string, any>;
}

interface BatchRunRequest {
  tasks: Array<{
    agent: string;
    prompt: string;
  }>;
}

// Available agents
const AGENTS = [
  'orchestrator',
  'architect',
  'n8n-engineer',
  'frontend-dev',
  'code-reviewer',
  'debugger',
  'deployer',
  'content-strategist',
  'seo-optimizer',
  'data-engineer',
  'devops',
  'data-analyst',
  'marketing-compliance',
  'code-agent',
  'content-agent',
  'business-agent',
  'security-agent',
];

// Agent system prompts (simplified - full versions in .claude/agents/)
const AGENT_PROMPTS: Record<string, string> = {
  orchestrator: 'You are the Orchestrator - Supreme Commander of MOSSES ARMY. Coordinate all agents.',
  architect: 'You are the Architect - design system architecture.',
  'n8n-engineer': 'You are the n8n Engineer - create automation workflows.',
  'frontend-dev': 'You are the Frontend Developer - build UI/UX.',
  'code-reviewer': 'You are the Code Reviewer - review code quality and security.',
  debugger: 'You are the Debugger - find and fix bugs.',
  deployer: 'You are the Deployer - handle deployments.',
  'content-strategist': 'You are the Content Strategist - plan and create content.',
  'seo-optimizer': 'You are the SEO Optimizer - optimize for search engines.',
  'data-engineer': 'You are the Data Engineer - design databases and pipelines.',
  devops: 'You are DevOps - manage infrastructure and CI/CD.',
  'data-analyst': 'You are the Data Analyst - analyze data and create reports.',
  'marketing-compliance': 'You are Marketing Compliance - ensure legal compliance.',
  'code-agent': 'You are the Code Agent - handle all coding tasks.',
  'content-agent': 'You are the Content Agent for Bangkok 3099 - AI video content.',
  'business-agent': 'You are the Business Agent for Sabi Shop - business operations.',
  'security-agent': 'You are the Security Agent - monitor security and vulnerabilities.',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (path === '/health' && request.method === 'GET') {
      return Response.json(
        {
          status: 'healthy',
          agents: AGENTS.length,
          timestamp: new Date().toISOString(),
        },
        { headers: corsHeaders }
      );
    }

    // List agents
    if (path === '/agents' && request.method === 'GET') {
      return Response.json(
        {
          agents: AGENTS,
          count: AGENTS.length,
        },
        { headers: corsHeaders }
      );
    }

    // Run single agent
    if (path === '/run' && request.method === 'POST') {
      // Check API key
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || authHeader !== `Bearer ${env.RUNNER_API_KEY}`) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const body = (await request.json()) as AgentRunRequest;
        const result = await runAgent(body.agent, body.userMessage, env, body.context);
        return Response.json(result, { headers: corsHeaders });
      } catch (error) {
        return Response.json(
          {
            error: 'Invalid request',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Batch run
    if (path === '/run/batch' && request.method === 'POST') {
      // Check API key
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || authHeader !== `Bearer ${env.RUNNER_API_KEY}`) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const body = (await request.json()) as BatchRunRequest;
        const results = [];

        for (const task of body.tasks) {
          const result = await runAgent(task.agent, task.prompt, env);
          results.push(result);
        }

        return Response.json({ results }, { headers: corsHeaders });
      } catch (error) {
        return Response.json(
          {
            error: 'Batch run failed',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    return Response.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  },
};

/**
 * Run an agent with Claude API
 */
async function runAgent(
  agentName: string,
  userMessage: string,
  env: Env,
  context?: Record<string, any>
): Promise<any> {
  // Validate agent
  if (!AGENTS.includes(agentName)) {
    throw new Error(`Unknown agent: ${agentName}`);
  }

  const systemPrompt = AGENT_PROMPTS[agentName];
  const startTime = Date.now();

  try {
    // Call Claude API
    const anthropic = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: agentName === 'orchestrator' || agentName === 'architect' 
        ? 'claude-opus-4-20250514' 
        : 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: context 
            ? `Context: ${JSON.stringify(context)}\n\nTask: ${userMessage}`
            : userMessage,
        },
      ],
    });

    const responseTime = Date.now() - startTime;
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // Log to D1
    await logAgentRun(env.DB, {
      agent: agentName,
      userMessage,
      response: responseText,
      responseTime,
      success: true,
    });

    return {
      agent: agentName,
      response: responseText,
      responseTime,
      timestamp: new Date().toISOString(),
      success: true,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log error
    await logAgentRun(env.DB, {
      agent: agentName,
      userMessage,
      response: errorMessage,
      responseTime,
      success: false,
    });

    // Send LINE alert for critical errors
    await sendLineAlert(env.LINE_NOTIFY_TOKEN, `🔴 Agent Error\n\nAgent: ${agentName}\nError: ${errorMessage}`);

    throw error;
  }
}

/**
 * Log agent run to D1
 */
async function logAgentRun(
  db: D1Database,
  log: {
    agent: string;
    userMessage: string;
    response: string;
    responseTime: number;
    success: boolean;
  }
): Promise<void> {
  try {
    await db
      .prepare(
        `INSERT INTO agent_runs (agent, user_message, response, response_time, success, created_at) 
         VALUES (?, ?, ?, ?, ?, datetime('now'))`
      )
      .bind(log.agent, log.userMessage, log.response, log.responseTime, log.success ? 1 : 0)
      .run();
  } catch (error) {
    console.error('Failed to log agent run:', error);
  }
}

/**
 * Send LINE alert
 */
async function sendLineAlert(token: string, message: string): Promise<void> {
  try {
    await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ message }),
    });
  } catch (error) {
    console.error('Failed to send LINE alert:', error);
  }
}
