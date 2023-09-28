# 🩺 Appointments App Backend 📅

A backend system for doctors to manage their work schedules and for users to book/cancel appointments.

## 🌟 Features

- **Doctor's Schedule**: Doctors can input their work schedule. Time slots are represented in 2400 format (e.g., 1000-1100, 1100-1200).
- **User Bookings**: Users can book available time slots and cancel their appointments, freeing up the slot.
- **Restrictions**: Users cannot book outside the doctor's schedule or in already booked slots.
- **Doctor's Control**: Doctors can cancel all appointments for a day.
- **Security**: JWT authentication, authorization, and input validations using Joi.

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js
- MongoDB

### 📥 Installation

1. **Clone the Repository**:
   ```bash
   git clone [repository-link]
  
2. **Install Dependencies:
```bash
npm install
```

3. **Environment Setup: Set up environment variables for JWT secret and MongoDB URI.

4. Run the Server:
```bash
npm start 
```

📜 API Endpoints
🔐 Authentication
Login: POST /auth/login
Register: POST /auth/register

🩺 Doctor
Set Schedule: POST /doctor/schedule
Cancel All Appointments for the Day: DELETE /doctor/appointments

🙋 User
Book Appointment: POST /user/appointment
Cancel Appointment: DELETE /user/appointment/:id
View Available Slots: GET /user/slots

🛡️ Security
JWT Authentication: Secure routes are protected using JWT tokens.
Authorization: Ensure users can only access and modify their own data.
Joi Validation: All inputs are validated using Joi to ensure data integrity.

🎨 Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first.

📝 License
This project is licensed under the MIT License.
