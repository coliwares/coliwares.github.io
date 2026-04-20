/* ====================================================
   Portfolio – main script
   ==================================================== */

const NAVBAR_OFFSET = 80;

/* ---------- Scroll progress bar ---------- */
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;
}, { passive: true });

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav when a link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY + NAVBAR_OFFSET;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = navMenu.querySelector(`a[href="#${id}"]`);

    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

/* ---------- Scroll-reveal animation ---------- */
const revealElements = document.querySelectorAll(
  ".section-title, .about-grid, .skill-category, .project-card, .contact-container > *"
);

// Stagger cards within grids
[".skills-grid", ".projects-grid"].forEach((sel) => {
  const grid = document.querySelector(sel);
  if (grid) {
    grid.querySelectorAll(".skill-category, .project-card").forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Clear stagger delay after reveal so hover transitions are instant
        const delay = parseFloat(entry.target.style.transitionDelay || "0") * 1000;
        setTimeout(() => {
          entry.target.style.transitionDelay = "";
        }, 600 + delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Add base hidden state via JS (so non-JS users still see content)
revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// Inject reveal CSS dynamically
const style = document.createElement("style");
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

/* ---------- Contact form ---------- */
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");

  clearFieldError(nameField);
  clearFieldError(emailField);
  clearFieldError(messageField);

  let hasError = false;

  if (!nameField.value.trim()) {
    showFieldError(nameField, "Por favor ingresa tu nombre.");
    hasError = true;
  }
  if (!emailField.value.trim()) {
    showFieldError(emailField, "Por favor ingresa tu email.");
    hasError = true;
  } else if (!isValidEmail(emailField.value.trim())) {
    showFieldError(emailField, "Ingresa una dirección de email válida.");
    hasError = true;
  }
  if (!messageField.value.trim()) {
    showFieldError(messageField, "Por favor escribe tu mensaje.");
    hasError = true;
  }

  if (hasError) return;

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
    showStatus("¡Listo! Tu mensaje fue enviado. Te responderé a la brevedad.", "success");
  }, 1200);
});

function showFieldError(field, message) {
  const group = field.closest(".form-group");
  group.classList.add("has-error");
  let errorEl = group.querySelector(".error-msg");
  if (!errorEl) {
    errorEl = document.createElement("span");
    errorEl.className = "error-msg";
    group.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearFieldError(field) {
  const group = field.closest(".form-group");
  group.classList.remove("has-error");
  const errorEl = group.querySelector(".error-msg");
  if (errorEl) errorEl.textContent = "";
}

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email);
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
