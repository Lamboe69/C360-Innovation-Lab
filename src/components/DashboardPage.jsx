import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { photos } from '../data/media.js';
import DashboardLayout, { useToast } from './DashboardLayout.jsx';

const stats = [
  { label: 'Lab Joined', value: '1', status: 'Active', icon: '1F3F4' },
  { label: 'Badges Earned', value: '3', status: '1 new', icon: '1F3C5' },
  { label: 'Career Tracks', value: '2', status: 'On track', icon: '1F4DA' },
  { label: 'Mentorship Sessions', value: '5', status: 'Next: Tomorrow', icon: '1F464' },
];

const events = [
  { day: '25', month: 'Jul', title: 'Innovation Bootcamp 2026', type: 'Workshop', color: 'var(--blue-light)' },
  { day: '12', month: 'Aug', title: 'Digital Solutions Hackathon', type: 'Competition', color: 'var(--blue)' },
  { day: '30', month: 'Sep', title: 'Entrepreneurship Masterclass', type: 'Webinar', color: 'var(--blue-dark)' },
];

const notifications = [
  { title: 'New grant opportunity added', time: '2 hours ago' },
  { title: 'Mentorship session confirmed', time: 'Yesterday' },
  { title: 'Digital Solutions Hackathon deadline in 3 days', time: '2 days ago' },
  { title: 'Lab meeting rescheduled to Friday', time: '3 days ago' },
];

const learningTracks = [
  { title: 'Digital Skills Bootcamp', progress: 75, nextLesson: 'Building your online portfolio', description: 'Web, product, and digital problem-solving skills.', lessons: 12, estimatedHours: 18, image: photos.handsUpUbuntu },
  { title: 'Design Thinking Intensive', progress: 40, nextLesson: 'Prototype testing with users', description: 'User research, problem framing, rapid prototyping.', lessons: 8, estimatedHours: 12, image: photos.clappingLine },
  { title: 'Financial Literacy Basics', progress: 90, nextLesson: 'Budgeting for growth', description: 'Budgeting, saving, and investment fundamentals.', lessons: 10, estimatedHours: 8, image: photos.teamBranded },
];

