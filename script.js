// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio JH EVENTOS cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initContactForm();
    initScrollAnimations();
    initProjectButtons();
    initSmoothScrolling();
});

// ===== NAVEGACIÓN RESPONSIVE =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cambiar estado del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío por defecto
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const mensaje = formData.get('mensaje');
            
            // Validar campos requeridos
            if (!nombre || !email || !mensaje) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Validar formato de email
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simular envío del formulario
            simulateFormSubmission(nombre, email, telefono, mensaje);
        });
    }
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para simular envío del formulario
function simulateFormSubmission(nombre, email, telefono, mensaje) {
    // Mostrar loading
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular delay de envío
    setTimeout(() => {
        // Mensaje en consola como solicitado
        console.log('Formulario enviado correctamente');
        console.log('Datos del formulario:', {
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensaje,
            timestamp: new Date().toISOString()
        });
        
        // Mostrar notificación de éxito
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        document.getElementById('contactForm').reset();
        
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#000080'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Función para cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    // Crear observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.experience-card, .project-card, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// ===== BOTONES DE PROYECTOS =====
function initProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información del proyecto
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            
            // Mostrar modal con información del proyecto
            showProjectModal(projectTitle, projectDescription);
        });
    });
}

// Función para mostrar modal de proyecto
function showProjectModal(title, description) {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-features">
                        <h4>Características del Proyecto:</h4>
                        <ul>
                            <li>Planificación integral del evento</li>
                            <li>Coordinación técnica especializada</li>
                            <li>Gestión de proveedores y contratistas</li>
                            <li>Estrategia de marketing y promoción</li>
                            <li>Control presupuestal y seguimiento</li>
                            <li>Evaluación post-evento y métricas</li>
                        </ul>
                    </div>
                    <div class="modal-contact">
                        <p><strong>¿Interesado en un proyecto similar?</strong></p>
                        <a href="#contacto" class="btn btn-primary">Contactar Ahora</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Agregar estilos CSS para el modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: #000000;
            border: 2px solid #00ff00;
            border-radius: 15px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #00ff00;
        }
        
        .modal-header h3 {
            color: #00ff00;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: #ffff00;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: #00ff00;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .modal-body p {
            color: #cccccc;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .modal-features h4 {
            color: #00ff00;
            margin-bottom: 10px;
        }
        
        .modal-features ul {
            color: #cccccc;
            margin-bottom: 20px;
            padding-left: 20px;
        }
        
        .modal-features li {
            margin-bottom: 5px;
        }
        
        .modal-contact {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #333333;
        }
        
        .modal-contact p {
            color: #ffff00;
            margin-bottom: 15px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Agregar al DOM
    document.body.appendChild(modal);
    
    // Event listeners para cerrar modal
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
            style.remove();
        }
    });
    
    // Cerrar con tecla Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            style.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
}

// ===== DESPLAZAMIENTO SUAVE =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajustar por navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFECTOS ADICIONALES =====

// Efecto de parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Efecto de hover en las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.experience-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contador animado para estadísticas (opcional)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Función para agregar efectos de partículas (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff00;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        hero.appendChild(particle);
    }
    
    // Agregar animación CSS para partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar partículas después de cargar la página
window.addEventListener('load', function() {
    setTimeout(createParticles, 1000);
});

// ===== UTILIDADES =====

// Función para formatear números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Función para generar ID único
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Función para debounce (optimizar eventos)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos de scroll
const debouncedScroll = debounce(function() {
    // Aquí se pueden agregar más efectos de scroll optimizados
}, 10);

window.addEventListener('scroll', debouncedScroll);

console.log('Scripts de JH EVENTOS inicializados correctamente');
