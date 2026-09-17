# Security deployment checklist

## Trusted proxy and rate limiting

The app only trusts forwarded IP headers when `TRUSTED_PROXY=true`. Set this only when the hosting proxy or WAF overwrites `CF-Connecting-IP`, `X-Real-IP`, or `X-Forwarded-For`. Do not enable it when clients can reach the Next.js process directly.

Every route now uses an atomic Supabase rate-limit RPC. Apply the SQL migration
and set all three server-only production variables before deployment:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RATE_LIMIT_SECRET` (a long random value used only to hash client IPs)
- `TRUSTED_PROXY=true` (only when the edge proxy overwrites forwarded-IP headers)

The application deliberately fails closed when any of these are missing. Keep
the routes behind a WAF with bot protection and per-IP plus per-session quotas:

- `POST /api/search-intent`
- `POST /api/generate-email`
- `POST /api/contact`
- `POST /api/subscribe`

## Supabase RLS

Apply [`supabase/rls.sql`](supabase/rls.sql) in the Supabase SQL editor. Verify that every Storage bucket has an explicit policy. Public users should be able to read only the intended resource objects; `contact_messages` and `subscribers` must not have public `SELECT` policies.

Set `SUPABASE_SERVICE_ROLE_KEY` only in the server environment. The public forms never write directly with the anon client; the Next.js API performs validation and writes with the server-only client. Never add this key to a `NEXT_PUBLIC_*` variable.

The browser-visible anon key is only safe when these policies are active and tested.

## Secrets and headers

- Rotate any token that has ever been committed to Git history.
- Keep provider tokens in environment variables, never source files.
- Keep production HSTS enabled only when every production subdomain is HTTPS.
- Review the CSP whenever a new external image, font, frame, or API provider is introduced.
