# project name: shopping small
## Setup Instructions
1. **Clone the Repository**
   git clone git@github.com:TranQuocHuuSOS/shopping_mall_server.git

2. **Install Dependencies**
    For Node.js: v20.10.0
    npm install
    npm install nodemailer

3. **Run the Application**
    For the backend server:
    npm start

4. **Setup Environment Variables**
Create a .env file in the root directory of the project and add the following environment variables:
DATABASE_USERNAME= huutran24
DATABASE_PASSWORD = R0HEXVMa0XcDTAPU
SECRET_KEY=quochuu
USERNAME_EMAIL=tcong9137@gmail.com
PASSWORD=ornp yycp jnqu ktse

**Explanation of Key Directories and Files (NodeJS)**
config/db.js: This file contains the configuration for connecting to MongoDB using Mongoose. It reads the connection string from environment variables.

controllers/bookingController.js: This file contains the logic for handling booking-related operations such as creating, updating, and deleting bookings.

middlewares/authMiddleware.js: This middleware handles authentication and ensures that only authenticated users can access certain routes.

models/bookingModel.js: This file defines the Mongoose schema and model for bookings.

routes/bookingRoutes.js: This file defines the API routes for booking-related operations and maps them to the corresponding controller functions.

app.js: This file sets up the main Express application, including middleware, routes, and error handling.

index.js: This is the entry point of the application. It starts the Express server and connects to the database.


**Backend:**
Node.js with Express: The backend is built using Node.js and Express, serving REST APIs for the frontend applications. It handles authentication, authorization, and interaction with the database.
Database: MongoDB is used for storing user data, bookings, and other relevant information.
Email Notifications: Implemented using nodemailer to send emails for booking confirmations and status updates.