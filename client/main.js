"use strict";
import {FormValidator} from './formValidator.js';
import {data} from "./reviews.js";

(function() {

    data();

    // selecteer je form
    const form = document.querySelector('#reviewForm');
    if (!form) {
        return;
    }
    // wat als form undefined is?
    // is het dan verstandig om verder te gaan? ... HINT!

    // maak een nieuwe instantie van FormValidator
    const validator = new FormValidator(form);

    validator.addValidator({
        // name verwijst naar het name attribute op het formulierveld
        name: 'firstname',
        // method ontvangt het inputveld als argument en returnt true of false
        method: (field) => field.value.trim().length > 0,
        message: 'Voornaam is een verplicht veld en werd niet ingevuld'
    })

    validator.addValidator({
        // name verwijst naar het name attribute op het formulierveld
        name: 'lastname',
        // method ontvangt het inputveld als argument en returnt true of false
        method: (field) => field.value.trim().length > 0,
        message: 'familienaam is een verplicht veld en werd niet ingevuld'
    })

    validator.addValidator({
        // name verwijst naar het name attribute op het formulierveld
        name: 'message',
        // method ontvangt het inputveld als argument en returnt true of false
        method: (field) => field.value.trim().length >= 0,
        message: 'Incorrecte text'

    })

    validator.addValidator({
        name: 'score',
        method: field => field.value.trim().match(/^[0-9]+$/),
        message: 'Je moet de review een score geven en het moet een getal zijn',
    })

    validator.addValidator({
        name: 'privacy',
        method: field => field.checked,
        message: 'Privacy moet geaccepteerd worden'
    })






    form.addEventListener('submit', async function(event) {
        // niet vergeten!
        // anders: page refresh
        event.preventDefault()

        console.log('Submit gelukt! Geen errors!')

        let res = await fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify({
                firstName: document.getElementById("firstname").value,
                lastName: document.getElementById("lastname").value,
                message:document.getElementById("message").value,
                rating: document.getElementById("score").value,
            }),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            document.querySelector('dialog#reviewDialog').close();
            document.querySelector('#eventBox').innerHTML = "";
            data();

        } else {
            alert("Something went wrong while submitting the form!");
        }
    })
})()

