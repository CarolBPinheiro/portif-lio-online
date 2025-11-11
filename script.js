// Glassmorphism Portfolio - Enhanced SPA JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Glassmorphism Portfolio Loaded Successfully!');
    
    // === ELEMENTOS DO DOM ===
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const navIcons = document.querySelectorAll('.nav-icon');
    const modals = document.querySelectorAll('.modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const navigateButtons = document.querySelectorAll('[data-navigate]');
    
    // === MENU HAMBÚRGUER (MOBILE) ===
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
        
        // Fechar sidebar ao clicar fora (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    hamburgerBtn.classList.remove('active');
                    sidebar.classList.remove('active');
                }
            }
        });
    }
    
    // === SISTEMA DE MODAIS SPA ===
    function openModal(modalId) {
        const modal = document.getElementById(modalId + 'Modal');
        if (modal) {
            closeAllModals();
            setTimeout(() => {
                modalOverlay.classList.add('active');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (hamburgerBtn) {
                    hamburgerBtn.classList.remove('active');
                    sidebar.classList.remove('active');
                }
            }, 150);
            updateActiveIcon(modalId);
            if (history.pushState) {
                history.pushState({ modal: modalId }, '', `#${modalId}`);
            }
        }
    }

    function closeAllModals() {
        modalOverlay.classList.remove('active');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }

    function updateActiveIcon(modalId) {
        navIcons.forEach(icon => {
            icon.classList.remove('active');
            if (icon.getAttribute('data-modal') === modalId) {
                icon.classList.add('active');
            }
        });
    }

    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const modalId = icon.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllModals();
            if (history.pushState) {
                history.pushState(null, '', window.location.pathname);
            }
        });
    });

    modalOverlay.addEventListener('click', () => {
        closeAllModals();
        if (history.pushState) {
            history.pushState(null, '', window.location.pathname);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            if (history.pushState) {
                history.pushState(null, '', window.location.pathname);
            }
        }
    });

    navigateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModal = button.getAttribute('data-navigate');
            openModal(targetModal);
        });
    });

    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.modal) {
            openModal(e.state.modal);
        } else {
            closeAllModals();
        }
    });

    // === ABRIR MODAL INICIAL ===
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + 'Modal')) {
        setTimeout(() => {
            openModal(hash);
        }, 500);
    } else {
        // Abrir modal home por padrão
        setTimeout(() => {
            openModal('home');
        }, 500);
    }
    
    // === FORMULÁRIO DE CONTATO ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('❌ Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('❌ Por favor, insira um email válido!', 'error');
                return;
            }
            
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '⏳ ENVIANDO...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            setTimeout(() => {
                showNotification('✅ Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        });
    }

    // === SISTEMA DE NOTIFICAÇÕES ===
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '25px',
            right: '25px',
            padding: '18px 30px',
            background: type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: 'white',
            borderRadius: '14px',
            border: type === 'success'
                ? '1px solid rgba(16, 185, 129, 0.3)'
                : '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.3)',
            zIndex: '10000',
            animation: 'slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fontSize: '1.05rem',
            fontWeight: '700',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '1.5px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(450px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(450px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // === ANIMAÇÕES DE ENTRADA ===
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat-box, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // === ANIMAÇÃO DAS BARRAS DE PROGRESSO ===
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.animation = 'fillProgress 2s ease-out';
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => skillObserver.observe(card));

    // === CONTADOR ANIMADO ===
    function animateCounter(element, target, duration = 2500) {
        const isInfinity = target === '∞';
        if (isInfinity) return;
        
        const numericTarget = parseInt(target.replace('+', ''));
        let start = 0;
        const increment = numericTarget / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                if (text !== '∞') animateCounter(entry.target, text);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));

    // === ACESSIBILIDADE ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    if (!document.getElementById('focus-styles')) {
        const focusStyle = document.createElement('style');
        focusStyle.id = 'focus-styles';
        focusStyle.textContent = `
            .keyboard-nav *:focus {
                outline: 2px solid var(--primary-blue);
                outline-offset: 3px;
            }
        `;
        document.head.appendChild(focusStyle);
    }

    // === LOG FINAL ===
    console.log('Sistema de modais SPA inicializado');
    console.log('Animações Glassmorphism ativadas');
    console.log('Menu hambúrguer responsivo pronto');
    console.log('Portfolio pronto para uso!');
    console.log('Navegação SPA habilitada - sem recarregamento de página!');
});