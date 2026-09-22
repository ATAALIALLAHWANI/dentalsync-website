import { CONTACT, DEMO_VIDEO_YOUTUBE_ID } from './config.js';

/* ---------------- Header scroll + mobile menu ---------------- */
const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------------- Footer year ---------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------------- Scroll reveal ---------------- */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------------- Gallery lightbox ---------------- */
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let galleryItems = [];
let currentIndex = 0;

if (galleryGrid) {
  galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));

  const openLightbox = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.dataset.caption || '';
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => openLightbox(currentIndex - 1));
  lightboxNext?.addEventListener('click', () => openLightbox(currentIndex + 1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  });
}

/* ---------------- Video: lazy-load on click ---------------- */
function wireVideoPlay(playBtnId, frameId, posterId, { youtubeId, videoSrc }) {
  const playBtn = document.getElementById(playBtnId);
  const frame = document.getElementById(frameId);
  const poster = document.getElementById(posterId);
  if (!playBtn || !frame) return;

  playBtn.addEventListener('click', () => {
    if (youtubeId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
      iframe.title = 'DentalSync product video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.innerHTML = '';
      frame.appendChild(iframe);
    } else {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      frame.innerHTML = '';
      frame.appendChild(video);
    }
  });
}

wireVideoPlay('videoPlayBtn', 'videoFrame', 'videoPoster', {
  youtubeId: DEMO_VIDEO_YOUTUBE_ID,
  videoSrc: '/video/demo-video.mp4'
});

/* ---------------- Contact actions (from config.js) ---------------- */
const contactActions = document.getElementById('contactActions');
const contactConfigNote = document.getElementById('contactConfigNote');

function svgPhone() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';
}
function svgFacebook() {
  return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>';
}
function svgMail() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><polyline points="22 6 12 13 2 6"/></svg>';
}

function buildContactActions() {
  if (!contactActions) return;
  const buttons = [];

  if (CONTACT.phone && CONTACT.phone.trim()) {
    const telHref = `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`;
    buttons.push(`
      <a class="contact-btn primary" href="${telHref}">
        <span class="contact-btn-icon">${svgPhone()}</span>
        <span><strong>Call or message us</strong><span>${CONTACT.phone}</span></span>
      </a>
    `);
  }

  if (CONTACT.facebookUrl && CONTACT.facebookUrl.trim()) {
    buttons.push(`
      <a class="contact-btn" href="${CONTACT.facebookUrl}" target="_blank" rel="noopener noreferrer">
        <span class="contact-btn-icon">${svgFacebook()}</span>
        <span><strong>Message us on Facebook</strong><span>DentalSync Page</span></span>
      </a>
    `);
  }

  if (CONTACT.email && CONTACT.email.trim()) {
    buttons.push(`
      <a class="contact-btn" href="mailto:${CONTACT.email}">
        <span class="contact-btn-icon">${svgMail()}</span>
        <span><strong>Email us</strong><span>${CONTACT.email}</span></span>
      </a>
    `);
  }

  if (buttons.length === 0) {
    contactConfigNote.hidden = false;
    return;
  }

  contactActions.innerHTML = buttons.join('');
}

buildContactActions();
