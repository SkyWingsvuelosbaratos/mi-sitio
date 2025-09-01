// Passenger Information Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load flight data and initialize page
    loadFlightData();
    
    // Form submission
    document.getElementById('passengerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePassengerForm()) {
            savePassengerData();
            window.location.href = 'payment.html';
        }
    });
});

// Load flight data from localStorage
function loadFlightData() {
    const flightData = localStorage.getItem('selectedFlight');
    
    if (flightData) {
        try {
            const data = JSON.parse(flightData);
            updateFlightSummary(data);
        } catch (e) {
            console.error('Error parsing flight data:', e);
            useDefaultFlightData();
        }
    } else {
        useDefaultFlightData();
    }
}

// Update flight summary with real data
function updateFlightSummary(flightData) {
    document.getElementById('originCity').textContent = flightData.origen || 'Bogotá';
    document.getElementById('destinationCity').textContent = flightData.destino || 'Miami';
    document.getElementById('originCode').textContent = getAirportCode(flightData.origen);
    document.getElementById('destinationCode').textContent = getAirportCode(flightData.destino);
    
    const departDate = flightData.fecha || flightData.departDate || new Date().toLocaleDateString('es-CO');
    document.getElementById('departDate').textContent = formatDate(departDate);
    document.getElementById('arrivalDate').textContent = formatDate(departDate);
    
    document.getElementById('airlineName').textContent = flightData.aerolinea || 'Avianca';
    document.getElementById('flightNumber').textContent = generateFlightNumber(flightData.aerolinea);
    document.getElementById('flightClass').textContent = getClassDisplayName(flightData.clase);
    document.getElementById('passengersCount').textContent = `${flightData.pasajeros || '2'} Adultos`;
    document.getElementById('flightDuration').textContent = flightData.duracion || '3h 45m';
    
    updatePrices(flightData);
    
    // Generate passenger forms after loading flight data
    generatePassengerForms();
    initializeSeatSelection();
}

// Use default flight data
function useDefaultFlightData() {
    const defaultData = {
        origen: 'Bogotá',
        destino: 'Miami',
        aerolinea: 'Avianca',
        fecha: new Date().toLocaleDateString('es-CO'),
        pasajeros: '2',
        clase: 'economy',
        precio: 850000,
        duracion: '3h 45m'
    };
    updateFlightSummary(defaultData);
}

// Update prices based on flight data
function updatePrices(flightData) {
    const basePrice = flightData.precio || 850000;
    const passengers = parseInt(flightData.pasajeros) || 2;
    const discount = Math.round(basePrice * 0.3);
    const discountedPrice = basePrice - discount;
    const taxes = Math.round(discountedPrice * 0.1);
    const insurance = 50000;
    const totalPrice = discountedPrice + taxes + insurance;

    document.getElementById('originalPrice').textContent = `$${basePrice.toLocaleString()}`;
    document.getElementById('discountAmount').textContent = `-$${discount.toLocaleString()}`;
    document.getElementById('passengersCountPrice').textContent = passengers;
    document.getElementById('basePrice').textContent = `$${discountedPrice.toLocaleString()}`;
    document.getElementById('taxes').textContent = `$${taxes.toLocaleString()}`;
    document.getElementById('insurance').textContent = `$${insurance.toLocaleString()}`;
    document.getElementById('totalPrice').textContent = `$${totalPrice.toLocaleString()}`;
}

