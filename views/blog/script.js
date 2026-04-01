// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");

    const isDarkMode = localStorage.getItem("dark-mode");
    if (isDarkMode === "true") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode";
    } else {
        darkModeToggle.textContent = "Dark Mode";
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", isDark);
        darkModeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    });

    // Handle form submissions
    const registerForm = document.querySelector("#register form");
    const dashboardForm = document.querySelector("#dashboard form");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for registering!");
            registerForm.reset();
        });
    }

    if (dashboardForm) {
        dashboardForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("New event added successfully!");
            dashboardForm.reset();
        });
    }

    // Handle "See Details" toggling
    const detailButtons = document.querySelectorAll(".details-toggle");

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const event = button.parentElement;
            const hiddenDetails = event.querySelector(".hidden-details");

            if (hiddenDetails.style.display === "none") {
                hiddenDetails.style.display = "inline";
                button.textContent = "Hide Details";
            } else {
                hiddenDetails.style.display = "none";
                button.textContent = "See Details";
            }
        });
    });
});
