import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { photos } from '../data/media.js';
import './revelRootsApply.css';

const STEPS = [
  { id: 'emboss', label: 'Emboss', title: 'Traveler identity', hint: 'Who is boarding Revel Roots?' },
  { id: 'intent', label: 'Intent', title: 'Journey intent', hint: 'Why Uganda, and when?' },
  { id: 'roots', label: 'Roots', title: 'Skills & roots', hint: 'What do you bring to food systems?' },
  { id: 'fuel', label: 'Fuel', title: 'Self-sponsorship', hint: 'Confirm travel readiness.' },
  { id: 'gate', label: 'Gate', title: 'Review & send', hint: 'Stamp your application.' },
];

const FOCUS_OPTIONS = [
  'Rural farmer support',
  'Collaborative learning',
  'Food enterprise',
  'Climate-smart practice',
  'Community lab immersion',
];

const LANG_OPTIONS = ['English', 'French', 'German', 'Dutch', 'Spanish', 'Other'];

const emptyForm = {
  fullName: '',
  email: '',
  nationality: '',
  age: '',
  phone: '',
  destination: 'Uganda',
  duration: '',
  window: '',
  motivation: '',
  focus: [],
  languages: [],
  background: '',
  experience: '',
  fundingAck: false,
  medicalAck: false,
  emergencyName: '',
  emergencyPhone: '',
  codeOfConduct: false,
};

