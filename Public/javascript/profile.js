// Function to display profile information (initials and account name)
function displayProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    let initials = urlParams.get('initials');
    let accountName = urlParams.get('accountName');

    // Fallback to local storage if values not found in URL
    if (!initials) {
        initials = localStorage.getItem('initials');
    }
    if (!accountName) {
        accountName = localStorage.getItem('accountName');
    }

    const userInitialsElements = document.querySelectorAll('#userInitials'); // Select all elements with id 'userInitials'
    const accountNameElement = document.getElementById('accountName');

    userInitialsElements.forEach(element => {
        if (element && initials) {
            element.textContent = initials;
        }
    });

    if (accountNameElement && accountName) {
        accountNameElement.textContent = `Hi, ${accountName}`;
    }
}

// Call the function to display profile information
displayProfile();
