import type { NextApiRequest } from 'next';

export function getRequestOrigin(req: NextApiRequest) {
  const explicitBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitBaseUrl) {
    return explicitBaseUrl.replace(/\/+$/, '');
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/+$/, '')}`;
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const forwardedHost = req.headers['x-forwarded-host'] ?? req.headers.host;
  const proto = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost;

  if (proto && host) {
    return `${proto}://${host}`;
  }

  return 'http://localhost:3000';
}
