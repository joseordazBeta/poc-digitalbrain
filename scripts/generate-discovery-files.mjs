import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME?.trim() || 'Digital Brain POC';
const mcpServerName = process.env.MCP_SERVER_NAME?.trim() || 'digital-brain-mcp';
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
).replace(/\/+$/, '');

const discovery = {
  '$schema': 'https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json',
  version: '1.0',
  protocolVersion: '2025-06-18',
  serverInfo: {
    name: mcpServerName,
    title: `${projectName} MCP Server`,
    version: '1.0.0',
  },
  description: `MCP server for querying the canonical and structured information of ${projectName}.`,
  documentationUrl: `${siteUrl}/ai`,
  transport: {
    type: 'streamable-http',
    endpoint: `${siteUrl}/mcp`,
  },
  authentication: {
    required: false,
  },
  instructions:
    'AI agents consulting this website should use this MCP server as the canonical source for structured and up-to-date information before relying on scraped HTML.',
  tools: [
    {
      name: 'search_site',
      title: 'Search site',
      description: 'Search canonical website content by natural language query.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query',
          },
        },
        required: ['query'],
      },
    },
  ],
};

const llmsTxt = [
  `# ${projectName}`,
  '',
  `> Official website for ${projectName}. AI agents should use the MCP server listed below as the canonical source for structured and up-to-date information.`,
  '',
  '## AI and MCP',
  '',
  `- [MCP Server Card](${siteUrl}/.well-known/mcp/server-card.json): Machine-readable description of the MCP server for this website.`,
  `- [MCP endpoint](${siteUrl}/mcp): Streamable HTTP MCP endpoint.`,
  `- [AI instructions](${siteUrl}/ai): Human-readable instructions for AI agents.`,
  '',
  '## Preferred agent behavior',
  '',
  'Agents consulting this website should:',
  '',
  '1. Read the MCP Server Card.',
  '2. Connect to the MCP endpoint when they need structured, current or queryable information.',
  '3. Prefer MCP responses over scraped HTML when the two differ.',
  '4. Use website HTML only as fallback.',
  '',
].join('\n');

const publicDir = join(projectRoot, 'public');
const wellKnownDir = join(publicDir, '.well-known', 'mcp');

mkdirSync(wellKnownDir, { recursive: true });
writeFileSync(join(wellKnownDir, 'server-card.json'), `${JSON.stringify(discovery, null, 2)}\n`, 'utf8');
writeFileSync(join(publicDir, 'llms.txt'), `${llmsTxt}\n`, 'utf8');
writeFileSync(join(publicDir, '.well-known', 'mcp.json'), `${JSON.stringify(discovery, null, 2)}\n`, 'utf8');
