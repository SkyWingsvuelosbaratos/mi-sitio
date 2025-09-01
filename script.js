// Función para calcular precios dinámicos con descuento del 30%
function calculateDynamicPrice(basePrice, departDate) {
    const today = new Date();
    const flightDate = new Date(departDate);
    const daysUntilFlight = Math.ceil((flightDate - today) / (1000 * 60 * 60 * 24));
    
    // Factores de ajuste según días hasta el vuelo
    let priceMultiplier = 1;
    
    if (daysUntilFlight <= 7) {
        // Última semana: precio más alto
        priceMultiplier = 1.8;
    } else if (daysUntilFlight <= 14) {
        // Últimas 2 semanas: precio alto
        priceMultiplier = 1.5;
    } else if (daysUntilFlight <= 30) {
        // Último mes: precio medio-alto
        priceMultiplier = 1.3;
    } else if (daysUntilFlight <= 60) {
        // Últimos 2 meses: precio medio
        priceMultiplier = 1.1;
    } else {
        // Más de 2 meses: precio base
        priceMultiplier = 1.0;
    }
    
    // Aplicar descuento del 30%
    const discountedPrice = basePrice * priceMultiplier * 0.7;
    
    return Math.round(discountedPrice);
}

// Datos simulados de vuelos con precios base reales
const flightData = {
    nacionales: [
        {
            id: 1,
            origen: "Bogotá",
            destino: "Medellín",
            aerolinea: "Avianca",
            precio: 185000,
            duracion: "1h 15m",
            salida: "08:00",
            llegada: "09:15",
            clase: "Económica"
        },
        {
            id: 2,
            origen: "Bogotá",
            destino: "Cartagena",
            aerolinea: "LATAM",
            precio: 220000,
            duracion: "1h 30m",
            salida: "10:30",
            llegada: "12:00",
            clase: "Económica"
        },
        {
            id: 3,
            origen: "Medellín",
            destino: "Bogotá",
            aerolinea: "Avianca",
            precio: 175000,
            duracion: "1h 15m",
            salida: "14:00",
            llegada: "15:15",
            clase: "Económica"
        },
        {
            id: 4,
            origen: "Bogotá",
            destino: "Cali",
            aerolinea: "LATAM",
            precio: 195000,
            duracion: "1h 20m",
            salida: "11:15",
            llegada: "12:35",
            clase: "Económica"
        },
        {
            id: 5,
            origen: "Bogotá",
            destino: "Barranquilla",
            aerolinea: "Avianca",
            precio: 210000,
            duracion: "1h 25m",
            salida: "09:45",
            llegada: "11:10",
            clase: "Económica"
        },
        {
            id: 6,
            origen: "Medellín",
            destino: "Cartagena",
            aerolinea: "LATAM",
            precio: 165000,
            duracion: "1h 10m",
            salida: "13:30",
            llegada: "14:40",
            clase: "Económica"
        },
        {
            id: 7,
            origen: "Cali",
            destino: "Bogotá",
            aerolinea: "Avianca",
            precio: 185000,
            duracion: "1h 20m",
            salida: "16:00",
            llegada: "17:20",
            clase: "Económica"
        },
        {
            id: 8,
            origen: "Bogotá",
            destino: "Bucaramanga",
            aerolinea: "LATAM",
            precio: 155000,
            duracion: "1h 05m",
            salida: "07:30",
            llegada: "08:35",
            clase: "Económica"
        }
    ],
    internacionales: [
        {
            id: 9,
            origen: "Bogotá",
            destino: "Miami",
            aerolinea: "American Airlines",
            precio: 850000,
            duracion: "3h 45m",
            salida: "07:00",
            llegada: "10:45",
            clase: "Económica"
        },
        {
            id: 10,
            origen: "Bogotá",
            destino: "Madrid",
            aerolinea: "Iberia",
            precio: 1850000,
            duracion: "9h 30m",
            salida: "22:00",
            llegada: "15:30",
            clase: "Económica"
        },
        {
            id: 11,
            origen: "Bogotá",
            destino: "México",
            aerolinea: "Aeroméxico",
            precio: 720000,
            duracion: "4h 15m",
            salida: "12:30",
            llegada: "16:45",
            clase: "Económica"
        },
        {
            id: 12,
            origen: "Bogotá",
            destino: "New York",
            aerolinea: "Delta Airlines",
            precio: 1200000,
            duracion: "6h 20m",
            salida: "23:15",
            llegada: "06:35",
            clase: "Económica"
        },
        {
            id: 13,
            origen: "Bogotá",
            destino: "Londres",
            aerolinea: "British Airways",
            precio: 2100000,
            duracion: "10h 15m",
            salida: "21:30",
            llegada: "14:45",
            clase: "Económica"
        },
        {
            id: 14,
            origen: "Bogotá",
            destino: "París",
            aerolinea: "Air France",
            precio: 1950000,
            duracion: "10h 45m",
            salida: "20:45",
            llegada: "14:30",
            clase: "Económica"
        },
        {
            id: 15,
            origen: "Bogotá",
            destino: "Toronto",
            aerolinea: "Air Canada",
            precio: 1350000,
            duracion: "7h 30m",
            salida: "01:15",
            llegada: "07:45",
            clase: "Económica"
        },
        {
            id: 16,
            origen: "Bogotá",
            destino: "Buenos Aires",
            aerolinea: "LATAM",
            precio: 980000,
            duracion: "6h 45m",
            salida: "14:20",
            llegada: "21:05",
            clase: "Económica"
        },
        {
            id: 17,
            origen: "Bogotá",
            destino: "Santiago",
            aerolinea: "Avianca",
            precio: 920000,
            duracion: "5h 55m",
            salida: "15:30",
            llegada: "21:25",
            clase: "Económica"
        },
        {
            id: 18,
            origen: "Bogotá",
            destino: "Lima",
            aerolinea: "LATAM",
            precio: 680000,
            duracion: "3h 20m",
            salida: "10:45",
            llegada: "14:05",
            clase: "Económica"
        },
        {
            id: 19,
            origen: "Bogotá",
            destino: "Panamá",
            aerolinea: "Copa Airlines",
            precio: 420000,
            duracion: "1h 45m",
            salida: "08:30",
            llegada: "10:15",
            clase: "Económica"
        },
        {
            id: 20,
            origen: "Bogotá",
            destino: "Quito",
            aerolinea: "Avianca",
            precio: 380000,
            duracion: "1h 30m",
            salida: "12:00",
            llegada: "13:30",
            clase: "Económica"
        }
    ]
};

