const menuData = {
    menu1: {
        title: 'The Rameshwaram Cafe.',
        description: 'Delicious South Indian Cuisine',
        image: '/docs/websiteimages/rameshwaram cafe menu.jpg',
        additionalContent: 'For more about The Rameshwaram Cafe...,Click below to Visit the page.',
        bookingPage: '/docs/ramecfe.html',
        category: 'South Indian',
        cuisine: 'Indian',
        tags: ['south indian', 'indian', 'cafe', 'traditional', 'dosa', 'idli', 'vada']
    },
    menu2: {
        title: 'The Pump House.',
        description: 'Exquisite Continental Dishes',
        images: [
            '/docs/websiteimages/phmenu1.png',
            '/docs/websiteimages/phmenu2.png',
            '/docs/websiteimages/phmenu3.png',
            '/docs/websiteimages/phmenu4.png',
            '/docs/websiteimages/phmenu5.png',
            '/docs/websiteimages/phmenu6.png',
            '/docs/websiteimages/phmenu7.png',
            '/docs/websiteimages/phmenu8.png',
            '/docs/websiteimages/phmenu9.png',
            '/docs/websiteimages/phmenu10.png'
        ],
        additionalContent: 'For more about The Pump House...,Click below to Visit the page.',
        bookingPage: '/docs/pumhuse.html',
        category: 'Continental',
        cuisine: 'European',
        tags: ['continental', 'european', 'fine dining', 'elegant', 'wine', 'steak', 'pasta']
    },
    menu3: {
        title: '1947 Restaurant.',
        description: 'Authentic Italian Cuisine',
        image: '/docs/websiteimages/1947menu.jpg',
        additionalContent: 'For more about 1947 Restaurant...,Click below to Visit the page.',
        bookingPage: '/docs/1947.html',
        category: 'Italian',
        cuisine: 'European',
        tags: ['italian', 'pizza', 'pasta', 'mediterranean', 'authentic', 'traditional', 'wine']
    },
    menu4: {
        title: 'Meghana Foods.',
        description: 'Traditional Chinese Dishes',
        image: '/docs/websiteimages/mgfmenu1.jpg',
        additionalContent: 'For more about Meghana Foods...,Click below to Visit the page.',
        bookingPage: '/docs/megfd.html',
        category: 'Chinese',
        cuisine: 'Asian',
        tags: ['chinese', 'asian', 'traditional', 'noodles', 'rice', 'dim sum', 'szechuan']
    },
    menu5: {
        title: 'Indian Coffee House.',
        description: 'Sumptuous Indian Thali',
        image: '/docs/websiteimages/menuich.jpg',
        additionalContent: 'For more about Indian Coffee House...,Click below to Visit the page.',
        bookingPage: '/docs/indcfe.html',
        category: 'Indian',
        cuisine: 'Indian',
        tags: ['indian', 'thali', 'coffee', 'traditional', 'vegetarian', 'breakfast', 'snacks']
    },
    menu6: {
        title: 'The White Room.',
        description: 'Delightful Japanese Sushi',
        image: '/docs/websiteimages/twrmenu.jpg',
        additionalContent: 'For more about The White Room...,Click below to Visit the page.',
        bookingPage: '/docs/whiroo.html',
        category: 'Japanese',
        cuisine: 'Asian',
        tags: ['japanese', 'sushi', 'asian', 'fresh', 'healthy', 'raw fish', 'miso', 'tempura']
    },
    menu7: {
        title: 'Hallimane.',
        description: 'Hearty American Burgers',
        image: '/docs/websiteimages/hallmanmenu.jpg',
        additionalContent: 'For more about Hallimane...,Click below to Visit the page.',
        bookingPage: '/docs/halli.html',
        category: 'American',
        cuisine: 'American',
        tags: ['american', 'burgers', 'fast food', 'comfort food', 'grilled', 'cheese', 'fries']
    },
    menu8: {
        title: 'Pizza Stop.',
        description: 'Fresh Mediterranean Salads',
        image: '/docs/websiteimages/pizstmenu.jpg',
        additionalContent: 'For more about Pizza Stop...,Click below to Visit the page.',
        bookingPage: '/docs/pizstp.html',
        category: 'Mediterranean',
        cuisine: 'European',
        tags: ['mediterranean', 'pizza', 'salads', 'healthy', 'fresh', 'olive oil', 'herbs']
    },
    menu9: {
        title: 'Sattvam.',
        description: 'Delicious Mexican Tacos',
        image: '/docs/websiteimages/satmenu.jpeg',
        additionalContent: 'For more about Sattvam...,Click below to Visit the page.',
        bookingPage: '/docs/sat.html',
        category: 'Mexican',
        cuisine: 'Latin American',
        tags: ['mexican', 'tacos', 'latin american', 'spicy', 'authentic', 'salsa', 'guacamole']
    }
};

