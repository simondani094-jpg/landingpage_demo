/* ═══════════════════════════════════════════════════════════════════
   DANIEL JEBARAJ – Premium Interactive JS
   Custom Cursor • Magnetic • Split Text • Parallax • Counter • Particles
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Utilities ────────────────────────────────────────────────────
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // ─── Year ──────────────────────────────────────────────────────────
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── Particles ────────────────────────────────────────────────────
  function spawnParticles() {
    const container = $('#particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation-duration:${Math.random() * 15 + 10}s;
        animation-delay:${Math.random() * 10}s;
        opacity:0;
      `;
      container.appendChild(p);
    }
  }
  spawnParticles();

  // ─── Navbar Scroll ────────────────────────────────────────────────
  const navbar = $('#navbar');
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Mobile Menu ──────────────────────────────────────────────────
  const menuBtn = $('#menu-btn');
  const navLinks = $('#nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = $$('span', menuBtn);
      const open = navLinks.classList.contains('open');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => (s.style.transform = s.style.opacity = ''));
      }
    });
    $$('.nav-link', navLinks).forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ─── Custom Cursor ────────────────────────────────────────────────
  const cursor = $('#cursor');
  const cursorRing = $('#cursor-ring');
  const cursorText = $('#cursor-text');

  if (cursor && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let hovering = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateCursor() {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      if (cursorRing) {
        cursorRing.style.transform = `translate(calc(-50% + ${(mx - rx) * 0.3}px), calc(-50% + ${(my - ry) * 0.3}px))`;
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state
    const hoverEls = $$('[data-cursor-text], .magnetic, a, button, .filter-btn, .nav-link, .footer-social, .contact-channel, .project-card-premium, .service-card-premium');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        hovering = true;
        const txt = el.getAttribute('data-cursor-text');
        if (cursorText && txt) cursorText.textContent = txt;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        hovering = false;
        if (cursorText) cursorText.textContent = '';
      });
    });

    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  }

  // ─── Magnetic Buttons ─────────────────────────────────────────────
  if (window.innerWidth > 768) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height);
        const strength = clamp(1 - dist / maxDist, 0, 1);
        const moveX = dx * strength * 0.35;
        const moveY = dy * strength * 0.35;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  // ─── Scroll Reveal ────────────────────────────────────────────────
  const revealEls = $$('[data-scroll-reveal], [data-reveal]');

  function checkReveal() {
    revealEls.forEach((el, i) => {
      if (el.classList.contains('revealed')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => el.classList.add('revealed'), i * 60);
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);
  setTimeout(checkReveal, 300);

  // ─── Counter Animation ────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current >= target) { el.textContent = target; return; }
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counters = $$('[data-target]');
  let countersAnimated = false;

  function checkCounters() {
    if (countersAnimated) return;
    counters.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        countersAnimated = true;
        counters.forEach(c => animateCounter(c));
      }
    });
  }
  window.addEventListener('scroll', checkCounters, { passive: true });

  // ─── SVG Progress Circles ─────────────────────────────────────────
  const circles = $$('.stat-progress');
  let circlesAnimated = false;

  function animateCircles() {
    if (circlesAnimated) return;
    circles.forEach(circle => {
      const rect = circle.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        circlesAnimated = true;
        circles.forEach(c => {
          const pct = parseFloat(c.getAttribute('data-percent'));
          const circumference = 2 * Math.PI * 40; // r=40
          const offset = circumference - (pct / 100) * circumference;
          c.style.strokeDashoffset = offset;
        });
      }
    });
  }
  window.addEventListener('scroll', animateCircles, { passive: true });

  // ─── Floating Icon Mouse Repulsion ────────────────────────────────
  if (window.innerWidth > 768) {
    const icons = $$('.floating-icon');
    const portraits = $$('#portrait-wrapper');

    document.addEventListener('mousemove', (e) => {
      icons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120;

        if (dist < radius) {
          const force = (1 - dist / radius) * 18;
          const angle = Math.atan2(dy, dx);
          const repelX = -Math.cos(angle) * force;
          const repelY = -Math.sin(angle) * force;
          icon.style.setProperty('--rx', repelX + 'px');
          icon.style.setProperty('--ry', repelY + 'px');
          icon.style.transform = `translate(${repelX}px, ${repelY}px) scale(1.05)`;
        } else {
          icon.style.transform = '';
        }
      });
    });
  }

  // ─── Portrait Mouse Parallax ──────────────────────────────────────
  const heroSection = $('.hero-section');
  const portraitFrame = $('#portrait-frame');

  if (heroSection && portraitFrame && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = ((e.clientX - rect.left) - cx) / cx;
      const dy = ((e.clientY - rect.top) - cy) / cy;
      portraitFrame.style.transform = `
        perspective(1000px)
        rotateY(${dx * 8}deg)
        rotateX(${-dy * 6}deg)
        translateY(${Math.sin(Date.now() / 800) * 8}px)
      `;
    });
    heroSection.addEventListener('mouseleave', () => {
      portraitFrame.style.transform = '';
    });
  }

  // ─── Hero Glow Mouse Follow ────────────────────────────────────────
  const glow1 = $('.hero-glow-1');
  if (glow1 && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const xPct = e.clientX / window.innerWidth;
      const yPct = e.clientY / window.innerHeight;
      glow1.style.left = `${xPct * 60 - 20}%`;
      glow1.style.top = `${yPct * 60 - 20}%`;
    });
  }

  // ─── Spotlight on Service Cards ───────────────────────────────────
  $$('.service-card-premium').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
          rgba(249,92,75,0.07) 0%,
          rgba(255,255,255,0.02) 50%,
          transparent 80%)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  $$('.project-card-premium').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
          rgba(249,92,75,0.05) 0%,
          rgba(255,255,255,0.02) 50%,
          transparent 80%)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── Works Page Filtering ─────────────────────────────────────────
  const filterBtns = $$('.filter-btn');
  const searchInput = $('.search-input');
  const workCards = $$('.work-card');

  if (filterBtns.length && workCards.length) {
    let activeFilter = 'all';
    let searchTerm = '';

    function filterWorks() {
      workCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
        const matchFilter = activeFilter === 'all' || cat === activeFilter;
        const matchSearch = !searchTerm || title.includes(searchTerm);
        card.style.display = (matchFilter && matchSearch) ? '' : 'none';
        card.style.opacity = (matchFilter && matchSearch) ? '1' : '0';
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterWorks();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase().trim();
        filterWorks();
      });
    }
  }

  // ─── Smooth Scroll for Anchor Links ──────────────────────────────
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Marquee Hover Pause ──────────────────────────────────────────
  const marqueeContent = $('#marquee-inner');
  if (marqueeContent) {
    marqueeContent.addEventListener('mouseenter', () => {
      marqueeContent.style.animationPlayState = 'paused';
    });
    marqueeContent.addEventListener('mouseleave', () => {
      marqueeContent.style.animationPlayState = 'running';
    });
  }

  // ─── Contact Typewriter ───────────────────────────────────────────
  const typeEl = $('#contact-typewriter');
  if (typeEl) {
    const phrases = [
      'Let\'s Create Something Meaningful.',
      'Ready to Tell Your Story?',
      'Let\'s Build Something Cinematic.',
      'Have a Vision? Let\'s Make It Real.'
    ];
    let pi = 0, ci = 0, deleting = false;

    function typewrite() {
      const phrase = phrases[pi];
      if (!deleting && ci <= phrase.length) {
        typeEl.textContent = phrase.slice(0, ci++);
        setTimeout(typewrite, ci === phrase.length ? 2200 : 55);
      } else if (!deleting && ci > phrase.length) {
        deleting = true;
        setTimeout(typewrite, 500);
      } else if (deleting && ci > 0) {
        typeEl.textContent = phrase.slice(0, --ci);
        setTimeout(typewrite, 30);
      } else {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(typewrite, 400);
      }
    }

    // Trigger on scroll into view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        typewrite();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(typeEl);
  }

  // ─── Page Load Animation ─────────────────────────────────────────
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  });

  console.log('%c🎬 DJ Thomas Portfolio — Powered by Motion & Code', 
    'color:#F95C4B; font-size:14px; font-weight:bold; font-family:Outfit,sans-serif;');

})();
