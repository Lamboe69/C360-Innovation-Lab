import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor.jsx';
import Footer from '../components/Footer.jsx';
import { navItems } from '../data/navItems.js';
import './homePage.css';

const marqueeItems = ['Innovation', 'Mentorship', 'Enterprise', 'Research', 'Financial Literacy', 'Future Builders', 'Incubation', 'Leadership', 'Community', 'Competitions'];

const stories = [
  ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', 'Food Systems · Rural Hub', 'Smart Irrigation System Built by a 17-Year-Old', 'Amara used design thinking from her C360 club to build a low-cost irrigation sensor that now helps 12 local farmers.'],
  ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', 'Civic Tech · City Hub', 'An App That Connects Street Vendors to Customers', 'A team of four from the Tech Innovators Club launched a mobile app now used by over 200 vendors in their city.'],
  ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80', 'Environment · Coastal Hub', 'Turning Plastic Waste into School Furniture', 'The Green Futures Club partnered with a local school to recycle plastic waste into durable, affordable furniture.'],
];

const clubs = [
  ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', '40+ Members · Online Campus', 'Tech Innovators Club', 'Building real-world tech solutions using design thinking, coding, and rapid prototyping.'],
  ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', '28 Members · Community Hub', 'Green Futures Club', 'Tackling climate and sustainability challenges through youth-led environmental innovation.'],
  ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80', '35 Members · City Hub', 'Young Entrepreneurs Club', 'From business plans to pitching, developing the next generation of entrepreneurs.'],
  ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', '22 Members · Research Hub', 'Science & Research Club', 'Conducting youth-led research projects and competing in national innovation challenges.'],
  ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', '31 Members · Creative Hub', 'Creative Arts Club', 'Merging creativity with technology, design, media, and storytelling for social impact.'],
  ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80', '19 Members · Leadership Hub', 'Community Leaders Club', 'Developing leadership skills and driving community development projects worldwide.'],
];