// Elementos del DOM
const flightSearchForm = document.getElementById('flightSearchForm');
const tripTypeSelect = document.getElementById('tripType');
const returnDateGroup = document.getElementById('returnDateGroup');
const returnDateInput = document.getElementById('returnDate');
const modal = document.getElementById('flightModal');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelectorAll('.close');
const flightResults = document.getElementById('flightResults');
const loadingSpinner = document.getElementById('loadingSpinner');
const mobileMenu = document.getElementById('mobileMenu');
const backToTopBtn = document.getElementById('backToTop');

// Configurar fecha mínima para inputs de fecha
const today = new Date().toISOString().split('T')[0];
document.getElementById('departDate').min = today;
document.getElementById('returnDate').min = today;

// Loading Spinner with enhanced animation
window.addEventListener('load', function() {
    // Add fade out effect with stagger
    setTimeout(() => {
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.transform = 'scale(0.8)';
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            // Trigger entrance animations
            document.body.classList.add('loaded');
        }, 500);
    }, 1200);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Back to Top Button & Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
        backToTopBtn.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Statistics Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.getAttribute('data-target') === '98') {
                stat.textContent = Math.floor(current) + '%';
            } else if (stat.getAttribute('data-target') === '1000000') {
                stat.textContent = Math.floor(current).toLocaleString();
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statisticsSection = document.querySelector('.statistics');
if (statisticsSection) {
    statsObserver.observe(statisticsSection);
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = element.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(question => {
        question.classList.remove('active');
        question.nextElementSibling.classList.remove('active');
    });
    
    // Toggle current FAQ item
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.', 'success');
        this.reset();
    }
});

// Login Modal Functions
function openLoginModal() {
    loginModal.style.display = 'block';
}

function showRegisterForm() {
    // This would typically switch to a registration form
    showNotification('Funcionalidad de registro próximamente disponible', 'info');
}

