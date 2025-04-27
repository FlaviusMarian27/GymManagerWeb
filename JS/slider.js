var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3, // desktop
      },
      768: {
        slidesPerView: 2, // tabletă
      },
      480: {
        slidesPerView: 1, // telefon
      }
    }
  });
  