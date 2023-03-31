import Navbar from "./components/navbar.component.js";
import { alertMsg } from "./components/alertmsg.component.js";

let header = document.querySelector("header");
header.innerHTML = Navbar();

let doctorcontainer = document.getElementById("doctor_details_container");
document.querySelector("#logo").onclick = () => {
  location.href = "../index.html";
};
const fetchdata = async () => {
  const response = await fetch("http://localhost:8080/appointment/doctors");
  const data = await response.json();
  const doctors = data.doctors;
  append(doctors);
};
fetchdata();

const append = (doctors) => {
  doctors.forEach((element) => {
    let doctor_info = document.createElement("div");
    doctor_info.className = "doctor_info";

    let doctor_img = document.createElement("div");
    doctor_img.className = "doctor_img";

    let img = document.createElement("img");
    img.src = element.profile_img;

    doctor_img.append(img);

    let doctor_name = document.createElement("p");
    doctor_name.className = "doctor_name";
    doctor_name.textContent =
      "NAME: " + element.first_name + " " + element.last_name;

    let doctor_spl = document.createElement("p");
    doctor_spl.className = "doctor_spl";
    doctor_spl.textContent = "SPECIALIST: " + element.specialization;

    let doctor_exp = document.createElement("p");
    doctor_exp.className = "doctor_exp";
    doctor_exp.textContent = "Experience: " + element.experience;

    let doctor_fees = document.createElement("p");
    doctor_fees.className = "doctor_fees";
    doctor_fees.textContent = "FEES(INR): " + element.fees;

    let doctor_slots = document.createElement("p");
    doctor_slots.className = "doctor_slots";
    doctor_slots.textContent = "Availble Slots: " + element.slots;

    let booknow = document.createElement("button");
    booknow.innerText = "Book Now";
    booknow.id = "booknow";

    booknow.onclick = () => {
      if (element.slots > 0) {
        localStorage.setItem("doctor_id", JSON.stringify(element._id));
        window.location.href = "../html/doctorappointment.html";
      } else {
        alertMsg("uh oh! slots are not available please try tomorrow", "error");
      }
    };

    doctor_info.append(
      doctor_img,
      doctor_name,
      doctor_exp,
      doctor_spl,
      doctor_fees,
      doctor_slots,
      booknow
    );
    doctorcontainer.append(doctor_info);
  });
};
