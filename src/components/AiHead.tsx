import Head from 'next/head';

export default function AiHead() {
  return (
    <Head>
      <link
        rel="alternate"
        type="application/json"
        title="MCP Server Card"
        href="/.well-known/mcp/server-card.json"
      />
      <link
        rel="alternate"
        type="text/markdown"
        title="LLM instructions"
        href="/llms.txt"
      />
      <meta name="ai-mcp-server-card" content="/.well-known/mcp/server-card.json" />
      <meta name="ai-mcp-endpoint" content="/mcp" />
      <meta
        name="ai-instructions"
        content="AI agents should consult the MCP Server Card and use the MCP endpoint as the canonical structured source for this website."
      />
    </Head>
  );
}