// Generate passenger forms based on number of passengers
function generatePassengerForms() {
    const flightData = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
    const passengers = parseInt(flightData.pasajeros) || 2;
    const container = document.getElementById('passengersContainer');
    
    container.innerHTML = '';
    
    for (let i = 1; i <= passengers; i++) {
        const passengerForm = document.createElement('div');
        passengerForm.className = 'passenger-form-section';
        passengerForm.innerHTML = `
            <h3><i class="fas fa-user"></i> Pasajero ${i}</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName${i}">Nombres</label>
                    <input type="text" id="firstName${i}" placeholder="Nombres completos" required>
                </div>
                <div class="form-group">
                    <label for="lastName${i}">Apellidos</label>
                    <input type="text" id="lastName${i}" placeholder="Apellidos completos" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="documentType${i}">Tipo de Documento</label>
                    <select id="documentType${i}" required>
                        <option value="">Seleccionar</option>
                        <option value="cc">Cédula de Ciudadanía</option>
                        <option value="ce">Cédula de Extranjería</option>
                        <option value="passport">Pasaporte</option>
                        <option value="ti">Tarjeta de Identidad</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="documentNumber${i}">Número de Documento</label>
                    <input type="text" id="documentNumber${i}" placeholder="Número de documento" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="birthDate${i}">Fecha de Nacimiento</label>
                    <input type="date" id="birthDate${i}" required>
                </div>
                <div class="form-group">
                    <label for="gender${i}">Género</label>
                    <select id="gender${i}" required>
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="email${i}">Email</label>
                    <input type="email" id="email${i}" placeholder="email@ejemplo.com" required>
                </div>
                <div class="form-group">
                    <label for="phone${i}">Teléfono</label>
                    <input type="tel" id="phone${i}" placeholder="+57 300 123 4567" required>
                </div>
            </div>
            <div class="form-group">
                <label for="seat${i}">Asiento Asignado</label>
                <input type="text" id="seat${i}" placeholder="Seleccione un asiento" readonly>
            </div>
        `;
        
        container.appendChild(passengerForm);
    }
}

// Initialize seat selection
function initializeSeatSelection() {
    const seats = document.querySelectorAll('.seat.available');
    const selectedSeats = [];
    
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            if (this.classList.contains('available')) {
                // Check if we can select more seats
                const flightData = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
                const maxPassengers = parseInt(flightData.pasajeros) || 2;
                
                if (selectedSeats.length < maxPassengers) {
                    this.classList.remove('available');
                    this.classList.add('selected');
                    selectedSeats.push({
                        seat: this.dataset.seat,
                        price: parseInt(this.dataset.price) || 0
                    });
                    
                    // Assign seat to passenger
                    assignSeatToPassenger(selectedSeats.length - 1, this.dataset.seat);
                    updateSelectedSeats();
                } else {
                    showNotification('Ya ha seleccionado el número máximo de asientos', 'warning');
                }
            } else if (this.classList.contains('selected')) {
                // Deselect seat
                this.classList.remove('selected');
                this.classList.add('available');
                
                const seatIndex = selectedSeats.findIndex(s => s.seat === this.dataset.seat);
                if (seatIndex !== -1) {
                    selectedSeats.splice(seatIndex, 1);
                    clearSeatFromPassenger(seatIndex);
                    updateSelectedSeats();
                }
            }
        });
    });
}

// Assign seat to passenger
function assignSeatToPassenger(passengerIndex, seatNumber) {
    const seatInput = document.getElementById(`seat${passengerIndex + 1}`);
    if (seatInput) {
        seatInput.value = seatNumber;
    }
}

// Clear seat from passenger
function clearSeatFromPassenger(passengerIndex) {
    const seatInput = document.getElementById(`seat${passengerIndex + 1}`);
    if (seatInput) {
        seatInput.value = '';
    }
}

// Update selected seats display
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const list = document.getElementById('selectedSeatsList');
    const total = document.getElementById('seatTotal');
    
    let totalCost = 0;
    let seatsList = '';
    
    selectedSeats.forEach(seat => {
        const seatNumber = seat.dataset.seat;
        const price = parseInt(seat.dataset.price) || 0;
        totalCost += price;
        seatsList += `<span class="seat-badge">${seatNumber} (+$${price.toLocaleString()})</span>`;
    });
    
    list.innerHTML = seatsList || '<span class="no-seats">Ningún asiento seleccionado</span>';
    total.textContent = totalCost.toLocaleString();
}

