import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CustomCursor from './CustomCursor.jsx';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

const profilePhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80';

const defaultNotifications = [
  ['New grant opportunity added', '2 hours ago'],
  ['Mentorship session confirmed', 'Yesterday'],
  ['Digital Solutions Hackathon deadline in 3 days', '2 days ago'],
  ['Club meeting rescheduled to Friday', '3 days ago'],
];

export default function DashboardLayout({ children, activePage, notifications: notifOverride, onNotificationsRead }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [toasts, setToasts] = useState([]);
  const menuRef = useRef(null);
  const notifRef = useRef(null);
  const toastIdRef = useRef(0);

  const userName = localStorage.getItem('c360_username') || 'User';
  const userEmail = localStorage.getItem('c360_email') || 'member@c360.org';
  const notifications = notifOverride || defaultNotifications;
  const unreadCount = notificationsRead ? 0 : notifications.length;

  useEffect(() => {
    if (!localStorage.getItem('c360_logged_in')) navigate('/login', { replace: true });
    setSidebarCollapsed(false);
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current?.contains(event.target)) return;
      if (notifRef.current?.contains(event.target)) return;
      setProfileOpen(false);
      setNotificationOpen(false);
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        setNotificationOpen(false);
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
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

  function addToast(message) {
    const id = ++toastIdRef.current;
    setToasts(current => [...current, { id, message }]);
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id));
    }, 3000);
  }

  function handleMarkRead() {
    setNotificationsRead(true);
    if (onNotificationsRead) onNotificationsRead();
    addToast('All notifications marked as read');
  }

  function handleNotificationClick(title) {
    setNotificationOpen(false);
    addToast(`Opened: ${title}`);
  }

  function handleImgError(event) {
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = 'flex';
  }

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <ToastContext.Provider value={addToast}>
      <div className="dashboard-shell">
        <CustomCursor />

        <nav className="dashboard-topbar">
          <div className="dashboard-topbar-left">
            <button
              type="button"
              className={`dashboard-sidebar-toggle${sidebarOpen || (!sidebarCollapsed && window.innerWidth > 768) ? ' open' : ''}`}
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
            >
              <span />
              <span />
              <span />
            </button>
            <Link to="/" className="nav-logo" aria-label="C360 Innovation Lab home">
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
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              aria-expanded={notificationOpen}
              aria-haspopup="menu"
            >
              {unreadCount > 0 && <span>{unreadCount}</span>}
            </button>
            <button
              type="button"
              className="dashboard-profile-button"
              onClick={() => {
                setProfileOpen(current => !current);
                setNotificationOpen(false);
              }}
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <div className="dashboard-profile-avatar-wrap">
                <img
                  className="dashboard-profile-avatar"
                  src={profilePhoto}
                  alt={`${userName}'s profile`}
                  loading="lazy"
                  onError={handleImgError}
                />
                <div className="dashboard-profile-avatar-fallback" style={{ display: 'none' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
            </button>

            {notificationOpen && (
              <div className="dashboard-notification-menu" role="menu" aria-label="Notifications">
                <div className="dashboard-dropdown-header">
                  <div>
                    <strong>Notifications</strong>
                    <small>{notificationsRead ? 'No unread updates' : `${unreadCount} unread updates`}</small>
                  </div>
                  {!notificationsRead && (
                    <button type="button" onClick={handleMarkRead}>Mark read</button>
                  )}
                </div>
                <div className="dashboard-dropdown-list">
                  {notifications.length === 0 ? (
                    <div className="dashboard-empty-state">
                      <span>No notifications yet</span>
                    </div>
                  ) : (
                    notifications.map(([title, time]) => (
                      <button
                        key={title}
                        type="button"
                        role="menuitem"
                        className={notificationsRead ? 'read' : undefined}
                        onClick={() => handleNotificationClick(title)}
                      >
                        <span aria-hidden="true" />
                        <div>
                          <strong>{title}</strong>
                          <small>{time}</small>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {profileOpen && (
              <div className="dashboard-profile-menu" role="menu" aria-label="Profile menu">
                <div className="dashboard-profile-menu-head">
                  <div className="dashboard-profile-avatar-wrap">
                    <img className="dashboard-profile-menu-avatar" src={profilePhoto} alt="" loading="lazy" onError={handleImgError} />
                    <div className="dashboard-profile-avatar-fallback" style={{ display: 'none' }}>
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <strong>{userName}</strong>
                    <small>{userEmail}</small>
                  </div>
                </div>
                <div className="dashboard-profile-menu-list" role="separator">
                  <button type="button" role="menuitem" onClick={() => { setProfileOpen(false); addToast('Profile settings coming soon'); }}>My Profile</button>
                  <button type="button" role="menuitem" onClick={() => { setProfileOpen(false); addToast('Account settings coming soon'); }}>Account Settings</button>
                  <button type="button" role="menuitem" onClick={() => { setProfileOpen(false); setNotificationOpen(true); }}>Notifications</button>
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
          <div className="dashboard-sidebar-user">
            <div className="dashboard-profile-avatar-wrap">
              <img className="dashboard-sidebar-avatar" src={profilePhoto} alt="" loading="lazy" onError={handleImgError} />
              <div className="dashboard-profile-avatar-fallback" style={{ display: 'none' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div className="dashboard-sidebar-name">{userName}</div>
              <div className="dashboard-sidebar-role">{localStorage.getItem('c360_role') || 'Member'}</div>
            </div>
          </div>
          <nav className="c360-dashboard-side-menu" aria-label="Dashboard navigation">
            <div className="c360-dashboard-side-list">
              <Link
                to="/"
                className="c360-dashboard-side-link"
              >
                <span className="c360-dashboard-side-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </span>
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard"
                className={`c360-dashboard-side-link${activePage === 'dashboard' ? ' active' : ''}`}
                aria-current={activePage === 'dashboard' ? 'page' : undefined}
              >
                <span className="c360-dashboard-side-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.8Z" />
                  </svg>
                </span>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/learn"
                className={`c360-dashboard-side-link${activePage === 'learn' ? ' active' : ''}`}
                aria-current={activePage === 'learn' ? 'page' : undefined}
              >
                <span className="c360-dashboard-side-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Zm2.5-.5A.5.5 0 0 0 7 4.5v13.55c.17-.03.33-.05.5-.05H18V4H7.5Z" />
                  </svg>
                </span>
                <span>Learn</span>
              </Link>
            </div>
          </nav>
          <div className="dashboard-sidebar-footer">&copy; {new Date().getFullYear()} C360 Innovation Lab</div>
        </aside>

        <main className={`dashboard-main${sidebarCollapsed ? ' expanded' : ''}`}>
          {children}
        </main>
      </div>

      <div className="dashboard-toast-container" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className="dashboard-toast">
            <span className="dashboard-toast-icon" aria-hidden="true">&#10003;</span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
