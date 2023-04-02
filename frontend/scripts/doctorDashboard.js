const baseURL = "http://localhost:8080";
const docId = sessionStorage.getItem("loginId");
const actionButtonConfirm = document.querySelector(".confirm");
const actionButtonReject = document.querySelector(".reject");
const docName = sessionStorage.getItem("docName");


// *******************Fetch Doctor Name********************
const doctorName = docName.toUpperCase();
document.getElementById("docName").innerHTML = "Dr. " + doctorName;


// *******************Fetch Appointment********************
const getAppointments = async () => {
    const request = await fetch(`${baseURL}/doctor/${docId}`);
    const response = await request.json();
    displayAppointments(response);
}
getAppointments();

// *******************Pending Appointments********************
const pendingAppointments = async () => {
    const request = await fetch(`${baseURL}/doctor/${docId}?status=pending`);
    const response = await request.json();
    displayAppointments(response);
}

// *******************Confirm Appointments********************
const confirmAppointments = async () => {
    const request = await fetch(`${baseURL}/doctor/${docId}?status=confirm`);
    const response = await request.json();
    displayAppointments(response);
}

// *******************Display Appointment********************
const displayAppointments = async (appointments) => {
    const appointmentsTableBody = document.querySelector("tbody");
    appointmentsTableBody.innerHTML = "";
    appointments.map(appointment => {
        let appointmentRow;
        if (appointment.appointmentStatus == "pending") {
            appointmentRow = `
              <tr>
                <td>${appointment._id}</td>
                <td>${appointment.ownerName}</td>
                <td>${appointment.ownerEmail}</td>
                <td>${appointment.ownerPhone}</td>
                <td>${appointment.appointmentDate}</td>
                <td>${appointment.petCategory}</td>
                <td>${appointment.petIssue}</td>
                <td><span class="status">${appointment.appointmentStatus}</span></td>
                <td><a href="#" class="btn-action confirm" id="${appointment._id}" onClick="actionConfirm(event)">Confirm</a><a href="#" class="btn-action reject" id="${appointment._id}" onClick="actionReject(event)">Reject</a></td>
              </tr>
            `;
        }
        else if (appointment.appointmentStatus == "confirm") {
            appointmentRow = `
              <tr>
                <td>${appointment._id}</td>
                <td>${appointment.ownerName}</td>
                <td>${appointment.ownerEmail}</td>
                <td>${appointment.ownerPhone}</td>
                <td>${appointment.appointmentDate}</td>
                <td>${appointment.petCategory}</td>
                <td>${appointment.petIssue}</td>
                <td><span class="status">${appointment.appointmentStatus}</span></td>
                <td><a href="#" class="btn-action complete" id="${appointment._id}" style="background-color: green;">Completed</a></td>
              </tr>
            `;
        }
        else {
            appointmentRow = `
              <tr>
                <td>${appointment._id}</td>
                <td>${appointment.ownerName}</td>
                <td>${appointment.ownerEmail}</td>
                <td>${appointment.ownerPhone}</td>
                <td>${appointment.appointmentDate}</td>
                <td>${appointment.petCategory}</td>
                <td>${appointment.petIssue}</td>
                <td><span class="status">${appointment.appointmentStatus}</span></td>
                <td><a href="#" class="btn-action reject" id="${appointment._id}" style="background-color: red;">Rejected</a></td>
              </tr>
            `;
        }


        appointmentsTableBody.innerHTML += appointmentRow;
    });
}

// *******************Toggle Appointment Status********************

const actionConfirm = async (event) => {
    const id = event.target.id;
    console.log(id);
    const obj = { appointmentStatus: "confirm" };
    const request = await fetch(`${baseURL}/doctor/status/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    const response = await request.json();
    window.location.reload();
}

const actionReject = async (event) => {
    const id = event.target.id;
    console.log(id);
    const obj = { appointmentStatus: "reject" };
    const request = await fetch(`${baseURL}/doctor/status/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    const response = await request.json();
    window.location.reload();
}


const logout = () => {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "../index.html";
    }
}