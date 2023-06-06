export const data = async function(place) {
    let res;

    if(place === "#eventBox"){
        res = await fetch("http://localhost:3000/");

    } else if (place === ".cards") {

        res = await fetch("http://localhost:3000/v2/random/3");

    }
    if (res.ok) {
        let json = await res.json();
        makeCards(place, json);
    }


}

const makeCards = function(place,json) {

    json.data.forEach((element) => {
        let review = document.createElement("div");
        let reviewImage = document.createElement("div");
        let reviewBody = document.createElement("div");
        let stars = document.createElement("div");
        let img = document.createElement("img");
        let user = document.createElement("span");
        let comment = document.createElement("p");
        let date = document.createElement("h6");

        img.src = "./assets/img/dog1.png";
        img.alt = "user profile pic"
        user.innerText = element.firstName + " " + element.lastName;
        reviewImage.appendChild(img);
        reviewImage.appendChild(user);

        reviewImage.classList.add("cardImg");

        let correctDate = element.createdAt.split("T")[0].split("-")

        date.innerText = correctDate[2] + "-" + correctDate[1] + "-" + correctDate[0];
        comment.innerText = element.comment;

        reviewBody.appendChild(date);
        reviewBody.appendChild(comment);

        for (let i = 0; i < Math.trunc(element.rating); i++){
            let star = document.createElement("div");
            star.classList.add("fullStar");
            star.classList.add("star");
            stars.appendChild(star);
        }
        if (element.rating > Math.trunc(element.rating)){
            let star = document.createElement("div");
            star.classList.add("halfStar");
            star.classList.add("star");
            stars.appendChild(star);
        }
        for (let i = 0; i < (5-Math.round(element.rating)); i++) {
            let star = document.createElement("div");
            star.classList.add("emptyStar");
            star.classList.add("star");
            stars.appendChild(star);
        }

        stars.classList.add("stars");
        reviewBody.appendChild(stars)
        reviewBody.classList.add("cardBody")


        review.appendChild(reviewImage);
        review.appendChild(reviewBody);

        review.classList.add("reviewCard");


        if (place === ".cards"){
            review.classList.add("swiper-slide");
            document.querySelector(place).appendChild(review)
        } else {

            document.querySelector(place).appendChild(review);
        }
    });

    new Swiper(".reviewSwiper", {
        loop: true,
        loopFillGroupWithBlank: true,
        centeredSlides: false,
        fade: 'true',
        grabCursor: 'true',
        navigation: {
            nextEl: "#button-next",
            prevEl: "#button-prev",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 100,
            }
        },
    });
}