/**
 * Kalpataru Saha - Personal Portfolio Website
 * Wide-Screen Asymmetric Architecture & Interactive Particle Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initNavigation();
  initScrollSpy();
  initClipboardCopy();
});

/* ==========================================================================
   1. Full-Screen Interactive Floating-Particle Background Canvas
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isRunning = false;
  let width = 0;
  let height = 0;
  let particles = [];
  let currentScrollY = window.scrollY || 0;
  const mouse = { x: null, y: null, radius: 120 };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Retina crispness scaling
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();

    if (prefersReducedMotion) {
      renderStatic();
    }
  }

  // Generate 3 depth tiers of monochrome particles + technical square specks
  function createParticles() {
    particles = [];

    let targetCount = 65; // Desktop
    if (width < 768) {
      targetCount = 30; // Mobile
    } else if (width < 1024) {
      targetCount = 45; // Tablet
    }

    for (let i = 0; i < targetCount; i++) {
      const rand = Math.random();
      let tier, size, baseAlpha, color, speed, parallax, isSquare;

      if (rand < 0.40) {
        // Tier 0: Background dust
        tier = 0;
        size = 1.0;
        baseAlpha = Math.random() * 0.08 + 0.12;
        color = '82, 82, 91'; // #52525B
        speed = Math.random() * 0.07 + 0.08;
        parallax = 0.015;
        isSquare = false;
      } else if (rand < 0.80) {
        // Tier 1: Midground dots
        tier = 1;
        size = 1.5;
        baseAlpha = Math.random() * 0.10 + 0.25;
        color = '161, 161, 170'; // #A1A1AA
        speed = Math.random() * 0.10 + 0.18;
        parallax = 0.035;
        isSquare = false;
      } else {
        // Tier 2: Foreground specks
        tier = 2;
        size = Math.random() * 0.5 + 2.0;
        baseAlpha = Math.random() * 0.15 + 0.45;
        color = '255, 255, 255'; // #FFFFFF
        speed = Math.random() * 0.13 + 0.32;
        parallax = 0.065;
        isSquare = Math.random() < 0.20; // 20% pixel-squares
      }

      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        size,
        baseAlpha,
        color,
        tier,
        parallax,
        isSquare,
        renderY: 0,
        sinSeed: Math.random() * Math.PI * 2,
        sinFreq: Math.random() * 0.015 + 0.008,
        sinAmp: Math.random() * 0.25 + 0.15
      });
    }
  }

  // Static starfield for reduced-motion preference
  function renderStatic() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;

      if (p.isSquare) {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  let lastTime = performance.now();

  function render(now) {
    if (!isRunning) return;

    const dt = Math.min((now - lastTime) / 16.67, 2.0);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);
    currentScrollY = window.scrollY || 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Organic sinusoidal drift
      const waveX = Math.cos(now * p.sinFreq + p.sinSeed) * p.sinAmp;
      const waveY = Math.sin(now * p.sinFreq + p.sinSeed) * p.sinAmp;

      p.x += (p.vx + waveX) * dt;
      p.y += (p.vy + waveY) * dt;

      // Viewport edge wrapping
      const margin = 15;
      if (p.x < -margin) p.x = width + margin;
      else if (p.x > width + margin) p.x = -margin;
      if (p.y < -margin) p.y = height + margin;
      else if (p.y > height + margin) p.y = -margin;

      // Scroll parallax shift
      const scrollShift = (currentScrollY * p.parallax) % height;
      let renderY = (p.y - scrollShift + height) % height;
      p.renderY = renderY;

      // Cursor reactivity: gentle repulsion within 120px
      let dynamicAlpha = p.baseAlpha;
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = renderY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const repelFactor = (1 - dist / mouse.radius);
          p.x += (dx / dist) * repelFactor * 1.5 * dt;
          p.y += (dy / dist) * repelFactor * 1.5 * dt;
          dynamicAlpha = Math.min(1, p.baseAlpha + repelFactor * 0.45);

          // Faint cursor connection line
          const cursorLineAlpha = repelFactor * 0.12;
          ctx.strokeStyle = `rgba(255, 255, 255, ${cursorLineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, renderY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw particle
      ctx.fillStyle = `rgba(${p.color}, ${dynamicAlpha})`;
      if (p.isSquare) {
        ctx.fillRect(p.x - p.size / 2, renderY - p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle Constellation Web within 110px
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = renderY - p2.renderY;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        if (cdist < 110) {
          const lineAlpha = (1 - cdist / 110) * 0.06;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, renderY);
          ctx.lineTo(p2.x, p2.renderY);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function start() {
    if (!isRunning && !prefersReducedMotion) {
      isRunning = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function stop() {
    if (isRunning) {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }

  // Automatic pause when tab is inactive to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  if (!prefersReducedMotion) {
    start();
  }
}

/* ==========================================================================
   2. Responsive Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        if (mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
}

/* ==========================================================================
   3. ScrollSpy (Active Navigation Highlighting)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-anchor');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. One-Click Copy-to-Clipboard with Toast Feedback
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-copy');
      const pill = button.querySelector('.copy-pill');

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        if (pill) {
          const originalPillText = pill.textContent;
          pill.textContent = 'COPIED!';
          pill.style.color = '#FFFFFF';
          pill.style.borderColor = '#FFFFFF';

          setTimeout(() => {
            pill.textContent = originalPillText;
            pill.style.color = '';
            pill.style.borderColor = '';
          }, 1500);
        }

        showToast(`Copied ${textToCopy} to clipboard`);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        showToast(`Selected: ${textToCopy}`);
      }
    });
  });

  window.showToast = showToast;
}
