
document.addEventListener("DOMContentLoaded", function () {
  // Automatically update copyright year
  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("open");
      menuButton.setAttribute(
        "aria-expanded",
        navigation.classList.contains("open") ? "true" : "false"
      );
    });
  }

  // Contact form: prepares an email for the user to review and send.
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Replace this with RP Nexpharma's confirmed business email.
      const recipient = "YOUR-COMPANY-EMAIL@example.com";

      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const company = formData.get("company");
      const subject = formData.get("subject");
      const message = formData.get("message");

      const emailSubject = encodeURIComponent("Website enquiry: " + subject);
      const emailBody = encodeURIComponent(
        "Name: " + name + "\n" +
        "Business email: " + email + "\n" +
        "Company: " + company + "\n" +
        "Enquiry type: " + subject + "\n\n" +
        "Message:\n" + message
      );

      window.location.href =
        "mailto:" + recipient +
        "?subject=" + emailSubject +
        "&body=" + emailBody;
    });
  }
});
