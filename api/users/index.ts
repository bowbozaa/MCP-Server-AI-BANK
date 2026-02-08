/**
 * Users API Routes
 * Entry point for Cloudflare Worker
 */

import { UsersAPI } from './handler';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle OPTIONS (CORS preflight)
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route matching
    const userIdMatch = path.match(/^\/api\/users\/([^\/]+)$/);

    try {
      // GET /api/users - List all users
      if (path === '/api/users' && method === 'GET') {
        const response = await UsersAPI.listUsers(request);
        return addCorsHeaders(response, corsHeaders);
      }

      // POST /api/users - Create user
      if (path === '/api/users' && method === 'POST') {
        const response = await UsersAPI.createUser(request);
        return addCorsHeaders(response, corsHeaders);
      }

      // GET /api/users/:id - Get single user
      if (userIdMatch && method === 'GET') {
        const userId = userIdMatch[1];
        const response = await UsersAPI.getUser(request, userId);
        return addCorsHeaders(response, corsHeaders);
      }

      // PUT /api/users/:id - Update user
      if (userIdMatch && method === 'PUT') {
        const userId = userIdMatch[1];
        const response = await UsersAPI.updateUser(request, userId);
        return addCorsHeaders(response, corsHeaders);
      }

      // DELETE /api/users/:id - Delete user
      if (userIdMatch && method === 'DELETE') {
        const userId = userIdMatch[1];
        const response = await UsersAPI.deleteUser(request, userId);
        return addCorsHeaders(response, corsHeaders);
      }

      // Not found
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

function addCorsHeaders(response: Response, corsHeaders: Record<string, string>): Response {
  const newResponse = new Response(response.body, response);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}
