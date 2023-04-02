document.querySelector("#loginDoc").addEventListener("submit", loginFun);

let url = "http://localhost:8080/doctorAuth/login";

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
    // console.log(loginRequest);
    
    if (loginRequest.ok) {
      let token = await loginRequest.json();
      sessionStorage.setItem("accessToken", token.Access_Token);
      alert("Doctor Login Succcesfully");

      sessionStorage.setItem("loginId", token.docID);
      sessionStorage.setItem("docName", token.docName);
      document.getElementById("loginOpt").textContent = token.docName;
      window.location.href = "../html/doctorDashboard.html";
    } else {
      console.log({ err: "Something went wrong" });
    }
  } catch (err) {
    console.log({ err: err.message });
  }
};
