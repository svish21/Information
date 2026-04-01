/* ═══════════════════════════════════════
   VISHNU PORTFOLIO — JAVASCRIPT
   ═══════════════════════════════════════ */

"use strict";

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const EMAILJS_PUBLIC_KEY = "28S5WJ0bbwmIS3w-d"; // ← your key
const EMAILJS_SERVICE_ID = "service_ixsp23i"; // ← your service
const EMAILJS_TEMPLATE_ID = "template_c6w77sq"; // ← your template

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

// ─── EMAILJS INIT ───
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ─── CONTACT FORM ───
const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector('button[type="submit"]');

const statusMsg = document.createElement("p");
statusMsg.style.cssText =
  "margin-top:0.75rem; font-size:0.88rem; text-align:center; font-family:var(--font-display); font-weight:600;";
contactForm.appendChild(statusMsg);

function setStatus(msg, color) {
  statusMsg.textContent = msg;
  statusMsg.style.color = color;
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const templateParams = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim() || "(No subject)",
    message: document.getElementById("message").value.trim(),
  };

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  setStatus("", "");

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    submitBtn.textContent = "✓ Message Sent!";
    submitBtn.style.background = "#20c99e";
    setStatus("Thanks! I'll get back to you soon.", "var(--accent)");
    contactForm.reset();

    setTimeout(() => {
      submitBtn.textContent = "Send Message ↗";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.background = "";
      setStatus("", "");
    }, 4000);
  } catch (error) {
    submitBtn.textContent = "Send Message ↗";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    setStatus(
      "❌ Failed to send. Please try again or email me directly.",
      "#ff6b6b",
    );
    console.error("EmailJS error:", error);
  }
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
