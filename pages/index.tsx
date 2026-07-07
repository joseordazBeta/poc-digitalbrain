import Head from 'next/head';
import Link from 'next/link';
import AiHead from '../src/components/AiHead';
import { projectName } from '../src/lib/site';

const sectionCard = {
  border: '1px solid rgba(16, 34, 55, 0.12)',
  borderRadius: 22,
  padding: 24,
  background: '#ffffff',
  boxShadow: '0 20px 50px rgba(18, 32, 51, 0.08)',
};

export default function HomePage() {
  return (
    <>
      <AiHead />
      <Head>
        <title>{projectName}</title>
        <meta
          name="description"
          content="Digital products, internal tools, and automation systems for small teams that need to ship."
        />
      </Head>
      <main
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #f7f4ee 0%, #eef2f5 45%, #f8fafc 100%)',
          color: '#102033',
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <section
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '28px 24px 96px',
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              marginBottom: 72,
            }}
          >
            <div>
              <div style={{ fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6b7280' }}>
                Studio
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{projectName}</div>
            </div>
            <nav style={{ display: 'flex', gap: 18, fontSize: 15, color: '#405269' }}>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </header>

          <div style={{ display: 'grid', gap: 28, gridTemplateColumns: '1.3fr 0.7fr' }}>
            <div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a6a3d' }}>
                Product delivery for teams under pressure
              </p>
              <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, margin: '16px 0 20px' }}>
                We turn messy operations into tools people actually use.
              </h1>
              <p style={{ fontSize: '1.15rem', maxWidth: 720, lineHeight: 1.75, color: '#48586b' }}>
                We design and ship internal tools, portals, and automations that remove friction from
                day-to-day work. The focus is practical: less manual coordination, clearer data, and
                systems that stay usable after launch.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
                <Link
                  href="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 18px',
                    borderRadius: 999,
                    background: '#102033',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  Explore services
                </Link>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 18px',
                    borderRadius: 999,
                    border: '1px solid rgba(16, 32, 51, 0.14)',
                    color: '#102033',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.72)',
                  }}
                >
                  Start a project
                </Link>
              </div>
            </div>

            <aside style={{ ...sectionCard, alignSelf: 'start' }}>
              <h2 style={{ marginTop: 0, fontSize: 18 }}>What we ship</h2>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, color: '#405269' }}>
                <li>Internal dashboards and ops portals</li>
                <li>Lightweight automation for recurring work</li>
                <li>Knowledge hubs and workflow tooling</li>
                <li>AI-assisted interfaces with clear guardrails</li>
              </ul>
            </aside>
          </div>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 56,
            }}
          >
            <article style={sectionCard}>
              <h2 style={{ marginTop: 0 }}>Discovery</h2>
              <p style={{ marginBottom: 0, color: '#526376', lineHeight: 1.7 }}>
                We map the real workflow, identify bottlenecks, and define a small scope that can ship
                without losing the important edge cases.
              </p>
            </article>
            <article style={sectionCard}>
              <h2 style={{ marginTop: 0 }}>Build</h2>
              <p style={{ marginBottom: 0, color: '#526376', lineHeight: 1.7 }}>
                We implement the system with enough structure to survive growth, but not so much ceremony
                that the team stops using it.
              </p>
            </article>
            <article style={sectionCard}>
              <h2 style={{ marginTop: 0 }}>Adoption</h2>
              <p style={{ marginBottom: 0, color: '#526376', lineHeight: 1.7 }}>
                We refine copy, interaction details, and handoff so the tool becomes part of the workflow
                instead of another tab nobody opens.
              </p>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}