// Search functionality
function performSearch(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results = [];
    
    // Search through all restaurants
    Object.keys(menuData).forEach(menuId => {
        const restaurant = menuData[menuId];
        let score = 0;
        
        // Check title match (highest priority)
        if (restaurant.title.toLowerCase().includes(searchTerm)) {
            score += 100;
        }
        
        // Check description match
        if (restaurant.description.toLowerCase().includes(searchTerm)) {
            score += 50;
        }
        
        // Check category match
        if (restaurant.category.toLowerCase().includes(searchTerm)) {
            score += 40;
        }
        
        // Check cuisine match
        if (restaurant.cuisine.toLowerCase().includes(searchTerm)) {
            score += 30;
        }
        
        // Check tags match
        restaurant.tags.forEach(tag => {
            if (tag.includes(searchTerm)) {
                score += 20;
            }
        });
        
        // If we found any matches, add to results
        if (score > 0) {
            results.push({
                ...restaurant,
                menuId: menuId,
                searchScore: score
            });
        }
    });
    
    // Sort by relevance score (highest first)
    results.sort((a, b) => b.searchScore - a.searchScore);
    
    return results;
}

// Generate search suggestions
function generateSearchSuggestions(query) {
    if (!query || query.trim().length < 2) {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const suggestions = [];
    const addedSuggestions = new Set();
    
    // Restaurant name suggestions
    Object.values(menuData).forEach(restaurant => {
        if (restaurant.title.toLowerCase().includes(searchTerm)) {
            const suggestion = {
                text: restaurant.title,
                category: 'Restaurant',
                icon: '🍽️',
                type: 'restaurant',
                data: restaurant
            };
            if (!addedSuggestions.has(suggestion.text)) {
                suggestions.push(suggestion);
                addedSuggestions.add(suggestion.text);
            }
        }
    });
    
    // Cuisine suggestions
    const cuisines = [...new Set(Object.values(menuData).map(r => r.cuisine))];
    cuisines.forEach(cuisine => {
        if (cuisine.toLowerCase().includes(searchTerm)) {
            const suggestion = {
                text: cuisine,
                category: 'Cuisine',
                icon: '🌍',
                type: 'cuisine',
                data: { cuisine: cuisine }
            };
            if (!addedSuggestions.has(suggestion.text)) {
                suggestions.push(suggestion);
                addedSuggestions.add(suggestion.text);
            }
        }
    });
    
    // Category suggestions
    const categories = [...new Set(Object.values(menuData).map(r => r.category))];
    categories.forEach(category => {
        if (category.toLowerCase().includes(searchTerm)) {
            const suggestion = {
                text: category,
                category: 'Category',
                icon: '🏷️',
                type: 'category',
                data: { category: category }
            };
            if (!addedSuggestions.has(suggestion.text)) {
                suggestions.push(suggestion);
                addedSuggestions.add(suggestion.text);
            }
        }
    });
    
    // Popular tag suggestions
    const allTags = Object.values(menuData).flatMap(r => r.tags);
    const tagCounts = {};
    allTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    Object.keys(tagCounts).forEach(tag => {
        if (tag.includes(searchTerm) && tagCounts[tag] >= 2) {
            const suggestion = {
                text: tag,
                category: 'Popular',
                icon: '🔥',
                type: 'tag',
                data: { tag: tag }
            };
            if (!addedSuggestions.has(suggestion.text)) {
                suggestions.push(suggestion);
                addedSuggestions.add(suggestion.text);
            }
        }
    });
    
    // Quick search suggestions
    const quickSearches = [
        { text: 'All Italian Restaurants', category: 'Quick Search', icon: '⚡', type: 'quick', data: { cuisine: 'Italian' } },
        { text: 'All Chinese Restaurants', category: 'Quick Search', icon: '⚡', type: 'quick', data: { cuisine: 'Chinese' } },
        { text: 'All Indian Restaurants', category: 'Quick Search', icon: '⚡', type: 'quick', data: { cuisine: 'Indian' } },
        { text: 'Pizza Places', category: 'Quick Search', icon: '⚡', type: 'quick', data: { tag: 'pizza' } },
        { text: 'Burgers & Fast Food', category: 'Quick Search', icon: '⚡', type: 'quick', data: { tag: 'burgers' } },
        { text: 'Healthy Options', category: 'Quick Search', icon: '⚡', type: 'quick', data: { tag: 'healthy' } }
    ];
    
    quickSearches.forEach(quick => {
        if (quick.text.toLowerCase().includes(searchTerm)) {
            const suggestion = {
                text: quick.text,
                category: quick.category,
                icon: quick.icon,
                type: quick.type,
                data: quick.data
            };
            if (!addedSuggestions.has(suggestion.text)) {
                suggestions.push(suggestion);
                addedSuggestions.add(suggestion.text);
            }
        }
    });
    
    return suggestions.slice(0, 8); // Limit to 8 suggestions
}

// Display search suggestions
function displaySearchSuggestions(suggestions) {
    const searchBar = document.querySelector('.search-bar');
    let suggestionsContainer = document.getElementById('searchSuggestions');
    
    // Remove existing suggestions
    if (suggestionsContainer) {
        suggestionsContainer.remove();
    }
    
    if (suggestions.length === 0) {
        return;
    }
    
    // Create suggestions container
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'searchSuggestions';
    suggestionsContainer.className = 'search-suggestions show';
    
    suggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.setAttribute('data-index', index);
        suggestionItem.setAttribute('data-suggestion', JSON.stringify(suggestion));
        suggestionItem.innerHTML = `
            <div class="suggestion-icon">${suggestion.icon}</div>
            <div class="suggestion-text">
                <div>${suggestion.text}</div>
                <div class="suggestion-category">${suggestion.category}</div>
            </div>
        `;
        
        // Enhanced click handling
        suggestionItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectSuggestion(suggestion);
        });
        
        // Mouse enter for visual feedback
        suggestionItem.addEventListener('mouseenter', () => {
            clearSuggestionSelection();
            suggestionItem.classList.add('selected');
        });
        
        // Touch events for mobile
        suggestionItem.addEventListener('touchstart', (e) => {
            e.preventDefault();
            suggestionItem.classList.add('selected');
        });
        
        suggestionItem.addEventListener('touchend', (e) => {
            e.preventDefault();
            selectSuggestion(suggestion);
        });
        
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    // Insert suggestions after search bar
    searchBar.appendChild(suggestionsContainer);
    
    // Add click outside handler
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
    }, 100);
}

