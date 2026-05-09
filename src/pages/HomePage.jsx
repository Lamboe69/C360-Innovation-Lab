import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor.jsx';
import './homePage.css';

const navItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Clubs', '/clubs'],
  ['Resources', '/resources'],
  ['Contact', '/contact'],
];

const marqueeItems = ['Innovation', 'Mentorship', 'Enterprise', 'Research', 'Financial Literacy', 'Future Builders', 'Incubation', 'Leadership', 'Community'];

const stories = [
  ['🌾', 'Food Systems · Rural Hub', 'Smart Irrigation System Built by a 17-Year-Old', 'Amara used design thinking from her C360 club to build a low-cost irrigation sensor that now helps 12 local farmers.'],
  ['📱', 'Civic Tech · City Hub', 'An App That Connects Street Vendors to Customers', 'A team of four from the Tech Innovators Club launched a mobile app now used by over 200 vendors in their city.'],
  ['♻️', 'Environment · Coastal Hub', 'Turning Plastic Waste into School Furniture', 'The Green Futures Club partnered with a local school to recycle plastic waste into durable, affordable furniture.'],
];

const clubs = [
  ['💡', '40+ Members · Online Campus', 'Tech Innovators Club', 'Building real-world tech solutions using design thinking, coding, and rapid prototyping.'],
  ['🌱', '28 Members · Community Hub', 'Green Futures Club', 'Tackling climate and sustainability challenges through youth-led environmental innovation.'],
  ['💰', '35 Members · City Hub', 'Young Entrepreneurs Club', 'From business plans to pitching, developing the next generation of entrepreneurs.'],
  ['🔬', '22 Members · Research Hub', 'Science & Research Club', 'Conducting youth-led research projects and competing in national innovation challenges.'],
  ['🎨', '31 Members · Creative Hub', 'Creative Arts Club', 'Merging creativity with technology, design, media, and storytelling for social impact.'],
  ['🤝', '19 Members · Leadership Hub', 'Community Leaders Club', 'Developing leadership skills and driving community development projects worldwide.'],
];

const cards = [
  ['01 / PROGRAMS', '💡', 'Innovation & Creativity', 'We run structured innovation clubs where young people tackle real-world challenges using design thinking, technology, and creative problem-solving at scale.', '/programs', 'Explore Programs'],
  ['02 / MENTORSHIP', '🎯', 'Career Guidance', 'Our mentorship network connects youth with experienced professionals who provide direction, skills training, and clear pathways into meaningful careers.', '/mentorship', 'Meet Mentors'],
  ['03 / ENTERPRISE', '🚀', 'Enterprise Development', 'From idea to launch, we support young entrepreneurs through incubation, financial literacy training, and access to business partners.', '/incubation', 'Start Your Journey'],
  ['04 / RESEARCH', '🔬', 'Research & Innovation', 'Young innovators explore evidence, build prototypes, and test bold ideas through practical research and experimentation.', '/research', 'Explore Research'],
  ['05 / FINANCE', '💰', 'Financial Literacy', 'Practical money skills help learners manage resources, understand opportunity, and make stronger enterprise decisions.', '/financial-literacy', 'Build Skills'],
  ['06 / PARTNERS', '🤝', 'Grants & Partnerships', 'We connect youth projects with collaborators, resources, and partnership opportunities that help promising ideas grow.', '/partnerships', 'Partner With Us'],
];

