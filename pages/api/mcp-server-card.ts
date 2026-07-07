import type { NextApiRequest, NextApiResponse } from 'next';
import { buildServerCard } from '../../src/lib/site';
import { getRequestOrigin } from '../../src/lib/request';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = getRequestOrigin(req);
  const payload = buildServerCard(origin);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json(payload);
}
