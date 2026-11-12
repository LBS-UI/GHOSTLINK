/**
 * GHOSTLINK // FIELD INTERFACE
 * Cloudflare Worker entry point.
 *
 * The Worker runs for every request. Static assets (index.html,
 * manifest.webmanifest, sw.js, _headers) are served by the ASSETS binding.
 * The only custom route is /api/health, which gives you a real place to
 * hang edge logic later — auth, feature flags, geo-routing — without
 * changing the deployment shape.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Lightweight health probe. Useful for uptime checks and for confirming
    // the Worker is live before the shell is verified.
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'ghostlink',
          ts: new Date().toISOString(),
          colo: request.cf?.colo ?? null,
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
          },
        }
      );
    }

    // Everything else: hand off to the static assets layer.
    return env.ASSETS.fetch(request);
  },
};