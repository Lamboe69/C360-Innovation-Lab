import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor.jsx';

const profilePhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80';

const sources = [
  ['Design Thinking Notes', 'PDF', '12 highlights'],
  ['Digital Skills Bootcamp', 'Course', '6 modules'],
  ['Pitch Deck Checklist', 'Guide', '8 key ideas'],
  ['Mentorship Session Recap', 'Transcript', '14 insights'],
];

const suggestedQuestions = [
  'Summarize my current learning progress',
  'What should I study next?',
  'Create a pitch practice checklist',
];

const studyActions = ['Summarize', 'Quiz me', 'Make a study plan'];

const notes = [
  'Strong problem framing improves every solution discussion.',
  'Prototype tests should focus on one risky assumption at a time.',
  'A good pitch connects user pain, product value, and proof of traction.',
];

export default function LearnPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeSource, setActiveSource] = useState(sources[0][0]);
  const [activeAction, setActiveAction] = useState(studyActions[0]);
  const [lastQuestion, setLastQuestion] = useState('What should I study next?');
  const [prompt, setPrompt] = useState('');
  const menuRef = useRef(null);

  const userName = localStorage.getItem('c360_username') || 'User';
  const userEmail = localStorage.getItem('c360_email') || 'member@c360.org';

  useEffect(() => {
    document.title = 'Learn - C360 Innovation Lab';
    if (!localStorage.getItem('c360_logged_in')) navigate('/login', { replace: true });
    setSidebarCollapsed(false);
  }, [navigate]);

  useEffect(() => {
    function closeMenus(event) {
      if (menuRef.current?.contains(event.target)) return;
      setProfileOpen(false);
      setNotificationOpen(false);
    }

    document.addEventListener('mousedown', closeMenus);
    return () => document.removeEventListener('mousedown', closeMenus);
  }, []);

  function toggleSidebar() {
    if (window.innerWidth > 768) {
      setSidebarCollapsed(current => !current);
      return;
    }
    setSidebarOpen(current => !current);
  }

  function handleLogout() {
    localStorage.removeItem('c360_logged_in');
    localStorage.removeItem('c360_username');
    localStorage.removeItem('c360_email');
    localStorage.removeItem('c360_role');
    navigate('/login');
  }

  function submitPrompt(event) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setLastQuestion(prompt.trim());
    setPrompt('');
  }

  return (
    <div className="dashboard-shell">
      <CustomCursor />

      <nav className="dashboard-topbar">
        <div className="dashboard-topbar-left">
          <button type="button" className="dashboard-sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <span />
            <span />
            <span />
          </button>
          <Link to="/dashboard" className="nav-logo">
            <div className="logo-mark">C360</div>
            Innovation Lab
          </Link>
        </div>
        <div className="dashboard-topbar-right" ref={menuRef}>
          <button
            type="button"
            className="dashboard-notification-button"
            onClick={() => {
              setNotificationOpen(current => !current);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            aria-haspopup="menu"
          >
            <span>3</span>
          </button>
          <button
            type="button"
            className="dashboard-profile-button"
            onClick={() => {
              setProfileOpen(current => !current);
              setNotificationOpen(false);
            }}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <img className="dashboard-profile-avatar" src={profilePhoto} alt={`${userName}'s profile`} />
          </button>

          {notificationOpen && (
            <div className="dashboard-notification-menu" role="menu">
              <div className="dashboard-dropdown-header">
                <div>
                  <strong>Notifications</strong>
                  <small>3 unread updates</small>
                </div>
              </div>
              <div className="dashboard-dropdown-list">
                {['New source suggestion available', 'Your learning recap is ready', 'Mentor note added'].map(item => (
                  <button key={item} type="button" role="menuitem">
                    <span />
                    <div>
                      <strong>{item}</strong>
                      <small>Today</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {profileOpen && (
            <div className="dashboard-profile-menu" role="menu">
              <div className="dashboard-profile-menu-head">
                <img className="dashboard-profile-menu-avatar" src={profilePhoto} alt="" />
                <div>
                  <strong>{userName}</strong>
                  <small>{userEmail}</small>
                </div>
              </div>
              <div className="dashboard-profile-menu-list">
                <button type="button" role="menuitem">My Profile</button>
                <button type="button" role="menuitem">Account Settings</button>
              </div>
              <button type="button" className="dashboard-profile-logout" onClick={handleLogout} role="menuitem">
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      <button
        type="button"
        className={`dashboard-overlay${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      />

      <aside className={`dashboard-sidebar${sidebarOpen ? ' open' : ''}${sidebarCollapsed ? ' collapsed' : ''}`}>
        <nav className="c360-dashboard-side-menu" aria-label="Dashboard navigation">
          <div className="c360-dashboard-side-list">
            <Link to="/dashboard" className="c360-dashboard-side-link">
              <span className="c360-dashboard-side-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.8Z" />
                </svg>
              </span>
              <span>Dashboard</span>
            </Link>
            <Link to="/learn" className="c360-dashboard-side-link active">
              <span className="c360-dashboard-side-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Zm2.5-.5A.5.5 0 0 0 7 4.5v13.55c.17-.03.33-.05.5-.05H18V4H7.5Z" />
                </svg>
              </span>
              <span>Learn</span>
            </Link>
          </div>
        </nav>
        <div className="dashboard-sidebar-footer">© 2025 C360 Innovation Lab</div>
      </aside>

      <main className={`dashboard-main learn-main${sidebarCollapsed ? ' expanded' : ''}`}>
        <section className="learn-workspace" aria-label="Learning workspace">
          <aside className="learn-panel learn-sources-panel">
            <div className="learn-panel-header">
              <div>
                <span>Sources</span>
                <small>{sources.length} connected materials</small>
              </div>
              <button type="button">Add</button>
            </div>
            <div className="learn-upload-dropzone">
              <strong>Add source</strong>
              <p>Upload notes, links, PDFs, or transcripts.</p>
            </div>
            <div className="learn-source-list">
              {sources.map(([title, type, meta]) => (
                <button
                  key={title}
                  type="button"
                  className={`learn-source-card${activeSource === title ? ' active' : ''}`}
                  onClick={() => setActiveSource(title)}
                >
                  <span>{type.slice(0, 1)}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{meta}</small>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="learn-chat-panel">
            <div className="learn-hero-card">
              <h1>Ask anything about your learning sources.</h1>
              <p>Select a source, ask a question, or generate summaries from your saved learning materials.</p>
            </div>

            <div className="learn-selected-source">
              <div>
                <span>Current Source</span>
                <strong>{activeSource}</strong>
              </div>
              <div className="learn-action-pills">
                {studyActions.map(action => (
                  <button
                    key={action}
                    type="button"
                    className={activeAction === action ? 'active' : undefined}
                    onClick={() => setActiveAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="learn-question-grid">
              {suggestedQuestions.map(question => (
                <button
                  key={question}
                  type="button"
                  onClick={() => {
                    setPrompt(question);
                    setLastQuestion(question);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="learn-chat-answer">
              <span>AI Study Partner</span>
              <strong>{lastQuestion}</strong>
              <p>
                Based on <em>{activeSource}</em>, I would start with a short summary, then turn
                the main points into practice questions. Your selected mode is <em>{activeAction}</em>,
                so the next response will be shaped for that task.
              </p>
            </div>

            <form className="learn-prompt-box" onSubmit={submitPrompt}>
              <input
                type="text"
                value={prompt}
                onChange={event => setPrompt(event.target.value)}
                placeholder="Ask about your sources..."
              />
              <button type="submit">Ask</button>
            </form>
          </section>

          <aside className="learn-panel learn-studio-panel">
            <div className="learn-panel-header">
              <div>
                <span>Studio</span>
                <small>Create from selected source</small>
              </div>
              <button type="button">Create</button>
            </div>
            <button type="button" className={`learn-studio-card${activeAction === 'Make a study plan' ? ' active' : ''}`} onClick={() => setActiveAction('Make a study plan')}>
              <strong>Study Guide</strong>
              <p>Generate a structured guide from the selected source.</p>
            </button>
            <button type="button" className={`learn-studio-card${activeAction === 'Summarize' ? ' active' : ''}`} onClick={() => setActiveAction('Summarize')}>
              <strong>Briefing Doc</strong>
              <p>Turn your notes into a concise summary.</p>
            </button>
            <button type="button" className={`learn-studio-card${activeAction === 'Quiz me' ? ' active' : ''}`} onClick={() => setActiveAction('Quiz me')}>
              <strong>Practice Quiz</strong>
              <p>Create quick questions from your current source.</p>
            </button>
            <div className="learn-note-stack">
              <span>Saved Notes</span>
              {notes.map(note => <p key={note}>{note}</p>)}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
