import Head from 'next/head';
import Link from 'next/link';
import { projectName } from '../src/lib/site';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | {projectName}</title>
      </Head>
      <main style={pageStyle}>
        <article style={contentStyle}>
          <p style={eyebrowStyle}>About</p>
          <h1>Small team, senior delivery</h1>
          <p>
            We work with teams that need clear outcomes, not vague innovation theater. The operating
            model is simple: understand the real process, remove waste, and ship something useful.
          </p>
          <p>
            Projects are intentionally narrow at the start so the result can be deployed, adopted, and
            improved instead of becoming a long-running design exercise.
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
