"use strict";
import {FormValidator} from './formValidator.js';
import {data} from "./reviews.js";

(function() {

    document.querySelector('.reviewSwipe-section .containerHeader button').addEventListener('click', ()=> {
        document.querySelector('#reviewDialog').showModal();
    });

    data("#eventBox");
    data(".cards");

    const form = document.querySelector('#reviewForm');
    if (!form) {
        return;
    }

    const validator = new FormValidator(form);

    validator.addValidator({
        name: 'firstname',
        method: (field) => field.value.trim().length > 0,
        message: 'Voornaam is een verplicht veld en werd niet ingevuld'
    })

    validator.addValidator({
        name: 'lastname',
        method: (field) => field.value.trim().length > 0,
        message: 'familienaam is een verplicht veld en werd niet ingevuld'
    })

    validator.addValidator({
        name: 'message',
        method: (field) => field.value.trim().length >= 0,
        message: 'Incorrecte text'

    })

    validator.addValidator({
        name: 'rating',
        method: (field) => field.value.trim().length,
        message: 'Je moet een rating geven',
    })

    validator.addValidator({
        name: 'privacy',
        method: field => field.checked,
        message: 'Privacy moet geaccepteerd worden'
    })


    form.addEventListener('submit', async function(event) {

        event.preventDefault()
        console.log(validator.validators.filter(obj => { return obj.name === "rating"} )[0].field.value);

        console.log('Submit gelukt! Geen errors!')

        let res = await fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify({
                firstName: document.getElementById("firstname").value,
                lastName: document.getElementById("lastname").value,
                message: document.getElementById("message").value,
                rating: validator.validators.filter(obj => { return obj.name === "rating"} )[0].field.value,
            }),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            document.querySelector('dialog#reviewDialog').close();
            document.querySelector('#eventBox').innerHTML = "";
            await data();

        } else {
            alert("Something went wrong while submitting the form!");
        }
    })


})()

