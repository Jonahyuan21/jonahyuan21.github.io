/* =========================================================
   Hanzhang Yuan — Personal Website
   Interactions: nav toggle, scroll state, active link highlight,
   reveal on scroll, footer year.
   ========================================================= */

(function () {
  'use strict';

  // --------- Footer year ---------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --------- Mobile nav toggle ---------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close nav after clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // --------- Nav scroll state ---------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --------- Active section highlight ---------
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  const linkMap = new Map();
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    linkMap.set(id, a);
  });

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const link = linkMap.get(id);
          if (!link) return;
          if (entry.isIntersecting) {
            linkMap.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }

  // --------- Reveal-on-scroll animation ---------
  const revealTargets = document.querySelectorAll(
    '.section-header, .about-grid, .edu-card, .skill-group, .timeline-item, .project-card, .coursework-group, .contact-lead, .contact-actions, .contact-info'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all
    revealTargets.forEach((el) => el.classList.add('visible'));
  }
})();
