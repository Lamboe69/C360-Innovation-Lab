import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor.jsx';

const stats = [
  ['Club Joined', '1', 'Active'],
  ['Badges Earned', '3', '1 new'],
  ['Programs Completed', '2', 'On track'],
  ['Mentorship Sessions', '5', 'Next: Tomorrow'],
];

const events = [
  ['18', 'Jul', 'Innovation Bootcamp 2025', 'Workshop'],
  ['05', 'Aug', 'Digital Solutions Hackathon', 'Competition'],
  ['22', 'Aug', 'Entrepreneurship Masterclass', 'Webinar'],
];

const notifications = [
  ['New grant opportunity added', '2 hours ago'],
  ['Mentorship session confirmed', 'Yesterday'],
  ['Digital Solutions Hackathon deadline in 3 days', '2 days ago'],
  ['Club meeting rescheduled to Friday', '3 days ago'],
];

const learningTracks = [
  ['Digital Skills Bootcamp', 75, 'Next lesson: Building your online portfolio'],
  ['Design Thinking Intensive', 40, 'Next lesson: Prototype testing with users'],
  ['Financial Literacy Basics', 90, 'Next lesson: Budgeting for growth'],
];

const profilePhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [activeStat, setActiveStat] = useState(stats[0][0]);
  const [activeLearning, setActiveLearning] = useState(learningTracks[0][0]);
  const profileMenuRef = useRef(null);

  const userName = localStorage.getItem('c360_username') || 'User';
  const userEmail = localStorage.getItem('c360_email') || 'member@c360.org';
  useEffect(() => {
    document.title = 'Dashboard - C360 Innovation Lab';
    if (!localStorage.getItem('c360_logged_in')) navigate('/login', { replace: true });
    setSidebarCollapsed(false);
  }, [navigate]);

  useEffect(() => {
    function closeTopbarMenus(event) {
      if (profileMenuRef.current?.contains(event.target)) return;
      setProfileOpen(false);
      setNotificationOpen(false);
    }

    document.addEventListener('mousedown', closeTopbarMenus);
    return () => document.removeEventListener('mousedown', closeTopbarMenus);
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
        <div className="dashboard-topbar-right" ref={profileMenuRef}>
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
            {!notificationsRead && <span>{notifications.length}</span>}
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
                  <small>{notificationsRead ? 'No unread updates' : `${notifications.length} unread updates`}</small>
                </div>
                <button type="button" onClick={() => setNotificationsRead(true)}>Mark read</button>
              </div>
              <div className="dashboard-dropdown-list">
                {notifications.map(([title, time]) => (
                  <button key={title} type="button" role="menuitem" className={notificationsRead ? 'read' : undefined}>
                    <span />
                    <div>
                      <strong>{title}</strong>
                      <small>{time}</small>
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
                <button type="button" role="menuitem">Notifications</button>
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
            <Link to="/dashboard" className="c360-dashboard-side-link active">
              <span className="c360-dashboard-side-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.8Z" />
                </svg>
              </span>
              <span>Dashboard</span>
            </Link>
            <Link to="/learn" className="c360-dashboard-side-link">
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

      <main className={`dashboard-main${sidebarCollapsed ? ' expanded' : ''}`}>
        <section className="dashboard-stats-grid" aria-label="Dashboard stats">
          {stats.map(([label, value, status]) => (
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
              <Link to="/learn">View all</Link>
            </div>
            <div className="dashboard-event-list">
              {events.map(([day, month, title, type]) => (
                <div key={title} className="dashboard-event-item">
                  <div className="dashboard-event-date">
                    <strong>{day}</strong>
                    <span>{month}</span>
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{type}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>Recent Notifications</h2>
              <button type="button" onClick={() => setNotificationsRead(true)}>Mark all read</button>
            </div>
            <div className="dashboard-notification-list">
              {notifications.map(([title, time]) => (
                <div key={title} className={`dashboard-notification-item${notificationsRead ? ' read' : ''}`}>
                  <span />
                  <div>
                    <h3>{title}</h3>
                    <p>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-card dashboard-learning-card">
          <div className="dashboard-card-header">
            <h2>Continue Learning</h2>
            <Link to="/learn">All programs</Link>
          </div>
          <div className="dashboard-learning-grid">
            {learningTracks.map(([title, progress, nextLesson]) => (
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
                <div className="dashboard-progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </button>
            ))}
          </div>
          <div className="dashboard-learning-detail">
            <span>Selected Track</span>
            <strong>{activeLearning}</strong>
            <p>Keep going from your latest checkpoint. Your next activity is ready when you are.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
