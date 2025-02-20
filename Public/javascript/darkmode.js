// Dropdown toggle function
function toggleDropdown(event) {
    const dropdownContent = event.target.nextElementSibling;
    if (dropdownContent) {
        dropdownContent.classList.toggle('show');
    } else {
        console.error("Dropdown content not found.");
    }
}

// Function to initialize dark mode toggle
function initializeDarkMode() {
    const darkModeToggleButton = document.getElementById('darkModeToggle');

    if (!darkModeToggleButton) {
        console.error("Dark mode toggle button with ID 'darkModeToggle' not found.");
        return;
    } else {
        console.log("Dark mode toggle button found:", darkModeToggleButton);
    }

    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        console.log("Dark mode is enabled on page load.");
    } else {
        console.log("Dark mode is disabled on page load.");
    }

    darkModeToggleButton.addEventListener('click', () => {
        const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkModeEnabled);
        console.log("Dark mode toggled. Current state:", isDarkModeEnabled);
    });
}
