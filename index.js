'use strict';

const navbar = document.querySelector(".navbar__listContainer");
const featureSection = document.querySelector(".features");
const btnScroll = document.querySelector(".btn-scroll-to");

const tabBtns = document.querySelectorAll('.operations-details__tab');
const tabContainer = document.querySelector('.operations-details__tab-container');
const tabContents = document.querySelectorAll('.operations-details__content');

const navEl = document.querySelector('.navbar');


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
const menuHover = function(e, opacity){
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