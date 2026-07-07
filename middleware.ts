import { NextRequest, NextResponse } from 'next/server';

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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
