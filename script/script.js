"use strict";

const btnAbout = document.querySelector(".about");
const sectionHero = document.querySelector("#section--hero");

const header = document.querySelector(".header");

const nav = document.querySelector(".nav");
const headerHeight = header.getBoundingClientRect().height;

/// SCROLL TO (DA RIPROGRAMMARE CON PIù ELEMENTI COME SEGUE)

// document.querySelector('.nav__links').addEventListener('click', function(e){
//     e.preventDefault();

//     //Matching Strategy
//     if (e.target.classList.contains('nav__link')){
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     }
//   })

btnAbout.addEventListener("click", function (e) {
  const sectHeroCoords = sectionHero.getBoundingClientRect();
  sectionHero.scrollIntoView({ behavior: "smooth" });
});

/// STICKY

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);
//   if (!entry.isIntersecting) header.classList.add("sticky");
//   else header.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${headerHeight}px`,
// });
// headerObserver.observe(header);

// SLIDES

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // EVENT HANDLERS

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // KEYBOARD EVENT

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  //DOTS - EVENT DELEGATION
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
