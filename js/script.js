/*

let slideIndex = 1;
let startX; // Variable para guardar la posición inicial de X (toque o mouse)
let endX;   // Variable para guardar la posición final de X
let isDragging = false;

 // Open the modal
function openModal() {
    document.getElementById("imageModal").style.display = "block";
    showSlides(slideIndex);
}

// Close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Display the slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Detect touch start
function touchStart(event) {
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
}


// Detect touch end or mouse up
function touchEnd(event) {
    if (isDragging) {
        isDragging = false;
        endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        handleSwipe();
    }
}

// Handle the swipe logic
function handleSwipe() {
    if (startX - endX > 50) {
        // Left swipe (next slide)
        plusSlides(1);
    } else if (endX - startX > 50) {
        // Right swipe (previous slide)
        plusSlides(-1);
    }
}

// Handle mouse drag for swipe
function mouseMove(event) {
    if (!isDragging) return;
    endX = event.clientX;
}

// Add event listeners for touch and mouse actions
const modalContent = document.querySelector('.modal-content');

// For touch screens
modalContent.addEventListener('touchstart', touchStart);
modalContent.addEventListener('touchmove', mouseMove); // Update endX during touchmove
modalContent.addEventListener('touchend', touchEnd);

// For mouse swipe simulation
modalContent.addEventListener('mousedown', touchStart);
modalContent.addEventListener('mousemove', mouseMove); // Update endX during mousemove
modalContent.addEventListener('mouseup', touchEnd);


*/
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
    }

    slides[n].classList.add("active");
    slides[n].style.opacity = "1";  // Asegura que la opacidad sea 1 cuando la imagen sea activa

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
