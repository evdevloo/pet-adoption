"use strict";
import {FormValidator} from './formValidator.js';
import {getPets} from "./petfinder.js";


(async function () {

    console.log(sessionStorage.getItem("type"));


    if (sessionStorage.getItem("type") === null) {
        await getPets(".petContainer",5,"Cat", "Abyssinian", "male", "baby")
    } else if (!(sessionStorage.getItem("type") === null)){
        await getPets(
            ".petContainer", 5,
            sessionStorage.getItem("type"),
            sessionStorage.getItem("breed"),
            "male,female",
            "baby, young, adult, senior");

            sessionStorage.removeItem("type",);
            sessionStorage.removeItem("breed");
    }


    const form = document.querySelector('#adoptForm');
    if (!form) {
        return;
    }

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

    validator.addValidator({
        name: 'gender',
        method: (field) => field.value.trim().length >= 0,
        message: 'Choose a gender!'

    })

    validator.addValidator({
        name: 'age',
        method: (field) => field.value.trim().length >= 0,
        message: 'Choose an age!',
    })


    form.addEventListener('submit', async function (event) {
        // niet vergeten!
        // anders: page refresh
        event.preventDefault()

        console.log('Submit gelukt! Geen errors!')

        document.querySelector('.petContainer').innerHTML = "";
        await getPets(
            ".petContainer",5,
            document.querySelector('#type').value,
            document.querySelector('#breed').value,
            document.querySelector('#gender').value,
            document.querySelector('#age').value);
    })


})()

