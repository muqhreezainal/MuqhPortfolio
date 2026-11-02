document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // Feature 1: Dark Mode Toggle
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    if (themeToggle) { // Safety check
        if (localStorage.getItem("theme") === "dark") {
            htmlElement.setAttribute("data-theme", "dark");
            themeToggle.textContent = "☀️";
        }
        themeToggle.addEventListener("click", () => {
            if (htmlElement.getAttribute("data-theme") === "light") {
                htmlElement.setAttribute("data-theme", "dark");
                themeToggle.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                htmlElement.setAttribute("data-theme", "light");
                themeToggle.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ==========================================
    // Feature 2: Dynamic Greeting
    // ==========================================
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) { // Safety check
        const hour = new Date().getHours();
        if (hour < 12) greetingElement.textContent = "Good Morning";
        else if (hour < 18) greetingElement.textContent = "Good Afternoon";
        else greetingElement.textContent = "Good Evening";
    }

    // ==========================================
    // Feature 3: Typewriter Effect
    // ==========================================
    const typingElement = document.getElementById("typing-text");
    if (typingElement) { // Safety check
        const texts = ["Network Computing Student", "Mechanical Technician"];
        let count = 0, index = 0, currentText = "", letter = "";
        
        function type() {
            if (count === texts.length) count = 0;
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            typingElement.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
        type();
    }

    // ==========================================
    // Feature 4: Intersection Observer (Fade in)
    // ==========================================
    const sections = document.querySelectorAll(".animate-on-scroll");
    if (sections.length > 0) { // Safety check
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // Feature 5: Active Nav Link
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-link");
    if (navLinks.length > 0) { // Safety check
        window.addEventListener("scroll", () => {
            let current = "";
            document.querySelectorAll("section").forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute("id");
                }
            });
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.classList.add("active");
                }
            });
        });
    }

    // ==========================================
    // Feature 6: Scroll-to-Top
    // ==========================================
    const scrollTopBtn = document.getElementById("scroll-top");
    if (scrollTopBtn) { // Safety check
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) scrollTopBtn.classList.add("visible");
            else scrollTopBtn.classList.remove("visible");
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // Feature 7: Project Filtering
    // ==========================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0) { // Safety check
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-filter");
                projectCards.forEach(card => {
                    if (filter === "all" || card.getAttribute("data-category") === filter) {
                        card.classList.remove("hide");
                    } else {
                        card.classList.add("hide");
                    }
                });
            });
        });
    }

    // ==========================================
    // Feature 8: Custom Modal 
    // ==========================================
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close-modal");
    const viewBtns = document.querySelectorAll(".view-details-btn");

    if (modal && closeBtn) { // Safety check prevents crashing
        viewBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                modalTitle.textContent = btn.getAttribute("data-title");
                modalDesc.textContent = btn.getAttribute("data-desc");
                modal.classList.add("show");
            });
        });

        closeBtn.addEventListener("click", () => modal.classList.remove("show"));
        window.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("show");
        });
    }

    // ==========================================
    // Feature 9: Dynamic Year
    // ==========================================
    const yearElement = document.getElementById("year");
    if (yearElement) { // Safety check
        yearElement.textContent = new Date().getFullYear();
    }

    // ==========================================
    // Feature 10: Form Validation
    // ==========================================
    const form = document.getElementById("contact-form");
    if (form) { // Safety check
        form.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            let isValid = true;
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            document.querySelectorAll(".error-msg").forEach(msg => msg.style.display = "none");

            if (name.value.trim() === "") {
                document.getElementById("name-error").textContent = "Name is required.";
                document.getElementById("name-error").style.display = "block";
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById("email-error").textContent = "Please enter a valid email.";
                document.getElementById("email-error").style.display = "block";
                isValid = false;
            }

            if (message.value.trim() === "") {
                document.getElementById("message-error").textContent = "Message cannot be empty.";
                document.getElementById("message-error").style.display = "block";
                isValid = false;
            }

            if (isValid) {
                alert("Thank you! Your message has been validated successfully.");
                form.reset();
            }
        });
    }
});