// Handle clicks outside search suggestions
function handleClickOutside(e) {
    const searchBar = document.querySelector('.search-bar');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (suggestionsContainer && searchBar && !searchBar.contains(e.target)) {
        hideSearchSuggestions();
        document.removeEventListener('click', handleClickOutside, true);
    }
}

// Select a suggestion
function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('searchInput');
    
    if (suggestion.type === 'restaurant') {
        // Show specific restaurant
        showMenuDetails(suggestion.data.menuId);
    } else if (suggestion.type === 'cuisine' || suggestion.type === 'category' || suggestion.type === 'tag') {
        // Perform search for the suggestion
        searchInput.value = suggestion.text;
        const results = performSearch(suggestion.text);
        displaySearchResults(results, suggestion.text);
    } else if (suggestion.type === 'quick') {
        // Handle quick searches
        if (suggestion.data.cuisine) {
            searchInput.value = suggestion.data.cuisine;
            const results = performSearch(suggestion.data.cuisine);
            displaySearchResults(results, suggestion.data.cuisine);
        } else if (suggestion.data.tag) {
            searchInput.value = suggestion.data.tag;
            const results = performSearch(suggestion.data.tag);
            displaySearchResults(results, suggestion.data.tag);
        }
    }
    
    // Hide suggestions
    hideSearchSuggestions();
    
    // Remove click outside handler
    document.removeEventListener('click', handleClickOutside, true);
}

