/* ====================================================
   Portfolio – main script
   ==================================================== */

const NAVBAR_OFFSET = 80; // px offset for fixed header when calculating active section

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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
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

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Simple client-side validation
  if (!name || !email || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission (replace with actual backend / service)
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    showStatus("Thanks! Your message has been sent. I'll be in touch soon. 🚀", "success");
  }, 1200);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}

function isValidEmail(email) {
  // Validates basic structure: local@domain.tld (no double dots, no leading dot in domain)
  return /^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email);
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
