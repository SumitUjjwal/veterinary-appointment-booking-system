let login = document.getElementById("loginOpt");

let logindrop = document.getElementById("logindrop");
login.addEventListener("click", () => {
  if (logindrop.style.display == "none") {
    logindrop.style.display = "flex";
  } else {
    logindrop.style.display = "none";
  }
});

let logo = document.querySelector(".nvbr img");
logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});

document.querySelector("#hamburger").addEventListener("click", () => {
    let x = document.querySelector("#nav-menu>div:nth-child(2)");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  });