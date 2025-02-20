const menuData = {
    menu1: {
        title: 'Rameshwaram Cafe',
        description: 'Delicious South Indian Cuisine',
        image: '/Public/websiteimages/ramebgboxmen.png',
        additionalContent: 'Additional content about Rameshwaram Cafe...'
    },
    menu2: {
        title: 'Hotel 2',
        description: 'Exquisite Continental Dishes',
        image: '/Public/websiteimages/image2.jpg',
        additionalContent: 'Additional content about Hotel 2...'
    },
    menu3: {
        title: 'Hotel 3',
        description: 'Authentic Italian Cuisine',
        image: '/Public/websiteimages/image3.jpg',
        additionalContent: 'Additional content about Hotel 3...'
    },
    menu4: {
        title: 'Hotel 4',
        description: 'Traditional Chinese Dishes',
        image: '/Public/websiteimages/image4.jpg',
        additionalContent: 'Additional content about Hotel 4...'
    },
    menu5: {
        title: 'Hotel 5',
        description: 'Sumptuous Indian Thali',
        image: '/Public/websiteimages/image5.jpg',
        additionalContent: 'Additional content about Hotel 5...'
    },
    menu6: {
        title: 'Hotel 6',
        description: 'Delightful Japanese Sushi',
        image: '/Public/websiteimages/image6.jpg',
        additionalContent: 'Additional content about Hotel 6...'
    },
    menu7: {
        title: 'Hotel 7',
        description: 'Hearty American Burgers',
        image: '/Public/websiteimages/image7.jpg',
        additionalContent: 'Additional content about Hotel 7...'
    },
    menu8: {
        title: 'Hotel 8',
        description: 'Fresh Mediterranean Salads',
        image: '/Public/websiteimages/image8.jpg',
        additionalContent: 'Additional content about Hotel 8...'
    },
    menu9: {
        title: 'Hotel 9',
        description: 'Delicious Mexican Tacos',
        image: '/Public/websiteimages/image9.jpg',
        additionalContent: 'Additional content about Hotel 9...'
    }
};

function showMenuDetails(menuId) {
    const menuDetailsContent = document.getElementById('menuDetailsContent');
    const menuContent = document.getElementById('menuContent');
    const menuDetails = document.getElementById('menuDetails');

    const menu = menuData[menuId];
    if (menu) {
        menuDetailsContent.innerHTML = `
            <h2>${menu.title}</h2>
            <img src="${menu.image}" alt="${menu.title}" style="width: 100%; height: auto;">
            <p>${menu.description}</p>
            <p>${menu.additionalContent}</p>
        `;
        menuContent.style.display = 'none';
        menuDetails.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const menuDetails = document.getElementById('menuDetails');
    const backToMenu = document.getElementById('backToMenu');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuId = item.getAttribute('data-menu');
            showMenuDetails(menuId);
        });
    });

    backToMenu.addEventListener('click', () => {
        menuDetails.style.display = 'none';
        document.getElementById('menuContent').style.display = 'block';
    });
});