import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import oAuth from 'google-auth-library';

import Users from '../models/user.js';

const { OAuth2Client } = oAuth;

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPassswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPassswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists." });

        if(password != confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Users.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const getTokens = async (req, res) => {
    const oAuth2Client = new OAuth2Client(
        process.env.AUTH_CLIENT_ID,
        process.env.AUTH_CLIENT_SECRET,
        'postmessage',
    );

    const { tokens } = await oAuth2Client.getToken(req.body.code); 

    res.status(200).json({ tokens });
};

export const decodeAccessToken = async (req, res) => {
    const token = req.body.token;

    const decodedToken = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => res.json())

    res.status(200).json(decodedToken);
};