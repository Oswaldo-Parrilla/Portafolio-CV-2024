
let slideIndex = 0;
const slides = document.getElementsByClassName("mySlides");

// Variables para almacenar la posición del toque
let touchStartX = 0;
let touchEndX = 0;
const threshold = 50;  // Distancia mínima en píxeles para considerar un deslizamiento

function openModal() {
    document.getElementById("imageModal").style.display = "flex";
    showSlides(slideIndex);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function plusSlides(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlides(slideIndex);
}

function showSlides(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "prev-slide", "next-slide");
        slides[i].style.opacity = "0";
        slides[i].style.pointerEvents = "none";  // <-- Bloquea clicks en slides no activas
    }

    slides[n].classList.add("active");
    slides[n].style.opacity = "1";  // Asegura que la opacidad sea 1 cuando la imagen sea activa
    slides[n].style.pointerEvents = "auto";  // <-- Permite clicks en la slide visible

    let prevSlideIndex = (n - 1 + slides.length) % slides.length;
    let nextSlideIndex = (n + 1) % slides.length;

    slides[prevSlideIndex].classList.add("prev-slide");
    slides[nextSlideIndex].classList.add("next-slide");
}

// Función para manejar el toque inicial
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX; // Captura la posición horizontal del toque inicial
}

// Función para manejar el fin del toque
function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX; // Captura la posición horizontal cuando se suelta
    handleGesture(); // Calcula la dirección del deslizamiento
}

// Función para gestionar el deslizamiento
function handleGesture() {
    let distance = touchEndX - touchStartX;

    // Solo si el deslizamiento es mayor que el umbral, lo consideramos un gesto de deslizamiento
    if (Math.abs(distance) > threshold) {
        if (distance > 0) {
            // Si la distancia es positiva, deslizó hacia la derecha
            plusSlides(1);  // Muestra la siguiente diapositiva
        } else {
            // Si la distancia es negativa, deslizó hacia la izquierda
            plusSlides(-1);  // Muestra la diapositiva anterior
        }
    }
}

// Añadir listeners para detectar toques en el modal
let modalContent = document.querySelector(".modal-content");
modalContent.addEventListener('touchstart', handleTouchStart, false);
modalContent.addEventListener('touchend', handleTouchEnd, false);

(function () {
  const modalContentBtns = document.querySelector('.modal-content');
  if (!modalContentBtns) return;

  function openInNewTab(url) {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Evita que el swipe del carrusel robe el gesto del botón
  modalContentBtns.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.mySlides.active .centerButton .btn');
    if (btn) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
  }, true);

  // Maneja el click en los botones dentro de la slide activa
  modalContentBtns.addEventListener('click', (e) => {
    const anchor = e.target.closest('.mySlides.active .centerButton a.btn');
    if (anchor) return; // deja que el <a target="_blank"> funcione nativo

    const btn = e.target.closest('.mySlides.active .centerButton button.btn');
    if (!btn) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    // 1) Intenta data-url en el botón
    let url = btn.getAttribute('data-url');

    // 2) Si no, busca en la slide activa
    if (!url) {
      const slide = btn.closest('.mySlides.active');
      if (slide) url = slide.getAttribute('data-url');
    }

    // 3) Si no, extrae de onclick="window.open('...')"
    if (!url) {
      const on = btn.getAttribute('onclick');
      if (on) {
        const m = on.match(/window\.open\(['"]([^'"]+)['"]/);
        if (m) url = m[1];
      }
    }

    openInNewTab(url);
  }, true);
})();

/* ============================================================= typing animation =================================================== */
var typed = new Typed(".typing", {
    strings: ["QA Tester", "", "QA Analyst", "", "QA Engineer", ""],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});
