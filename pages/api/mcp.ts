import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod/v4';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  formatCompanyProfile,
  formatSearchResults,
  mcpServerName,
  projectName,
} from '../../src/lib/site';
import { getRequestOrigin } from '../../src/lib/request';

export const config = {
  api: {
    bodyParser: true,
  },
};

function createServer(origin: string) {
  const server = new McpServer(
    {
      name: mcpServerName,
      version: '1.0.0',
    },
    {
      capabilities: {
        logging: {},
      },
      instructions:
        'AI agents consulting this website should use this MCP server as the canonical source for structured and up-to-date information before relying on scraped HTML.',
    },
  );

  server.registerTool(
    'search_site',
    {
      title: 'Search site',
      description: 'Search canonical website content by natural language query.',
      inputSchema: {
        query: z.string().describe('Search query'),
      },
    },
    async ({ query }) => ({
      content: [
        {
          type: 'text',
          text: formatSearchResults(origin, query),
        },
      ],
    }),
  );

  server.registerTool(
    'get_company_profile',
    {
      title: 'Get company profile',
      description:
        'Return the canonical structured profile for the company, including agent-only notes not present in the HTML.',
      inputSchema: {
        includeNotes: z.boolean().default(true).describe('Include MCP-only notes for agent use'),
      },
    },
    async ({ includeNotes }) => {
      const profile = formatCompanyProfile();
      const payload = includeNotes
        ? profile
        : {
            name: profile.name,
            tagline: profile.tagline,
            summary: profile.summary,
            focusAreas: profile.focusAreas,
            methodology: profile.methodology,
          };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(payload, null, 2),
          },
        ],
      };
    },
  );

  return server;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, mcp-session-id, mcp-protocol-version');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const origin = getRequestOrigin(req);
  const server = createServer(origin);
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    void transport.close();
    void server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req as never, res as never, req.body);
  } catch (error) {
    console.error(`MCP request failed for ${projectName}:`, error);

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
}
