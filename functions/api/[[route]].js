/**
 * Cloudflare Pages Functions - API catchall route
 * Runs on Cloudflare Workers runtime
 * Access: /api/*
 *
 * Docs: https://developers.cloudflare.com/pages/functions/
 */
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  // Example: GET /api/hello
  if (url.pathname === '/api/hello') {
    return Response.json({
      message: 'Hello from Cloudflare Workers!',
      timestamp: new Date().toISOString(),
    })
  }

  return Response.json({ error: 'Not found' }, { status: 404 })
}
