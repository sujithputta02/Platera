const tables = document.querySelectorAll('.table');
const form = document.getElementById('bookingForm');
const selectedTablesTextArea = document.getElementById('selectedTables');
const familyBooked = document.getElementById('familyBooked');
const coupleBooked = document.getElementById('coupleBooked');
const slotsBooked = document.getElementById('slotsBooked');
const totalSlots = document.getElementById('totalSlots');

let selectedFamilyTables = []; // Changed to an array to allow multiple selections
let selectedCoupleTables = []; // Changed to an array to allow multiple selections
let familyBookings = 0;
let coupleBookings = 0;
let totalBookings = 0;

// Function to handle table selection
tables.forEach(table => {
    table.addEventListener('click', () => {
        const sector = table.dataset.sector;
        const tableNum = table.dataset.table;

        // Toggle the selected class for each table
        table.classList.toggle('selected');

        // Handle selection logic based on the sector
        if (sector === 'family') {
            if (selectedFamilyTables.includes(tableNum)) {
                selectedFamilyTables = selectedFamilyTables.filter(t => t !== tableNum); // Remove the table if already selected
            } else {
                selectedFamilyTables.push(tableNum); // Add the table if not selected
            }
        } else if (sector === 'couple') {
            if (selectedCoupleTables.includes(tableNum)) {
                selectedCoupleTables = selectedCoupleTables.filter(t => t !== tableNum); // Remove the table if already selected
            } else {
                selectedCoupleTables.push(tableNum); // Add the table if not selected
            }
        }

        // Update the text area with selected tables
        updateSelectedTablesTextArea();
    });
});

// Function to update the text area with selected tables
function updateSelectedTablesTextArea() {
    let selectionText = '';
    if (selectedFamilyTables.length > 0) {
        selectionText += `Family Tables: ${selectedFamilyTables.join(', ')}\n`;
    }
    if (selectedCoupleTables.length > 0) {
        selectionText += `Couple Tables: ${selectedCoupleTables.join(', ')}\n`;
    }
    selectedTablesTextArea.value = selectionText;
}

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Update booking counts based on the selected tables
    familyBookings += selectedFamilyTables.length;
    coupleBookings += selectedCoupleTables.length;
    familyBooked.textContent = familyBookings;
    coupleBooked.textContent = coupleBookings;

    totalBookings = familyBookings + coupleBookings;
    slotsBooked.textContent = totalBookings;

    // Generate a random booking ID
    const bookingID = Math.floor(Math.random() * 1000000);

    // Get customer name
    const customerName = document.getElementById('name').value;

    // Get restaurant name and location
    const restaurantName = document.querySelector('.cafe-name').textContent.trim();
    const restaurantLocation = document.querySelector('.location').textContent.trim();

    // Get date and time
    const bookingDate = document.getElementById('date').value;
    const bookingTime = document.getElementById('time').value;

    // Redirect to confirmation page with query parameters
    window.location.href = `confirmation.html?customerName=${encodeURIComponent(customerName)}&bookingID=${bookingID}&restaurantName=${encodeURIComponent(restaurantName)}&restaurantLocation=${encodeURIComponent(restaurantLocation)}&selectedTables=${encodeURIComponent(selectedTablesTextArea.value)}&bookingDate=${encodeURIComponent(bookingDate)}&bookingTime=${encodeURIComponent(bookingTime)}`;
});

document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    flatpickr("#time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });
});
// filepath: /Public/javascript/booking.js
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const booking = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        selectedTables: document.getElementById('selectedTables').value
    };

    fetch('/api/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally, redirect to a confirmation page
        window.location.href = '/confirmation.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Booking failed. Please try again.');
    });
});