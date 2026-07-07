import type { NextApiRequest, NextApiResponse } from 'next';
import { buildLlmsTxt } from '../../src/lib/site';
import { getRequestOrigin } from '../../src/lib/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = getRequestOrigin(req);
  const body = buildLlmsTxt(origin);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(body);
}
