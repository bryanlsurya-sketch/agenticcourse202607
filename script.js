const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzevznw";

const NAV_HEIGHT = 76;

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupSmoothScroll();
  setupEnquiryForm();
  setupScrollReveal();
});

function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll(".nav__link, .nav__cta").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

function setupEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = document.getElementById("submitBtnText");
  const statusEl = document.getElementById("formStatus");

  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearStatus();

    if (!validateForm()) return;

    setSending(true);

    try {
      const payload = {
        name: fields.name.input.value.trim(),
        email: fields.email.input.value.trim(),
        company: document.getElementById("company").value.trim(),
        message: fields.message.input.value.trim(),
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showStatus("Thanks! Your audit request is in — we'll be in touch within one business day.", "success");
        form.reset();
      } else {
        showStatus("Something went wrong sending your request. Please try again.", "error");
      }
    } catch (err) {
      showStatus("Something went wrong sending your request. Please try again.", "error");
    } finally {
      setSending(false);
    }
  });

  function validateForm() {
    let isValid = true;

    if (!fields.name.input.value.trim()) {
      setFieldError(fields.name, "Please enter your name.");
      isValid = false;
    } else {
      clearFieldError(fields.name);
    }

    const emailValue = fields.email.input.value.trim();
    if (!emailValue) {
      setFieldError(fields.email, "Please enter your email.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      setFieldError(fields.email, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearFieldError(fields.email);
    }

    if (!fields.message.input.value.trim()) {
      setFieldError(fields.message, "Please enter a message.");
      isValid = false;
    } else {
      clearFieldError(fields.message);
    }

    return isValid;
  }

  function setFieldError(field, message) {
    field.input.closest(".form-field").classList.add("has-error");
    field.error.textContent = message;
  }

  function clearFieldError(field) {
    field.input.closest(".form-field").classList.remove("has-error");
    field.error.textContent = "";
  }

  function setSending(isSending) {
    submitBtn.disabled = isSending;
    submitBtnText.textContent = isSending ? "Sending…" : "Claim My Free Audit";
  }

  function showStatus(message, state) {
    statusEl.textContent = message;
    statusEl.dataset.state = state;
  }

  function clearStatus() {
    statusEl.textContent = "";
    statusEl.removeAttribute("data-state");
  }
}

function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window) || revealEls.length === 0) return;

  revealEls.forEach((el) => el.classList.add("pre-reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("pre-reveal");
        animateCounters(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function animateCounters(container) {
  const counters = container.querySelectorAll("[data-count-to]");
  const duration = 900;

  counters.forEach((counter) => {
    if (counter.dataset.counted) return;
    counter.dataset.counted = "true";

    const target = parseFloat(counter.dataset.countTo);
    const suffix = counter.dataset.suffix || "";
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}
