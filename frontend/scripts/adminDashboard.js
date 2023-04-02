const baseURL = "http://localhost:8080";
const thead = document.querySelector("thead");

// *******************Fetch Doctor********************
const fetchDoctors = async () => {
    const request = await fetch(`${baseURL}/admin/doctors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
    const response = await request.json();
    thead.innerHTML = `
        <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Fee</th>
            <th>Slots</th>
            <th>Status</th>
            <th>Update</th>
        </tr>
    `
    console.log(response);
    displayData(response.doctorList, "doctor");
};

fetchDoctors();

// *******************Fetch Appointments********************
const fetchAppointments = async() => {
    const request = await fetch(`${baseURL}/admin/appointments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
    const response = await request.json();
    thead.innerHTML = `
        <tr>
            <th>Appointment ID</th>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Pet Type</th>
            <th>Pet Issue</th>
            <th>Current Status</th>
        </tr>
    `
    console.log(response.appointments);
    displayData(response.appointments, "appointment");
};


// *******************Fetch Applications********************
const fetchApplications = async() => {
    const request = await fetch(`${baseURL}/admin/doctors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        }
    });
    const response = await request.json();
    thead.innerHTML = `
        <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Fee</th>
            <th>Slots</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `
    console.log(response.doctorList);
    displayData(response.doctorList, "application");
};


const displayData = async (data, category) => {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    if (category == "doctor") {
        data.map(doctor => {
            let doctorRow;
            if (doctor.status == "active") {
                doctorRow = `
                  <tr>
                    <td>${doctor._id}</td>
                    <td>${doctor.first_name} ${doctor.last_name}</td>
                    <td>${doctor.specialization}</td>
                    <td>${doctor.experience} Years</td>
                    <td>${doctor.email}</td>
                    <td>${doctor.phone}</td>
                    <td>${doctor.address}</td>
                    <td>${doctor.fees}</td>
                    <td>${doctor.slots}</td>
                    <td>${doctor.status}</td>
                    <td><a href="#" class="btn-action complete" style="background-color: green;" onclick="editDoctor('${doctor._id}')">Edit</a></td>
                  </tr>
                `;
            }
            if (doctorRow) {
                tableBody.innerHTML += doctorRow;
            }
        });
    }
    else if(category == "appointment"){
        data.map(appointment => {
            let appointmentRow;
                appointmentRow = `
                  <tr>
                    <td>${appointment._id}</td>
                    <td>${appointment.doctorId}</td>
                    <td>${appointment.ownerName}</td>
                    <td>${appointment.ownerEmail}</td>
                    <td>${appointment.ownerPhone}</td>
                    <td>${appointment.appointmentDate}</td>
                    <td>${appointment.petCategory}</td>
                    <td>${appointment.petIssue}</td>
                    <td><span class="status">${appointment.appointmentStatus}</span></td>
                  </tr>
                `;
            if (appointmentRow) {
                tableBody.innerHTML += appointmentRow;
            }
        });
    }
    else if(category == "application"){
        data.map(application => {
            let applicationRow;
            if (application.status == "pending") {
                applicationRow = `
                  <tr>
                    <td>${application._id}</td>
                    <td>${application.first_name} ${application.last_name}</td>
                    <td>${application.specialization}</td>
                    <td>${application.experience} Years</td>
                    <td>${application.email}</td>
                    <td>${application.phone}</td>
                    <td>${application.address}</td>
                    <td>${application.fees}</td>
                    <td>${application.slots}</td>
                    <td>${application.status}</td>
                    <td>
                        <select class="btn-action" onchange="action(event)">
                            <option value="">Select</option>
                            <option value="active,${application._id}" class="btn-action confirm" id="${application._id}">Confirm</option>
                            <option value="reject,${application._id}" class="btn-action reject" id="${application._id}">Reject</option>
                        </select>
                    </td>
                  </tr>
                `;
            }
            if (applicationRow) {
                tableBody.innerHTML += applicationRow;
            }
        });
    }
};

// *******************Toggle Doctor Status********************

const action = async (event) => {
    const value = event.target.value.trim().split(",");
    const status = value[0];
    const id = value[1];
    console.log(id, status);
    const obj = { status: status };
    const request = await fetch(`${baseURL}/admin/updateDoctor/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(obj)
    });
    const response = await request.json();
    console.log(response);
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

// const actionConfirm = async (event) => {
//     const id = event.target.id;
//     // console.log(id);
//     const obj = { status: "active" };
//     const request = await fetch(`${baseURL}/admin/updateDoctor/${id}`, {
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
//     const id = event.target.id;
//     // console.log(id);
//     const obj = { status: "cancel" };
//     const request = await fetch(`${baseURL}/admin/updateDoctor/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     });
//     const response = await request.json();
//     window.location.reload();
// }

const editDoctor = () => {
    console.log("edit")
}