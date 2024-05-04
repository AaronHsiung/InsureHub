# InsureHub
InsureHub is a Single Page Application (SPA) that helps users track completed insurance policies. Built with the MERN stack, the application features a React-based front-end and a Node.js/Express REST API on the backend, with MongoDB for data persistence.

# Features
- React Frontend: Interactive UI for managing insurance policies.
- REST API: Backend services written in Node.js with Express.
- MongoDB Database: Persistence of policy data.
- Real-time Updates: Real-time UI updates as policies are added or modified.

# Prerequisites
Ensure you have the following installed:
- Node.js (v14.x or later)
- MongoDB (v4.x or later)
- npm/yarn

# Installation
Clone the repository and install dependencies:
```
git clone https://github.com/AaronHsiung/InsureHub.git
cd InsureHub
npm install
```

# Configuration
Create a .env file in the project root and specify your MongoDB URI:
```
PORT=3000
MONGODB_CONNECT_STRING=mongodb://localhost:27017/yourDatabase
```
Replace mongodb://localhost:27017/yourDatabase with your actual MongoDB URI.

# Running the Application
Before running the application, ensure that your MongoDB server is running and accessible based on the connection string provided in your .env file.

## Starting the Backend Server
Navigate to the backend folder and start the server:
```
cd insurehub-rest
npm start
```

## Launching the React Application
Open a new terminal, navigate to the frontend folder, and start the React application:
```
cd insurehub-ui
npm start
```
This will launch the application on http://localhost:3000.

# API Usage
The backend API supports CRUD operations on insurance policies:
- GET /api/policies: Fetch all policies.
- POST /api/policies: Create a new policy.
- PUT /api/policies/:id: Update an existing policy.
- DELETE /api/policies/:id: Delete a policy.