/* ============================================================= Aside  =================================================== */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length;
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
    for (let i = 0; i < totalNavList; i++) 
        {
            const a = navList[i].querySelector("a");
            a.addEventListener("click", function() 
            {
                removeBackSection();
                for (let j = 0; j < totalNavList; j++) 
                {
                    if (navList[j].querySelector("a").classList.contains("active")) 
                    {
                        addBackSection(j);
                        //allSection[j].classList.add("back-section");
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active");
                showSection(this);
                if(window.innerWidth < 1200) 
                {
                    AsideSectionTogglerBtn();
                }
            })
        }
        function removeBackSection() 
        {
            for (let i = 0; i < totalSection; i++) 
                {
                    allSection[i].classList.remove("back-section");
                }
        }
        function addBackSection(num) 
        {
            allSection[num].classList.add("back-section");
        }
        function showSection(element) 
        {
            for (let i = 0; i < totalSection; i++) 
                {
                    allSection[i].classList.remove("active");
                }
            const target = element.getAttribute("href").split("#")[1];
            document.querySelector("#" + target).classList.add("active");
        }
        function updateNat(element) 
        {
            for (let i = 0; i < totalNavList; i++) 
                {
                    navList[i].querySelector("a").classList.remove("active");
                    const target = element.getAttribute("href").split("#")[1];
                    if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) 
                    {
                        navList[i].querySelector("a").classList.add("active");
                    }
                }
        }
        document.querySelector(".hire-me").addEventListener("click", function()
        {
            const  sectionIndex = this.getAttribute("data-section-index");
            console.log(sectionIndex);
            showSection(this);
            updateNat(this);
            removeBackSection();
            addBackSection(sectionIndex);
        })
        const navTogglerBtn = document.querySelector(".nav-toggler"), 
                Aside = document.querySelector(".aside");
                navTogglerBtn.addEventListener("click", () => 
                {
                    AsideSectionTogglerBtn();    
                })
                function AsideSectionTogglerBtn() 
                {
                    Aside.classList.toggle("open");
                    navTogglerBtn.classList.toggle("open");
                    for (let i = 0; i < totalSection; i++) 
                    {
                        allSection[i].classList.toggle("open");
                    }
                }
/* =========================================== CHATBOT  =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const closeButton = document.getElementById('chatbot-close');
    const minimizeButton = document.getElementById('chatbot-minimize');
    const maximizeButton = document.getElementById('chatbot-maximize');
    const chatbotHeader = document.getElementById('chatbot-header');

    const qaData = {
        "hola": "¡Hola! 👋 Soy el asistente de Oswaldo. Pregúntame sobre:\n• Experiencia en QA\n• Herramientas\n• Proyectos\n• Idiomas\n• Hobbies\n• Pasatiempos\n• Mi LinkedIn\n• Mi GitHub",
        "experiencia": "🔍 Tengo 3+ años en QA Automation:\n\n- Automatización Web: Selenium (Java), Appium, Python (curso en automation)\n- APIs: Postman\n- CI/CD: Docker (básico), GitHub\n- Metodologías: Agile (Scrum)\n- Pruebas: Funcionales, E2E, Regresión, Integración",
        "frameworks": "⚙️ Tech Stack:\n\n• Selenium + Gradle/Maven (Java)\n• Appium + Appium Desktop (Mobile)\n• Postman (APIs)\n• Git/GitHub (Control de versiones)\n• JIRA (Gestión de proyectos)",
        "github": '🔗 Mi GitHub: https://github.com/Oswaldo-Parrilla?tab=repositories\n\nAhí encontrarás:\n- Proyectos de automation\n- Prácticas personales\n- Practicas escolares\n- Practicas de cursos de udemy',
        "linkedin": "🔗 Mi LinkedIn: https://www.linkedin.com/in/oswaldo-parrilla-chávez-9ba822144\n\nAquí puedes ver:\n- Mis experiencias laborales\n- Mis habilidades\n- Mis recomendaciones",
        "proyectos": "🚀 Proyectos destacados:\n\n1. Automatización de flujo completo de Amazon (Web)\n   - Login → Búsqueda → Añadir al carrito → Pago\n\n2. Automatización de app Android con Appium\n\n3. Portafolios\n\n4. Portafolio Personal CV",
        "idiomas": "🌍 Idiomas:\n\n- Español: Nativo\n- Inglés: A2 (Básico/Pre-intermedio)\n   • Comprensión técnica de documentación\n   • Comunicación escrita básica",
        "ingles": "📚 Nivel de Inglés: A2 (Pre-intermedio)\n\n• Puedo leer documentación técnica\n• Comprendo videos tutoriales (con subtítulos)\n• Comunicación escrita básica en herramientas como Slack/JIRA\n\nActualmente en proceso de mejora continua 🚀",
        "hobbies": "🎮 Hobbies e intereses:\n\n• Desarrollo personal en automation\n• Videojuegos\n• Tecnología móvil\n• Automatización del hogar (IoT básico)\n• Cursos online de mejora de automatización",
        "pasatiempos": "⚡ En mi tiempo libre:\n\n- Investigo nuevas herramientas de testing y su mancuerna con la IA\n- Practico automation con proyectos personales\n- Asisto a conciertos\n- Veo canales de Gadgets en youtube",
        "default": "💡 Puedes preguntarme sobre:\n\n• Mi 'experiencia'\n• Los 'frameworks' que uso\n• Mis 'proyectos'\n• Mis 'hobbies'\n• Mis 'pasatiempos'\n• Mi nivel de 'inglés'\n• Mi 'GitHub'"
    };

    let botIsTyping = false;
    const botMessageQueue = [];

    // Mostrar chatbot con animación
    setTimeout(() => {
        chatbotContainer.style.display = 'block';
        setTimeout(() => {
            chatbotContainer.classList.add('visible');
            addMessage('bot', qaData["hola"], true);
        }, 100);
    }, 2000);

    // Minimizar
    minimizeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotContainer.classList.add('minimized');
        minimizeButton.style.display = 'none';
        maximizeButton.style.display = 'flex';
    });

    // Maximizar
    maximizeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotContainer.classList.remove('minimized');
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = 'flex';
        userInput.focus();
    });

    // Cerrar
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotContainer.classList.remove('visible');
        setTimeout(() => {
            chatbotContainer.style.display = 'none';
        }, 300);
    });

    // Eventos de envío
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        userInput.value = '';

        if (chatbotContainer.classList.contains('minimized')) {
            chatbotContainer.classList.remove('minimized');
            maximizeButton.style.display = 'none';
            minimizeButton.style.display = 'flex';
        }

        setTimeout(() => {
            const response = getBotResponse(message);
            enqueueBotMessage(response);
        }, 500);
    }

    function addMessage(sender, text, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;

        if (isBot) {
            if (botIsTyping) {
                botMessageQueue.push(text);
                return;
            }

            botIsTyping = true;
            let i = 0;
            messageDiv.textContent = '';
            chatMessages.appendChild(messageDiv);
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    messageDiv.textContent += text.charAt(i);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    i++;
                } else {
                    clearInterval(typingInterval);
                    botIsTyping = false;
                    if (botMessageQueue.length > 0) {
                        const nextMsg = botMessageQueue.shift();
                        addMessage('bot', nextMsg, true);
                    }
                }
            }, 20);
        } else {
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function enqueueBotMessage(text) {
        if (botIsTyping) {
            botMessageQueue.push(text);
        } else {
            addMessage('bot', text, true);
        }
    }

    function getBotResponse(message) {
        const normalize = (str) => {
            return str.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[¿?¡!.,]/g, '')
                .trim();
        };

        const normalizedMessage = normalize(message);

        for (const [key, answer] of Object.entries(qaData)) {
            if (normalize(key) === normalizedMessage) {
                return answer;
            }
        }

        const matchingKeys = [];
        for (const key of Object.keys(qaData)) {
            const normalizedKey = normalize(key);
            if (normalizedMessage.includes(normalizedKey) || 
                normalizedKey.includes(normalizedMessage)) {
                matchingKeys.push(key);
            }
        }

        if (matchingKeys.includes("github")) return qaData["github"];
        if (matchingKeys.includes("pasatiempos")) return qaData["pasatiempos"];
        if (matchingKeys.length > 0) return qaData[matchingKeys[0]];

        return qaData["default"];
    }
});