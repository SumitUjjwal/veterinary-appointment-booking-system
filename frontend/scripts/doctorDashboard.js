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
    const request = await fetch(`${baseURL}/doctor/${docId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
    const response = await request.json();
    displayAppointments(response);
}
getAppointments();

// *******************Pending Appointments********************
const pendingAppointments = async () => {
    const request = await fetch(`${baseURL}/doctor/${docId}?status=pending`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
    const response = await request.json();
    displayAppointments(response);
}

// *******************Confirm Appointments********************
const confirmAppointments = async () => {
    const request = await fetch(`${baseURL}/doctor/${docId}?status=confirm`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
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
                <td>
                    <select class="btn-action" onchange="action(event)">
                        <option value="">Select</option>
                        <option value="confirm,${appointment._id}" class="btn-action confirm" id="${appointment._id}" onchange="actionConfirm(event)">Confirm</option>
                        <option value="reject,${appointment._id}" class="btn-action reject" id="${appointment._id}" onchange="actionReject(event)">Reject</option>
                    </select>
                </td>
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
                <td><a href="#" class="btn-action complete" id="${appointment._id}" onclick="action(event)" style="background-color: green;">Mark as Complete</a></td>
              </tr>
            `;
        }
        else if (appointment.appointmentStatus == "completed") {
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
                <td><a href="#" class="btn-action complete" id="${appointment._id}" onclick="action(event)" style="background-color: green;">Completed</a></td>
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

const action = async (event) => {
    let value, status, id;
    if (event.target.value) {
        value = event.target.value.trim().split(",");
        status = value[0];
        id = value[1];
    }
    else {
        status = "completed";
        id = event.target.id;
    }
    // console.log(id, status);
    const obj = { appointmentStatus: status };
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

// const actionConfirm = async (event) => {
//     console.log("confirmAppointment")
//     const id = event.target.id;
//     console.log(id);
//     const obj = { appointmentStatus: "confirm" };
//     const request = await fetch(`${baseURL}/doctor/status/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     });
//     const response = await request.json();
//     window.location.reload();
// }

// const actionReject = async (event) => {
//     console.log("rejectAppointment")
//     const id = event.target.id;
//     console.log(id);
//     const obj = { appointmentStatus: "reject" };
//     const request = await fetch(`${baseURL}/doctor/status/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     });
//     const response = await request.json();
//     window.location.reload();
// }


const logout = () => {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "../index.html";
    }
}