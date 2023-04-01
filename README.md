# Veterinary-Appointment-Booking-System

## Work Flow

![Alt Work Flow](./frontend/assets/readme/thePetVet.png)

## Endpoints

### Admin Authentication
    - Admin Register: http://localhost:8080/adminAuth/register
    - Admin Login: http://localhost:8080/adminAuth/login

### Admin
    - Get Doctors List(Method: GET): http://localhost:8080/admin/doctors
    - Get Doctor by ID(Method: GET): http://localhost:8080/admin/doctors?id=******
    - Get Appointment List(Method: GET): http://localhost:8080/admin/appointments
    - Get Appointment by ID(Method: GET): http://localhost:8080/admin/appointments?id=******
    - Update Doctor Info by ID(Method: PATCH): http://localhost:8080/admin/updateDoctor/:id
    - Remove Doctor Info by ID(Method: DELETE): http://localhost:8080/admin/removeDoctor/:id

### Appointment
    - Get Appointments List(Method: GET): http://localhost:8080/appointment
    - Get Appointments by ID(Method: GET): http://localhost:8080/appointment?id=****
    - Get Doctors List(Method: GET): http://localhost:8080/appointment/doctors
    - Create Appointment(Method: POST): http://localhost:8080/appointment/create

### Doctor Authentication
    - Doctor Register(Method: POST): http://localhost:8080/doctor/register
    - Doctor Login(Method: POST): http://localhost:8080/doctor/login