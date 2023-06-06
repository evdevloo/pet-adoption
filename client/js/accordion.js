"use strict";
(function() {

    const list = document.querySelectorAll(".navbar li");
    const acc = document.querySelectorAll(".accordion-header")

    function activeLink() {
        list.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let info = this.nextElementSibling;
            if (info.style.display === "block") {
                info.style.display = "none";
            } else {
                info.style.display = "block";
            }
        });
    }


})()