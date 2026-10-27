
/* ==========================================
   Sunclick Photo World - script.js
   ========================================== */

// 1. Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// 2. Portfolio Gallery Filters
const filterButtons = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Update active filter button
        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        // Show matching portfolio images
        galleryItems.forEach((item) => {
            const category = item.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// 3. Automatically Update Copyright Year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 4. WhatsApp Enquiry Form
const enquiryForm = document.getElementById("enquiryForm");

// IMPORTANT: Replace this with your WhatsApp number.
// Include the country code, digits only.
// Example format for India: 919876543210
const WHATSAPP_NUMBER = "918431311301";

if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validate required fields
        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const formData = new FormData(enquiryForm);

        const name = formData.get("name") || "";
        const phone = formData.get("phone") || "";
        const eventType = formData.get("event") || "";
        const eventDate = formData.get("date") || "Not decided";
        const location = formData.get("location") || "Not decided";
        const details = formData.get("message") || "No additional details";

        // Build enquiry message
        const message = `
Hello Sunclick Photo World!

I would like to enquire about a photography booking.

Name: ${name}
Phone: ${phone}
Occasion: ${eventType}
Event Date: ${eventDate}
Location: ${location}

Additional Details:
${details}

Please share your packages and availability.
        `.trim();

        // Check whether the studio number has been configured
        if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
            alert(
                "Please configure your studio WhatsApp number " +
                "in js/script.js before submitting enquiries."
            );
            return;
        }

        // Open WhatsApp with the enquiry pre-filled
        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

// 5. Floating WhatsApp Contact Button
const whatsappLink = document.getElementById("whatsappLink");

if (whatsappLink) {
    whatsappLink.addEventListener("click", (event) => {
        if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
            event.preventDefault();

            alert(
                "Please add your WhatsApp number in js/script.js."
            );

            return;
        }

        event.preventDefault();

        window.open(
            "https://wa.me/" + WHATSAPP_NUMBER,
            "_blank",
            "noopener,noreferrer"
        );
    });
}
