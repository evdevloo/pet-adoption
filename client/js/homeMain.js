"use strict";
import {FormValidator} from './formValidator.js';
import {getPets} from "./petfinder.js";
import {catDict,dogDict} from "./BreedList.js";

(async function () {

    const form = document.querySelector('#homeForm');
    if (!form) {
        return;
    }

    let randomDict = ((Math.floor(Math.random() * 2)) === 1) ? catDict : dogDict;
    let type = (randomDict === catDict) ? "Cat" : "Dog";

    let randomBreed = function (obj) {
        let keys = Object.keys(obj);
        return keys[ keys.length * Math.random() << 0];
    };


    await getPets(".cards",6,type, randomBreed(randomDict),"male,female", "baby, young, adult, senior");

    new Swiper(".petSwiper", {
        loop: true,
        loopFillGroupWithBlank: true,
        centeredSlides: false,
        fade: 'true',
        grabCursor: 'true',
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: "#button-next",
            prevEl: "#button-prev",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,


            },
            992: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 70,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
            },
        },
    });

    const validator = new FormValidator(form);

    validator.addValidator({
        name: 'type',
        method: (field) => field.value.trim().length > 0,
        message: 'Choose a type of animal!'
    })

    validator.addValidator({
        name: 'breed',
        method: (field) => field.value.trim().length > 0,
        message: 'Choose a breed!'
    })


    form.addEventListener('submit', function (event) {
        // niet vergeten!
        // anders: page refresh
        event.preventDefault()

        console.log('Submit gelukt! Geen errors!')

        sessionStorage.setItem("type",document.querySelector('#type').value);
        sessionStorage.setItem("breed",document.querySelector('#breed').value);

        document.location.href = "./adopt.html";
    })
})()

