import Head from 'next/head';
import Link from 'next/link';
import AiHead from '../src/components/AiHead';
import { projectName } from '../src/lib/site';

export default function ServicesPage() {
  return (
    <>
      <AiHead />
      <Head>
        <title>Services | {projectName}</title>
      </Head>
      <main style={pageStyle}>
        <article style={contentStyle}>
          <p style={eyebrowStyle}>Services</p>
          <h1>Practical work for teams that need throughput</h1>
          <ul style={{ lineHeight: 2 }}>
            <li>Discovery sessions and workflow mapping</li>
            <li>Internal tools and admin panels</li>
            <li>Light automation and data glue</li>
            <li>AI-enabled interfaces with a controlled scope</li>
          </ul>
          <p>
            The emphasis is on usage and maintainability. If a feature looks good but does not reduce
            time, errors, or ambiguity, it is usually the wrong feature.
          </p>
          <Link href="/">Back home</Link>
        </article>
      </main>
    </>
  );
}

const pageStyle = {
  minHeight: '100vh',
  padding: '64px 24px',
  background: '#f8fafc',
  color: '#102033',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
};

const contentStyle = {
  maxWidth: 820,
  margin: '0 auto',
  lineHeight: 1.8,
};

const eyebrowStyle = {
  textTransform: 'uppercase' as const,
  letterSpacing: '0.18em',
  color: '#8a6a3d',
};
