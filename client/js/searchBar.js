"use strict";
import {catDict,dogDict} from "./BreedList.js";
(function() {
    const selectType = document.querySelector(".type select");
    const selectBreed = document.querySelector(".breed select");
    /*
    console.log(selectType);
    console.log(selectType.options[selectType.selectedIndex].value);

     */

    selectType.addEventListener('change', function handleChange(event) {
        //console.log(event.target.value); // 👉️ get selected VALUE
        selectValue(event.target.value);
    });

    const selectValue = function(type) {
        selectBreed.innerHTML ="";
        let placeholder = document.createElement("option");
        placeholder.value = ""
        placeholder.innerText= "choose breed";
        placeholder.disabled = true;
        placeholder.selected = true;
        selectBreed.appendChild(placeholder);


        if(type === "Cat"){

            Object.keys(catDict).forEach(key => {
                let option = document.createElement("option");
                option.value = key.valueOf()
                option.innerText= key;
                selectBreed.appendChild(option);
            })

        } else if (type === "Dog"){

            Object.keys(dogDict).forEach(key => {
                let option = document.createElement("option");
                option.value = key.valueOf()
                option.innerText= key;
                selectBreed.appendChild(option);
            })

        }


    }
    selectValue(selectType.options[selectType.selectedIndex].value);

})()