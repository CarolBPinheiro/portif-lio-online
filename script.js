// js/script.js - Portfólio Caroline Pinheiro
(function () {
    // ----------------------------------------------------
    // --- Funções Auxiliares 
    // ----------------------------------------------------
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
   
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveLink() {
       
        navLinks.forEach(link => link.classList.remove('active'));
        const firstLink = document.querySelector('#open-about');
        if(firstLink) firstLink.classList.add('active');
    }

    // window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); 

    // ----------------------------------------------------
    // --- GESTÃO JANELA FLUTUANTE 
    // ----------------------------------------------------
    const modal = document.getElementById('app-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    // CONTEÚDOS DO MODAL
const content = {
  about: {
    title: 'SOBRE MIM',
    body: `
      <img src="EU.JPG" alt="Caroline Pinheiro" class="bubble-image">

      <p class="modal-text">Olá! Eu sou a Carol 👋</p>

      <p>
        Sou desenvolvedora apaixonada por criar experiências digitais únicas e funcionais.
        Atualmente, trabalho com <strong>Next.js</strong>, <strong>React</strong>, <strong>JavaScript</strong> 
        e integrações com <strong>ERPs</strong>, sempre buscando unir 
        <strong>inovação, performance e acessibilidade</strong> em cada projeto.
      </p>

      <p>
        Minha abordagem foca em <strong>código limpo</strong>, <strong>otimização</strong> e 
        <strong>usabilidade</strong>, garantindo que cada usuário tenha uma experiência fluida e intuitiva.
        Recentemente, venho expandindo minhas habilidades em <strong>automações e integrações de sistemas</strong>,
        desenvolvendo soluções que tornam processos mais eficientes.
      </p>

      <p>
        Sou movida por <strong>aprendizado contínuo</strong> — estou sempre explorando novas tecnologias 
        para aprimorar meus projetos e evoluir como desenvolvedora.
      </p>

      <p><strong>Stack atual:</strong> React | Next.js | Node.js | JavaScript | Integrações e Automação de Sistemas</p>
    `,
  },

        projects: {
  title: 'MEUS PROJETOS',
  body: `
    <div class="projects-grid">

      <!-- CARD 1 -->
      <div class="project-card">
        <div class="project-bubble">
          <img src="agente.png" alt="Assistente Virtual Fluig" class="project-thumb">
        </div>
        <h3 class="project-title">Assistente Virtual Fluig</h3>
        <p class="project-desc">
          Chat corporativo integrado à plataforma Fluig com respostas inteligentes e personalização visual.
        </p>
        <p class="project-tech">
          <strong>Tecnologias:</strong> Node.js, JavaScript, HTML, CSS, Fluig API
        </p>
        <p class="project-methods">
          <strong>Métodos:</strong> RAG, Open Source Integration, Modular Architecture
        </p>
      </div>

      <!-- CARD 2 -->
<div class="project-card">
  <div class="project-bubble">
    <img src="bunny.png" alt="Bunny Hug Game" class="project-thumb">
  </div>
  <h3 class="project-title">Bunny Hug Game</h3>
  <p class="project-desc">
    Um jogo leve e acolhedor em que o jogador controla um coelho que deve abraçar o máximo de coelhinhos tristes possível. 
    Criado com foco em promover relaxamento e bem-estar, o jogo combina mecânicas simples com uma estética suave e reconfortante.
  </p>
  <p class="project-tech">
    <strong>Tecnologias:</strong> HTML, CSS, JavaScript
  </p>
  <p class="project-methods">
    <strong>Enfoques:</strong> UX Responsiva, Design Emocional, Interatividade Lúdica
  </p>
</div>

      <!-- CARD 3 -->
<div class="project-card">
  <div class="project-bubble">
    <img src="vetlux.png" alt="PetLux Website" class="project-thumb">
  </div>
  <h3 class="project-title">PetLux</h3>
  <p class="project-desc">
    Projeto de desenvolvimento <strong>PetLux</strong>, uma empresa especializada em produtos premium para pets. 
    O projeto integra um frontend em React com um backend em Node.js, oferecendo uma interface moderna, responsiva e conectada a uma API personalizada para gerenciamento de produtos e conteúdo dinâmico.
  </p>
  <p class="project-tech">
    <strong>Tecnologias:</strong> React, HTML, CSS, Node.js, Express, JavaScript
  </p>
  <p class="project-methods">
    <strong>Enfoques:</strong> Integração Frontend–Backend, Consumo de API, UI/UX Responsiva, Arquitetura Modular
  </p>
</div>

<!-- CARD 4 - Aegis Login System -->
<div class="project-card">
  <div class="project-bubble">
    <img src="aegis.png" alt="Aegis Login System" class="project-thumb">
  </div>
  <h3 class="project-title">Aegis Login System</h3>
  <p class="project-desc">
    Sistema de login moderno e responsivo, criado apenas com HTML, CSS e JavaScript puro.
  </p>
  <p class="project-tech">
    <strong>Tecnologias:</strong> HTML5, CSS3, JavaScript
  </p>
  <p class="project-methods">
    <strong>Métodos:</strong> UI/UX Design, CSS Animations, DOM Manipulation
  </p>
</div>
  

            `
        },
        contact: {
            title: 'MEIOS DE CONTATO',
            body: `
                <p class="modal-text">Vamos conversar! Envie um email ou me encontre no LinkedIn.</p>
                <div class="contact-item">
                    <a href="mailto:contato.carolinebraga@gmail.com">
                        <i class="fas fa-envelope"></i> contato.carolinebraga@gmail.com
                    </a>
                </div>
                <div class="contact-item">
                    <a href="https://www.linkedin.com/in/caroline-braga-perfil/" target="_blank">
                        <i class="fab fa-linkedin"></i> LinkedIn/Carol Braga
                    </a>
                </div>
                <div class="contact-item">
                    <a href="https://github.com/CarolBPinheiro" target="_blank">
                        <i class="fab fa-github"></i> GitHub/CarolBPinheiro
                    </a>
                </div>
            `
        }
    };

    function openModal(type) {
        const data = content[type];
        if (data) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.body;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }

    

    // Fechar ao clicar no X
    closeBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // --- ATRIBUIÇÃO DE EVENTOS PARA ABRIR O MODAL
    // ----------------------------------------------------
    document.getElementById('open-about').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('about');
    });

    document.getElementById('open-projects').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('projects');
    });
    
    
    const openProjectsBtn = document.getElementById('open-projects-btn');
    if (openProjectsBtn) {
        openProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('projects');
        });
    }

    
    document.getElementById('open-contact').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('contact');
    });

    (window.createParticleCanvas || function(){ 
        // fallback
    })(); 

})(); // end main IIFE