// Clear suggestion selection
function clearSuggestionSelection() {
    const selectedItems = document.querySelectorAll('.suggestion-item.selected');
    selectedItems.forEach(item => item.classList.remove('selected'));
}

// Hide search suggestions
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.remove();
    }
    // Remove click outside handler
    document.removeEventListener('click', handleClickOutside, true);
}

// Handle keyboard navigation in suggestions
function handleSuggestionKeyboard(e) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;
    
    const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
    const currentSelected = suggestionsContainer.querySelector('.suggestion-item.selected');
    let currentIndex = currentSelected ? parseInt(currentSelected.getAttribute('data-index')) : -1;
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            clearSuggestionSelection();
            currentIndex = (currentIndex + 1) % suggestions.length;
            suggestions[currentIndex].classList.add('selected');
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            clearSuggestionSelection();
            currentIndex = currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1;
            suggestions[currentIndex].classList.add('selected');
            break;
            
        case 'Enter':
            e.preventDefault();
            if (currentIndex >= 0) {
                const selectedSuggestion = suggestions[currentIndex];
                const suggestionData = getSuggestionData(selectedSuggestion);
                if (suggestionData) {
                    selectSuggestion(suggestionData);
                }
            } else {
                // Perform regular search
                handleSearch();
            }
            break;
            
        case 'Escape':
            hideSearchSuggestions();
            break;
    }
}

// Get suggestion data from DOM element
function getSuggestionData(suggestionElement) {
    const index = parseInt(suggestionElement.getAttribute('data-index'));
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return null;
    
    // This would need to be implemented based on how suggestions are stored
    // For now, we'll use the text content to recreate the suggestion
    const text = suggestionElement.querySelector('.suggestion-text div').textContent;
    const category = suggestionElement.querySelector('.suggestion-category').textContent;
    
    // Recreate suggestion object based on category and text
    if (category === 'Restaurant') {
        const restaurant = Object.values(menuData).find(r => r.title === text);
        if (restaurant) {
            return {
                type: 'restaurant',
                data: restaurant,
                text: text,
                category: category
            };
        }
    } else if (category === 'Cuisine') {
        return {
            type: 'cuisine',
            data: { cuisine: text },
            text: text,
            category: category
        };
    } else if (category === 'Category') {
        return {
            type: 'category',
            data: { category: text },
            text: text,
            category: category
        };
    }
    
    return null;
}

