// Load user data from local storage or use default data
const userData = JSON.parse(localStorage.getItem('userData')) || [
    { email: "puttasujith@gmail.com", password: "sujith" },
    { email: "vikaskakarla@gmail.com", password: "vikas" },
    { email: "yashaskumar@gmail.com", password: "yashaskumar" },
    { email: "rohail@gmail.com", password: "rohail" },
    { email: "sesank@gmail.com", password: "sesank" }
];

// Toggle password visibility function
function setupPasswordToggle(inputId, toggleId) {
    const passwordField = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);

    if (passwordField && toggleIcon) {
        toggleIcon.addEventListener('click', () => {
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            toggleIcon.querySelector('img').classList.toggle('active');
        });
    }
}

// Setup password toggles for login and create account forms
setupPasswordToggle('password', 'togglePassword');
setupPasswordToggle('confirm-password', 'toggleConfirmPassword');

// Create account form submission
document.getElementById('createAccountForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    userData.push({ name, email, password });
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    navigateToPage('/Public/login.html');
});

// Navigate to a page with optional query parameters
function navigateToPage(page, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    window.location.href = queryParams ? `${page}?${queryParams}` : page;
}

// Show loading animation
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Hide loading animation
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const validUser = userData.find(user => user.email === emailInput && user.password === passwordInput);

    if (validUser) {
        showLoading();
        setTimeout(() => {
            alert("Login Successful!");
            const initials = emailInput.charAt(0).toUpperCase();
            const accountName = emailInput.split('@')[0];
            // Store initials and account name in local storage for consistent access
            localStorage.setItem('initials', initials);
            localStorage.setItem('accountName', accountName);
            navigateToPage('/Public/homepage.html', { initials: initials, accountName: accountName });
        }, 2000); // Simulate a delay for the loading animation
    } else {
        alert("Invalid Email or Password. Please try again.");
        hideLoading();
    }
});

// Navigate to the create account page
document.getElementById("createAccount")?.addEventListener("click", function (e) {
    e.preventDefault();
    navigateToPage('/Public/creacc.html');
});

// Dropdown navigation handling
document.querySelectorAll('.dropdown select').forEach(dropdown => {
    dropdown.addEventListener('change', function() {
        if (this.value) {
            const initials = localStorage.getItem('initials');
            const accountName = localStorage.getItem('accountName');
            navigateToPage(this.value, { initials: initials, accountName: accountName });
        }
    });
});