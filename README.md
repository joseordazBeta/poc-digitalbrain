# MCP discovery POC

Minimal Next.js proof of concept that exposes:

- `/.well-known/mcp/server-card.json`
- `/.well-known/mcp.json`
- `/llms.txt`
- `/ai`
- `/mcp`

The goal is to make the site self-describing for AI agents and point them to a canonical MCP server.

## Run locally

```bash
npm install
npm run dev
```

## What the POC includes

- A public MCP server card with the current origin injected at request time.
- A `search_site` MCP tool backed by site content.
- `llms.txt` with absolute links.
- A human-readable `/ai` page for agent instructions.

## Deploy

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Deploy as a standard Next.js project.

If you want to change the labels, set:

- `NEXT_PUBLIC_PROJECT_NAME`
- `MCP_SERVER_NAME`
- `NEXT_PUBLIC_SITE_URL`

For Vercel, set `NEXT_PUBLIC_SITE_URL` to:

```text
https://poc-digitalbrain.vercel.app
```
