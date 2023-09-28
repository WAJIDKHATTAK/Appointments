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

