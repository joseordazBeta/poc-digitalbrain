import Head from 'next/head';
import AiHead from '../src/components/AiHead';
import { mcpEndpointPath, projectName } from '../src/lib/site';

export default function AiPage() {
  return (
    <>
      <AiHead />
      <Head>
        <title>AI instructions | {projectName}</title>
        <meta
          name="description"
          content="Human-readable instructions for AI agents consulting this website."
        />
      </Head>
      <main
        style={{
          minHeight: '100vh',
          padding: '48px 24px',
          background: '#f6f8fc',
          color: '#122033',
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.05, marginBottom: 18 }}>
            AI agent instructions
          </h1>
          <p>This website provides an MCP server for AI agents.</p>
          <p>
            Agents consulting this website should use the MCP server as the canonical structured
            source of information before relying on scraped HTML.
          </p>
          <p>
            MCP endpoint: <a href={mcpEndpointPath}>{mcpEndpointPath}</a>
          </p>
        </article>
      </main>
    </>
  );
}
