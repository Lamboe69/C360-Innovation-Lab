import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import SiteNav from '../components/SiteNav.jsx';
import './homePage.css';

const marqueeItems = ['Innovation', 'Mentorship', 'Enterprise', 'Research', 'Financial Literacy', 'Future Builders', 'Incubation', 'Leadership', 'Community', 'Competitions'];

const HERO_INTERVAL_MS = 4000;

const heroCarousel = [
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=85',
    alt: 'Young people collaborating in a modern learning space',
    title: 'Build Together',
    line: 'Where young minds meet, make, and move ideas forward.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Team working together around a shared workspace',
    title: 'Learn By Doing',
    line: 'Hands-on projects that turn curiosity into real capability.',
  },
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=2400&q=85',
    alt: 'Innovators gathered for a community workshop',
    title: 'Community First',
    line: 'Clubs, mentors, and peers shaping the next wave of innovators.',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=85',
    alt: 'Mentors and learners in a focused discussion',
    title: 'Guided Ambition',
    line: 'Mentorship that sharpens skills and opens clearer pathways.',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2400&q=85',
    alt: 'Creative session with notes and prototypes',
    title: 'Prototype The Future',
    line: 'From sticky notes to working systems — launch what matters.',
  },
];

const gallerySlides = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    alt: 'Young innovators collaborating around a laptop',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    alt: 'Team workshop with sticky notes and sketches',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    alt: 'Students presenting ideas in a bright studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
    alt: 'Mentor guiding young builders',
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    alt: 'Group of smiling young people outdoors',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    alt: 'Hands building a technology prototype',
  },
  {
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80',
    alt: 'Young entrepreneurs pitching a venture',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    alt: 'Learners studying together on digital devices',
  },
];

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDir, setHeroDir] = useState(1);
  const touchStartX = useRef(null);
  const activeSlide = heroCarousel[heroIndex];

  const goToSlide = (nextIndex, direction = 1) => {
    setHeroDir(direction);
    setHeroIndex((nextIndex + heroCarousel.length) % heroCarousel.length);
  };

  const goNext = () => goToSlide(heroIndex + 1, 1);
  const goPrev = () => goToSlide(heroIndex - 1, -1);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroDir(1);
      setHeroIndex(current => (current + 1) % heroCarousel.length);
    }, HERO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [heroIndex]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'ArrowRight') {
        setHeroDir(1);
        setHeroIndex(current => (current + 1) % heroCarousel.length);
      }
      if (event.key === 'ArrowLeft') {
        setHeroDir(-1);
        setHeroIndex(current => (current - 1 + heroCarousel.length) % heroCarousel.length);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="home-page-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav />

      <main id="main-content">
      <section
        className={`hero parallax-section hero-dir-${heroDir > 0 ? 'next' : 'prev'}`}
        aria-label="Featured moments"
        aria-roledescription="carousel"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null) return;
          const delta = event.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) < 48) return;
          if (delta < 0) goNext();
          else goPrev();
        }}
      >
        <div className="hero-carousel">
          {heroCarousel.map((slide, index) => (
            <figure
              key={slide.src}
              className={`hero-carousel-slide${index === heroIndex ? ' is-active' : ''}${index === ((heroIndex - 1 + heroCarousel.length) % heroCarousel.length) ? ' is-prev' : ''}`}
              aria-hidden={index !== heroIndex}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
          ))}

          <div className="hero-carousel-shade" aria-hidden="true" />
          <div className="hero-carousel-grain" aria-hidden="true" />
          <div className="hero-carousel-frame" aria-hidden="true" />

          <div className="hero-carousel-stage">
            <div className="hero-carousel-top">
              <div className="hero-carousel-brand">C360</div>
              <p className="hero-carousel-kicker">Innovation Lab</p>
            </div>

            <div className="hero-carousel-bottom">
              <div className="hero-carousel-copy" key={activeSlide.src}>
                <h1>{activeSlide.title}</h1>
                <p className="hero-carousel-line">{activeSlide.line}</p>
              </div>

              <div className="hero-carousel-chrome">
                <div
                  className="hero-carousel-progress"
                  role="tablist"
                  aria-label="Slide progress"
                  style={{ gridTemplateColumns: `repeat(${heroCarousel.length}, minmax(0, 1fr))` }}
                >
                  {heroCarousel.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      className={`hero-carousel-rail${index === heroIndex ? ' is-active' : ''}${index < heroIndex ? ' is-done' : ''}`}
                      aria-label={`Show slide ${index + 1}: ${slide.title}`}
                      aria-selected={index === heroIndex}
                      onClick={() => goToSlide(index, index > heroIndex ? 1 : -1)}
                    >
                      <span
                        key={`${heroIndex}-${index}`}
                        className="hero-carousel-rail-fill"
                        style={{ animationDuration: `${HERO_INTERVAL_MS}ms` }}
                      />
                    </button>
                  ))}
                </div>

                <div className="hero-carousel-meta">
                  <span className="hero-carousel-count">
                    <em>{String(heroIndex + 1).padStart(2, '0')}</em>
                    <span>/</span>
                    {String(heroCarousel.length).padStart(2, '0')}
                  </span>
                  <div className="hero-carousel-nav">
                    <button type="button" className="hero-carousel-nav-btn" aria-label="Previous slide" onClick={goPrev}>
                      ←
                    </button>
                    <button type="button" className="hero-carousel-nav-btn" aria-label="Next slide" onClick={goNext}>
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pulse-strip" aria-hidden="true">
        <div className="pulse-strip-track pulse-strip-track-a">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="pulse-chip" key={`a-${item}-${index}`}>{item}</span>
          ))}
        </div>
        <div className="pulse-strip-track pulse-strip-track-b">
          {[...marqueeItems].reverse().concat([...marqueeItems].reverse()).map((item, index) => (
            <span className="pulse-chip" key={`b-${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="field-notes">
        <div className="field-notes-header reveal">
          <div className="field-notes-label">
            <span>01</span>
            <em>Field Notes</em>
          </div>
          <h2>Ideas that leave<br />a mark on places.</h2>
          <p>Real stories from young innovators who turned bold ideas into community impact.</p>
        </div>
        <div className="field-notes-layout">
          <article className="field-feature reveal">
            <img src={stories[0][0]} alt="" loading="lazy" />
            <div className="field-feature-copy">
              <span>{stories[0][1]}</span>
              <h3>{stories[0][2]}</h3>
              <Link to="/resources">Open story →</Link>
            </div>
          </article>
          <div className="field-stack">
            {stories.slice(1).map(([src, tag, title], index) => (
              <article className={`field-note reveal reveal-delay-${index + 1}`} key={title}>
                <span className="field-note-num">{String(index + 2).padStart(2, '0')}</span>
                <img src={src} alt="" loading="lazy" />
                <div>
                  <small>{tag}</small>
                  <h3>{title}</h3>
                  <Link to="/resources">Read →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-floor" id="programs">
        <div className="workshop-header reveal">
          <div className="field-notes-label">
            <span>02</span>
            <em>Workshop Floor</em>
          </div>
          <h2>Clubs where builders<br />collide and create.</h2>
          <p>Pick a table. Meet peers. Ship something that matters.</p>
        </div>
        <div className="workshop-benches">
          {clubs.slice(0, 3).map(([src, meta, name], index) => (
            <article className={`workshop-bench reveal reveal-delay-${index + 1}`} key={name} style={{ '--bench-i': index }}>
              <div className="workshop-tag">{meta}</div>
              <img src={src} alt="" loading="lazy" />
              <h3>{name}</h3>
              <Link to="/clubs" className="workshop-join">Join floor →</Link>
            </article>
          ))}
        </div>
        <div className="workshop-cta reveal">
          <Link to="/clubs" className="btn-hero-outline">See every club →</Link>
        </div>
      </section>

      <section className="launch-rails" id="about">
        <div className="launch-rails-copy reveal">
          <div className="field-notes-label">
            <span>03</span>
            <em>Launch Rails</em>
          </div>
          <h2>Three paths.<br />One ecosystem.</h2>
          <p>C360 connects students, mentors, and partners so curiosity becomes capability.</p>
        </div>
        <div className="launch-track">
          {cards.slice(0, 3).map(([number, icon, title, , path, label], index) => (
            <Link
              to={path}
              className={`launch-car reveal reveal-delay-${index + 1}`}
              key={title}
              style={{ '--car-i': index }}
            >
              <span className="launch-car-num">{number.split(' ')[0]}</span>
              <img src={icon} alt="" loading="lazy" />
              <div>
                <h3>{title}</h3>
                <span>{label} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="signal-gate">
        <div className="signal-gate-bg" aria-hidden="true" />
        <div className="signal-gate-inner reveal">
          <p className="signal-gate-kicker">Get Started</p>
          <h2>
            <span>Ready to</span>
            <em>shape what comes next?</em>
          </h2>
          <div className="signal-meters">
            {stats.map(([number, lineOne], index) => (
              <div className="signal-meter" key={number} style={{ '--meter-i': index }}>
                <strong>{number}</strong>
                <span>{lineOne}</span>
                <i style={{ animationDelay: `${index * 0.2}s` }} />
              </div>
            ))}
          </div>
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

      <section className="gallery-section" aria-label="Campus moments">
        <div className="gallery-visual" aria-hidden="true">
          <div className="gallery-slide-stage">
            <div className="gallery-slide-track">
              {[...gallerySlides, ...gallerySlides].map((slide, index) => (
                <figure className="gallery-slide-card" key={`${slide.src}-${index}`}>
                  <img src={slide.src} alt={slide.alt} loading="lazy" />
                  <span className="gallery-slide-glow" />
                </figure>
              ))}
            </div>
            <div className="gallery-slide-track gallery-slide-track-delayed">
              {[...gallerySlides].reverse().concat([...gallerySlides].reverse()).map((slide, index) => (
                <figure className="gallery-slide-card" key={`${slide.src}-b-${index}`}>
                  <img src={slide.src} alt="" loading="lazy" />
                  <span className="gallery-slide-glow" />
                </figure>
              ))}
            </div>
          </div>
          <div className="gallery-slide-fade gallery-slide-fade-left" />
          <div className="gallery-slide-fade gallery-slide-fade-right" />
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
