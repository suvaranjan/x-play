const User = require("../models/User");
const Player = require("../models/Player");
const Team = require("../models/Team");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ msg: "No account found with this email." });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Wrong password" });
        }

        await user.save();

        // Generate JWT token
        const payload = {
            _id: user._id,
            email: user.email
        };

        const options = {
            expiresIn: '24h'
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        // Create a user object without the password
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({ token, user: userWithoutPassword, msg: "Login successful" });
        5
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ msg: "Server Error" });
    }
};

const register = async (req, res) => {
    try {
        // Destructure request body
        const {
            email, password, userType, fullName, address, dateOfBirth, phone, age, gender, occupation, avatar
        } = req.body;

        // Input validation
        if (!email || !password || !userType || !fullName || !address || !dateOfBirth || !phone || !age || !gender || !occupation || !avatar) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the User
        const user = new User({
            email,
            password: hashedPassword,
            userType,
            fullName,
            address,
            dateOfBirth,
            phone,
            age,
            gender,
            occupation,
            avatar
        });
        await user.save();

        // Send response
        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const registerUserAsPlayer = async (req, res) => {
    try {
        // Destructure request body
        const {
            fullName, address, dateOfBirth, phone, age, gender, occupation, avatar,
            yearsOfExperience, hoursPlayedPerWeek, titlesOwn, titlesWithSpecificTeamName,
            strikerPositionScore, wingerPositionScore, midfielderPositionScore,
            wingDefenderPositionScore, centralBackPositionScore, email, password, userType,
        } = req.body;

        // Input validation
        if (!fullName || !address || !dateOfBirth || !phone || !age || !gender || !occupation || !avatar ||
            !yearsOfExperience || !hoursPlayedPerWeek || !titlesOwn || !titlesWithSpecificTeamName ||
            !strikerPositionScore || !wingerPositionScore || !midfielderPositionScore ||
            !wingDefenderPositionScore || !centralBackPositionScore) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the User
        const user = new User({
            email,
            password: hashedPassword,
            userType,
            fullName,
            address,
            dateOfBirth,
            phone,
            age,
            gender,
            occupation,
            avatar
        });
        await user.save();

        // Create and save the Player
        const player = new Player({
            user: user._id, // Associate the player with the user
            yearsOfExperience,
            hoursPlayedPerWeek,
            titlesOwn,
            titlesWithSpecificTeamName,
            strikerPositionScore,
            wingerPositionScore,
            midfielderPositionScore,
            wingDefenderPositionScore,
            centralBackPositionScore
        });

        await player.save();

        // Send response
        res.status(201).json({ msg: 'User registered as player successfully', user, player });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = {
    login, register, registerUserAsPlayer
};
