// TemiSec interactions
(function () {
  const $ = (s, d = document) => d.querySelector(s);
  const $$ = (s, d = document) => Array.from(d.querySelectorAll(s));

  // Nav: active link + mobile toggle
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path || (path === 'index.html' && href === './')) {
      a.setAttribute('aria-current', 'page');
    }
  });
  const menuBtn = $('.menu-toggle');
  const links = $('.nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => links.classList.toggle('open'));
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Theme toggle
  const root = document.documentElement;
  const themeBtn = $('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeBtn && themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => observer.observe(el));

  // Smooth anchor scroll (if same-page)
  $$('.smooth').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Typewriter effect (Home)
  const typeTarget = $('#typewriter');
  if (typeTarget) {
    const words = ['Cybersecurity Enthusiast', 'Computer Science (B.Sc.)', 'Threat Hunting Learner', 'Ethical Hacking Explorer'];
    let word = 0, idx = 0, deleting = false;
    function tick() {
      const full = words[word];
      typeTarget.textContent = full.slice(0, idx);
      if (!deleting && idx < full.length) idx++;
      else if (deleting && idx > 0) idx--;
      else if (!deleting && idx === full.length) setTimeout(() => deleting = true, 900);
      else if (deleting && idx === 0) { deleting = false; word = (word + 1) % words.length; }
      setTimeout(tick, deleting ? 50 : 90);
    }
    tick();
  }

  // Copy to clipboard (Contact)
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 1200);
      } catch (e) {
        btn.textContent = 'Press Ctrl+C';
        setTimeout(() => (btn.textContent = 'Copy'), 1200);
      }
    });
  });

  // Contact form (mailto fallback)
  const cform = $('#contact-form');
  if (cform) {
    cform.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#c-name').value.trim();
      const email = $('#c-email').value.trim();
      const msg = $('#c-message').value.trim();
      if (!name || !email || !msg) return alert('Please complete all fields.');
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}\n\n— Sent from temisec.site`);
      window.location.href = `mailto:olofinladetemi18@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Login (demo only)
  const loginForm = $('#login-form');
  if (loginForm) {
    const pwd = $('#password');
    const meter = $('#strength-bar');
    const toggle = $('#showPwd');
    const emailInput = $('#email');
    const remember = $('#remember');

    function score(p) {
      let s = 0;
      if (p.length >= 8) s++;
      if (/[A-Z]/.test(p)) s++;
      if (/[0-9]/.test(p)) s++;
      if (/[^A-Za-z0-9]/.test(p)) s++;
      return s; // 0..4
    }
    pwd && pwd.addEventListener('input', () => {
      const v = pwd.value;
      const s = score(v);
      const widths = ['10%', '30%', '60%', '80%', '100%'];
      const colors = ['#ef4444', '#f59e0b', '#22c55e', '#0ea5a4', '#00e3a2'];
      meter.style.width = widths[s];
      meter.style.background = colors[s];
    });
    toggle && toggle.addEventListener('click', () => {
      pwd.type = pwd.type === 'password' ? 'text' : 'password';
      toggle.textContent = pwd.type === 'password' ? 'Show' : 'Hide';
    });
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const pass = pwd.value;
      if (!email || pass.length < 8) return alert('Enter a valid email and an 8+ character password.');
      // Fake auth: accept any.
      const token = Math.random().toString(36).slice(2);
      const user = { email, at: Date.now() };
      if (remember.checked) localStorage.setItem('authToken', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      alert('Login successful (demo). Redirecting to Home.');
      window.location.href = 'index.html';
    });
  }
})();