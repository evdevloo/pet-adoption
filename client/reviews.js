"use strict";
(async () => {
    let res = await fetch("http://localhost:3000/api/v1/review");

    if (res.ok) {
        let json = await res.json();

        json.data.forEach((element) => {
            console.log(element);
            let h4 = document.createElement("h4");
            h4.innerText =
                element.firstName +
                " " +
                element.lastName +
                " | Message: " +
                element.comment +
                " | scored: " +
                element.rating +
                " | Left At: " +
                new Date(element.createdAt).toDateString();

            document.getElementById("eventBox").appendChild(h4);
        });
    }
})();