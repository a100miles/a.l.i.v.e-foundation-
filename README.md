a.l.i.v.e - Authentication System
A secure authentication system built with Node.js, Express, MongoDB, and Bcrypt. This project implements user registration, login, and session management with secure password hashing.

📋 Features
✅ User Registration - Create new accounts with validation
✅ Secure Login - Email/password authentication with bcrypt
✅ Session Management - HTTP-only cookies with 1-hour expiration
✅ Protected Routes - Profile page accessible only to authenticated users
✅ Password Hashing - Bcryptjs with 10 salt rounds
✅ Error Handling - Proper HTTP status codes and error messages
✅ Responsive Design - Bootstrap + custom styling
✅ Modern UI - Cormorant Garamond serif font with elegant design

🛠️ Tech Stack
Backend: Node.js + Express.js

Database: MongoDB + Mongoose

Authentication: Bcryptjs + Express-session

Frontend: HTML5 + Bootstrap 5 + Custom CSS

Environment: Dotenv

📁 Project Structure
text
project/
├── config/
│   └── db.js                 # MongoDB connection setup
├── models/
│   └── user.model.js         # User schema with password hashing
├── routes/
│   └── authRoutes.js         # Authentication routes
├── pages/
│   ├── home.html             # Home page
│   ├── login.html            # Login form
│   └── signUp.html           # Registration form
├── styles/
│   └── styles.css            # Custom CSS styling
├── server.js                 # Express server setup
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .env.example              # Environment template
└── README.md                 # This file
🚀 Installation & Setup
Prerequisites
Node.js (v14 or higher)

MongoDB (local or MongoDB Atlas)

npm or yarn

Step 1: Clone/Download Project
bash
cd your-project-directory
Step 2: Install Dependencies
bash
npm install
Step 3: Create .env File
Copy .env.example to .env and update values:

bash
cp .env.example .env
text
PORT=3000
MONGO_URI=mongodb://localhost:27017/auth-system
SESSION_SECRET=your_secret_key_here_change_in_production
For MongoDB Atlas:

text
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-system?retryWrites=true&w=majority
Step 4: Start MongoDB
Local MongoDB:

bash
mongod
Or use MongoDB Atlas (cloud) - update MONGO_URI in .env

Step 5: Start the Server
Production:

bash
npm start
Development (with hot reload):

bash
npm run dev
Server will run at: http://localhost:3000

📖 API Endpoints
Method	Endpoint	Description	Auth Required
GET	/	Home page	❌
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/auth/profile	View user profile	✅
POST	/api/auth/logout	Logout user	✅
🧪 Testing with Postman
1. Register a New User
text
POST http://localhost:3000/api/auth/register

Body (form-data):
- name: John Doe
- email: john@example.com
- password: SecurePassword123

Expected: Redirect to /pages/login.html
2. Login
text
POST http://localhost:3000/api/auth/login

Body (form-data):
- email: john@example.com
- password: SecurePassword123

Expected: Session created, redirect to /api/auth/profile
3. Access Profile (Protected)
text
GET http://localhost:3000/api/auth/profile

Headers: Cookies (automatically set by browser)

Expected: User info displayed with welcome message
4. Logout
text
POST http://localhost:3000/api/auth/logout

Expected: Session destroyed, redirect to /pages/login.html
5. Try Profile Again (Should Fail)
text
GET http://localhost:3000/api/auth/profile

Expected: Redirect to login (session invalid)
🌐 Frontend Pages
Home Page (/)
Welcome screen

Navigation links to login/signup

Call-to-action buttons

Sign Up (/pages/signUp.html)
Registration form with fields:

Full Name

Email Address

Password

Confirm Password

Client-side password validation

Link to login page

Login (/pages/login.html)
Login form with fields:

Email Address

Password

Form validation

Link to signup page

Profile (/api/auth/profile)
Protected route (requires valid session)

Displays:

User's name

User's email

Logout button

Automatically redirects to login if not authenticated

🔒 Security Features
✅ Password Hashing

Bcryptjs with 10 salt rounds

Passwords never stored in plain text

Automatic hashing on registration

✅ Session Security

HTTP-only cookies (prevents XSS attacks)

Secure session storage

1-hour session expiration

Session validation on protected routes

✅ Input Validation

Required field validation

Email format checking

Unique email enforcement

Password confirmation matching

✅ Error Handling

Proper HTTP status codes

Clear error messages

No sensitive data leakage

Graceful error recovery

📝 User Model
javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
🎨 Styling
Font: Cormorant Garamond (serif)

Framework: Bootstrap 5

Color Scheme:

Background: #f4f4f9 (light gray)

Primary: #333 (dark)

Accents: #555, #666

Responsive: Mobile-friendly design

⚙️ Environment Variables
Variable	Description	Example
PORT	Server port	3000
MONGO_URI	MongoDB connection string	mongodb://localhost:27017/auth-system
SESSION_SECRET	Secret key for sessions	your_secret_key
🐛 Troubleshooting
Error: "Connection failed"
Check MongoDB is running

Verify MONGO_URI in .env is correct

Check network connection

Error: "next is not a function"
Ensure user.model.js has correct async pre-save hook

Should NOT have next parameter with async function

Error: "All fields are required"
Ensure all form fields are filled

Check field names match API expectations

Cookies not saving
Ensure cookies are enabled in browser

Check if httpOnly flag is set

Try different browser

📚 Learning Outcomes
This project demonstrates:

✅ Node.js and Express fundamentals

✅ MongoDB integration with Mongoose

✅ User authentication best practices

✅ Password security and hashing

✅ Session and cookie management

✅ Form validation and error handling

✅ REST API design

✅ Frontend-backend integration

✅ Bootstrap responsive design

✅ Environment configuration

📄 License
This project is for educational purposes.

👤 Author
Student Project - AITU

🤝 Support
For issues or questions:

Check troubleshooting section

Verify environment setup

Review error messages

Check MongoDB connection