// Close modals
closeBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        modal.style.display = 'none';
        loginModal.style.display = 'none';
    });
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login Form Handler
document.querySelector('.login-form').addEventListener('submit', async function(e) {
	e.preventDefault();
	const email = this.querySelector('#email').value.trim().toLowerCase();
	const password = this.querySelector('#password').value;

	if (!email || !password) {
		showNotification('Por favor ingresa email y contraseña', 'error');
		return;
	}

	// Intentar login; si no existe el usuario, registrarlo
	const users = loadUsers();
	const existing = users.find(u => u.email === email);
	if (!existing) {
		// Registro
		const registered = await registerUser(email, password);
		if (!registered) {
			showNotification('No se pudo registrar el usuario', 'error');
			return;
		}
		saveSession({ email });
		addAuthLog({ type: 'register', email });
		showNotification('Cuenta creada y sesión iniciada', 'success');
		loginModal.style.display = 'none';
		this.reset();
		return;
	}

	// Login
	const ok = await validateCredentials(email, password, existing.passwordHash);
	if (ok) {
		saveSession({ email });
		addAuthLog({ type: 'login', email });
		showNotification('Inicio de sesión exitoso', 'success');
		loginModal.style.display = 'none';
		this.reset();
	} else {
		addAuthLog({ type: 'login_failed', email });
		showNotification('Credenciales inválidas', 'error');
	}
});

// ======= Gestión de usuarios y sesiones (localStorage) =======
const STORAGE_KEYS = {
	USERS: 'sw_users',
	SESSION: 'sw_session',
	AUTH_LOGS: 'sw_auth_logs'
};

function loadUsers() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
	} catch {
		return [];
	}
}

function saveUsers(users) {
	localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function addAuthLog(entry) {
	try {
		const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH_LOGS)) || [];
		logs.push({ ...entry, at: new Date().toISOString(), ua: navigator.userAgent });
		localStorage.setItem(STORAGE_KEYS.AUTH_LOGS, JSON.stringify(logs));
	} catch {}
}

function saveSession(session) {
	localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ ...session, startedAt: new Date().toISOString() }));
}

function getSession() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION));
	} catch {
		return null;
	}
}

async function registerUser(email, password) {
	const users = loadUsers();
	if (users.some(u => u.email === email)) return false;
	const passwordHash = await hashPassword(password);
	users.push({ email, passwordHash, createdAt: new Date().toISOString() });
	saveUsers(users);
	return true;
}

async function validateCredentials(email, password, storedHash) {
	const hash = await hashPassword(password);
	return hash === storedHash;
}

async function hashPassword(password) {
	try {
		const enc = new TextEncoder().encode(password);
		const buf = await crypto.subtle.digest('SHA-256', enc);
		return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
	} catch {
		// Fallback (menos seguro):
		return btoa(unescape(encodeURIComponent(password)));
	}
}

// Manejar cambio de tipo de viaje
tripTypeSelect.addEventListener('change', function() {
    if (this.value === 'oneway') {
        returnDateGroup.style.display = 'none';
        returnDateInput.required = false;
    } else {
        returnDateGroup.style.display = 'block';
        returnDateInput.required = true;
    }
});

// Manejar búsqueda de vuelos
flightSearchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const searchData = {
        tripType: document.getElementById('tripType').value,
        passengers: document.getElementById('passengers').value,
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        departDate: document.getElementById('departDate').value,
        returnDate: document.getElementById('returnDate').value,
        class: document.getElementById('class').value
    };
    
    // Simular búsqueda de vuelos
    const results = searchFlights(searchData);
    displayFlightResults(results, searchData);
    modal.style.display = 'block';
});

