let url = "http://localhost:8080/doctorAuth/register";

let applyBtn = document.querySelector("#applyBtnForm");
applyBtn.addEventListener("submit", applyDocFunc);

async function applyDocFunc(event) {
  event.preventDefault();
  try {
    let allInputTags = document.querySelectorAll("#applyBtnForm input");
    let userObj = {};
    for (let i = 0; i < allInputTags.length - 1; i++) {
      userObj[allInputTags[i].id] = allInputTags[i].value;
    }

    let specialization = document.getElementById("specialization").value;
    userObj["specialization"]=specialization;
    console.log(userObj);

    let applyRequest = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    // console.log(applyRequest);

    if (applyRequest.ok) {
      alert("Doctor Application Registered");
    } else {
      console.log({ err: "Something went wrong" });
    }
  } catch (err) {
    console.log({ err: err.message });
  }
}
