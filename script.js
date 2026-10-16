
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-image-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      const fallback = document.getElementById(img.dataset.imageFallback);
      img.style.display = "none";
      if (fallback) fallback.style.display = "flex";
    });

    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event("error"));
    }
  });

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;

      // Replace with the verified RP Nexpharma email address.
      const companyEmail = "YOUR-COMPANY-EMAIL@example.com";
      const note = document.getElementById("formNote");

      if (companyEmail === "YOUR-COMPANY-EMAIL@example.com") {
        note.textContent =
          "Please replace the example email address in script.js before using this form.";
        note.style.color = "#a33b28";
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent(
        "Website enquiry: " + data.get("subject")
      );
      const body = encodeURIComponent(
        "Name: " + data.get("name") + "\n" +
        "Email: " + data.get("email") + "\n" +
        "Enquiry type: " + data.get("subject") + "\n\n" +
        "Message:\n" + data.get("message")
      );

      window.location.href =
        "mailto:" + companyEmail +
        "?subject=" + subject + "&body=" + body;
    });
  }
});
