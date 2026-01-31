const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("User already exists");
        }

        const user = new User({ name, email, password });
        
        await user.save();
        res.redirect('/pages/login.html'); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user: " + error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send("Invalid email or password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid email or password");

        req.session.userId = user._id;
        res.redirect('/api/auth/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/pages/login.html');
});

// Profile Route
router.get('/profile', async (req, res) => {
    if (!req.session.userId) return res.redirect('/pages/login.html');
    const user = await User.findById(req.session.userId);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>a.l.i.v.e</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="/styles/styles.css">
            <style>
                body {
                    font-family: "Cormorant Garamond", serif;
                    background-color: #f4f4f9;
                }
                .profile-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .profile-card {
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                }
                .profile-card h1 {
                    font-size: 32px;
                    color: #333;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .profile-card p {
                    color: #666;
                    font-size: 16px;
                    margin-bottom: 30px;
                }
                .profile-email {
                    background-color: #f4f4f9;
                    padding: 15px;
                    border-radius: 4px;
                    margin-bottom: 30px;
                    font-size: 14px;
                    color: #555;
                }
                .logout-btn {
                    background-color: #333;
                    color: #fff;
                    border: none;
                    padding: 12px 30px;
                    font-size: 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background-color 0.3s ease;
                }
                .logout-btn:hover {
                    background-color: #555;
                }
            </style>
        </head>
        <body>
            <div class="profile-container">
                <div class="profile-card">
                    <h1>welcome, ${user.name}</h1>
                    <p>you're successfully logged in</p>
                    <div class="profile-email">
                        <strong>email:</strong> ${user.email}
                    </div>
                    <form action="/api/auth/logout" method="POST" style="display: inline;">
                        <button type="submit" class="logout-btn">logout</button>
                    </form>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});

module.exports = router;
