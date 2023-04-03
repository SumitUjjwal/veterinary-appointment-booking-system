# The PetVet - A Veterinary Appointment Booking System

> Project Code : bizarre-quilt-7359 <br/>
> Frontend Deployed Link :  https://thepetvet.vercel.app/ <br/>
> Backend Deployed Link : https://thepetvet.cyclic.app/

The PetVet is an online application that allows pet owners to schedule appointments with veterinarians at their convenience. The system simplifies the process of booking appointments and provides a platform for pet owners to communicate with veterinary professionals regarding their pet's health. The system aims to improve the overall quality of care provided to pets by making it easier for pet owners to access veterinary services.

### Tech Stacks used

- Frontend: - HTML
            - CSS
            - JavaScript
            - Bootstrap
            
- Backend:  - NodeJS
            - ExpressJS
            - MongoDB
            - NPM Packages

### Work Flow

![Alt Work Flow](./frontend/assets/readme/thePetVet.png)

## API Endpoints

### Admin Authentication
    - Admin Register: /adminAuth/register
    - Admin Login: /adminAuth/login

### Admin Route
    - Get Doctors List(Method: GET): /admin/doctors
    - Get Doctor by ID(Method: GET): /admin/doctors?id=******
    - Get Appointment List(Method: GET): /admin/appointments
    - Get Appointment by ID(Method: GET): /admin/appointments?id=******
    - Update Doctor Info by ID(Method: PATCH): /admin/updateDoctor/:id
    - Remove Doctor Info by ID(Method: DELETE): /admin/removeDoctor/:id

### Appointment Route
    - Get Appointments List(Method: GET): /appointment
    - Get Appointments by ID(Method: GET): /appointment?id=****
    - Get Doctors List(Method: GET): /appointment/doctors
    - Create Appointment(Method: POST): /appointment/create

### Doctor Authentication
    - Doctor Register(Method: POST): /doctorAuth/register
    - Doctor Login(Method: POST): /doctorAuth/login

### Doctor Route
    - Get Appointments List(Method: GET): /doctor/:id
    - Update Appointment Status(Method: PATCH): /doctor/status/:id