// Función para buscar vuelos
function searchFlights(searchData) {
    let results = [];
    
    // Combinar vuelos nacionales e internacionales
    const allFlights = [...flightData.nacionales, ...flightData.internacionales];
    
    // Filtrar por origen y destino (simulación simple)
    results = allFlights.filter(flight => {
        const fromMatch = flight.origen.toLowerCase().includes(searchData.from.toLowerCase()) ||
                         searchData.from.toLowerCase().includes(flight.origen.toLowerCase());
        const toMatch = flight.destino.toLowerCase().includes(searchData.to.toLowerCase()) ||
                       searchData.to.toLowerCase().includes(flight.destino.toLowerCase());

        // Filtro opcional por aerolínea usando dataset base
        const airlineCode = document.getElementById('airline')?.value || '';
        const airlineMatch = !airlineCode ||
            (window.AIRLINES_CO || []).some(a => a.code === airlineCode &&
                a.name.toLowerCase().includes((flight.aerolinea || '').toLowerCase()));

        return fromMatch && toMatch && airlineMatch;
    });
    
    // Si no hay resultados exactos, mostrar algunos vuelos de ejemplo
    if (results.length === 0) {
        results = allFlights.slice(0, 3);
    }
    
    // Aplicar filtros adicionales
    results = results.map(flight => {
        // Calcular precio dinámico con descuento del 30%
        let dynamicPrice = calculateDynamicPrice(flight.precio, searchData.departDate);
        
        // Ajustar precio según clase
        switch(searchData.class) {
            case 'premium':
                dynamicPrice *= 1.5;
                break;
            case 'business':
                dynamicPrice *= 2.5;
                break;
            case 'first':
                dynamicPrice *= 4;
                break;
        }
        
        // Ajustar precio según número de pasajeros
        const totalPrice = dynamicPrice * parseInt(searchData.passengers);
        
        return {
            ...flight,
            precio: Math.round(totalPrice),
            precioPorPersona: Math.round(dynamicPrice),
            precioOriginal: flight.precio,
            descuento: Math.round(flight.precio * 0.3)
        };
    });
    
    return results;
}

// Función para mostrar resultados
function displayFlightResults(results, searchData) {
    flightResults.innerHTML = '';
    
    if (results.length === 0) {
        flightResults.innerHTML = '<p>No se encontraron vuelos para tu búsqueda.</p>';
        return;
    }
    
    results.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-result';
        
        flightCard.innerHTML = `
            <h3>${flight.aerolinea} - ${flight.origen} → ${flight.destino}</h3>
            <div class="flight-info">
                <div>
                    <strong>Salida:</strong> ${flight.salida}<br>
                    <strong>Llegada:</strong> ${flight.llegada}<br>
                    <strong>Duración:</strong> ${flight.duracion}
                </div>
                <div>
                    <strong>Clase:</strong> ${searchData.class}<br>
                    <strong>Pasajeros:</strong> ${searchData.passengers}<br>
                    <strong>Fecha:</strong> ${searchData.departDate}
                </div>
                <div class="flight-price">
                    <div class="price-breakdown">
                        <div class="original-price">Precio original: $${flight.precioOriginal.toLocaleString()}</div>
                        <div class="discount">Descuento 30%: -$${flight.descuento.toLocaleString()}</div>
                        <div class="final-price">$${flight.precioPorPersona.toLocaleString()} por persona</div>
                        <div class="total-price"><strong>Total: $${flight.precio.toLocaleString()}</strong></div>
                    </div>
                </div>
            </div>
            <button class="book-btn" onclick="bookFlight(${flight.id})">Reservar Ahora</button>
        `;
        
        flightResults.appendChild(flightCard);
    });
}

// Función para reservar vuelo
function bookFlight(flightId) {
    // Get the flight data from the search results
    const flightCard = document.querySelector(`[onclick="bookFlight(${flightId})"]`).closest('.flight-result');
    if (flightCard) {
        const flightData = extractFlightDataFromCard(flightCard);
        localStorage.setItem('selectedFlight', JSON.stringify(flightData));
    }
    
    showNotification('¡Redirigiendo al pago!', 'success');
    modal.style.display = 'none';
    
    // Redirect to passenger information page
    setTimeout(() => {
        window.location.href = 'passenger-info.html';
    }, 1000);
}

