let swiper = new Swiper(".mySwiper", {
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