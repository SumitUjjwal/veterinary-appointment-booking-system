# Veterinary-Appointment-Booking-System

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

## Guidelines
- Never ever: Never push any code to the main branch.

- Use branches: Always create a new branch before starts working on a new day. Use a consistent naming convention for branches, such as fw22_0065-Day-1, where fw22_0065 is your student code and Day-1 is the day you started working on the branch.

- Pull before push: Always pull the latest changes from the main branch before pushing any changes to your branch.

- Use commit messages: Write descriptive commit messages that explain the changes you made.

- Follow best practices: Follow best practices for coding, such as using consistent indentation, avoiding hard-coded values, and using meaningful variable names.