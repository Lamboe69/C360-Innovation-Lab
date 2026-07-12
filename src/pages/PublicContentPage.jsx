import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import SiteNav from '../components/SiteNav.jsx';
import './publicThemes.css';

function StatsRibbon({ stats }) {
  return (
    <div className="theme-stats" aria-label="Key figures">
      {stats.map(([value, label]) => (
        <div className="theme-stat" key={`${value}-${label}`}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ThemeCta({ page, isLoggedIn }) {
  return (
    <section className="theme-cta">
      <div className="theme-cta-inner">
        <p className="theme-kicker">Next Step</p>
        <h2>Keep building with C360</h2>
        <div className="theme-actions">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard <span className="btn-arrow">→</span></Link>
              <Link to="/learn" className="btn-hero-outline">Start Learning</Link>
            </>
          ) : (
            <>
              <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
              <Link to="/register" className="btn-hero-outline">Create Account</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function cardParts(card) {
  return card.length === 3 ? [card[0], card[1], card[2]] : [card[0], card[1], null];
}

function ManifestoLayout({ page, isLoggedIn }) {
  const orbitImage = page.sections.find((section) => section[2])?.[2]
    || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80';

  return (
    <>
      <section className="manifesto-hero">
        <div className="manifesto-hero-brand">C360</div>
        <div className="manifesto-hero-copy">
          <p className="theme-kicker">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="manifesto-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
          </div>
        </div>
        <div className="manifesto-orbit" aria-hidden="true">
          <div className="manifesto-orbit-core">
            <img src={orbitImage} alt="" />
          </div>
        </div>
      </section>
      <section className="manifesto-stanzas">
        {page.sections.map(([title, body, image], index) => (
          <article className={`manifesto-stanza${index % 2 ? ' is-flip' : ''}`} key={title}>
            <div className="manifesto-stanza-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="manifesto-stanza-copy">
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
            {image && <img src={image} alt="" loading="lazy" />}
          </article>
        ))}
      </section>
      <section className="manifesto-links">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="manifesto-link">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function BlueprintLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="bp-hero">
        <div className="bp-grid" aria-hidden="true" />
        <div className="bp-crosshair" aria-hidden="true" />
        <div className="bp-hero-main">
          <p className="theme-kicker">{page.eyebrow}</p>
          <h1>
            <span className="bp-hero-mark">C360</span>
            {page.title}
          </h1>
          <p className="bp-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
            <Link to="/clubs" className="btn-hero-outline">Browse Clubs</Link>
          </div>
        </div>
        <aside className="bp-dial" aria-label="Program overview">
          <div className="bp-dial-ring">
            <strong>{page.sections.length}</strong>
            <span>Tracks</span>
          </div>
          <ul>
            {page.sections.map(([title], index) => (
              <li key={title}>
                <em>{String(index + 1).padStart(2, '0')}</em>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="bp-ribbon" aria-hidden="true">
        <div className="bp-ribbon-track">
          {[...page.sections, ...page.sections].map(([title], index) => (
            <span key={`${title}-${index}`}>{title}</span>
          ))}
        </div>
      </section>

      <section className="bp-sheets" aria-label="Core program tracks">
        {page.sections.map(([title, body, image], index) => (
          <article className="bp-sheet" key={title} style={{ '--sheet-i': index }}>
            <div className="bp-sheet-meta">
              <span className="bp-sheet-code">SHEET / {String(index + 1).padStart(2, '0')}</span>
              <span className="bp-sheet-scale">SCALE 1:{10 + index}</span>
            </div>
            <div className="bp-sheet-body">
              <div className="bp-sheet-copy">
                <h2>{title}</h2>
                <p>{body}</p>
                <Link to={page.cta[1]} className="bp-sheet-link">Enter track →</Link>
              </div>
              {image && (
                <figure className="bp-sheet-media">
                  <img src={image} alt="" loading="lazy" />
                  <figcaption>Fig. {index + 1}</figcaption>
                </figure>
              )}
            </div>
            <div className="bp-sheet-corner" aria-hidden="true" />
          </article>
        ))}
      </section>

      <section className="bp-tools">
        <div className="bp-tools-head">
          <p className="theme-kicker">Drafting Kit</p>
          <h2>Tools that sharpen every build.</h2>
        </div>
        <div className="bp-stamp-board">
          {page.cards.map((card, index) => {
            const [title, body, href] = cardParts(card);
            const Wrapper = href ? Link : 'div';
            return (
              <Wrapper
                key={title}
                {...(href ? { to: href } : {})}
                className="bp-stamp"
                style={{ '--stamp-i': index }}
              >
                <span className="bp-stamp-seal">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function RailsLayout({ page, isLoggedIn }) {
  return <BlueprintLayout page={page} isLoggedIn={isLoggedIn} />;
}

function HiveLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="hive-hero">
        <div className="hive-hero-copy">
          <p className="theme-kicker">{page.eyebrow}</p>
          <p className="hive-brand">C360</p>
          <h1>{page.title}</h1>
          <p className="hive-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
            <Link to="/competitions" className="btn-hero-outline">See Competitions</Link>
          </div>
          <ul className="hive-pulse" aria-label="Club highlights">
            {page.stats.slice(0, 3).map(([value, label]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hive-hero-field" aria-hidden="true">
          <div className="hive-orbit hive-orbit-a" />
          <div className="hive-orbit hive-orbit-b" />
          <svg className="hive-wires" viewBox="0 0 400 460" preserveAspectRatio="none">
            <path d="M200 40 L320 110 L320 250 L200 320 L80 250 L80 110 Z" />
            <line x1="200" y1="40" x2="310" y2="70" />
            <line x1="320" y1="250" x2="360" y2="300" />
            <line x1="80" y1="250" x2="40" y2="330" />
            <line x1="200" y1="320" x2="200" y2="400" />
          </svg>

          <div className="hive-facet hive-facet-core">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="eager"
            />
          </div>
          <div className="hive-facet hive-facet-a">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="hive-facet hive-facet-b">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="hive-facet hive-facet-c">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt=""
              loading="lazy"
            />
          </div>

          <p className="hive-hero-caption">
            <span>CLUBS OPEN</span>
            <span>PEER NETWORK</span>
            <span>BUILD · LEARN · LEAD</span>
          </p>
        </div>
      </section>

      <section className="hive-grid">
        {page.sections.map(([title, body, image], index) => (
          <article className="hive-cell" key={title} style={{ '--cell-i': index }}>
            {image && <img src={image} alt="" loading="lazy" />}
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="hive-lanes">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="hive-lane">
              <strong>{title}</strong>
              <span>{body}</span>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function StacksLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="stacks-hero">
        <div className="stacks-hero-copy">
          <p className="theme-kicker">{page.eyebrow}</p>
          <p className="stacks-brand">C360</p>
          <h1>{page.title}</h1>
          <p className="stacks-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
            <Link to="/programs" className="btn-hero-outline">Browse Programs</Link>
          </div>
          <ul className="stacks-pulse" aria-label="Resource highlights">
            {page.stats.slice(0, 3).map(([value, label]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stacks-vault" aria-hidden="true">
          <div className="stacks-vault-shelf" />
          {[
            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
            page.sections[0]?.[2] || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
          ].map((src, index) => (
            <figure
              key={src + index}
              className={`stacks-vault-drawer stacks-vault-drawer-${index}`}
              style={{ '--drawer-i': index }}
            >
              <img src={src} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption>{['VOL', 'SET', 'KIT'][index]} {String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
          <p className="stacks-vault-caption">
            <span>CODEX OPEN</span>
            <span>{String(page.sections.length).padStart(2, '0')} DRAWERS</span>
            <span>PULL · READ · BUILD</span>
          </p>
        </div>
      </section>

      <section className="stacks-codex" aria-label="Resource collections">
        <header className="stacks-codex-head">
          <p className="theme-kicker">Vault Drawers</p>
          <h2>Open a knowledge drawer</h2>
          <p>Each collection is a pull-out lane — toolkits, guides, and learning sets ready to use.</p>
        </header>

        <div className="stacks-drawers">
          {page.sections.map(([title, body, image], index) => (
            <article className={`stacks-drawer${index % 2 ? ' is-flip' : ''}`} key={title} style={{ '--drawer-i': index }}>
              <div className="stacks-drawer-tab">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <em>DRAWER</em>
              </div>
              <div className="stacks-drawer-ghost" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              {image && (
                <div className="stacks-drawer-media">
                  <img src={image} alt="" loading="lazy" />
                </div>
              )}
              <div className="stacks-drawer-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stacks-fiche-wrap" aria-label="Quick links">
        <header className="stacks-codex-head">
          <p className="theme-kicker">Fiche Wall</p>
          <h2>Grab a pathway stub</h2>
        </header>
        <div className="stacks-fiche">
          {page.cards.map((card, index) => {
            const [title, body, href] = cardParts(card);
            const Wrapper = href ? Link : 'div';
            return (
              <Wrapper
                key={title}
                {...(href ? { to: href } : {})}
                className="stacks-fiche-card"
                style={{ '--fiche-i': index }}
              >
                <span className="stacks-fiche-code">F-{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <i aria-hidden="true" />
              </Wrapper>
            );
          })}
        </div>
      </section>

      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function SignalLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="signal-hero">
        <div className="signal-hero-copy">
          <p className="theme-kicker">{page.eyebrow}</p>
          <p className="signal-brand">C360</p>
          <h1>{page.title}</h1>
          <p className="signal-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
            <Link to="/partnerships" className="btn-hero-outline">Partnerships</Link>
          </div>
          <ul className="signal-pulse" aria-label="Contact highlights">
            {page.stats.slice(0, 3).map(([value, label]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="signal-hero-field" aria-hidden="true">
          <div className="signal-wave" />
          <div className="signal-wave signal-wave-b" />
          <div className="signal-lens">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="eager"
            />
          </div>
          <div className="signal-beam" />
          <p className="signal-hero-caption">
            <span>LINE OPEN</span>
            <span>48H REPLY</span>
            <span>HELLO · PARTNERS · HELP</span>
          </p>
        </div>
      </section>

      <section className="signal-channels">
        {page.sections.map(([title, body, image], index) => (
          <article className="signal-channel" key={title}>
            <div className="signal-freq">CH {String(index + 1).padStart(2, '0')}</div>
            {image && <img src={image} alt="" loading="lazy" />}
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="signal-desk">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="signal-desk-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function ArenaLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="arena-hero">
        <div className="arena-hero-copy">
          <p className="theme-kicker">{page.eyebrow}</p>
          <p className="arena-brand">C360</p>
          <h1>{page.title}</h1>
          <p className="arena-lead">{page.description}</p>
          <div className="theme-actions">
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
            <Link to="/resources" className="btn-hero-outline">Prep Resources</Link>
          </div>
          <ul className="arena-pulse" aria-label="Competition highlights">
            {page.stats.slice(0, 3).map(([value, label]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="arena-hero-field" aria-hidden="true">
          <div className="arena-duel arena-duel-back">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="arena-duel arena-duel-front">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="eager"
            />
          </div>
          <div className="arena-duel-mark">VS</div>
          <p className="arena-hero-caption">
            <span>FIELD OPEN</span>
            <span>SEASON 26</span>
            <span>BUILD · PITCH · SHOW</span>
          </p>
        </div>
      </section>

      <section className="arena-bracket">
        {page.sections.map(([title, body, image], index) => (
          <article className="arena-match" key={title}>
            <div className="arena-round">ROUND {String(index + 1).padStart(2, '0')}</div>
            {image && <img src={image} alt="" loading="lazy" />}
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="arena-board">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="arena-chip">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function LedgerLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="ledger-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="ledger-sheet">
        {page.sections.map(([title, body, image], index) => (
          <article className="ledger-row" key={title}>
            <span className="ledger-col-num">{String(index + 1).padStart(2, '0')}</span>
            <div className="ledger-col-main">
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
            {image && <img src={image} alt="" loading="lazy" />}
          </article>
        ))}
      </section>
      <section className="ledger-tools">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="ledger-tool">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function KilnLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="kiln-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="kiln-chambers">
        {page.sections.map(([title, body, image], index) => (
          <article className="kiln-chamber" key={title} style={{ '--heat': index + 1 }}>
            <div className="kiln-heat" aria-hidden="true" />
            <span>STAGE {index + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            {image && <img src={image} alt="" loading="lazy" />}
          </article>
        ))}
      </section>
      <section className="kiln-tools">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="kiln-tool">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function GuidepathLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="guide-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="guide-path">
        {page.sections.map(([title, body, image], index) => (
          <article className="guide-stone" key={title} style={{ '--stone-i': index }}>
            <div className="guide-marker">{index + 1}</div>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
            {image && <img src={image} alt="" loading="lazy" />}
          </article>
        ))}
      </section>
      <section className="guide-notes">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="guide-note">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function LabglassLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="lab-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="lab-slides">
        {page.sections.map(([title, body, image], index) => (
          <article className="lab-slide" key={title} style={{ '--slide-i': index }}>
            {image && <img src={image} alt="" loading="lazy" />}
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="lab-notes">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="lab-note">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function WeaveLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="weave-hero">
        <div className="weave-ribbons" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="weave-bands">
        {page.sections.map(([title, body, image], index) => (
          <article className="weave-band" key={title} style={{ '--band-i': index }}>
            {image && <img src={image} alt="" loading="lazy" />}
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="weave-knots">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="weave-knot">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function StatuteLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="statute-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </section>
      <section className="statute-body">
        <aside className="statute-index">
          {page.sections.map(([title], index) => (
            <a key={title} href={`#clause-${index}`}>{String(index + 1).padStart(2, '0')} {title}</a>
          ))}
        </aside>
        <div className="statute-clauses">
          {page.sections.map(([title, body], index) => (
            <article id={`clause-${index}`} className="statute-clause" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="statute-notes">
        {page.cards.map((card) => {
          const [title, body] = cardParts(card);
          return (
            <div className="statute-note" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          );
        })}
      </section>
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

function PanelLayout({ page, isLoggedIn }) {
  return (
    <>
      <section className="panel-hero">
        <p className="theme-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <div className="theme-actions">
          <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
        </div>
      </section>
      <section className="panel-bento">
        {page.sections.map(([title, body, image], index) => (
          <article className={`panel-tile panel-tile-${(index % 3) + 1}`} key={title}>
            {image && <img src={image} alt="" loading="lazy" />}
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="panel-list">
        {page.cards.map((card) => {
          const [title, body, href] = cardParts(card);
          const Wrapper = href ? Link : 'div';
          return (
            <Wrapper key={title} {...(href ? { to: href } : {})} className="panel-list-item">
              <h3>{title}</h3>
              <p>{body}</p>
            </Wrapper>
          );
        })}
      </section>
      <StatsRibbon stats={page.stats} />
      <ThemeCta page={page} isLoggedIn={isLoggedIn} />
    </>
  );
}

const layouts = {
  manifesto: ManifestoLayout,
  rails: RailsLayout,
  blueprint: BlueprintLayout,
  hive: HiveLayout,
  stacks: StacksLayout,
  signal: SignalLayout,
  arena: ArenaLayout,
  ledger: LedgerLayout,
  kiln: KilnLayout,
  guidepath: GuidepathLayout,
  labglass: LabglassLayout,
  weave: WeaveLayout,
  statute: StatuteLayout,
  panel: PanelLayout,
};

export default function PublicContentPage({ page, path }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = page.theme || 'panel';
  const Layout = layouts[theme] || PanelLayout;

  useEffect(() => {
    document.title = `${page.title} — C360 Innovation Lab`;
    setIsLoggedIn(!!localStorage.getItem('c360_logged_in'));
  }, [page.title]);

  return (
    <div className={`public-page-shell theme-${theme}`}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main-content" className="public-page-main theme-main">
        <Layout page={page} isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </div>
  );
}
