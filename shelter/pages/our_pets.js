document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".menu").classList.toggle("open")
        document.querySelector(".scroll-lock").classList.toggle("open")
    })
})

const BTN_CENTER = document.querySelector(".center");
const BTN_LEFT = document.querySelector(".left");
const BTN_LEFTEND = document.querySelector(".left-end");
const BTN_RIGHT = document.querySelector(".right");
const BTN_RIGHTEND = document.querySelector(".right-end");

const moveLeft = () => {
    
}