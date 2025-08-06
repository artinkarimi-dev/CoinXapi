

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");

btn1.addEventListener("click", () => {
    btn1.className = "btn1_Arz";
    btn1.style.fontWeight = "bold";
    btn2.className = "btn2";
    btn3.className = "btn2";
});


btn2.addEventListener("click", () => {
    btn1.className = "btn2";
    btn1.style.fontWeight = "normal"
    btn2.className = "btn1";
    btn3.className = "btn2";
});


btn3.addEventListener("click", () => {
    btn1.className = "btn2";
    btn1.style.fontWeight = "normal"
    btn2.className = "btn2";
    btn3.className = "btn1";
});
