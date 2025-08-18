const userData = JSON.parse(localStorage.getItem('userData')) || [
    { email: "puttasujith@gmail.com", password: "sujith" },
    { email: "vikaskakarla@gmail.com", password: "vikas" },
    { email: "yashaskumar@gmail.com", password: "yashaskumar" },
    { email: "rohail@gmail.com", password: "rohail" },
    { email: "sesank@gmail.com", password: "sesank" }
];

// Real-time password validation
function checkPasswordsMatch() {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const passwordMessage = document.getElementById('passwordMessage');
    
    if (confirmPassword === '') {
        passwordMessage.textContent = '';
        passwordMessage.className = 'password-message';
        return;
    }
    
    if (password === confirmPassword) {
        passwordMessage.textContent = '✓ Passwords match!';
        passwordMessage.className = 'password-message match';
    } else {
        passwordMessage.textContent = '✗ Passwords do not match';
        passwordMessage.className = 'password-message no-match';
    }
}

// Add event listeners for real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', checkPasswordsMatch);
        confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
    }
});

document.getElementById('signupForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation checks
    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Check if email already exists
    const existingUser = userData.find(user => user.email === email);
    if (existingUser) {
        alert('An account with this email already exists. Please use a different email or login.');
        return;
    }

    userData.push({ name: fullName, email, password });
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    navigateToPage('login.html');
});

function navigateToPage(page, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    window.location.href = queryParams ? `${page}?${queryParams}` : page;
}
