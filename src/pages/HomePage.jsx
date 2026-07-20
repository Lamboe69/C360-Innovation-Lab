import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { photos } from '../data/media.js';
import './homePage.css';

const marqueeItems = [
  'C360 Labs',
  'Career Engine',
  'Global Network',
  'C360 Projects',
  'Mentorship',
  'Revel Roots',
  'Talent Mobility',
  'Sports4Development',
  'Revolving Fund',
  'Smart Climate',
];

const HERO_INTERVAL_MS = 4000;

const heroCarousel = [
  {
    src: photos.ubuntuGroup,
    alt: 'Students in Ubuntu shirts at a C360 community gathering',
    title: 'C360 Labs',
    line: 'Institutional and community labs for mentorship, ideas, and growth.',
  },
  {
    src: photos.mentorField,
    alt: 'C360 mentor guiding students in an outdoor field session',
    title: 'Career Engine',
    line: 'Premium assessments, AI agents, and tailored career pathways.',
  },
  {
    src: photos.armsRaisedDrone,
    alt: 'Youth raising hands during a C360 community program',
    title: 'Global Network',
    line: 'Schools, mentors, industries, donors, and research allies.',
  },
  {
    src: photos.danceBlueAxes,
    alt: 'Youth cultural performance connected to C360 projects',
    title: 'C360 Projects',
    line: 'Food systems, media, talent, sports, finance, and climate action.',
  },
  {
    src: photos.c360ShirtsWalk,
    alt: 'Community members wearing C360 Innovation Lab shirts',
    title: 'Four Pillars',
    line: 'One ecosystem — labs, career support, network, and projects.',
  },
];

const gallerySlides = [
  { src: photos.crowdJoy, alt: 'Joyful children at a C360 community event' },
  { src: photos.laughingCyan, alt: 'Young person laughing during a field program' },
  { src: photos.walkDirtRoad, alt: 'Students walking together on a rural road' },
  { src: photos.girlsCelebrateWalk, alt: 'Girls celebrating during a community walk' },
  { src: photos.speakerC360Polo, alt: 'Speaker in a C360 polo addressing the community' },
  { src: photos.culturalHeaddress, alt: 'Youth cultural ensemble with traditional headdresses' },
  { src: photos.handsUpUbuntu, alt: 'Students raising hands in an Ubuntu session' },
  { src: photos.boyJerrycan, alt: 'Young boy smiling at a community gathering' },
];

const stories = [
  [photos.schoolyardTruck, 'Projects · Agribusiness', 'Farmer Empowerment Through Lab Innovation', 'A C360 Lab member built practical tools that now support rural farmers — the kind of delivery our Agribusiness & Food Systems track exists to scale.'],
  [photos.speakerRacePeace, 'Projects · C360 Media', 'Storytelling That Amplifies Change Agents', 'Young storytellers in our labs learn to document and amplify community change agents across the Global Network.'],
  [photos.walkProcession, 'Projects · Smart Climate', 'Climate-Smart Farming Awareness', 'Labs and partners promote smart farming while protecting the environment — linking livelihoods to climate stewardship.'],
];

const clubs = [
  [photos.studentsC360, 'Institutional · Kampala', 'Makerere University Lab', 'University lab for mentorship, research, idea development, and Career Engine pathways.'],
  [photos.clappingLine, 'Institutional · Gulu', 'St. Joseph College–Layibi Lab', 'Secondary school makers growing skills, ideas, and peer leadership.'],
  [photos.paimolSigns, 'Community · Paimol', 'Greater Paimol Community Lab', 'Community enterprise, local solutions, and personal growth.'],
  [photos.crowdOrange, 'Community · Gulu', 'Gulu Community Lab', 'Youth skills, civic projects, and mentorship in community.'],
  [photos.youthSmile, 'Institutional · Primary', 'St. Michael Primary School Lab', 'Age-appropriate creativity and discovery for younger learners.'],
  [photos.teamBranded, 'Open · New Labs', 'Your Lab Could Be Next', 'When a new lab opens, it joins our searchable Labs directory — schools and communities welcome.'],
];

