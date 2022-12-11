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
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;
const maxSlide = slides.length; //3

const goToSlilde = function(slide){
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}
goToSlilde(0);


const nextSlide = function(){
    if(currSlide === maxSlide - 1){
        currSlide = 0;
    } else{
        currSlide++;
    }
    goToSlilde(currSlide);
}

const prevSlide = function(){
    if(currSlide === 0){
        currSlide = maxSlide - 1;
    } else{
        currSlide--;
    }
    goToSlilde(currSlide);
}


btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight') nextSlide();
    else if(e.key === 'ArrowLeft') prevSlide();
})