const quickActions = [
  { label: 'Join a Lab', route: '/labs', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )},
  { label: 'Book Mentorship', route: '/mentorship-sessions', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )},
  { label: 'Career Engine', route: '/learn', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )},
  { label: 'View Badges', route: '/profile', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )},
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [activeStat, setActiveStat] = useState(stats[0].label);
  const [activeLearning, setActiveLearning] = useState(learningTracks[0].title);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard - C360 Innovation Lab';
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const userName = localStorage.getItem('c360_username') || 'User';
  const selectedTrack = learningTracks.find(t => t.title === activeLearning) || learningTracks[0];

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <DashboardLayout
      activePage="dashboard"
      notifications={notifications.map(n => [n.title, n.time])}
      onNotificationsRead={() => setNotificationsRead(true)}
    >
      {loading ? (
        <>
          <section className="dashboard-stats-grid" aria-label="Dashboard stats">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="dashboard-stat-card" style={{ border: 'none' }}>
                <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 28, width: '30%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '40%' }} />
              </div>
            ))}
          </section>
          <section className="dashboard-card-grid">
            {[1, 2].map(card => (
              <article key={card} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="skeleton" style={{ height: 22, width: '45%' }} />
                </div>
                {[1, 2, 3].map(row => (
                  <div key={row} className="dashboard-event-item" style={{ border: 'none' }}>
                    <div className="skeleton" style={{ width: 50, height: 50, borderRadius: 10 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ height: 16, width: '70%', marginBottom: 6 }} />
                      <div className="skeleton" style={{ height: 12, width: '40%' }} />
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </section>
          <section className="dashboard-card dashboard-learning-card">
            <div className="dashboard-card-header">
              <div className="skeleton" style={{ height: 22, width: '40%' }} />
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div className="skeleton" style={{ height: 16, width: '60%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '80%', marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 6, width: '100%', borderRadius: 3 }} />
              </div>
            ))}
          </section>
        </>
      ) : (
        <>
          <div className="dashboard-page-header">
            <div>
              <div className="dashboard-kicker">{getGreeting()}</div>
              <h1>Welcome back, {userName.split(' ')[0]}</h1>
              <p>Here's what's happening with your learning journey today.</p>
            </div>
          </div>

          <section className="dashboard-quick-actions" aria-label="Quick actions">
            {quickActions.map(action => (
              <button
                key={action.label}
                type="button"
                className="dashboard-quick-action"
                onClick={() => {
                  navigate(action.route);
                  addToast(`Opening ${action.label.toLowerCase()}...`);
                }}
              >
                <span className="dashboard-quick-action-icon">{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </section>

          <section className="dashboard-stats-grid" aria-label="Dashboard stats">
            {stats.map(({ label, value, status }) => (
              <button
                key={label}
                type="button"
                className={`dashboard-stat-card${activeStat === label ? ' active' : ''}`}
                onClick={() => setActiveStat(label)}
              >
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{status}</small>
              </button>
            ))}
          </section>

          <section className="dashboard-card-grid">
            <article className="dashboard-card">
              <div className="dashboard-card-header">
                <h2>Upcoming Events</h2>
                <button type="button" onClick={() => { navigate('/learn'); addToast('Viewing all programs'); }}>View all</button>
              </div>
              <div className="dashboard-event-list">
                {events.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <span>No upcoming events</span>
                    <p>Check back later for new events.</p>
                  </div>
                ) : (
                  events.map(({ day, month, title, type, color }) => (
                    <button
                      key={title}
                      type="button"
                      className="dashboard-event-item"
                      onClick={() => addToast(`Event details: ${title}`)}
                    >
                      <div className="dashboard-event-date" style={{ borderColor: color }}>
                        <strong>{day}</strong>
                        <span>{month}</span>
                      </div>
                      <div>
                        <h3>{title}</h3>
                        <p>{type}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </article>

            <article className="dashboard-card">
              <div className="dashboard-card-header">
                <h2>Recent Notifications</h2>
                {!notificationsRead && (
                  <button type="button" onClick={() => setNotificationsRead(true)}>Mark all read</button>
                )}
              </div>
              <div className="dashboard-notification-list">
                {notifications.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <span>No notifications</span>
                    <p>You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map(({ title, time }) => (
                    <button
                      key={title}
                      type="button"
                      className={`dashboard-notification-item${notificationsRead ? ' read' : ''}`}
                      onClick={() => addToast(`Opened: ${title}`)}
                    >
                      <span />
                      <div>
                        <h3>{title}</h3>
                        <p>{time}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </article>
          </section>

          <section className="dashboard-card dashboard-learning-card">
            <div className="dashboard-card-header">
              <h2>Continue Learning</h2>
              <button type="button" onClick={() => navigate('/learn')}>All programs</button>
            </div>
            <div className="dashboard-learning-grid">
              {learningTracks.map(({ title, progress, nextLesson }) => (
                <button
                  key={title}
                  type="button"
                  className={`dashboard-learning-item${activeLearning === title ? ' active' : ''}`}
                  onClick={() => setActiveLearning(title)}
                >
                  <div className="dashboard-learning-top">
                    <span>{title}</span>
                    <strong>{progress}%</strong>
                  </div>
                  <p>{nextLesson}</p>
                  <div
                    className="dashboard-progress-track"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${title} progress: ${progress}%`}
                  >
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </button>
              ))}
            </div>
            <div className="dashboard-learning-detail">
              {selectedTrack.image && <img src={selectedTrack.image} alt="" className="dashboard-learning-img" loading="lazy" />}
              <span>Selected Track</span>
              <strong>{selectedTrack.title}</strong>
              <p>{selectedTrack.description}</p>
              <div className="dashboard-learning-detail-meta">
                <span>{selectedTrack.lessons} lessons</span>
                <span>&bull;</span>
                <span>~{selectedTrack.estimatedHours} hours</span>
                <span>&bull;</span>
                <span>{selectedTrack.progress}% complete</span>
              </div>
              <button
                type="button"
                className="dashboard-learning-resume"
                onClick={() => navigate('/learn')}
              >
                Resume Learning
              </button>
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