function displaySearchResults(results, query) {
    const mainContent = document.getElementById('mainContent');
    const menuContent = document.getElementById('menuContent');
    const menuDetails = document.getElementById('menuDetails');
    
    // Hide other content
    mainContent.style.display = 'none';
    menuContent.style.display = 'none';
    menuDetails.style.display = 'none';
    
    // Create search results container
    let searchResultsHTML = `
        <div class="search-results-container">
            <div class="search-header">
                <h2>Search Results for "${query}"</h2>
                <p>Found ${results.length} restaurant${results.length !== 1 ? 's' : ''}</p>
                <button class="back-to-home-btn" onclick="backToHome()">← Back to Home</button>
            </div>
            <div class="search-results-grid">
    `;
    
    if (results.length === 0) {
        searchResultsHTML += `
            <div class="no-results">
                <h3>No restaurants found</h3>
                <p>Try searching for different keywords like:</p>
                <ul>
                    <li>Restaurant names (e.g., "Rameshwaram", "Pump House")</li>
                    <li>Cuisine types (e.g., "Italian", "Chinese", "Indian")</li>
                    <li>Food categories (e.g., "Pizza", "Burgers", "Sushi")</li>
                    <li>Descriptions (e.g., "Traditional", "Authentic", "Fresh")</li>
                </ul>
            </div>
        `;
    } else {
        results.forEach(result => {
            const imageSrc = result.images ? result.images[0] : result.image;
            searchResultsHTML += `
                <div class="search-result-item" onclick="showMenuDetails('${result.menuId}')">
                    <div class="result-image">
                        <img src="${imageSrc}" alt="${result.title}">
                    </div>
                    <div class="result-content">
                        <h3>${result.title}</h3>
                        <p class="result-description">${result.description}</p>
                        <p class="result-category">${result.category} • ${result.cuisine}</p>
                        <div class="result-tags">
                            ${result.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    searchResultsHTML += `
            </div>
        </div>
    `;
    
    // Create or update search results container
    let searchResultsContainer = document.getElementById('searchResultsContainer');
    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement('main');
        searchResultsContainer.id = 'searchResultsContainer';
        document.body.appendChild(searchResultsContainer);
    }
    
    searchResultsContainer.innerHTML = searchResultsHTML;
    searchResultsContainer.style.display = 'block';
}

function backToHome() {
    const mainContent = document.getElementById('mainContent');
    const menuContent = document.getElementById('menuContent');
    const menuDetails = document.getElementById('menuDetails');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    
    // Show main content
    mainContent.style.display = 'block';
    
    // Hide other content
    menuContent.style.display = 'none';
    menuDetails.style.display = 'none';
    if (searchResultsContainer) {
        searchResultsContainer.style.display = 'none';
    }
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
}

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
    const menuContent = document.getElementById('menuContent');
    const menuDetails = document.getElementById('menuDetails');
    const bookTableButton = document.getElementById('bookTable');
    const searchResultsContainer = document.getElementById('searchResultsContainer');

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
        
        // Hide all content
        mainContent.style.display = 'none';
        menuContent.style.display = 'none';
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none';
        }
        
        // Show menu details
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
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    applyDarkMode();
    displayInitials();

    // Search functionality
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            const results = performSearch(query);
            displaySearchResults(results, query);
        }
    }

    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Search input enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Search input real-time suggestions (optional)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                const suggestions = generateSearchSuggestions(query);
                displaySearchSuggestions(suggestions);
            } else {
                hideSearchSuggestions();
            }
        });
        
        // Focus events
        searchInput.addEventListener('focus', () => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                const suggestions = generateSearchSuggestions(query);
                displaySearchSuggestions(suggestions);
            }
        });
        
        // Improved blur event handling
        let blurTimeout;
        searchInput.addEventListener('blur', () => {
            // Clear any existing timeout
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
            
            // Set a longer delay to allow for clicks on suggestions
            blurTimeout = setTimeout(() => {
                const suggestionsContainer = document.getElementById('searchSuggestions');
                if (suggestionsContainer) {
                    // Check if user is hovering over suggestions
                    const isHovering = suggestionsContainer.matches(':hover');
                    if (!isHovering) {
                        hideSearchSuggestions();
                    }
                }
            }, 300);
        });
        
        // Mouse enter on suggestions to prevent hiding
        searchInput.addEventListener('mouseenter', () => {
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
        });
    }

    // Keyboard navigation for suggestions
    if (searchInput) {
        searchInput.addEventListener('keydown', handleSuggestionKeyboard);
    }
    
    // Click outside to hide suggestions
    document.addEventListener('click', (e) => {
        const searchBar = document.querySelector('.search-bar');
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (suggestionsContainer && searchBar && !searchBar.contains(e.target)) {
            hideSearchSuggestions();
        }
    });

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
        const searchResultsContainer = document.getElementById('searchResultsContainer');
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none';
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuId = item.getAttribute('data-menu');
            showMenuDetails(menuId);
        });
    });

    if (backToMenu) {
    backToMenu.addEventListener('click', () => {
        menuDetails.style.display = 'none';
        mainContent.style.display = 'block';
    });
    }

    const initials = localStorage.getItem('initials');
    const accountName = localStorage.getItem('accountName');

    if (!initials || !accountName) {
        // Redirect to login page if not logged in
        window.location.href = '/docs/login.html';
    }

    // Existing code to display profile and bookings
    displayProfile();
    displayUpcomingBookings();
    displayCompletedBookings();
});
