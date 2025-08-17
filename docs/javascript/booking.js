const tables = document.querySelectorAll('.table');
const form = document.getElementById('bookingForm');
const selectedTablesTextArea = document.getElementById('selectedTables');
const familyBooked = document.getElementById('familyBooked');
const coupleBooked = document.getElementById('coupleBooked');
const slotsBooked = document.getElementById('slotsBooked');
const totalSlots = document.getElementById('totalSlots');

let selectedFamilyTables = []; 
let selectedCoupleTables = []; 
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
                selectedFamilyTables = selectedFamilyTables.filter(t => t !== tableNum);
            } else {
                selectedFamilyTables.push(tableNum);
            }
        } else if (sector === 'couple') {
            if (selectedCoupleTables.includes(tableNum)) {
                selectedCoupleTables = selectedCoupleTables.filter(t => t !== tableNum);
            } else {
                selectedCoupleTables.push(tableNum);
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

    // Validate form inputs
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const date = document.getElementById('date')?.value || new Date().toISOString().split('T')[0];
    const time = document.getElementById('time')?.value || new Date().toLocaleTimeString();

    // Validate selected tables
    if (selectedFamilyTables.length === 0 && selectedCoupleTables.length === 0) {
        alert('Please select at least one table.');
        return;
    }

    // Update booking counts based on the selected tables
    familyBookings += selectedFamilyTables.length;
    coupleBookings += selectedCoupleTables.length;
    familyBooked.textContent = familyBookings;
    coupleBooked.textContent = coupleBookings;

    totalBookings = familyBookings + coupleBookings;
    slotsBooked.textContent = totalBookings;

    // Generate a random booking ID
    const bookingID = Math.floor(Math.random() * 1000000);

    // Get restaurant name and location
    const restaurantName = document.querySelector('.cafe-name').textContent.trim();
    const restaurantLocation = document.querySelector('.location').textContent.trim();

    // Redirect to confirmation page with all details
    window.location.href = `confirmation.html?customerName=${encodeURIComponent(name)}&bookingID=${bookingID}&restaurantName=${encodeURIComponent(restaurantName)}&restaurantLocation=${encodeURIComponent(restaurantLocation)}&selectedTables=${encodeURIComponent(selectedTablesTextArea.value)}&bookingDate=${encodeURIComponent(date)}&bookingTime=${encodeURIComponent(time)}`;
});

// Optional: Date and Time picker initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add date picker if not already present
    if (document.getElementById('date')) {
        flatpickr("#date", {
            dateFormat: "Y-m-d",
            minDate: "today"
        });
    }

    // Add time picker if not already present
    if (document.getElementById('time')) {
        flatpickr("#time", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true
        });
    }
});