const cards = [
  ['01 / LABS', photos.ubuntuGroup, 'C360 Labs', 'Institutional and community labs where people access mentorship, develop ideas, grow as individuals, and can subscribe to the Career Engine.', '/labs', 'Find a Lab'],
  ['02 / CAREER', photos.mentorField, 'Career Engine', 'Premium questionnaires, SWOT assessments, AI agents, progress dashboards, discussion rooms, and pen-pal links for paid members.', '/career', 'View Engine'],
  ['03 / NETWORK', photos.walkPoliceEscort, 'C360 Global Network', 'Searchable lists of schools, mentors, industries, businesses, companies, donors, universities, and research agencies.', '/network', 'Browse Network'],
  ['04 / PROJECTS', photos.culturalDrums, 'C360 Projects', 'Agribusiness & Food Systems, Media, Talent Mobility, Sports4Development, Revolving Fund, and Smart Climate Awareness.', '/projects', 'See Projects'],
];

const stats = [
  ['4', 'Operating', 'Pillars'],
  ['5+', 'Listed', 'Labs'],
  ['Premium', 'Career', 'Engine'],
  ['8', 'Network', 'Categories'],
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
    document.title = 'C360 Innovation Lab — Labs, Career Engine, Network & Projects';
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
        <div className="pulse-scan" />
        <div className="pulse-strip-track pulse-strip-track-a">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="pulse-chip" key={`a-${item}-${index}`}>
              <i />
              {item}
            </span>
          ))}
        </div>
        <div className="pulse-strip-track pulse-strip-track-b">
          {[...marqueeItems].reverse().concat([...marqueeItems].reverse()).map((item, index) => (
            <span className="pulse-chip" key={`b-${item}-${index}`}>
              <i />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="field-notes" aria-labelledby="field-notes-title">
        <div className="field-notes-rail" aria-hidden="true">
          <span>FIELD</span>
          <span>NOTES</span>
          <span>01</span>
        </div>
        <div className="field-notes-main">
          <header className="field-notes-header reveal">
            <div className="field-notes-label">
              <span>01</span>
              <em>Field Notes</em>
            </div>
            <h2 id="field-notes-title">Ideas that leave a mark on places.</h2>
            <p>Stories from C360 Labs and Projects — food systems, media, and climate-smart action.</p>
          </header>
          <div className="field-film" role="list">
            {stories.map(([src, tag, title, blurb], index) => (
              <article
                className={`field-frame reveal reveal-delay-${(index % 3) + 1}`}
                key={title}
                role="listitem"
                style={{ '--frame-i': index }}
              >
                <div className="field-frame-sprocket" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </div>
                <div className="field-frame-body">
                  <img src={src} alt="" loading="lazy" />
                  <div className="field-frame-meta">
                    <span className="field-frame-num">{String(index + 1).padStart(2, '0')}</span>
                    <small>{tag}</small>
                    <h3>{title}</h3>
                    <p>{blurb}</p>
                    <Link to="/projects">Open projects →</Link>
                  </div>
                </div>
                <div className="field-frame-sprocket" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-floor" id="labs" aria-labelledby="labs-title">
        <div className="workshop-blueprint" aria-hidden="true" />
        <div className="workshop-header reveal">
          <div className="field-notes-label">
            <span>02</span>
            <em>C360 Labs</em>
          </div>
          <h2 id="labs-title">Walk the lab corridor.</h2>
          <p>Institutional and community labs for mentorship, ideas, and growth — subscribe to the Career Engine when you are ready.</p>
        </div>
        <div className="workshop-corridor">
          {clubs.slice(0, 4).map(([src, meta, name, blurb], index) => (
            <article
              className={`workshop-door reveal reveal-delay-${(index % 3) + 1}`}
              key={name}
              style={{ '--door-i': index }}
            >
              <div className="workshop-door-plate">
                <span className="workshop-door-num">L{String(index + 1).padStart(2, '0')}</span>
                <span className="workshop-tag">{meta}</span>
              </div>
              <div className="workshop-door-window">
                <img src={src} alt="" loading="lazy" />
                <span className="workshop-door-glare" aria-hidden="true" />
              </div>
              <div className="workshop-door-copy">
                <h3>{name}</h3>
                <p>{blurb}</p>
                <Link to="/labs" className="workshop-join">Enter corridor →</Link>
              </div>
              <span className="workshop-door-hinge" aria-hidden="true" />
            </article>
          ))}
        </div>
        <div className="workshop-cta reveal">
          <Link to="/labs" className="btn-hero-outline">Search every lab →</Link>
        </div>
      </section>

      <section className="launch-rails" id="pillars" aria-labelledby="pillars-title">
        <header className="launch-rails-copy reveal">
          <div className="field-notes-label">
            <span>03</span>
            <em>Four Pillars</em>
          </div>
          <h2 id="pillars-title">Labs. Career. Network. Projects.</h2>
          <p>Four alternating bands — one ecosystem, four clear ways in.</p>
        </header>
        <div className="pillar-cascade">
          {cards.map(([number, icon, title, blurb, path, label], index) => (
            <Link
              to={path}
              className={`pillar-band reveal reveal-delay-${(index % 3) + 1}${index % 2 ? ' is-flip' : ''}`}
              key={title}
              style={{ '--band-i': index }}
            >
              <div className="pillar-band-media">
                <img src={icon} alt="" loading="lazy" />
                <span className="pillar-band-num">{number.split(' ')[0]}</span>
              </div>
              <div className="pillar-band-copy">
                <h3>{title}</h3>
                <p>{blurb}</p>
                <span className="pillar-band-cta">{label} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="signal-gate" aria-labelledby="signal-title">
        <div className="signal-radar" aria-hidden="true">
          <span className="signal-ring" />
          <span className="signal-ring" />
          <span className="signal-ring" />
          <span className="signal-sweep" />
          {stats.map(([number], index) => (
            <span
              className="signal-blip"
              key={number}
              style={{ '--blip-i': index }}
            >
              <strong>{number}</strong>
            </span>
          ))}
        </div>
        <div className="signal-gate-inner reveal">
          <p className="signal-gate-kicker">Get Started</p>
          <h2 id="signal-title">
            <span>Ready to</span>
            <em>enter a pillar?</em>
          </h2>
          <ul className="signal-meters">
            {stats.map(([number, lineOne, lineTwo], index) => (
              <li className="signal-meter" key={`${number}-${lineOne}`} style={{ '--meter-i': index }}>
                <strong>{number}</strong>
                <span>{lineOne} {lineTwo}</span>
              </li>
            ))}
          </ul>
          <div className="cta-btns">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard <span className="btn-arrow">→</span></Link>
                <Link to="/learn" className="btn-hero-outline">Career Engine</Link>
              </>
            ) : (
              <>
                <Link to="/labs" className="btn-hero-primary">Join a Lab <span className="btn-arrow">→</span></Link>
                <Link to="/career" className="btn-hero-outline">Career Engine</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="gallery-section" aria-label="Campus moments">
        <div className="gallery-caption" aria-hidden="true">
          <span>Moments on film</span>
          <span>C360 · Continuous roll</span>
        </div>
        <div className="gallery-visual">
          <div className="gallery-slide-stage">
            <div className="gallery-slide-track">
              {[...gallerySlides, ...gallerySlides].map((slide, index) => (
                <figure className="gallery-slide-card" key={`${slide.src}-${index}`}>
                  <img src={slide.src} alt={slide.alt} loading="lazy" />
                  <span className="gallery-slide-glow" />
                  <span className="gallery-frame-id">F-{String((index % gallerySlides.length) + 1).padStart(2, '0')}</span>
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
