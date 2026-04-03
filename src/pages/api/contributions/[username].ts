import type { APIRoute } from 'astro';

export const prerender = false;

// Simple in-memory cache for GitHub contribution data
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Validate GitHub username format
function isValidUsername(username: string): boolean {
  // GitHub username rules: 1-39 characters, alphanumeric and hyphens, cannot start/end with hyphen
  const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  return usernameRegex.test(username) && username.length >= 1 && username.length <= 39;
}

// Get cached data if still valid
function getCachedData(username: string): any | null {
  const entry = cache.get(username);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(username); // Remove expired entry
    return null;
  }

  return entry.data;
}

// Cache data
function setCachedData(username: string, data: any): void {
  cache.set(username, {
    data,
    timestamp: Date.now(),
    ttl: CACHE_TTL
  });
}

// Log API requests for debugging
function logRequest(username: string, status: number, duration?: number): void {
  const timestamp = new Date().toISOString();
  const durationStr = duration ? ` (${duration}ms)` : '';
  console.log(`[${timestamp}] GitHub API proxy: ${username} -> ${status}${durationStr}`);
}

export const GET: APIRoute = async({ params }) => {
  const startTime = Date.now();
  const username = params?.username ?? null;

  // Input validation
  if (!username) {
    logRequest('null', 400);
    return new Response(JSON.stringify({
      error: 'Username is required',
      message: 'Please provide a GitHub username in the URL path'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!isValidUsername(username)) {
    logRequest(username, 400);
    return new Response(JSON.stringify({
      error: 'Invalid username format',
      message: 'GitHub usernames must be 1-39 characters, containing only alphanumeric characters and hyphens (cannot start or end with hyphens)'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check cache first
  const cachedData = getCachedData(username);
  if (cachedData) {
    const duration = Date.now() - startTime;
    logRequest(username, 200, duration);
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache-Status': 'HIT'
      }
    });
  }

  try {
    // Fetch from GitHub's contribution endpoint
    const githubUrl = `https://github.com/${username}.contribs`;
    const response = await fetch(githubUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mona-Mayhem-Workshop/1.0'
      },
      // Set a reasonable timeout
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      const duration = Date.now() - startTime;

      if (response.status === 404) {
        logRequest(username, 404, duration);
        return new Response(JSON.stringify({
          error: 'User not found',
          message: `GitHub user '${username}' does not exist or has no public contributions`
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (response.status === 429) {
        logRequest(username, 429, duration);
        return new Response(JSON.stringify({
          error: 'Rate limited',
          message: 'Too many requests. Please try again later.'
        }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Other HTTP errors
      logRequest(username, response.status, duration);
      return new Response(JSON.stringify({
        error: 'GitHub API error',
        message: `Failed to fetch contribution data: ${response.status} ${response.statusText}`
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse JSON response
    const data = await response.json();

    // Cache the successful response
    setCachedData(username, data);

    const duration = Date.now() - startTime;
    logRequest(username, 200, duration);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache-Status': 'MISS'
      }
    });

  } catch (error) {
    const duration = Date.now() - startTime;

    // Handle network errors, timeouts, etc.
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        logRequest(username, 408, duration);
        return new Response(JSON.stringify({
          error: 'Request timeout',
          message: 'The request to GitHub took too long. Please try again.'
        }), {
          status: 408,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      logRequest(username, 500, duration);
      return new Response(JSON.stringify({
        error: 'Network error',
        message: `Failed to fetch contribution data: ${error.message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fallback for unknown errors
    logRequest(username, 500, duration);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: 'An unexpected error occurred while fetching contribution data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
