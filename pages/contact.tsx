import Head from 'next/head';
import Link from 'next/link';
import { projectName } from '../src/lib/site';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | {projectName}</title>
      </Head>
      <main style={pageStyle}>
        <article style={contentStyle}>
          <p style={eyebrowStyle}>Contact</p>
          <h1>Start with a scope, not a slogan</h1>
          <p>
            If you want to explore a project, send a short description of the workflow, the friction
            points, and what would count as success.
          </p>
          <p>
            That is enough to decide whether the work is a fit and what a first milestone should be.
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
