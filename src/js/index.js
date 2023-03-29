const body = document.querySelector(".wrap");
const burger = document.querySelector(".header__burger");
const burgerSpanArr = document.querySelectorAll(".header__burger-span");
const menu = document.querySelector(".header__menu");

const CloseMenu = () => {
    if (menu.classList.contains("header__menu--active")) {
        for (let span of burgerSpanArr) {
            span.classList.remove("header__burger-span--opened");
        }
        menu.classList.remove("header__menu--active")
    }
};

burger.addEventListener("click", () => {
    for (let span of burgerSpanArr) {
        span.classList.toggle("header__burger-span--opened");
    }
    menu.classList.toggle("header__menu--active");
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        CloseMenu();
    }
});

body.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !e.target.closest(".header__burger")) {
        CloseMenu();
    }
});
