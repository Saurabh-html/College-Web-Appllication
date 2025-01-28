"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("./index"));
const memory_code_points_1 = require("./memory-code-points");
const code_points_data_1 = __importDefault(require("./code-points-data"));
const codePoints = (0, memory_code_points_1.createMemoryCodePoints)(code_points_data_1.default);
function saslprep(input, opts) {
    return (0, index_1.default)(codePoints, input, opts);
}
saslprep.saslprep = saslprep;
saslprep.default = saslprep;
module.exports = saslprep;
//# sourceMappingURL=node.js.map

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust path as needed

const app = express();
app.use(express.json());

app.post('/api/reset-password', async (req, res) => {
    const { email, username, newPassword } = req.body;

    if (!email || !username || !newPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Find the user by email and username
        const user = await User.findOne({ email, username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Set up server to listen on port
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