const stats = [
  ['500+', 'Youth Members', 'Worldwide'],
  ['40+', 'Active Innovation', 'Clubs Running'],
  ['80+', 'Expert Mentors', 'Engaged'],
  ['12+', 'Strategic', 'Partners'],
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = 'C360 Innovation Lab — Home';

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page-shell">
      <CustomCursor />

      <nav>
        <Link to="/" className="nav-logo">
          <div className="logo-mark">C360</div>
          Innovation Lab
        </Link>
        <ul className="nav-links">
          {navItems.map(([label, path]) => (
            <li key={path}><Link to={path} className={path === '/' ? 'active' : undefined}>{label}</Link></li>
          ))}
          <li><Link to="/login" className="btn-auth-login">Login</Link></li>
          <li><Link to="/register" className="btn-auth-register">Register</Link></li>
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(current => !current)} aria-label="Toggle menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navItems.map(([label, path]) => <Link key={path} to={path} onClick={() => setMobileOpen(false)}>{label}</Link>)}
        <Link to="/login" className="btn-auth-login" onClick={() => setMobileOpen(false)}>Login</Link>
        <Link to="/register" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Register</Link>
      </div>

      <section className="hero">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-ring" />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            🌐 &nbsp;Global Platform &nbsp;·&nbsp; Est. 2020
          </div>
          <h1>
            Empowering
            <span className="line-2">The World's Next</span>
            <span className="line-3">Generation of Innovators.</span>
          </h1>
          <p className="hero-desc">We nurture young talent through innovation clubs, expert mentorship, and enterprise development, building the entrepreneurs and leaders of tomorrow across communities worldwide.</p>
          <div className="hero-btns">
            <Link to="/register" className="btn-hero-primary">Join a Club <span className="btn-arrow">→</span></Link>
            <a href="#programs" className="btn-hero-outline">Learn More</a>
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
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.8px', lineHeight: 1.12, marginBottom: 16 }}>Ideas That Are<br />Changing Communities</h2>
          <p style={{ maxWidth: 500, margin: '0 auto', color: 'var(--silver)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300 }}>Real stories from young innovators who turned bold ideas into impact across communities.</p>
        </div>
        <div className="stories-grid">
          {stories.map(([emoji, tag, title, excerpt], index) => (
            <article className={`story-card reveal reveal-delay-${index + 1}`} key={title}>
              <div className="story-thumb">{emoji}</div>
              <div className="story-body">
                <div className="story-tag">{tag}</div>
                <div className="story-title">{title}</div>
                <p className="story-excerpt">{excerpt}</p>
                <a href="#" className="story-link">Read Story →</a>
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
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.8px', lineHeight: 1.12, marginBottom: 16 }}>Where Innovation<br />Comes to Life</h2>
          <p style={{ maxWidth: 500, margin: '0 auto', color: 'var(--silver)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300 }}>Join one of our thriving clubs and start building, creating, and leading alongside bright young minds from around the world.</p>
        </div>
        <div className="clubs-grid">
          {clubs.map(([emoji, meta, name, desc], index) => (
            <article className={`club-card reveal reveal-delay-${(index % 3) + 1}`} key={name}>
              <span className="club-emoji">{emoji}</span>
              <div className="club-meta">{meta}</div>
              <div className="club-name">{name}</div>
              <p className="club-desc">{desc}</p>
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
          <h2>Building a Global<br />Innovation Ecosystem</h2>
          <p className="about-desc">C360 Innovation Lab is a youth-driven platform connecting students, mentors, and partners to foster creativity, career growth, and enterprise across global communities.</p>
        </div>

        <div className="cards">
          {cards.map(([number, icon, title, desc, path, label], index) => (
            <article className={`card reveal reveal-delay-${(index % 3) + 1}`} key={title}>
              <div className="card-number">{number}</div>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <Link to={path} className="card-link">{label} <span className="card-link-arrow">→</span></Link>
            </article>
          ))}
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
            <Link to="/clubs" className="btn-hero-primary">Join a Club <span className="btn-arrow">→</span></Link>
            <Link to="/programs" className="btn-hero-outline">View Programs</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="logo-mark">C360</div>
              Innovation Lab
            </div>
            <p>Empowering the next generation of innovators through clubs, mentorship, and enterprise development.</p>
            <div className="footer-tagline"><span /> Est. 2020 <span /></div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">f</a>
              <a href="#" className="social-link" aria-label="X / Twitter">𝕏</a>
              <a href="#" className="social-link" aria-label="Instagram">◎</a>
              <a href="#" className="social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="social-link" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Navigate</h4>
            <ul>{navItems.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2025 C360 Innovation Lab. All rights reserved.</div>
      </footer>
    </div>
  );
}