const cards = [
  ['01 / PROGRAMS', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', 'Innovation & Creativity', 'We run structured innovation clubs where young people tackle real-world challenges using design thinking, technology, and creative problem-solving at scale.', '/programs', 'Explore Programs'],
  ['02 / MENTORSHIP', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80', 'Career Guidance', 'Our mentorship network connects youth with experienced professionals who provide direction, skills training, and clear pathways into meaningful careers.', '/mentorship', 'Meet Mentors'],
  ['03 / ENTERPRISE', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80', 'Enterprise Development', 'From idea to launch, we support young entrepreneurs through incubation, financial literacy training, and access to business partners.', '/incubation', 'Start Your Journey'],
  ['04 / RESEARCH', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', 'Research & Innovation', 'Young innovators explore evidence, build prototypes, and test bold ideas through practical research and experimentation.', '/research', 'Explore Research'],
  ['05 / FINANCE', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80', 'Financial Literacy', 'Practical money skills help learners manage resources, understand opportunity, and make stronger enterprise decisions.', '/financial-literacy', 'Build Skills'],
  ['06 / PARTNERS', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80', 'Grants & Partnerships', 'We connect youth projects with collaborators, resources, and partnership opportunities that help promising ideas grow.', '/partnerships', 'Partner With Us'],
];

const stats = [
  ['500+', 'Youth Members', 'Worldwide'],
  ['40+', 'Active Innovation', 'Clubs Running'],
  ['80+', 'Expert Mentors', 'Engaged'],
  ['12+', 'Strategic', 'Partners'],
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = 'C360 Innovation Lab — Home';
    setIsLoggedIn(!!localStorage.getItem('c360_logged_in'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

    function handleParallax() {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax-slow').forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.2;
        el.style.transform = `translateY(${scrollY * speed * 0.15}px)`;
      });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <div className="home-page-shell">
      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <nav>
        <Link to="/" className="nav-logo">
          <div className="logo-mark">C360</div>
          Innovation Lab
        </Link>
        <ul className="nav-links">
          {navItems.map(([label, path]) => (
            <li key={path}><Link to={path} className={path === '/' ? 'active' : undefined}>{label}</Link></li>
          ))}
          {isLoggedIn ? (
            <li><Link to="/dashboard" className="btn-auth-register">Dashboard</Link></li>
          ) : (
            <>
              <li><Link to="/login" className="btn-auth-login">Login</Link></li>
              <li><Link to="/register" className="btn-auth-register">Register</Link></li>
            </>
          )}
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(current => !current)} aria-label="Toggle menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navItems.map(([label, path]) => <Link key={path} to={path} onClick={() => setMobileOpen(false)}>{label}</Link>)}
        {isLoggedIn ? (
          <Link to="/dashboard" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="btn-auth-login" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link to="/register" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Register</Link>
          </>
        )}
      </div>

      <main id="main-content">
      <section className="hero parallax-section">
        <div className="hero-grid" />
        <div className="orb orb-1 parallax-slow" data-speed="0.3" />
        <div className="orb orb-2 parallax-slow" data-speed="0.5" />
        <div className="orb orb-3 parallax-slow" data-speed="0.2" />
        <div className="hero-ring" />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=80&q=80" alt="" className="badge-icon" /> &nbsp;Global Platform &nbsp;·&nbsp; Est. 2020
          </div>
          <h1>
            Empowering
            <span className="line-2 gradient-text">The World's Next</span>
            <span className="line-3 gradient-text">Generation of Innovators.</span>
          </h1>
          <p className="hero-desc">We nurture young talent through innovation clubs, expert mentorship, and enterprise development, building the entrepreneurs and leaders of tomorrow across communities worldwide.</p>
          <div className="hero-btns">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard <span className="btn-arrow">→</span></Link>
                <Link to="/learn" className="btn-hero-outline">Continue Learning</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn-hero-primary">Join a Club <span className="btn-arrow">→</span></Link>
                <Link to="/programs" className="btn-hero-outline">Learn More</Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="stats-grid">
            {[
              ['500+', 'Youth Members'],
              ['40+', 'Active Clubs'],
              ['80+', 'Mentors'],
              ['12+', 'Partners'],
            ].map(([number, label]) => (
              <div className="stat-card" key={label}>
                <div className="stat-num">{number}</div>
                <div className="stat-lbl">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="marquee-item" key={`${item}-${index}`}><span className="marquee-dot" />{item}</span>
          ))}
        </div>
      </div>

      <section className="stories-section">
        <div className="section-header reveal">
          <div className="section-tag">Innovation Stories</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.8px', lineHeight: 1.12, marginBottom: 16 }}><span className="gradient-text">Ideas That Are</span><br />Changing Communities</h2>
          <p style={{ maxWidth: 500, margin: '0 auto', color: 'var(--silver)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300 }}>Real stories from young innovators who turned bold ideas into impact across communities.</p>
        </div>
        <div className="stories-grid">
          {stories.map(([src, tag, title], index) => (
            <article className={`story-card reveal reveal-delay-${index + 1} card-3d-inner`} key={title}>
              <img src={src} alt="" className="story-img" loading="lazy" />
              <div className="story-body">
                <div className="story-tag">{tag}</div>
                <div className="story-title">{title}</div>
                <Link to="/resources" className="story-link">Read More →</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="stories-cta reveal">
          <Link to="/resources" className="btn-hero-outline">View All Stories →</Link>
        </div>
      </section>

      <section className="clubs-section" id="programs">
        <div className="section-header reveal">
          <div className="section-tag">Active Clubs</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.8px', lineHeight: 1.12, marginBottom: 16 }}><span className="gradient-text">Where Innovation</span><br />Comes to Life</h2>
          <p style={{ maxWidth: 500, margin: '0 auto', color: 'var(--silver)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300 }}>Join one of our thriving clubs and start building, creating, and leading alongside bright young minds from around the world.</p>
        </div>
        <div className="clubs-grid">
          {clubs.map(([src, meta, name], index) => (
            <article className={`club-card reveal reveal-delay-${(index % 3) + 1} card-3d-inner`} key={name}>
              <img src={src} alt="" className="club-img" loading="lazy" />
              <div className="club-meta">{meta}</div>
              <div className="club-name">{name}</div>
            </article>
          ))}
        </div>
        <div className="clubs-cta reveal">
          <Link to="/clubs" className="btn-hero-outline">View All Clubs →</Link>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-header reveal">
          <div className="section-tag">Who We Are</div>
          <h2><span className="gradient-text">Building a Global</span><br />Innovation Ecosystem</h2>
          <p className="about-desc">C360 Innovation Lab is a youth-driven platform connecting students, mentors, and partners to foster creativity, career growth, and enterprise across global communities.</p>
        </div>

        <div className="cards">
          {cards.map(([number, icon, title, , path, label], index) => (
            <article className={`card reveal reveal-delay-${(index % 3) + 1} card-3d-inner`} key={title}>
              <div className="card-number">{number}</div>
              <img src={icon} alt="" className="card-img-icon" loading="lazy" />
              <h3>{title}</h3>
              <Link to={path} className="card-link">{label} <span className="card-link-arrow">→</span></Link>
              {title === 'Career Guidance' && (
                <Link to="/mentorship-sessions" className="card-link" style={{ marginTop: 4 }}>Book a Session <span className="card-link-arrow">→</span></Link>
              )}
              {title === 'Innovation & Creativity' && (
                <Link to="/competitions" className="card-link" style={{ marginTop: 4 }}>View Competitions <span className="card-link-arrow">→</span></Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="about" style={{ padding: '80px 6%' }}>
        <div className="section-header reveal">
          <div className="section-tag">AI Learning Workspace</div>
          <h2>Learn Smarter<br />With Your AI Study Partner</h2>
          <p className="about-desc" style={{ maxWidth: 600 }}>Upload notes, PDFs, and transcripts. Ask questions, generate summaries, create quizzes, and get personalized study plans — all powered by AI.</p>
        </div>
        <div className="cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <article className="card reveal reveal-delay-1 card-3d-inner">
            <div className="card-number">UPLOAD</div>
            <img src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80" alt="" className="card-img-icon" loading="lazy" />
            <h3>Add Your Sources</h3>
          </article>
          <article className="card reveal reveal-delay-2 card-3d-inner">
            <div className="card-number">ASK</div>
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" alt="" className="card-img-icon" loading="lazy" />
            <h3>Ask Anything</h3>
          </article>
          <article className="card reveal reveal-delay-3 card-3d-inner">
            <div className="card-number">GROW</div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="" className="card-img-icon" loading="lazy" />
            <h3>Track Progress</h3>
          </article>
        </div>
        <div className="clubs-cta reveal" style={{ marginTop: 48 }}>
          <Link to="/learn" className="btn-hero-primary">Open Learning Workspace <span className="btn-arrow">→</span></Link>
        </div>
      </section>

      <section className="impact">
        <div className="impact-bg" />
        <div className="section-header reveal">
          <div className="section-tag">Our Impact</div>
          <h2>Measurable Growth,<br />Real Opportunity</h2>
        </div>
        <div className="big-stats">
          {stats.map(([number, lineOne, lineTwo], index) => (
            <div className={`big-stat reveal reveal-delay-${index + 1}`} key={number}>
              <div className="big-stat-num">{number}</div>
              <div className="big-stat-lbl">{lineOne}<br />{lineTwo}</div>
              <div className="big-stat-divider" />
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="reveal">
          <div className="section-tag">Get Started Today</div>
          <h2>Ready to Shape<br />Your Future?</h2>
          <p>Join hundreds of young innovators already building, learning, and growing with C360 Innovation Lab.</p>
          <div className="cta-btns">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard <span className="btn-arrow">→</span></Link>
                <Link to="/learn" className="btn-hero-outline">Start Learning</Link>
              </>
            ) : (
              <>
                <Link to="/clubs" className="btn-hero-primary">Join a Club <span className="btn-arrow">→</span></Link>
                <Link to="/programs" className="btn-hero-outline">View Programs</Link>
              </>
            )}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
