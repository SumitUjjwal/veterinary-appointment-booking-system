document.querySelector("#loginDoc").addEventListener("submit", loginFun);

let url = "http://localhost:8080/adminAuth/login";

// Login
async function loginFun(event) {
  event.preventDefault();
  try {
    let allInputTags = document.querySelectorAll("#loginDoc input");
    let userObj = {};
    for (let i = 0; i < allInputTags.length - 1; i++) {
      userObj[allInputTags[i].id] = allInputTags[i].value;
    }
    console.log(userObj);

    let loginRequest = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    console.log(loginRequest);
    
    if (loginRequest.ok) {
      let token = await loginRequest.json();
      console.log(token);
      sessionStorage.setItem("accessToken", token.token);
      alert("Admin Login Succcesfully");

      sessionStorage.setItem("loginId", token.admin);
      document.getElementById("loginOpt").textContent = token.admin;
      window.location.href = "../html/adminDashboard.html";
    } else {
      console.log({ err: "Something went wrong" });
    }
  } catch (err) {
    console.log({ err: err.message });
  }
};
