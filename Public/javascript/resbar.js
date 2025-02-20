function displayProfile() {
  const initials = localStorage.getItem('initials');
  const accountName = localStorage.getItem('accountName');

  const userInitialsElements = document.querySelectorAll('#userInitials');
  const accountNameElement = document.getElementById('accountName');

  userInitialsElements.forEach((element) => {
      if (element && initials) {
          element.textContent = initials;
      }
  });

  if (accountNameElement && accountName) {
      accountNameElement.textContent = `Hi, ${accountName}`;
  }
}

function displayUpcomingBookings() {
  const accountName = localStorage.getItem('accountName');
  const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
  const bookingDetails = userBookingDetails[accountName];

  if (bookingDetails && !bookingDetails.completed) {
      const upcomingContent = document.getElementById('upcomingContent');
      upcomingContent.innerHTML = `
          <p><strong>Customer Name:</strong> ${bookingDetails.customerName}</p>
          <p><strong>Booking-ID:</strong> ${bookingDetails.bookingID}</p>
          <p><strong>Restaurant Name:</strong> ${bookingDetails.restaurantName}</p>
          <p><strong>Restaurant Location:</strong> ${bookingDetails.restaurantLocation}</p>
          <p><strong>Table Numbers:</strong> ${bookingDetails.selectedTables}</p>
          <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
          <p><strong>Booking Time:</strong> ${bookingDetails.bookingTime}</p>
          <p><strong>Time Remaining:</strong> <span id="timeRemaining"></span></p>
      `;

      // Start the countdown timer
      startCountdownTimer(bookingDetails.bookingDate, bookingDetails.bookingTime);
  }
}

function displayCompletedBookings() {
  const accountName = localStorage.getItem('accountName');
  const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
  const bookingDetails = userBookingDetails[accountName];

  if (bookingDetails && bookingDetails.completed) {
      const bookedContent = document.getElementById('bookedContent');
      bookedContent.innerHTML = `
          <p><strong>Customer Name:</strong> ${bookingDetails.customerName}</p>
          <p><strong>Booking-ID:</strong> ${bookingDetails.bookingID}</p>
          <p><strong>Restaurant Name:</strong> ${bookingDetails.restaurantName}</p>
          <p><strong>Restaurant Location:</strong> ${bookingDetails.restaurantLocation}</p>
          <p><strong>Table Numbers:</strong> ${bookingDetails.selectedTables}</p>
          <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
          <p><strong>Booking Time:</strong> ${bookingDetails.bookingTime}</p>
      `;
  }
}

function startCountdownTimer(bookingDate, bookingTime) {
  const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
  const timeRemainingElement = document.getElementById('timeRemaining');

  function updateTimer() {
      const now = new Date();
      const timeDifference = bookingDateTime - now;

      if (timeDifference <= 0) {
          timeRemainingElement.textContent = 'Booking time has arrived!';
          clearInterval(timerInterval);

          // Move booking to completed section
          const accountName = localStorage.getItem('accountName');
          const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
          const bookingDetails = userBookingDetails[accountName];
          bookingDetails.completed = true;
          userBookingDetails[accountName] = bookingDetails;
          localStorage.setItem('userBookingDetails', JSON.stringify(userBookingDetails));

          // Update the display
          displayUpcomingBookings();
          displayCompletedBookings();
          return;
      }

      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      timeRemainingElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function displayProfile() {
  const initials = localStorage.getItem('initials');
  const accountName = localStorage.getItem('accountName');

  const userInitialsElements = document.querySelectorAll('#userInitials');
  const accountNameElement = document.getElementById('accountName');

  userInitialsElements.forEach((element) => {
      if (element && initials) {
          element.textContent = initials;
      }
  });

  if (accountNameElement && accountName) {
      accountNameElement.textContent = `Hi, ${accountName}`;
  }
}

function displayUpcomingBookings() {
  const accountName = localStorage.getItem('accountName');
  const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
  const bookingDetails = userBookingDetails[accountName];

  if (bookingDetails && !bookingDetails.completed) {
      const upcomingContent = document.getElementById('upcomingContent');
      upcomingContent.innerHTML = `
          <p><strong>Customer Name:</strong> ${bookingDetails.customerName}</p>
          <p><strong>Booking-ID:</strong> ${bookingDetails.bookingID}</p>
          <p><strong>Restaurant Name:</strong> ${bookingDetails.restaurantName}</p>
          <p><strong>Restaurant Location:</strong> ${bookingDetails.restaurantLocation}</p>
          <p><strong>Table Numbers:</strong> ${bookingDetails.selectedTables}</p>
          <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
          <p><strong>Booking Time:</strong> ${bookingDetails.bookingTime}</p>
          <p><strong>Time Remaining:</strong> <span id="timeRemaining"></span></p>
      `;

      // Start the countdown timer
      startCountdownTimer(bookingDetails.bookingDate, bookingDetails.bookingTime);
  }
}

function displayCompletedBookings() {
  const accountName = localStorage.getItem('accountName');
  const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
  const bookingDetails = userBookingDetails[accountName];

  if (bookingDetails && bookingDetails.completed) {
      const bookedContent = document.getElementById('bookedContent');
      bookedContent.innerHTML = `
          <p><strong>Customer Name:</strong> ${bookingDetails.customerName}</p>
          <p><strong>Booking-ID:</strong> ${bookingDetails.bookingID}</p>
          <p><strong>Restaurant Name:</strong> ${bookingDetails.restaurantName}</p>
          <p><strong>Restaurant Location:</strong> ${bookingDetails.restaurantLocation}</p>
          <p><strong>Table Numbers:</strong> ${bookingDetails.selectedTables}</p>
          <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
          <p><strong>Booking Time:</strong> ${bookingDetails.bookingTime}</p>
      `;
  }
}

function startCountdownTimer(bookingDate, bookingTime) {
  const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
  const timeRemainingElement = document.getElementById('timeRemaining');

  function updateTimer() {
      const now = new Date();
      const timeDifference = bookingDateTime - now;

      if (timeDifference <= 0) {
          timeRemainingElement.textContent = 'Booking time has arrived!';
          clearInterval(timerInterval);

          // Move booking to completed section
          const accountName = localStorage.getItem('accountName');
          const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
          const bookingDetails = userBookingDetails[accountName];
          bookingDetails.completed = true;
          userBookingDetails[accountName] = bookingDetails;
          localStorage.setItem('userBookingDetails', JSON.stringify(userBookingDetails));

          // Update the display
          displayUpcomingBookings();
          displayCompletedBookings();
          return;
      }

      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      timeRemainingElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function logout() {
  localStorage.removeItem('initials');
  localStorage.removeItem('accountName');
  window.location.href = '/Public/login.html'; // Redirect to login page
}

document.addEventListener('DOMContentLoaded', () => {
  const bookedButton = document.getElementById('bookedButton');
  const upcomingButton = document.getElementById('upcomingButton');
  const logoutButton = document.getElementById('logoutButton');

  bookedButton.addEventListener('click', toggleDropdown);
  upcomingButton.addEventListener('click', toggleDropdown);
  logoutButton.addEventListener('click', logout);
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdownButtons = document.querySelectorAll('.dropdown-button');
  
  dropdownButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Toggle the content for the clicked button's dropdown
          const dropdownContent = this.nextElementSibling;

          // Close all dropdowns first
          document.querySelectorAll('.dropdown-content').forEach(content => {
              if (content !== dropdownContent) {
                  content.style.display = 'none';
              }
          });

          // Toggle the clicked dropdown
          dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      });
  });
});

displayProfile();
displayUpcomingBookings();
displayCompletedBookings();