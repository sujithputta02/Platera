// Get query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const customerName = urlParams.get('customerName');
const bookingID = urlParams.get('bookingID');
const restaurantName = urlParams.get('restaurantName');
const restaurantLocation = urlParams.get('restaurantLocation');
const selectedTables = urlParams.get('selectedTables');
const bookingDate = urlParams.get('bookingDate');
const bookingTime = urlParams.get('bookingTime');

document.getElementById('customerName').textContent = customerName;
document.getElementById('bookingID').textContent = bookingID;
document.getElementById('restaurantName').textContent = restaurantName;
document.getElementById('restaurantLocation').textContent = restaurantLocation;
document.getElementById('selectedTables').textContent = selectedTables;
document.getElementById('bookingDate').textContent = bookingDate;
document.getElementById('bookingTime').textContent = bookingTime;

// Generate QR code
const qrCodeData = `Customer Name: ${customerName}\nBooking ID: ${bookingID}\nRestaurant Name: ${restaurantName}\nRestaurant Location: ${restaurantLocation}\nTable Numbers: ${selectedTables}\nBooking Date: ${bookingDate}\nBooking Time: ${bookingTime}`;
const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: qrCodeData,
    width: 128,
    height: 128
});

// Handle navigation back to homepage
document.getElementById('goToHomepage').addEventListener('click', () => {
    // Store booking details in local storage per user account
    const accountName = localStorage.getItem('accountName');
    const userBookingDetails = JSON.parse(localStorage.getItem('userBookingDetails')) || {};
    userBookingDetails[accountName] = { customerName, bookingID, restaurantName, restaurantLocation, selectedTables, bookingDate, bookingTime };
    localStorage.setItem('userBookingDetails', JSON.stringify(userBookingDetails));
    window.location.href = '/Public/homepage.html';
});

document.getElementById('printInvoice').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').textContent;
    const bookingID = document.getElementById('bookingID').textContent;
    const restaurantName = document.getElementById('restaurantName').textContent;
    const restaurantLocation = document.getElementById('restaurantLocation').textContent;
    const selectedTables = document.getElementById('selectedTables').textContent;
    const bookingDate = document.getElementById('bookingDate').textContent;
    const bookingTime = document.getElementById('bookingTime').textContent;
    const qrCodeData = `Customer Name: ${customerName}\nBooking ID: ${bookingID}\nRestaurant Name: ${restaurantName}\nRestaurant Location: ${restaurantLocation}\nTable Numbers: ${selectedTables}\nBooking Date: ${bookingDate}\nBooking Time: ${bookingTime}`;
    const invoiceWindow = window.open('', 'Invoice', 'width=800,height=600');
    invoiceWindow.document.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .invoice-container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    background: linear-gradient(to right, #ffa500, #ff6347);
                    border-radius: 8px 8px 0 0;
                    color: white;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .header .brand {
                    font-weight: bold;
                    font-size: 20px;
                }
                .section {
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                }
                .section:last-of-type {
                    border-bottom: none;
                }
                .section h3 {
                    margin: 0 0 10px;
                    font-size: 16px;
                    color: #333;
                }
                .section p {
                    margin: 0;
                    font-size: 14px;
                    color: #555;
                }
                .totals {
                    text-align: right;
                    font-size: 16px;
                    margin: 20px 0 10px;
                }
                .totals span {
                    display: block;
                }
                .payment-info {
                    background: linear-gradient(to right, #ffa500, #ff6347);
                    color: white;
                    padding: 10px;
                    border-radius: 0 0 8px 8px;
                    font-size: 14px;
                }
                .qr {
                    text-align: center;
                    margin-top: 20px;
                }
                .qr img {
                    width: 128px;
                    height: 128px;
                }
                .totals span:first-child {
                    font-weight: bold;
                }
                button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #6d5b80;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease-in-out;
                }
                button:hover {
                    background-color: #5b4669;
                }
                /* Print-specific styles */
                @media print {
                    body {
                        font-size: 12px;
                    }
                    .invoice-container {
                        width: 100%;
                        padding: 10px;
                        box-shadow: none;
                        border-radius: 0;
                    }
                    .header, .payment-info {
                        background: transparent;
                        color: black;
                    }
                    .button-container {
                        display: none;
                    }
                    button {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <span class="brand">PlAterA.</span>
                    <h1><center>Invoice</center></h1>
                    <p>Booking ID: ${bookingID}</p>
                </div>
                <div class="section">
                    <h3>BILL TO:</h3>
                    <strong>Customer Name:</strong> ${customerName}
                </div>
                <div class="section">
                    <strong>Restaurant Name:</strong> ${restaurantName}
                    <strong>Restaurant Location:</strong> ${restaurantLocation}
                    <strong>Table Numbers:</strong> ${selectedTables}
                    <strong>Booking Date:</strong> ${bookingDate}
                    <strong>Booking Time:</strong> ${bookingTime}
                    <h3>PRICE (TAX 20%):</h3>
                    <p></p>
                    <h3>MODE OF PAYMENT:</h3>
                    <p>Cash</p>
                </div>
                <div class="totals">
                    <span>$2800.00</span>
                    <span>+ $560.00</span>
                    <span>Total: $3360.00</span>
                </div>
                 <center><div class="qr" id="invoiceQRCode"></div></center>
                 <br>
                 <br>
                <div class="payment-info">
                    <p>Studio Shodow<br>Bank: Really Great Bank<br>Account No: 0123 4567 8901</p>
                </div>
               
                <footer class="footer">
                    <h6>&copy; PlAterA 2025. All Rights Reserved.</h6>
                </footer>
            </div>
            <div class="button-container">
                <button onclick="window.print()">Print Invoice</button>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script>
                const qrCodeData = \`${qrCodeData}\`;
                new QRCode(document.getElementById("invoiceQRCode"), {
                    text: qrCodeData,
                    width: 128,
                    height: 128
                });
            </script>
        </body>
        </html>
    `);
    invoiceWindow.document.close();
});