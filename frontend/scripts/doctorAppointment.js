import Navbar from "./components/navbar.component.js";
import { alertMsg } from "./components/alertmsg.component.js";

let header = document.querySelector("header");
header.innerHTML = Navbar();
document.querySelector("#logo").onclick = () => {
  location.href = "../index.html";
};

let objdata;
let form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let ownerName = form.OwnerName.value;
  let ownerEmail = form.email.value;
  let ownerPhone = form.phone.value;
  let petCategory = form.PetCategory.value;
  let petIssue = form.PetIssue.value;
  let appointmentDate = form.date.value;

  let doctorId = JSON.parse(localStorage.getItem("doctor_id"));

  if (
    ownerName != "" &&
    ownerEmail != "" &&
    ownerPhone != "" &&
    petCategory != "" &&
    petIssue != "" &&
    appointmentDate != ""
  ) {
    objdata = {
      doctorId,
      ownerName,
      ownerEmail,
      ownerPhone,
      petCategory,
      petIssue,
      appointmentDate,
    };

    let res = await fetch("http://localhost:8080/appointment/create", {
      method: "POST",
      body: JSON.stringify(objdata),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    if ((res.msg = "Appointment Created successfully")) {
      alertMsg("Appointment Created. Will connect with you soon", "success");
      // window.location.href = "../index.html";
    }else{
      alertMsg("Appointment Not Created", "fail");
    }

    form.OwnerName.value = null;
    form.email.value = null;
    form.phone.value = null;
    form.PetCategory.value = null;
    form.PetIssue.value = null;
    form.date.value = null;
  } else {
    alertMsg("Please fill all the details", "error");
  }
});