// Validate passenger form
function validatePassengerForm() {
    const flightData = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
    const passengers = parseInt(flightData.pasajeros) || 2;
    let isValid = true;
    
    // Validate each passenger
    for (let i = 1; i <= passengers; i++) {
        const firstName = document.getElementById(`firstName${i}`).value.trim();
        const lastName = document.getElementById(`lastName${i}`).value.trim();
        const documentType = document.getElementById(`documentType${i}`).value;
        const documentNumber = document.getElementById(`documentNumber${i}`).value.trim();
        const birthDate = document.getElementById(`birthDate${i}`).value;
        const gender = document.getElementById(`gender${i}`).value;
        const email = document.getElementById(`email${i}`).value.trim();
        const phone = document.getElementById(`phone${i}`).value.trim();
        const seat = document.getElementById(`seat${i}`).value.trim();
        
        if (!firstName || !lastName || !documentType || !documentNumber || !birthDate || !gender || !email || !phone || !seat) {
            showNotification(`Por favor complete toda la información del Pasajero ${i}`, 'error');
            isValid = false;
            break;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showNotification(`Email inválido para el Pasajero ${i}`, 'error');
            isValid = false;
            break;
        }
        
        // Validate document number
        if (documentNumber.length < 5) {
            showNotification(`Número de documento inválido para el Pasajero ${i}`, 'error');
            isValid = false;
            break;
        }
    }
    
    // Validate contact information
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();
    
    if (!contactEmail || !contactPhone) {
        showNotification('Por favor complete la información de contacto', 'error');
        isValid = false;
    } else if (!isValidEmail(contactEmail)) {
        showNotification('Email de contacto inválido', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Save passenger data
function savePassengerData() {
    const flightData = JSON.parse(localStorage.getItem('selectedFlight') || '{}');
    const passengers = parseInt(flightData.pasajeros) || 2;
    const passengerData = [];
    
    // Collect passenger information
    for (let i = 1; i <= passengers; i++) {
        const passenger = {
            firstName: document.getElementById(`firstName${i}`).value.trim(),
            lastName: document.getElementById(`lastName${i}`).value.trim(),
            documentType: document.getElementById(`documentType${i}`).value,
            documentNumber: document.getElementById(`documentNumber${i}`).value.trim(),
            birthDate: document.getElementById(`birthDate${i}`).value,
            gender: document.getElementById(`gender${i}`).value,
            email: document.getElementById(`email${i}`).value.trim(),
            phone: document.getElementById(`phone${i}`).value.trim(),
            seat: document.getElementById(`seat${i}`).value.trim()
        };
        passengerData.push(passenger);
    }
    
    // Collect contact information
    const contactInfo = {
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim()
    };
    
    // Calculate seat costs
    const selectedSeats = document.querySelectorAll('.seat.selected');
    let seatCost = 0;
    selectedSeats.forEach(seat => {
        seatCost += parseInt(seat.dataset.price) || 0;
    });
    
    // Save all data
    const bookingData = {
        flight: flightData,
        passengers: passengerData,
        contact: contactInfo,
        seatCost: seatCost,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    showNotification('Información de pasajeros guardada exitosamente', 'success');
}

// Helper functions
function getAirportCode(city) {
    const codes = {
        'Bogotá': 'BOG',
        'Medellín': 'MDE',
        'Cartagena': 'CTG',
        'Cali': 'CLO',
        'Barranquilla': 'BAQ',
        'Miami': 'MIA',
        'Madrid': 'MAD',
        'México': 'MEX',
        'New York': 'JFK',
        'Londres': 'LHR',
        'París': 'CDG',
        'Toronto': 'YYZ',
        'Buenos Aires': 'EZE',
        'Santiago': 'SCL',
        'Lima': 'LIM',
        'Panamá': 'PTY',
        'Quito': 'UIO'
    };
    return codes[city] || 'XXX';
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    } catch (e) {
        return dateString;
    }
}

function generateFlightNumber(airline) {
    const airlineCodes = {
        'Avianca': 'AV',
        'LATAM': 'LA',
        'American Airlines': 'AA',
        'Delta Airlines': 'DL',
        'United Airlines': 'UA',
        'Iberia': 'IB',
        'Air France': 'AF',
        'British Airways': 'BA',
        'Lufthansa': 'LH',
        'KLM': 'KL'
    };
    const code = airlineCodes[airline] || 'XX';
    const number = Math.floor(Math.random() * 900) + 100;
    return `${code} ${number}`;
}

function getClassDisplayName(classCode) {
    const classes = {
        'economy': 'Económica',
        'premium': 'Premium Economy',
        'business': 'Business',
        'first': 'Primera Clase'
    };
    return classes[classCode] || 'Económica';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
