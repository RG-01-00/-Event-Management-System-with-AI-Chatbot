// script.js
// Theme Management
function initializeTheme() {
    // Check for saved theme preference
    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    
    // Apply theme immediately
    document.body.classList.toggle("dark-mode", isDarkMode);
    
    // Update toggle button text
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
        
        // Set up toggle functionality
        darkModeToggle.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", isDark);
            darkModeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
    }
}

// Form handling
function setupForms() {
    // Register form
    const registerForm = document.querySelector("#register form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for registering!");
            registerForm.reset();
        });
    }

    // Dashboard form
    const dashboardForm = document.querySelector("#dashboard form");
    if (dashboardForm) {
        dashboardForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("New event added successfully!");
            dashboardForm.reset();
        });
    }
}

// Initialize everything when DOM loads
window.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    setupForms();
});