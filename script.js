const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzevznw";

const NAV_HEIGHT = 76;

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupSmoothScroll();
  setupEnquiryForm();
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
        showStatus("Thanks! Your message has been sent — we'll be in touch soon.", "success");
        form.reset();
      } else {
        showStatus("Something went wrong sending your message. Please try again.", "error");
      }
    } catch (err) {
      showStatus("Something went wrong sending your message. Please try again.", "error");
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
    submitBtnText.textContent = isSending ? "Sending…" : "Send Message";
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
