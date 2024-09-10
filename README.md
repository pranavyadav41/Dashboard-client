# Employee Management System Frontend

## Overview
This project is a React-based frontend for an Employee Management System. It provides an intuitive interface for easily adding, editing, and deleting employee records.

## Features
- Add new employees
- Edit existing employee information
- Delete employee records
- User-friendly interface

## Technologies Used
- React
- Vite
- Axios for API requests
- Formik & Yup for form handling and validation
- React Router for navigation
- Framer Motion for animations
- React Toastify for notifications
- Tailwind CSS for styling

## Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- Git

## Related Repositories
- Backend Repository: [https://github.com/pranavyadav41/Dashboard-server](https://github.com/pranavyadav41/Dashboard-server)

## Installation

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the backend URL:
   - Open `src/api/employee.js`
   - Modify the `API_BASE_URL` constant to point to your backend:
     ```javascript
     const API_BASE_URL = 'your_backend_url';
     ```

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

Note: Ensure that your backend server is also running and accessible at the URL specified in `API_BASE_URL`. Refer to the backend repository for instructions on setting up and running the server.

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run lint`: Runs the linter
- `npm run preview`: Previews the production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.