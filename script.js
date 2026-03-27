/* ═══════════════════════════════════════
   VISHNU PORTFOLIO — JAVASCRIPT
   ═══════════════════════════════════════ */

"use strict";

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksContainer.classList.toggle("open");
});

navLinksContainer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksContainer.classList.remove("open");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    navLinksContainer.classList.remove("open");
  }
});

// ─── SMOOTH SCROLLING ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const siblings = entry.target.parentElement.querySelectorAll(".reveal");
        let delay = 0;
        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) delay = i * 80;
        });
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ─── SKILL BAR ANIMATION ───
// Triggered when skill blocks become visible (handled by CSS via .visible class + custom property)

// ─── CONTACT FORM ───
const contactForm = document.getElementById("contactForm");
const EMAILJS_PUBLIC_KEY = "28S5WJ0bbwmIS3w-d"; // ← your key
const EMAILJS_SERVICE_ID = "service_ixsp23i"; // ← your service
const EMAILJS_TEMPLATE_ID = "template_c6w77sq"; // ← your template

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  // Animate button
  btn.textContent = "Sending...";
  btn.disabled = true;
  btn.style.opacity = "0.7";

  // Simulate sending (replace with real logic)
  setTimeout(() => {
    btn.textContent = "✓ Message Sent!";
    btn.style.background = "#20c99e";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.background = "";
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ─── HERO TYPING EFFECT ───
const tagline = document.querySelector(".tagline");
if (tagline) {
  const phrases = [
    "Engineering Student / Developer / Tech Enthusiast",
    "Arduino Builder / Python Programmer",
    "Embedded Systems / Robotics",
    "Mobile App Developer",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      setTimeout(typeEffect, 1800);
      return;
    }

    if (!isDeleting) {
      tagline.textContent = current
        .slice(0, charIndex + 1)
        .replace(/\//g, " / ");
      charIndex++;
      if (charIndex === current.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(typeEffect, 2200);
        return;
      }
    } else {
      tagline.textContent = current
        .slice(0, charIndex - 1)
        .replace(/\//g, " / ");
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 35 : 60;
    setTimeout(typeEffect, speed);
  }

  // Start after a short delay (after hero reveals)
  setTimeout(() => {
    tagline.textContent = "";
    typeEffect();
  }, 1200);
}

// ─── PARALLAX HERO GLOW ───
const heroGlow = document.querySelector(".hero-glow");
if (heroGlow) {
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    },
    { passive: true },
  );
}

// ─── STAGGER PROJECT ITEMS ───
const projectItems = document.querySelectorAll(".project-item");
projectItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// ─── CERTIFICATE CARD TILT ───
document.querySelectorAll(".cert-card:not(.cert-card--add)").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    setTimeout(() => {
      card.style.transition = "";
    }, 400);
  });
});

// ─── PAGE LOAD ANIMATION ───
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger hero reveals with stagger
  const heroReveals = document.querySelectorAll(".hero .reveal");
  heroReveals.forEach((el, i) => {
    setTimeout(
      () => {
        el.classList.add("visible");
      },
      200 + i * 150,
    );
  });
});
