const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentPortal', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// Profile Schema
const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link profile to the user
    name: String,
    address: String,
    gender: String,
    age: Number,
    dob: Date,
    email: String,
    course: String
});
const Profile = mongoose.model('Profile', profileSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sign-up.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-up.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login.html'); // Redirect to login page after signup
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error during signup.');
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/profile.html'); // Redirect to a profile/dashboard page
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error during login.');
    }
});

// Profile submission route
app.post('/submit-profile', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized: Please log in.');
    }

    try {
        const profileData = req.body;
        profileData.userId = req.session.user._id; // Link profile to the logged-in user
        const profile = new Profile(profileData);
        await profile.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

