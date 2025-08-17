const userData = JSON.parse(localStorage.getItem('userData')) || [
    { email: "puttasujith@gmail.com", password: "sujith" },
    { email: "vikaskakarla@gmail.com", password: "vikas" },
    { email: "yashaskumar@gmail.com", password: "yashaskumar" },
    { email: "rohail@gmail.com", password: "rohail" },
    { email: "sesank@gmail.com", password: "sesank" }
];

document.getElementById('createAccountForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const passwordMessage = document.getElementById('passwordMessage');

    if (password !== confirmPassword) {
        passwordMessage.textContent = 'Passwords do not match. Please try again.';
        passwordMessage.classList.remove('match');
        return;
    } else {
        passwordMessage.textContent = 'Passwords match!';
        passwordMessage.classList.add('match');
    }

    userData.push({ name, email, password });
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    navigateToPage('/Public/login.html');
});

function navigateToPage(page, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    window.location.href = queryParams ? `${page}?${queryParams}` : page;
}

// Listen for changes in password fields
document.getElementById('password').addEventListener('input', checkPasswordsMatch);
document.getElementById('confirm-password').addEventListener('input', checkPasswordsMatch);

function checkPasswordsMatch() {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const passwordMessage = document.getElementById('passwordMessage');

    if (password !== confirmPassword) {
        passwordMessage.textContent = 'Passwords do not match.';
        passwordMessage.classList.remove('match');
    } else {
        passwordMessage.textContent = 'Passwords match!';
        passwordMessage.classList.add('match');
    }
}
