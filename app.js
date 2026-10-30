/**
 * DevCore Portfolio - Script de Interacciones y Accesibilidad
 * Vanilla JS sin dependencias externas
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
});

/**
 * 1. Menú Móvil Accesible (Hamburger Toggle)
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !siteNav) return;

  // Alternar visibilidad con soporte aria
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    navToggle.setAttribute('aria-expanded', String(nextState));
    siteNav.classList.toggle('is-active', nextState);
    navToggle.setAttribute('aria-label', nextState ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  // Cerrar el menú al pulsar cualquier enlace de navegación interna
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('is-active')) {
        siteNav.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  });
}

/**
 * 2. Validación de Formulario y Retroalimentación
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      error: document.getElementById('fullNameError'),
      validate: (val) => val.trim().length >= 3 ? '' : 'Por favor ingresa al menos 3 caracteres.'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val.trim()) return 'El correo electrónico es requerido.';
        if (!emailRegex.test(val)) return 'Ingresa un formato de correo válido (ej. usuario@dominio.com).';
        return '';
      }
    },
    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError'),
      validate: (val) => val.trim().length >= 4 ? '' : 'El asunto debe tener al menos 4 caracteres.'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (val) => val.trim().length >= 10 ? '' : 'El mensaje debe contener al menos 10 caracteres.'
    }
  };

  // Limpiar mensaje de error individual al enfocar o escribir
  Object.values(fields).forEach(({ input, error }) => {
    if (!input || !error) return;
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      error.textContent = '';
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    });
  });

  // Manejador del submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let hasErrors = false;

    // Validar cada campo
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      const errorMessage = field.validate(field.input.value);

      if (errorMessage) {
        field.input.classList.add('input-error');
        field.error.textContent = errorMessage;
        hasErrors = true;
      } else {
        field.input.classList.remove('input-error');
        field.error.textContent = '';
      }
    });

    if (hasErrors) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor corrige los campos señalados antes de enviar.';
      return;
    }

    // Feedback positivo simulado (sin backend ni librerías externas)
    feedback.className = 'form-feedback success';
    feedback.textContent = '¡Gracias por tu mensaje! La consulta fue validada y procesada correctamente.';
    form.reset();
  });
}