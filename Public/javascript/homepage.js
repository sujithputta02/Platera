const menuData = {
    menu1: {
        title: 'The Rameshwaram Cafe.',
        description: 'Delicious South Indian Cuisine',
        image: '/Public/websiteimages/rameshwaram cafe menu.jpg',
        additionalContent: 'For more about The Rameshwaram Cafe...,Click below to Visit the page.',
        bookingPage: '/Public/ramecfe.html'
    },
    menu2: {
        title: 'The Pump House.',
        description: 'Exquisite Continental Dishes',
        images: [
            '/Public/websiteimages/phmenu1.png',
            '/Public/websiteimages/phmenu2.png',
            '/Public/websiteimages/phmenu3.png',
            '/Public/websiteimages/phmenu4.png',
            '/Public/websiteimages/phmenu5.png',
            '/Public/websiteimages/phmenu6.png',
            '/Public/websiteimages/phmenu7.png',
            '/Public/websiteimages/phmenu8.png',
            '/Public/websiteimages/phmenu9.png',
            '/Public/websiteimages/phmenu10.png'
        ],
        additionalContent: 'For more about The Pump House...,Click below to Visit the page.',
        bookingPage: '/Public/pumhuse.html'
    },
    menu3: {
        title: '1947 Restaurant.',
        description: 'Authentic Italian Cuisine',
        image: '/Public/websiteimages/1947menu.jpg',
        additionalContent: 'For more about 1947 Restaurant...,Click below to Visit the page.',
        bookingPage: '/Public/1947.html'
    },
    menu4: {
        title: 'Meghana Foods.',
        description: 'Traditional Chinese Dishes',
        image: '/Public/websiteimages/mgfmenu1.jpg',
        additionalContent: 'For more about Meghana Foods...,Click below to Visit the page.',
        bookingPage: '/Public/megfd.html'
    },
    menu5: {
        title: 'Indian Coffee House.',
        description: 'Sumptuous Indian Thali',
        image: '/Public/websiteimages/menuich.jpg',
        additionalContent: 'For more about Indian Coffee House...,Click below to Visit the page.',
        bookingPage: '/Public/indcfe.html'
    },
    menu6: {
        title: 'The White Room.',
        description: 'Delightful Japanese Sushi',
        image: '/Public/websiteimages/twrmenu.jpg',
        additionalContent: 'For more about The White Room...,Click below to Visit the page.',
        bookingPage: '/Public/whiroo.html'
    },
    menu7: {
        title: 'Hallimane.',
        description: 'Hearty American Burgers',
        image: '/Public/websiteimages/hallmanmenu.jpg',
        additionalContent: 'For more about Hallimane...,Click below to Visit the page.',
        bookingPage: '/Public/halli.html'
    },
    menu8: {
        title: 'Pizza Stop.',
        description: 'Fresh Mediterranean Salads',
        image: '/Public/websiteimages/pizstmenu.jpg',
        additionalContent: 'For more about Pizza Stop...,Click below to Visit the page.',
        bookingPage: '/Public/pizstp.html'
    },
    menu9: {
        title: 'Sattvam.',
        description: 'Delicious Mexican Tacos',
        image: '/Public/websiteimages/satmenu.jpeg',
        additionalContent: 'For more about Sattvam...,Click below to Visit the page.',
        bookingPage: '/Public/sat.html'
    }
};

function displayInitials() {
    const urlParams = new URLSearchParams(window.location.search);
    let initials = urlParams.get('initials');

    if (!initials) {
        initials = localStorage.getItem('initials');
    }

    const userInitialsElement = document.getElementById('userInitials');
    if (userInitialsElement && initials) {
        userInitialsElement.textContent = initials;
    }
}

function applyDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function showMenuDetails(menuId) {
    const menuDetailsContent = document.getElementById('menuDetailsContent');
    const mainContent = document.getElementById('mainContent');
    const menuDetails = document.getElementById('menuDetails');
    const bookTableButton = document.getElementById('bookTable');

    const menu = menuData[menuId];
    if (menu) {
        if (menuId === 'menu2') {
            let imagesHtml = '';
            menu.images.forEach(image => {
                imagesHtml += `<div class="menu-image"><img src="${image}" alt="${menu.title}" style="width: 100%; height: auto;"></div>`;
            });
            menuDetailsContent.innerHTML = `
                <h2>${menu.title}</h2>
                <div class="menu-images-grid">${imagesHtml}</div>
                <p>${menu.description}</p>
                <p>${menu.additionalContent}</p>
            `;
        } else {
            menuDetailsContent.innerHTML = `
                <h2>${menu.title}</h2>
                <img src="${menu.image}" alt="${menu.title}" style="width: 100%; height: auto;">
                <p>${menu.description}</p>
                <p>${menu.additionalContent}</p>
            `;
        }
        bookTableButton.setAttribute('onclick', `location.href='${menu.bookingPage}'`);
        mainContent.style.display = 'none';
        menuDetails.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const responsiveBar = document.getElementById('responsiveBar');
    const dashboardIcon = document.getElementById('dashboardIcon');
    const menuLink = document.getElementById('menuLink');
    const mainContent = document.getElementById('mainContent');
    const menuContent = document.getElementById('menuContent');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuDetails = document.getElementById('menuDetails');
    const backToMenu = document.getElementById('backToMenu');

    applyDarkMode();
    displayInitials();

    dashboardIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        responsiveBar.classList.toggle('open');
    });

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    window.addEventListener('click', (event) => {
        if (!responsiveBar.contains(event.target) && event.target !== dashboardIcon) {
            responsiveBar.classList.remove('open');
        }
    });

    menuLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent.style.display = 'none';
        menuContent.style.display = 'block';
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuId = item.getAttribute('data-menu');
            showMenuDetails(menuId);
        });
    });

    backToMenu.addEventListener('click', () => {
        menuDetails.style.display = 'none';
        mainContent.style.display = 'block';
    });

    const initials = localStorage.getItem('initials');
    const accountName = localStorage.getItem('accountName');

    if (!initials || !accountName) {
        // Redirect to login page if not logged in
        window.location.href = '/Public/login.html';
    }

    // Existing code to display profile and bookings
    displayProfile();
    displayUpcomingBookings();
    displayCompletedBookings();
});
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.location.href = `/Public/search.html?query=${encodeURIComponent(query)}`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const searchResults = document.getElementById('searchResults');

    if (query) {
        searchResults.innerHTML = `<p>Results for: <strong>${query}</strong></p>`;
        // Add logic to fetch and display search results based on the query
    } else {
        searchResults.innerHTML = '<p>No search query provided.</p>';
    }
});
