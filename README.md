# Dental Clinic Management System

<p align="center">
  <img src="https://github.com/ayoubbezai/dential-clinc-ms/blob/main/frontend/src/assets/logos/logo_2-removebg-preview.png?raw=true" width="400">
</p>

## Introduction

The **Dental Clinic Management System** is designed to streamline clinic operations by managing appointments, patient records, financial transactions, and communication between **dentists, receptionists, and clients**. This system enhances efficiency, improves patient care, and provides valuable insights through analytics.

## Features

### User Roles

#### Dentist (Admin)

- Create, update, and delete patients.
- Contact patients via messages.
- Create folders for appointments.
- Create, update, and delete appointments.
- Add notes & prescriptions inside folders.
- Upload and manage attachments (PDFs, medical files) inside folders.
- Manage clinic finances (income, expenses, payments).
- View financial and non-financial statistics in the Overview section.
- Create and manage receptionists' accounts.

#### Receptionist

- Create, update, and delete patients.
- Contact patients via messages.
- Create folders for appointments.
- Create, update, and delete appointments.
- Add payments when clients pay.
- Cannot see financial statistics.
- Cannot see notes & prescriptions.
- Cannot create receptionists' accounts.

#### Client

- View profile (personal details, appointment history).
- View payments.
- View prescriptions.
- Message their dentist.
- View & download PDFs & attachments related to their treatment.

### Core Features

#### Appointment Management

- Create, update, delete, and search appointments.
- Real-time notifications for appointment reminders.
- Advanced search and filter by date, patient, and status (completed, pending).

#### Patient Management

- Create, update, and delete patient profiles.
- Upload and download PDFs (e.g., medical records).
- Advanced search and filter by name, appointment date, or payment status.

#### Financial Management

- Add payments and view payment history.
- View financial statistics (e.g., revenue, expenses).

#### Messaging and Notifications

- Real-time messaging between dentists and clients.
- Real-time notifications for appointments.

#### Reporting and Analytics

- View financial and functional statistics.

## Technologies Used

The system is built using modern web technologies for optimal performance and security.

### Frontend

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="50"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="50"> <img src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="50">

- **React 19** with **ShadCN (UI components)**
- **Tailwind CSS** for styling
- **State Management**: React Context or Redux

### Backend

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" width="50">

- **Laravel 12**
- **Sanctum Authentication** 
- **Role-Based Access Control (RBAC)**

### Mobile App

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="50">

- **React Native** for client-side mobile application

### Database

<img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" width="50">

- **MySQL** for structured data storage

### Authentication & Security

- **Sanctum-based authentication** (instead of JWT)
- **Role-Based Access Control (RBAC)**
- **Password Hashing (bcrypt)**
- **Data Encryption (TLS 1.3 for transmission)**
- **SQL Injection Prevention (Eloquent ORM)**
- **Three-layer Encryption for Patient Data**:
  - **Deterministic Hashing** for searchable encrypted patient data (consistent hash values for identical inputs).
  - **Random Encryption** for securing sensitive patient information uniquely.
  - **Standard Laravel Hashing** for general security.

### Deployment & Hosting

- **Frontend Hosting**: Vercel
- **Backend Hosting**: DZ-Secure Cloud
- **CDN**: To serve static assets (images, attachments) faster

## System Workflow

1. **User Authentication**: Admin, dentists, and receptionists log in securely.
2. **Patient Registration**: Patients are added to the system with their medical history.
3. **Appointment Booking**: Users schedule appointments based on doctor availability.
4. **Treatment Records**: Doctors update patient treatment progress.
5. **Billing & Payment**: Invoices are generated automatically for treatments.
6. **Reports & Analytics**: The system generates reports for better clinic management.

## Performance & Scalability

- **Lazy Loading** for React components
- **Code Splitting** using React dynamic imports
- **Database Indexing** for faster queries
- **Vertical Scaling**: Upgrade DZ-Secure Cloud resources as needed
- **Horizontal Scaling**: Load balancer + multiple Laravel instances

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ayoubbezai/dental-clinic-ms.git
   ```
2. Install dependencies:
   ```sh
   cd dental-clinic-ms
   npm install
   ```
3. Start the backend server:
   ```sh
   php artisan serve
   ```
4. Start the frontend:
   ```sh
   npm start
   ```

## Contributors

- **Ayoub Bezai** - Lead Developer
- **[Other Contributors]** - Development Team

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