// Extract flight data from the flight card
function extractFlightDataFromCard(flightCard) {
    const title = flightCard.querySelector('h3').textContent;
    const airlineMatch = title.match(/^(.+?) - (.+?) → (.+)$/);
    
    if (airlineMatch) {
        const airline = airlineMatch[1];
        const origin = airlineMatch[2];
        const destination = airlineMatch[3];
        
        const flightInfo = flightCard.querySelector('.flight-info');
        const classInfo = flightInfo.querySelector('strong:contains("Clase")')?.nextSibling?.textContent?.trim() || 'Económica';
        const passengersInfo = flightInfo.querySelector('strong:contains("Pasajeros")')?.nextSibling?.textContent?.trim() || '2';
        const dateInfo = flightInfo.querySelector('strong:contains("Fecha")')?.nextSibling?.textContent?.trim() || new Date().toISOString().split('T')[0];
        
        const priceInfo = flightCard.querySelector('.flight-price');
        const totalPrice = priceInfo.querySelector('strong')?.textContent?.match(/\$([\d,]+)/)?.[1]?.replace(/,/g, '') || '850000';
        
        return {
            origen: origin,
            destino: destination,
            aerolinea: airline,
            fecha: dateInfo,
            pasajeros: passengersInfo.split(' ')[0] || '2',
            clase: classInfo.toLowerCase().replace(' ', ''),
            precio: parseInt(totalPrice),
            duracion: '3h 45m' // Default duration
        };
    }
    
    // Fallback data
    return {
        origen: 'Bogotá',
        destino: 'Miami',
        aerolinea: 'Avianca',
        fecha: new Date().toISOString().split('T')[0],
        pasajeros: '2',
        clase: 'economy',
        precio: 850000,
        duracion: '3h 45m'
    };
}

// Funcionalidad para botones de reserva en destinos populares
document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const destinationCard = this.closest('.destination-card');
        if (destinationCard) {
            const destination = destinationCard.querySelector('h3').textContent;
            showNotification(`Redirigiendo a reserva para ${destination}...`, 'info');
        }
    });
});

// Funcionalidad para botones de ofertas
document.querySelectorAll('.offer-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const offerCard = this.closest('.offer-card');
        if (offerCard) {
            const offerTitle = offerCard.querySelector('h3').textContent;
            showNotification(`¡Aplicando oferta de ${offerTitle}! Redirigiendo a la búsqueda...`, 'success');
        }
    });
});

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.destination-card, .offer-card, .feature-card, .testimonial-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Validación de fechas
document.getElementById('departDate').addEventListener('change', function() {
    const departDate = new Date(this.value);
    const returnDateInput = document.getElementById('returnDate');
    
    // Establecer fecha mínima para regreso
    const minReturnDate = new Date(departDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);
    returnDateInput.min = minReturnDate.toISOString().split('T')[0];
    
    // Si la fecha de regreso es anterior a la de salida, limpiarla
    if (returnDateInput.value && new Date(returnDateInput.value) <= departDate) {
        returnDateInput.value = '';
    }
});

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Agregar funcionalidad de autocompletado para ciudades
const cities = [
    // Ciudades Nacionales
    'Bogotá', 'Medellín', 'Cartagena', 'Cali', 'Barranquilla', 'Bucaramanga',
    'Pereira', 'Manizales', 'Ibagué', 'Villavicencio', 'Pasto', 'Montería',
    'Valledupar', 'Popayán', 'Tunja', 'Florencia', 'Neiva', 'Armenia',
    
    // Ciudades Internacionales - América
    'Miami', 'New York', 'Los Angeles', 'Orlando', 'Boston', 'Chicago',
    'México', 'Cancún', 'Guadalajara', 'Monterrey', 'Toronto', 'Montreal',
    'Vancouver', 'Buenos Aires', 'Santiago', 'Lima', 'Quito', 'Panamá',
    'San José', 'Caracas', 'Lima', 'Brasilia', 'São Paulo', 'Río de Janeiro',
    
    // Ciudades Internacionales - Europa
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Londres', 'París',
    'Roma', 'Milán', 'Venecia', 'Florencia', 'Amsterdam', 'Berlín',
    'Múnich', 'Frankfurt', 'Viena', 'Praga', 'Budapest', 'Varsovia',
    'Estocolmo', 'Copenhague', 'Oslo', 'Helsinki', 'Dublín', 'Edimburgo',
    
    // Ciudades Internacionales - Asia y Oceanía
    'Tokio', 'Seúl', 'Pekín', 'Shanghái', 'Hong Kong', 'Singapur',
    'Bangkok', 'Phuket', 'Kuala Lumpur', 'Bali', 'Sídney', 'Melbourne',
    'Auckland', 'Dubái', 'Abu Dhabi', 'Doha', 'Estambul', 'El Cairo'
];

