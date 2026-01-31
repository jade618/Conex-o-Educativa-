// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready');
    
});

// slides 
// script.js
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    const offset = -currentSlide * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 4000);
