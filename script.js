

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btnShop = document.getElementById("btnShop");

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

    btnShop.textContent = "Sell currency";
    btnShop.style.backgroundColor = "red";
    btnShop.style.color = "white";
});


btn3.addEventListener("click", () => {
    btn1.className = "btn2";
    btn1.style.fontWeight = "normal"
    btn2.className = "btn2";
    btn3.className = "btn1";

    btnShop.textContent = "Buy currency";
    btnShop.style.backgroundColor = "rgb(162, 255, 13)";
    btnShop.style.color = "black";

});
