var swiper = new Swiper(".mySwiper", {
  loop: true,
  speed: 800,
  spaceBetween: 30,
  centeredSlides: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {          // Telefon
      slidesPerView: 1,
    },
    768: {        // Tableta
      slidesPerView: 2,
    },
    1024: {       // PC
      slidesPerView: 3,
    }
  }
});

// === Animatie la scroll pentru sectiunea Despre Noi ===
const despreImage = document.querySelector('.despre-image img');
const despreContent = document.querySelector('.despre-content');

function showDespreOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  if (despreImage) {
    const imgTop = despreImage.getBoundingClientRect().top;
    if (imgTop < triggerBottom) {
      despreImage.parentElement.classList.add('visible');
    }
  }

  if (despreContent) {
    const contentTop = despreContent.getBoundingClientRect().top;
    if (contentTop < triggerBottom) {
      despreContent.classList.add('visible');
    }
  }
}

window.addEventListener('scroll', showDespreOnScroll);
window.addEventListener('load', showDespreOnScroll);

  // Selectam toate cardurile de review
const reviewCards = document.querySelectorAll('.review-card');

// Functie care adauga clasa "visible" cand review-ul intra in ecran
function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.9; // Porneste animatia cand cardul este aproape vizibil

  reviewCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible'); // Optional: eliminam clasa cand nu mai este vizibil
    }
  });
}

// Ascultam evenimentele de scroll si load
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);
