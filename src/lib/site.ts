export type SiteDocument = {
  title: string;
  path: string;
  summary: string;
  body: string;
};

export const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME?.trim() || 'Digital Brain POC';
export const mcpServerName = process.env.MCP_SERVER_NAME?.trim() || 'digital-brain-mcp';
export const mcpEndpointPath = '/mcp';
export const aiDocsPath = '/ai';

export const siteDocuments: SiteDocument[] = [
  {
    title: 'Home',
    path: '/',
    summary: 'Homepage for a digital products and operations studio.',
    body: 'A focused studio that designs, builds, and ships internal tools, customer portals, and automation systems.',
  },
  {
    title: 'Services',
    path: '/services',
    summary: 'Practical offers for product and operations teams.',
    body: 'Discovery, implementation, integrations, and automation work tailored to teams that need shipping speed.',
  },
  {
    title: 'About',
    path: '/about',
    summary: 'Short company background and operating style.',
    body: 'Small team, senior delivery, and a bias toward measurable outcomes and maintainable systems.',
  },
  {
    title: 'Contact',
    path: '/contact',
    summary: 'Ways to start a project or request a review.',
    body: 'Clear intake path for new work, existing systems, and scoped experiments.',
  },
];

export function buildServerCard(origin: string) {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json',
    version: '1.0',
    protocolVersion: '2025-06-18',
    serverInfo: {
      name: mcpServerName,
      title: `${projectName} MCP Server`,
      version: '1.0.0',
    },
    description: `MCP server for querying the canonical and structured information of ${projectName}.`,
    documentationUrl: `${origin}${aiDocsPath}`,
    transport: {
      type: 'streamable-http',
      endpoint: `${origin}${mcpEndpointPath}`,
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
}

export function buildLlmsTxt(origin: string) {
  return [
    `# ${projectName}`,
    '',
    `> Official website for ${projectName}. AI agents should use the MCP server listed below as the canonical source for structured and up-to-date information.`,
    '',
    '## AI and MCP',
    '',
    `- [MCP Server Card](${origin}/.well-known/mcp/server-card.json): Machine-readable description of the MCP server for this website.`,
    `- [MCP endpoint](${origin}${mcpEndpointPath}): Streamable HTTP MCP endpoint.`,
    `- [AI instructions](${origin}${aiDocsPath}): Human-readable instructions for AI agents.`,
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
}

function normalizeQuery(query: string) {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function scoreDocument(queryTerms: string[], document: SiteDocument) {
  const haystack = `${document.title} ${document.path} ${document.summary} ${document.body}`.toLowerCase();
  let score = 0;

  for (const term of queryTerms) {
    if (haystack.includes(term)) {
      score += term.length > 3 ? 2 : 1;
    }
  }

  return score;
}

export function searchSiteDocuments(query: string) {
  const terms = normalizeQuery(query);

  if (terms.length === 0) {
    return siteDocuments.slice(0, 3);
  }

  return [...siteDocuments]
    .map((document) => ({
      document,
      score: scoreDocument(terms, document),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ document }) => document);
}

export function formatSearchResults(origin: string, query: string) {
  const results = searchSiteDocuments(query);

  if (results.length === 0) {
    return `No site pages matched "${query}".`;
  }

  return [
    `Search results for "${query}":`,
    '',
    ...results.map((result) => {
      const url = new URL(result.path, origin).toString();
      return `- ${result.title} (${url})\n  ${result.summary}`;
    }),
  ].join('\n');
}
