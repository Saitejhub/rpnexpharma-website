
/* =========================================================
   RP NEXPHARMA - COMPLETE WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     1. AUTOMATIC COPYRIGHT YEAR
  ===================================== */

  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", function () {

      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";

    });

    // Close navigation after selecting a link
    navigation.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
      });

    });

  }


  /* =====================================
     3. PRODUCT SEARCH AND CATEGORY FILTER
  ===================================== */

  const productSearch = document.getElementById("productSearch");

  const categoryFilter = document.getElementById("categoryFilter");

  const resetFilters = document.getElementById("resetFilters");

  const emptyReset = document.getElementById("emptyReset");

  const productCards = document.querySelectorAll(".portfolio-card");

  const filterChips = document.querySelectorAll(".filter-chip");

  const resultsCount = document.getElementById("resultsCount");

  const noProducts = document.getElementById("noProducts");


  if (productCards.length > 0) {

    /* FILTER FUNCTION */

    function filterProducts() {

      const searchValue = productSearch
        ? productSearch.value.trim().toLowerCase()
        : "";

      const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

      let visibleCount = 0;


      productCards.forEach(function (card) {

        const category = card.dataset.category;

        const cardText = card.textContent.toLowerCase();


        // Category matching

        const matchesCategory =
          selectedCategory === "all" ||
          category === selectedCategory;


        // Search matching

        const matchesSearch =
          searchValue === "" ||
          cardText.includes(searchValue);


        // Display matching cards

        const shouldShow =
          matchesCategory && matchesSearch;

        card.hidden = !shouldShow;


        if (shouldShow) {
          visibleCount++;
        }

      });


      /* UPDATE RESULT COUNT */

      if (resultsCount) {

        resultsCount.textContent =
          "Showing " +
          visibleCount +
          (visibleCount === 1
            ? " portfolio area"
            : " portfolio areas");

      }


      /* SHOW EMPTY RESULT MESSAGE */

      if (noProducts) {
        noProducts.hidden = visibleCount !== 0;
      }


      /* UPDATE ACTIVE FILTER BUTTON */

      filterChips.forEach(function (chip) {

        const isActive =
          chip.dataset.filter === selectedCategory;

        chip.classList.toggle("active", isActive);

      });

    }


    /* SEARCH INPUT */

    if (productSearch) {

      productSearch.addEventListener(
        "input",
        filterProducts
      );

    }


    /* DROPDOWN FILTER */

    if (categoryFilter) {

      categoryFilter.addEventListener(
        "change",
        filterProducts
      );

    }


    /* QUICK FILTER BUTTONS */

    filterChips.forEach(function (chip) {

      chip.addEventListener("click", function () {

        const selected = chip.dataset.filter;

        if (categoryFilter) {
          categoryFilter.value = selected;
        }

        filterProducts();

      });

    });


    /* RESET FUNCTION */

    function clearProductFilters() {

      if (productSearch) {
        productSearch.value = "";
      }

      if (categoryFilter) {
        categoryFilter.value = "all";
      }

      filterProducts();

    }


    /* RESET BUTTON */

    if (resetFilters) {

      resetFilters.addEventListener(
        "click",
        clearProductFilters
      );

    }


    /* EMPTY RESULT RESET BUTTON */

    if (emptyReset) {

      emptyReset.addEventListener(
        "click",
        clearProductFilters
      );

    }


    /* INITIALISE PRODUCT FILTER */

    filterProducts();

  }


  /* =====================================
     4. CONTACT FORM
  ===================================== */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();


      // IMPORTANT:
      // Replace this placeholder with the official
      // RP Nexpharma business email address.

      const recipient = "YOUR-COMPANY-EMAIL@example.com";


      // Collect form values

      const formData = new FormData(contactForm);

      const name = formData.get("name");

      const email = formData.get("email");

      const company = formData.get("company");

      const subject = formData.get("subject");

      const message = formData.get("message");


      // Prepare email subject

      const emailSubject = encodeURIComponent(
        "Website enquiry: " + subject
      );


      // Prepare email content

      const emailBody = encodeURIComponent(

        "Name: " + name + "\n" +

        "Business email: " + email + "\n" +

        "Company: " + company + "\n" +

        "Enquiry type: " + subject + "\n\n" +

        "Message:\n" + message

      );


      // Open visitor's email application

      window.location.href =

        "mailto:" + recipient +

        "?subject=" + emailSubject +

        "&body=" + emailBody;

    });

  }


});
