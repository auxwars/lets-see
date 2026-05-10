/* ============================================================
   BUILD YOURSELF — SHARED JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ── Custom Cursor ──────────────────────────────────────── */
  const ring = document.querySelector('.cursor-ring');
  const dot  = document.querySelector('.cursor-dot');

  if (ring && dot && window.matchMedia('(pointer: fine)').matches) {
    let rx = 0, ry = 0, mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .faq-q, .card, .module-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '46px';
        ring.style.height = '46px';
        ring.style.borderColor = 'rgba(59,130,246,0.4)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = 'rgba(59,130,246,0.6)';
      });
    });
  } else {
    if (ring) ring.remove();
    if (dot)  dot.remove();
  }

  /* ── Hamburger Menu ─────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Stat Counter Animation ─────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        countObs.unobserve(e.target);
        const el      = e.target;
        const target  = parseFloat(el.dataset.count);
        const prefix  = el.dataset.prefix  || '';
        const suffix  = el.dataset.suffix  || '';
        const decimal = el.dataset.decimal === 'true';
        const dur     = 1800;
        const start   = performance.now();

        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const val  = target * ease;
          el.textContent = prefix + (decimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObs.observe(el));
  }

  /* ── FAQ Accordion ──────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
      });

      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Nav scroll tint ────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 20
        ? 'rgba(8, 12, 20, 0.96)'
        : 'rgba(8, 12, 20, 0.82)';
    }, { passive: true });
  }

  /* ── Active nav link ────────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === './') || href === './' && page === '') {
      a.classList.add('active');
    }
  });

})();
