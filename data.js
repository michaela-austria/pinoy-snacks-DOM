'use strict';

const data = {
    labelContainer: [
        {
            id: 1,
            title: 'Features',
            desc: 'Order traditional Filipino snacks within the app and avoid long lines.'
        },
        {
            id: 2,
            title: 'Operations',
            desc: 'This is how you can order through Pinoy Snacks kiosk.'
        },
        {
            id: 3,
            title: 'People Love It!',
            desc: 'Thousands have preferred using Pinoy Snacks Kiosk to get their Filipino Snacks.'
        }
    ],
    featuresData: [
        {
            id: 1,
            src: "img/Feature-Desktop-lazy.png",
            datasrc: "img/Feature-Desktop.png",
            alt: "Pinoy-Snacks-Desktop",
            icon: "img/kiosk.svg",
            headline: "Available kiosk in our branches.",
            paragraph: "Kiosks are available in all branches of Pinoy Snacks. Customers can order a variety of snacks and drinks, including rice meals."
        },
        {
            id: 2,
            src: "img/Feature-Mobile-lazy.png",
            datasrc: "img/Feature-Mobile.png",
            alt: "Pinoy-Snacks-Mobile",
            icon: "img/desktop-mobile.svg",
            headline: "Access the kiosk on your own device.",
            paragraph: "To access the kiosk on your device. Just click the ‘Order Now’ button from our website, and you will be redirected to the kiosk."
        }
    ],
    operationsData: [
        {
            id: 1,
            icon: "iconoir:one-finger-select-hand-gesture",
            headline: "Ordering Process Simplified",
            paragraph: "Select your preferred food by taping the selection, update your order quantity."
        },
        {
            id: 2,
            icon: "fluent:money-hand-20-regular",
            headline: "Enter Cash",
            paragraph: "Once you have finished selecting your order, enter the cash amount that you will pay to the counter."
        },
        {
            id: 3,
            icon: "ion:receipt-outline",
            headline: "Claim Receipt",
            paragraph: "The receipt updates in real-time. Claim your receipt, and proceed to the counter and claim your order."
        }
    ],
    testimonialData: [
        {
            id: 1,
            text: "I’ve been using the Pinoy Snacks Kiosk App for a while now and I can easily say that it is my favorite. It’s much more efficient and you don’t have to worry about long lines in a kiosk.",
            img: "img/img-Suma.png",
            name:"Suma Chen",
            loc: "Sacramento"
        },
        {
            id: 2,
            text: "I live in Toronto, where there are many Filipino communities, and I still find myself ordering my favorite Pinoy snacks from the app every single week.",
            img: "img/img-Jin.png",
            name:"Jin Chan",
            loc: "Manifee"
        },
        {
            id: 3,
            text: "I've been looking for a way to order Filipino snacks in kiosk and I think I finally found it. Pinoy Snacks App is such an elegant app, easy to use, the gestures are all intuitive so it's very easy to get the hang of it. Such a great app!.",
            img: "img/img-Aki.png",
            name:"Aki Patel",
            loc: "Chula Vista"
        }
    ]
}


const labelContainers = document.querySelectorAll('.labelContainer');
const featuresContainer = document.querySelector('.features');
const operationsContentContainer = document.querySelector('.operations-details');
const sliderContainer = document.querySelector('.slider');

const loadLabelContainers = function(data){
    labelContainers.forEach((container, i) => {
        const mapLabelData = data.map((ld) => {
            return `
                <h4 class="labelContainer__title">${ld.title}</h4>
                <h3 class="labelContainer__desc">${ld.desc}</h3>
            `;
        });
        container.insertAdjacentHTML("beforeend", mapLabelData[i]);
    });
}


const loadFeatures = function(data){
    const mapFeature = data.map((featuredata, i) => {
        return `
            <div class="features__container">
                <div class="features__imgContainer ${i%2 === 0 ? "" : "change-order" }">
                    <img src="${featuredata.src}" data-src="${featuredata.datasrc}" alt="${featuredata.alt}" class="features__img lazy-img">
                </div>

                <div class="features__description">
                    <div class="features__iconContainer">
                        <figure class="features__iconContainer">
                            <img src="${featuredata.icon}" alt="desktop-mobile" class="features__icon">
                        </figure>
                    </div>

                    <h5 class="features__headline">${featuredata.headline}</h5>
                    <p class="features__paragraph">
                    ${featuredata.paragraph}
                    </p>
                </div>
            </div>
        `;
    }).join("")
    
    featuresContainer.insertAdjacentHTML("beforeend", mapFeature);
}



const loadOperationsContent = function(data){
    const mapOperationsContent = data.map((operationsdata, i) => {
        return `
            <div class="operations-details__content operations-details__content--${operationsdata.id} ${i === 0 ? "operations-details__content--active" : ""}">
                <div class="operations-details__icon operations-details__icon--${operationsdata.id}">
                    <iconify-icon icon="${operationsdata.icon}"></iconify-icon>
                </div>

                <h5 class="operations-details__header">${operationsdata.headline}</h5>

                <p>
                    ${operationsdata.paragraph}
                </p>
            </div>
        `;
    }).join("");

    operationsContentContainer.insertAdjacentHTML("beforeend", mapOperationsContent);
}


const loadTestimonialsContent = function(data){
    const mapTestimonialData = data.map((testimonial, i) => {
        return ` 
            <div class="slide slide--${testimonial.id}">
                <div class="testimonial">
                    <blockquote class="testimonial__text">
                                ${testimonial.text}
                    </blockquote>
                    <address class="testimonial__author">
                        <img src="${testimonial.img}" alt="${testimonial.name}" class="testimonial__author-image">
                        <p class="testimonial__author-name">${testimonial.name}</p>
                        <p class="testimonial__author-loc">${testimonial.loc}</p>
                    </address>
                </div>
            </div>
        `;
    }).join("");

    sliderContainer.insertAdjacentHTML("afterbegin", mapTestimonialData)

}


const init = function(){
    loadOperationsContent(data.operationsData);
    loadFeatures(data.featuresData);
    loadLabelContainers(data.labelContainer);
    loadTestimonialsContent(data.testimonialData);
}
init();