// Crear datalist para autocompletado
const datalist = document.createElement('datalist');
datalist.id = 'cities';
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    datalist.appendChild(option);
});

document.body.appendChild(datalist);

// Asignar datalist a inputs de ciudades
document.getElementById('from').setAttribute('list', 'cities');
document.getElementById('to').setAttribute('list', 'cities');

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Agregar estilos para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Countdown Timer for Offers
function updateOfferTimers() {
    const timers = document.querySelectorAll('.offer-timer span');
    
    timers.forEach(timer => {
        const text = timer.textContent;
        const match = text.match(/Termina en: (\d+)d (\d+)h (\d+)m/);
        
        if (match) {
            let days = parseInt(match[1]);
            let hours = parseInt(match[2]);
            let minutes = parseInt(match[3]);
            
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                    days--;
                    if (days < 0) {
                        timer.textContent = 'Oferta expirada';
                        return;
                    }
                }
            }
            
            timer.textContent = `Termina en: ${days}d ${hours}h ${minutes}m`;
        }
    });
}

// Update timers every minute
setInterval(updateOfferTimers, 60000);

// Hero Scroll Indicator
document.querySelector('.hero-scroll-indicator').addEventListener('click', function() {
    document.querySelector('.search-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Función para actualizar precios dinámicos en la página principal
function updateDynamicPrices() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Precios base de destinos populares
    const destinationPrices = {
        'Bogotá': 185000,
        'Medellín': 175000,
        'Cartagena': 220000,
        'Cali': 195000,
        'Barranquilla': 210000,
        'Bucaramanga': 155000
    };
    
    // Actualizar precios en destinos populares
    document.querySelectorAll('.destination-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        const priceElement = card.querySelector('p');
        if (priceElement && destinationPrices[title]) {
            const dynamicPrice = calculateDynamicPrice(destinationPrices[title], tomorrowStr);
            const originalPrice = destinationPrices[title];
            const discount = Math.round(originalPrice * 0.3);
            
            priceElement.innerHTML = `
                <span style="text-decoration: line-through; color: #999; font-size: 0.9em;">$${originalPrice.toLocaleString()}</span><br>
                <span style="color: #4CAF50; font-weight: 600;">Desde $${dynamicPrice.toLocaleString()}</span><br>
                <small style="color: #4CAF50;">Ahorra $${discount.toLocaleString()}</small>
            `;
        }
    });
    
    // Actualizar precios en ofertas especiales
    const offerPrices = {
        'Miami': 850000,
        'Madrid': 1850000,
        'México': 720000,
        'New York': 1200000
    };
    
    document.querySelectorAll('.offer-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        const priceElement = card.querySelector('.offer-price');
        if (priceElement && offerPrices[title]) {
            const dynamicPrice = calculateDynamicPrice(offerPrices[title], tomorrowStr);
            const originalPrice = offerPrices[title];
            const discount = Math.round(originalPrice * 0.3);
            
            priceElement.innerHTML = `
                <span style="text-decoration: line-through; color: #999;">$${originalPrice.toLocaleString()}</span><br>
                <span style="color: #e53e3e; font-weight: 700; font-size: 1.2em;">$${dynamicPrice.toLocaleString()}</span><br>
                <small style="color: #4CAF50;">Ahorra $${discount.toLocaleString()}</small>
            `;
        }
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('SkyWings - Página de reserva de vuelos cargada correctamente');
    
    // Actualizar precios dinámicos
    updateDynamicPrices();
    
    // Actualizar precios cada hora para reflejar cambios de fecha
    setInterval(updateDynamicPrices, 3600000); // 1 hora
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a SkyWings! Encuentra los mejores precios en vuelos.', 'success');
    }, 2000);
    
    // Mostrar notificación sobre descuento
    setTimeout(() => {
        showNotification('🎉 ¡Oferta especial! 30% de descuento en todos los vuelos', 'success');
    }, 4000);
    
    // Initialize tooltips or other UI enhancements
    initializeUI();


});

// Initialize UI enhancements
function initializeUI() {
    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


