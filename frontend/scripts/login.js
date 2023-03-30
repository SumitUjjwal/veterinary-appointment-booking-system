document.querySelector("#signin-btn").addEventListener("click", accDataFun);

function accDataFun() {
  if (document.querySelector("#loginData").textContent != "Login") {
    return window.location.href = "../html/dashboard.html"
  }
  let fname;

  let emaillog = document.querySelector("#email").value;
  let passwordlog = document.querySelector("#password").value;

  let credential = false;

  for (let i = 0; i < accData.length; i++) {
    if (accData[i].email == emaillog && accData[i].password == passwordlog) {
      credential = true;
      fname = accData[i].firstname;
      break;
    }
  }
  if (credential == true) {
    document.querySelector("#loginData").textContent = "Logout";
    alert("Login Successfull");
    window.location.href = "../html/dashboard.html";
  } else {
    alert("Wrong Credential");
  }
}
