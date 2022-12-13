'use strict';

const navbar = document.querySelector(".navbar__listContainer");
const featureSection = document.querySelector(".features");
const btnScroll = document.querySelector(".btn-scroll-to");

const tabBtns = document.querySelectorAll('.operations-details__tab');
const tabContainer = document.querySelector('.operations-details__tab-container');
const tabContents = document.querySelectorAll('.operations-details__content');

const navEl = document.querySelector('.navbar');

const header = document.querySelector('.header');
const navHeight = navEl.getBoundingClientRect().height;

const allSections = document.querySelectorAll('section');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnModals = document.querySelectorAll('.btn__modal');


// NAVBAR
navbar.addEventListener('click', function(e){
    e.preventDefault();

    if(e.target.classList.contains('navbar__link')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});


// LEARN MORE BTN
btnScroll.addEventListener('click', function(e){
    featureSection.scrollIntoView({behavior: 'smooth'});
});


// OPERATIONS TABS
tabContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations-details__tab');
    
    if (!clicked) return;
    
    tabBtns.forEach(tab => tab.classList.remove('operations-details__tab--active'));
    clicked.classList.add('operations-details__tab--active');

    tabContents.forEach(content => content.classList.remove('operations-details__content--active'));
    document.querySelector(`.operations-details__content--${clicked.dataset.tab}`).classList.add('operations-details__content--active');
})


// MENU HOVER ANIMATIONS
const menuHover = function(e){
    if(e.target.classList.contains('navbar__link')){
        const link = e.target;
        const siblings = link.closest('.navbar').querySelectorAll('.navbar__link');

        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this;
        });
    } 
}

navEl.addEventListener('mouseover', menuHover.bind(0.5));
navEl.addEventListener('mouseout', menuHover.bind(1));


// STICKY NAVIGATION
const options = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
}

const navSticky = function(entries){
    const [entry] = entries;
    if(!entry.isIntersecting) navEl.classList.add('navbar--sticky');
    else navEl.classList.remove('navbar--sticky');
}

const observer = new IntersectionObserver(navSticky, options);
observer.observe(header);


// REVEALING SECTIONS
const sectionOption = {
    root: null,
    threshold: 0.15
}

const showSection = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(showSection, sectionOption);

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})


// LAZY LOADING IMAGES
const featureImgs = document.querySelectorAll('img[data-src]');

const imgOptions = {
    root: null,
    threshold: 0,
    rootMargin: '100px'
}

const loadImg = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    })

    observer.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(loadImg, imgOptions);

featureImgs.forEach(img => imgObserver.observe(img));


// SLIDER
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotsContainer = document.querySelector('.dots');

    let currSlide = 0;
    const maxSlide = slides.length; 

    const createDots = function () {
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
        })
    }

    const activeDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }

    const goToSlilde = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`
        })
        activeDot(slide);
    }

    const nextSlide = function () {
        if (currSlide === maxSlide - 1) {
            currSlide = 0;
        } else {
            currSlide++;
        }
        goToSlilde(currSlide);
    }

    const prevSlide = function () {
        if (currSlide === 0) {
            currSlide = maxSlide - 1;
        } else {
            currSlide--;
        }
        goToSlilde(currSlide);
    }

    const init = function () {
        createDots();
        activeDot(0);
        goToSlilde(0);
    }
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    })

    dotsContainer.addEventListener('click', function (e) {
        if(e.target.classList.contains('dots__dot')){
            const clickedDot = e.target.dataset.slide;
            goToSlilde(+clickedDot);
        }
    })
}
slider();



// MODAL
const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnModals.forEach(btn => btn.addEventListener('click', openModal));
overlay.addEventListener('click', closeModal);


// Copyright
const dynamicYear = document.querySelector('.dynamicYear');
const currYear = new Date().getFullYear();
dynamicYear.textContent = currYear;