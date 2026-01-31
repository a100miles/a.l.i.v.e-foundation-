const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname))); 

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000 
    }
}));

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/home.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
