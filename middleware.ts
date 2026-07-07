import { NextRequest, NextResponse } from 'next/server';

const AI_LINK_HEADERS = [
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</llms.txt>; rel="alternate"; type="text/markdown"',
];

function addAiLinkHeaders(response: NextResponse) {
  for (const value of AI_LINK_HEADERS) {
    response.headers.append('Link', value);
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/.well-known/mcp/server-card.json' || pathname === '/.well-known/mcp.json') {
    return NextResponse.rewrite(new URL('/api/mcp-server-card', request.url));
  }

  if (pathname === '/llms.txt') {
    return NextResponse.rewrite(new URL('/api/llms', request.url));
  }

  if (pathname === '/mcp') {
    return NextResponse.rewrite(new URL('/api/mcp', request.url));
  }

  return addAiLinkHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
