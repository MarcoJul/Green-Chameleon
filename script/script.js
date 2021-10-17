"use strict";

// const btnAbout = document.querySelector(".about");
// const sectionHero = document.querySelector("#section--hero");

const header = document.querySelector(".header");

const nav = document.querySelector(".nav");
const headerHeight = header.getBoundingClientRect().height;

const stickyLogo = document.querySelector(".sticky-logo");
const hamburger = document.querySelector(".hamburger-logo");

const statement = document.querySelector("#section--statement");

/// SCROLL TO (DA RIPROGRAMMARE CON PIù ELEMENTI COME SEGUE)

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/// STICKY

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    stickyLogo.style.paddingRight = "25px";
    hamburger.classList.remove("hamburger-hidden");
  } else {
    stickyLogo.style.paddingRight = "0px";
    hamburger.classList.add("hamburger-hidden");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${headerHeight}px`,
});
headerObserver.observe(header);

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
    goToSlide(1);
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

//////// REVEAL SECTIONS

const allSection = document.querySelectorAll(".section");
// console.log(allSection);
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // if (entry.target.id === "section--journal") {
  //   statement.style.backgroundAttachment = "scroll";
  // }
  // console.log(entry.target.id);
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//// NIGHT MODE

const toggleSwitch = document.querySelector(".switch__1");
const sun = document.querySelector(".sun-movement");
const moon = document.querySelector(".moon-movement");
const night = [...document.querySelectorAll(".night")];
const ctaBtn = document.querySelector(".btn-touch");
const footer = document.querySelector(".main-footer");

toggleSwitch.addEventListener("click", function () {
  document.body.classList.toggle("body-night");
  night.forEach((el) => el.classList.toggle("night-color"));
  ctaBtn.classList.toggle("btn-night");
  footer.classList.toggle("background-footer");

  if (sun.classList.contains("sunset")) {
    sun.classList.add("sunrise");
    sun.classList.remove("sunset");
  } else {
    sun.classList.remove("sunrise");
    sun.classList.add("sunset");
  }

  if (moon.classList.contains("moonrise")) {
    console.log("è giorno");
    moon.classList.add("moonset");
    moon.classList.remove("moonrise");
  } else {
    console.log("è notte");
    moon.classList.remove("moonset");
    moon.classList.add("moonrise");
  }
});
