/**
 * auth.js — C360 Innovation Lab
 * Handles navbar transformation on login/logout across all public pages.
 */

(function () {
  const LOGGED_IN_KEY = 'c360_logged_in';
  const USERNAME_KEY  = 'c360_username';
  const ROLE_KEY      = 'c360_role';
  const EMAIL_KEY     = 'c360_email';

  const isLoggedIn = !!localStorage.getItem(LOGGED_IN_KEY);

  /* ── HELPERS ── */
  function getInitial() {
    const name = localStorage.getItem(USERNAME_KEY) || 'U';
    return name.charAt(0).toUpperCase();
  }
  function getFirstName() {
    const name = localStorage.getItem(USERNAME_KEY) || 'User';
    return name.split(' ')[0];
  }

  /* ── APPLY NAV STATE ── */
  function applyNavState() {
    const navLinks   = document.querySelector('.nav-links');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navLinks) return;

    if (isLoggedIn) {

      /* ── DESKTOP: remove Login + Register ── */
      navLinks.querySelectorAll('li').forEach(li => {
        const a = li.querySelector('a');
        if (a && (a.href.includes('login.html') || a.href.includes('register.html'))) {
          li.remove();
        }
      });

      /* ── DESKTOP: inject bell + avatar ── */
      const authGroup = document.createElement('li');
      authGroup.className = 'nav-auth-group';
      authGroup.innerHTML = `
        <div class="nav-bell" id="nav-bell" title="Notifications">
          <span class="bell-icon">🔔</span>
          <span class="bell-badge" id="bell-badge">3</span>
          <div class="bell-dropdown" id="bell-dropdown">
            <div class="bell-dropdown-header">Notifications</div>
            <div class="bell-item unread">
              <span class="bell-item-dot"></span>
              <div class="bell-item-body">
                <div class="bell-item-title">New grant opportunity added</div>
                <div class="bell-item-time">2 hours ago</div>
              </div>
            </div>
            <div class="bell-item unread">
              <span class="bell-item-dot"></span>
              <div class="bell-item-body">
                <div class="bell-item-title">Mentorship session confirmed</div>
                <div class="bell-item-time">Yesterday</div>
              </div>
            </div>
            <div class="bell-item unread">
              <span class="bell-item-dot"></span>
              <div class="bell-item-body">
                <div class="bell-item-title">Innovation Bootcamp registration open</div>
                <div class="bell-item-time">2 days ago</div>
              </div>
            </div>
            <a href="dashboard.html" class="bell-view-all">View all notifications</a>
          </div>
        </div>
        <div class="nav-avatar-wrap" id="nav-avatar-wrap">
          <div class="nav-avatar" id="nav-avatar">
            <span class="avatar-initial">${getInitial()}</span>
          </div>
          <span class="nav-avatar-name">${getFirstName()}</span>
          <span class="avatar-chevron">▾</span>
          <div class="avatar-dropdown" id="avatar-dropdown">
            <div class="avatar-dropdown-header">
              <div class="avatar-dropdown-initial">${getInitial()}</div>
              <div>
                <div class="avatar-dropdown-name">${localStorage.getItem(USERNAME_KEY) || 'User'}</div>
                <div class="avatar-dropdown-role">${(localStorage.getItem(ROLE_KEY) || 'member').replace('-', ' ')}</div>
              </div>
            </div>
            <div class="avatar-dropdown-divider"></div>
            <a href="dashboard.html" class="avatar-dropdown-item">🏠 &nbsp;My Dashboard</a>
            <a href="dashboard.html#profile" class="avatar-dropdown-item">👤 &nbsp;My Profile</a>
            <a href="dashboard.html#settings" class="avatar-dropdown-item">⚙️ &nbsp;Settings</a>
            <div class="avatar-dropdown-divider"></div>
            <a href="#" class="avatar-dropdown-item avatar-dropdown-logout" id="nav-logout">🚪 &nbsp;Logout</a>
          </div>
        </div>
      `;
      navLinks.appendChild(authGroup);

      /* ── MOBILE: remove Login + Register ── */
      if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(a => {
          if (a.href.includes('login.html') || a.href.includes('register.html')) a.remove();
        });

        /* inject mobile auth block */
        const mobileAuth = document.createElement('div');
        mobileAuth.className = 'mobile-auth-block';
        mobileAuth.innerHTML = `
          <div class="mobile-auth-user">
            <div class="mobile-avatar">${getInitial()}</div>
            <div>
              <div class="mobile-auth-name">${localStorage.getItem(USERNAME_KEY) || 'User'}</div>
              <div class="mobile-auth-role">${(localStorage.getItem(ROLE_KEY) || 'member').replace('-', ' ')}</div>
            </div>
          </div>
          <a href="dashboard.html" class="mobile-auth-link">🏠 &nbsp;My Dashboard</a>
          <a href="dashboard.html#profile" class="mobile-auth-link">👤 &nbsp;My Profile</a>
          <a href="dashboard.html#settings" class="mobile-auth-link">⚙️ &nbsp;Settings</a>
          <a href="#" class="mobile-auth-link mobile-auth-logout" id="mobile-logout">🚪 &nbsp;Logout</a>
        `;
        mobileMenu.appendChild(mobileAuth);

        document.getElementById('mobile-logout')?.addEventListener('click', e => logout(e));
      }

      /* ── EVENTS: bell toggle ── */
      const bell         = document.getElementById('nav-bell');
      const bellDropdown = document.getElementById('bell-dropdown');
      const bellBadge    = document.getElementById('bell-badge');

      bell?.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = bellDropdown.classList.toggle('open');
        document.getElementById('avatar-dropdown')?.classList.remove('open');
        document.getElementById('nav-avatar-wrap')?.classList.remove('open');
        if (isOpen) { bellBadge.style.display = 'none'; }
      });

      /* ── EVENTS: avatar toggle ── */
      const avatarWrap    = document.getElementById('nav-avatar-wrap');
      const avatarDropdown = document.getElementById('avatar-dropdown');

      avatarWrap?.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = avatarWrap.classList.toggle('open');
        avatarDropdown.classList.toggle('open', isOpen);
        bellDropdown?.classList.remove('open');
      });

      /* ── EVENTS: close on outside click ── */
      document.addEventListener('click', () => {
        bellDropdown?.classList.remove('open');
        avatarDropdown?.classList.remove('open');
        avatarWrap?.classList.remove('open');
      });

      /* ── EVENTS: logout ── */
      document.getElementById('nav-logout')?.addEventListener('click', e => logout(e));

    } else {
      /* logged out — legacy auth-btn support */
      ['auth-btn', 'auth-btn-mobile'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = 'Join Now'; el.href = 'login.html'; }
      });
    }
  }

  /* ── REQUIRE AUTH ── */
  function requireAuth() {
    if (isLoggedIn) return true;
    const redirect = encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search + window.location.hash);
    window.location.href = 'login.html?redirect=' + redirect;
    return false;
  }

  /* ── LOGOUT ── */
  function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
    window.location.href = 'index.html';
  }

  /* ── EXPOSE ── */
  window.C360Auth = { isLoggedIn, requireAuth, logout };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNavState);
  } else {
    applyNavState();
  }
})();