function toggleList(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export default function RevelRootsApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState('');
  const [dir, setDir] = useState(1);

  useEffect(() => {
    document.title = 'Apply — Revel Roots · C360 Innovation Lab';
  }, []);

  const progress = ((step + 1) / STEPS.length) * 100;
  const active = STEPS[step];

  const refCode = useMemo(() => {
    const seed = `${form.fullName}|${form.email}`.trim() || 'GUEST';
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return `RR-UG-${String(hash).slice(0, 6)}`;
  }, [form.fullName, form.email]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(index) {
    const next = {};
    if (index === 0) {
      if (!form.fullName.trim()) next.fullName = 'Full name is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.';
      if (!form.nationality.trim()) next.nationality = 'Nationality is required.';
      if (!form.age || Number(form.age) < 18) next.age = 'Applicants must be 18+.';
    }
    if (index === 1) {
      if (!form.duration) next.duration = 'Choose a duration.';
      if (!form.window.trim()) next.window = 'Share your preferred travel window.';
      if (form.motivation.trim().length < 40) next.motivation = 'Tell us a bit more (40+ characters).';
      if (!form.focus.length) next.focus = 'Pick at least one focus area.';
    }
    if (index === 2) {
      if (!form.languages.length) next.languages = 'Select at least one language.';
      if (form.background.trim().length < 30) next.background = 'Add a short background (30+ characters).';
    }
    if (index === 3) {
      if (!form.fundingAck) next.fundingAck = 'Self-sponsorship confirmation is required.';
      if (!form.medicalAck) next.medicalAck = 'Travel readiness confirmation is required.';
      if (!form.emergencyName.trim()) next.emergencyName = 'Emergency contact name is required.';
      if (!form.emergencyPhone.trim()) next.emergencyPhone = 'Emergency phone is required.';
      if (!form.codeOfConduct) next.codeOfConduct = 'Please accept the code of conduct.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function goTo(index) {
    if (index <= step) {
      setDir(index < step ? -1 : 1);
      setStep(index);
      return;
    }
    // Allow jumping forward only through validated steps
    for (let i = step; i < index; i += 1) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }
    setDir(1);
    setStep(index);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    if (!validateStep(3) && step < 4) {
      setStep(3);
      return;
    }
    if (step !== 4) {
      goNext();
      return;
    }

    setSubmitting(true);
    const stampedAt = new Date();

    await new Promise((resolve) => window.setTimeout(resolve, 1600));

    const payload = {
      ...form,
      refCode,
      program: 'Revel Roots',
      submittedAt: stampedAt.toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('c360_revel_roots_applications') || '[]');
    existing.unshift(payload);
    localStorage.setItem('c360_revel_roots_applications', JSON.stringify(existing.slice(0, 40)));

    setSubmittedAt(
      stampedAt.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    );
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo(0, 0);
  }

  if (submitted) {
    const firstName = form.fullName.split(' ')[0] || 'traveler';

    return (
      <div className="revel-apply-shell revel-confirm-shell">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteNav />
        <main id="main-content" className="revel-confirm-main">
          <section className="revel-confirm">
            <div className="revel-confirm-card">
              <div className="revel-confirm-media" aria-hidden="true">
                <img src={photos.mentorField} alt="" />
                <div className="revel-confirm-media-shade" />
                <p className="revel-confirm-media-tag">Revel Roots · Uganda</p>
              </div>

              <div className="revel-confirm-body">
                <div className="revel-confirm-badge">
                  <i aria-hidden="true" />
                  Application received
                </div>

                <h1>Application confirmed, {firstName}</h1>
                <p className="revel-confirm-lede">
                  Your self-sponsored Revel Roots fellowship application is in the queue.
                  Save your booking reference — we’ll email next steps shortly.
                </p>

                <div className="revel-confirm-ref">
                  <span>Booking reference</span>
                  <strong>{refCode}</strong>
                </div>

                <dl className="revel-confirm-meta">
                  <div>
                    <dt>Destination</dt>
                    <dd>Uganda</dd>
                  </div>
                  <div>
                    <dt>Travel window</dt>
                    <dd>{form.window || 'Flexible'}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{form.duration || 'TBD'}</dd>
                  </div>
                  <div>
                    <dt>Filed</dt>
                    <dd>{submittedAt}</dd>
                  </div>
                </dl>

                <div className="revel-confirm-next">
                  <h2>What happens next</h2>
                  <ol>
                    <li>Projects team reviews your application within a few business days.</li>
                    <li>
                      You’ll hear at <em>{form.email}</em> with placement guidance.
                    </li>
                    <li>Prepare documents, insurance, and your self-sponsored travel budget.</li>
                  </ol>
                </div>

                <div className="revel-confirm-actions">
                  <Link to="/projects" className="btn-hero-primary">
                    Back to Projects <span className="btn-arrow">→</span>
                  </Link>
                  <Link to="/labs" className="btn-hero-outline revel-confirm-outline">
                    Explore Labs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="revel-apply-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main-content" className="revel-apply-main">
        <section className="revel-apply-hero">
          <div className="revel-apply-hero-copy">
            <p className="revel-apply-kicker">Agribusiness · Fellowship travel</p>
            <h1>
              Revel Roots
              <span>Self-sponsored travel to Uganda</span>
            </h1>
            <p>
              A C360 fellowship bringing learners to Uganda to strengthen food systems through
              collaborative learning with local communities and labs. Registration is open —
              complete the five gate stamps below.
            </p>
          </div>
          <figure className="revel-apply-hero-media">
            <img src={photos.schoolyardTruck} alt="Community field work in Uganda" />
            <figcaption>
              <span>DEST · UGANDA</span>
              <span>SELF-FUNDED</span>
              <span>FOOD SYSTEMS</span>
            </figcaption>
          </figure>
        </section>

        <section className="revel-apply-stage">
          <aside className="revel-spine" aria-label="Application progress">
            <div className="revel-spine-meter" style={{ '--progress': `${progress}%` }} />
            <ol className="revel-spine-steps">
              {STEPS.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`revel-spine-node${index === step ? ' is-active' : ''}${index < step ? ' is-done' : ''}`}
                    onClick={() => goTo(index)}
                    disabled={submitting}
                    aria-current={index === step ? 'step' : undefined}
                  >
                    <span className="revel-spine-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="revel-spine-label">{item.label}</span>
                    <span className="revel-spine-title">{item.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="revel-spine-ticket" aria-hidden="true">
              <span>{refCode}</span>
              <em>UGANDA</em>
            </div>
          </aside>

          <form className="revel-gate" onSubmit={handleSubmit} noValidate>
            <header className="revel-gate-head">
              <div>
                <p className="revel-gate-step">Gate {String(step + 1).padStart(2, '0')} / 05 · {active.label}</p>
                <h2>{active.title}</h2>
                <p>{active.hint}</p>
              </div>
              <div className="revel-boarding-stub" aria-hidden="true">
                <span>RR</span>
                <strong>{String(step + 1)}</strong>
              </div>
            </header>

            <div
              key={active.id}
              className={`revel-gate-body revel-dir-${dir > 0 ? 'next' : 'prev'}`}
            >
              {step === 0 && (
                <div className="revel-fields revel-fields-passport">
                  <label>
                    <span>Full name</span>
                    <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} autoComplete="name" />
                    {errors.fullName && <small>{errors.fullName}</small>}
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
                    {errors.email && <small>{errors.email}</small>}
                  </label>
                  <label>
                    <span>Nationality</span>
                    <input value={form.nationality} onChange={(e) => update('nationality', e.target.value)} />
                    {errors.nationality && <small>{errors.nationality}</small>}
                  </label>
                  <label>
                    <span>Age</span>
                    <input type="number" min="18" max="99" value={form.age} onChange={(e) => update('age', e.target.value)} />
                    {errors.age && <small>{errors.age}</small>}
                  </label>
                  <label className="revel-span-2">
                    <span>Phone / WhatsApp</span>
                    <input value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="revel-fields revel-fields-intent">
                  <div className="revel-dest-pill" aria-hidden="true">
                    <span>Route</span>
                    <strong>Home → Kampala corridor · Uganda</strong>
                  </div>
                  <label>
                    <span>Preferred duration</span>
                    <select value={form.duration} onChange={(e) => update('duration', e.target.value)}>
                      <option value="">Select…</option>
                      <option value="2-4 weeks">2–4 weeks</option>
                      <option value="1-2 months">1–2 months</option>
                      <option value="3 months">About 3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.duration && <small>{errors.duration}</small>}
                  </label>
                  <label>
                    <span>Preferred travel window</span>
                    <input
                      placeholder="e.g. Sep–Nov 2026"
                      value={form.window}
                      onChange={(e) => update('window', e.target.value)}
                    />
                    {errors.window && <small>{errors.window}</small>}
                  </label>
                  <fieldset className="revel-chipset">
                    <legend>Focus areas</legend>
                    <div>
                      {FOCUS_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={form.focus.includes(option) ? 'is-on' : ''}
                          onClick={() => update('focus', toggleList(form.focus, option))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.focus && <small>{errors.focus}</small>}
                  </fieldset>
                  <label className="revel-span-2">
                    <span>Why Revel Roots? (Share your motivation in less than 500 words)</span>
                    <textarea
                      rows={4}
                      value={form.motivation}
                      onChange={(e) => update('motivation', e.target.value)}
                      placeholder="What draws you to collaborative food-systems learning in Uganda?"
                    />
                    {errors.motivation && <small>{errors.motivation}</small>}
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="revel-fields revel-fields-roots">
                  <fieldset className="revel-chipset">
                    <legend>Languages</legend>
                    <div>
                      {LANG_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={form.languages.includes(option) ? 'is-on' : ''}
                          onClick={() => update('languages', toggleList(form.languages, option))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.languages && <small>{errors.languages}</small>}
                  </fieldset>
                  <label className="revel-span-2">
                    <span>Background</span>
                    <textarea
                      rows={3}
                      value={form.background}
                      onChange={(e) => update('background', e.target.value)}
                      placeholder="Studies, work, or community experience relevant to food systems…"
                    />
                    {errors.background && <small>{errors.background}</small>}
                  </label>
                  <label className="revel-span-2">
                    <span>Field / lab experience (optional)</span>
                    <textarea
                      rows={3}
                      value={form.experience}
                      onChange={(e) => update('experience', e.target.value)}
                      placeholder="Farming, research, facilitation, storytelling…"
                    />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="revel-fields revel-fields-fuel">
                  <label className="revel-check">
                    <input
                      type="checkbox"
                      checked={form.fundingAck}
                      onChange={(e) => update('fundingAck', e.target.checked)}
                    />
                    <span>
                      I understand Revel Roots is <strong>self-sponsored</strong> — I will cover my own
                      travel, lodging, insurance, and living costs for the Uganda fellowship period.
                    </span>
                  </label>
                  {errors.fundingAck && <small className="revel-error">{errors.fundingAck}</small>}

                  <label className="revel-check">
                    <input
                      type="checkbox"
                      checked={form.medicalAck}
                      onChange={(e) => update('medicalAck', e.target.checked)}
                    />
                    <span>
                      I will arrange required travel documents, vaccinations, and insurance before
                      departure.
                    </span>
                  </label>
                  {errors.medicalAck && <small className="revel-error">{errors.medicalAck}</small>}

                  <label>
                    <span>Emergency contact name</span>
                    <input value={form.emergencyName} onChange={(e) => update('emergencyName', e.target.value)} />
                    {errors.emergencyName && <small>{errors.emergencyName}</small>}
                  </label>
                  <label>
                    <span>Emergency contact phone</span>
                    <input value={form.emergencyPhone} onChange={(e) => update('emergencyPhone', e.target.value)} />
                    {errors.emergencyPhone && <small>{errors.emergencyPhone}</small>}
                  </label>

                  <label className="revel-check revel-span-2">
                    <input
                      type="checkbox"
                      checked={form.codeOfConduct}
                      onChange={(e) => update('codeOfConduct', e.target.checked)}
                    />
                    <span>
                      I agree to C360 community guidelines and respectful collaboration with local
                      labs and partners.
                    </span>
                  </label>
                  {errors.codeOfConduct && <small className="revel-error">{errors.codeOfConduct}</small>}
                </div>
              )}

              {step === 4 && (
                <div className="revel-review">
                  <div className="revel-pass revel-pass-preview">
                    <div className="revel-pass-perforation" aria-hidden="true" />
                    <p className="revel-pass-airline">BOARDING PREVIEW · REVEL ROOTS</p>
                    <h3>{form.fullName || 'Traveler'}</h3>
                    <div className="revel-pass-grid">
                      <div><span>Ref</span><strong>{refCode}</strong></div>
                      <div><span>To</span><strong>Uganda</strong></div>
                      <div><span>Window</span><strong>{form.window || '—'}</strong></div>
                      <div><span>Duration</span><strong>{form.duration || '—'}</strong></div>
                      <div><span>Nationality</span><strong>{form.nationality || '—'}</strong></div>
                      <div><span>Email</span><strong>{form.email || '—'}</strong></div>
                    </div>
                    <p className="revel-pass-focus">
                      {(form.focus.length ? form.focus : ['Focus TBD']).join(' · ')}
                    </p>
                  </div>
                  <p className="revel-review-note">
                    Submitting notifies the C360 Projects team. You can still edit previous gates
                    before you stamp send.
                  </p>
                </div>
              )}
            </div>

            <footer className="revel-gate-foot">
              <button
                type="button"
                className="btn-hero-outline"
                onClick={goBack}
                disabled={step === 0 || submitting}
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn-hero-primary" onClick={goNext} disabled={submitting}>
                  Continue <span className="btn-arrow">→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className={`btn-hero-primary revel-submit-btn${submitting ? ' is-loading' : ''}`}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="revel-submit-spinner" aria-hidden="true" />
                      Stamping application…
                    </>
                  ) : (
                    <>Stamp & send application</>
                  )}
                </button>
              )}
            </footer>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
