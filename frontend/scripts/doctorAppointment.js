import Navbar from "./components/navbar.component.js";
import { alertMsg } from "./components/alertmsg.component.js";

let header = document.querySelector("header");
header.innerHTML = Navbar();
document.querySelector("#logo").onclick = () => {
  location.href = "../index.html";
};

let objdata;
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let ownerName = form.OwnerName.value;
  let ownerEmail = form.email.value;
  let ownerPhone = form.phone.value;
  let petCategory = form.PetCategory.value;
  let petIssue = form.PetIssue.value;
  let appointmentDate = form.date.value;

  if (
    ownerName != "" &&
    ownerEmail != "" &&
    ownerPhone != "" &&
    petCategory != "" &&
    petIssue != "" &&
    appointmentDate != ""
  ) {
    objdata = {
      ownerName,
      ownerEmail,
      ownerPhone,
      petCategory,
      petIssue,
      appointmentDate,
    };
    alertMsg("Form submitted Successfully.", "success");
    console.log(objdata);
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
