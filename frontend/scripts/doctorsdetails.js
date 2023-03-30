import Navbar from "./components/navbar.component.js";
let header = document.querySelector("header");
header.innerHTML = Navbar();

document.querySelector("#logo").onclick = ()=>{
    location.href = "../index.html"
}