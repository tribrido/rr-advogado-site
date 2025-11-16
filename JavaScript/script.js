// ============================================
// ATUALIZAÇÃO AUTOMÁTICA DO ANO NO FOOTER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const anoElemento = document.getElementById('ano');
    if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }
});

// ============================================
// SCROLL SUAVE PARA ÂNCORAS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignora links vazios ou apenas com #
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER COM EFEITO AO ROLAR
// ============================================

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Adiciona sombra mais intensa ao rolar
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ============================================

const form = document.getElementById('form-contato');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return false;
        }
        
        // Aqui você pode adicionar a lógica de envio
        // Por exemplo, usando FormSubmit, EmailJS ou outra solução
        
        alert('Mensagem enviada com sucesso! Retornarei em breve.');
        form.reset();
    });
}

// ============================================
// FORMATAÇÃO AUTOMÁTICA DO TELEFONE
// ============================================

const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            // Formato: (99) 9 9999-9999
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
            valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = valor;
    });
}

// ============================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ============================================

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

// Elementos para animar
const elementsToAnimate = document.querySelectorAll('.servicos-lista li, .portfolio-galeria figure, blockquote');

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// BOTÃO WHATSAPP FLUTUANTE - ESCONDER AO ROLAR PARA BAIXO
// ============================================

const whatsappButton = document.getElementById('whatsapp-float');
let lastScrollPosition = 0;

if (whatsappButton) {
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        // Esconde ao rolar para baixo, mostra ao rolar para cima
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {
            whatsappButton.style.transform = 'translateY(100px)';
            whatsappButton.style.opacity = '0';
        } else {
            whatsappButton.style.transform = 'translateY(0)';
            whatsappButton.style.opacity = '1';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
}

// ============================================
// MENU MOBILE (HAMBURGER) - OPCIONAL
// ============================================

// Descomente este código se quiser adicionar um menu hamburger mobile

/*
const menuToggle = document.createElement('button');
menuToggle.innerHTML = '☰';
menuToggle.id = 'menu-toggle';
menuToggle.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
`;

const nav = document.querySelector('#header nav');
const navUl = document.querySelector('#header nav ul');

if (window.innerWidth <= 768) {
    nav.insertBefore(menuToggle, navUl);
    menuToggle.style.display = 'block';
    navUl.style.display = 'none';
}

menuToggle.addEventListener('click', function() {
    if (navUl.style.display === 'none' || navUl.style.display === '') {
        navUl.style.display = 'flex';
    } else {
        navUl.style.display = 'none';
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        navUl.style.display = 'none';
    } else {
        menuToggle.style.display = 'none';
        navUl.style.display = 'flex';
    }
});
*/

// ============================================
// LOADING DAS IMAGENS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Estilo inicial
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
});

// ============================================
// PREVENÇÃO DE SPAM NO FORMULÁRIO
// ============================================

const gotchaField = document.querySelector('input[name="_gotcha"]');

if (form && gotchaField) {
    form.addEventListener('submit', function(e) {
        if (gotchaField.value !== '') {
            e.preventDefault();
            console.log('Possível spam detectado');
            return false;
        }
    });
}

// ============================================
// CONSOLE LOG INFORMATIVO
// ============================================

console.log('%c🏛️ Site Rafael Ribeiro - Advocacia', 'color: #214DA6; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com atenção aos detalhes', 'color: #37591E; font-size: 14px;');
console.log('%cContato: seu-email@dominio.com', 'color: #D9B13B; font-size: 12px;');