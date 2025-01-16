const conn = require("../models/connection");
const { google } = require("googleapis");
require('dotenv').config();
const axios = require("axios");
const jwt = require('jsonwebtoken');
const  { v4 : uuidv4 } =require('uuid');

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;

// Signup Controller
function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    conn.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length > 0) {
            // Email already exists
            return res.status(409).send("User already exists");
        }
        let id=uuidv4();
        // Insert new user
        conn.query("INSERT INTO users (id,email, password) VALUES (?,?,?)", [id,email, password], function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to create user");
            }

            const user = { email: email };
            const token = jwt.sign(user, process.env.secret);
            res.status(201).send({ token });
        });
    });
}

// Login Controller
function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    conn.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length > 0) {
            const user = { email: email };
            const token = jwt.sign(user, process.env.secret);
            res.status(200).send({ token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
}

// Google Login Controller
async function googleLogin(req, res) {
    try {
        const token = req.body.code;

        const client = new google.auth.OAuth2(client_id, client_secret, 'postmessage');
        const response = await client.getToken(token);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.tokens.access_token}`
        );

        const { email, name } = userRes.data;

        conn.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }

            if (result.length > 0) {
                const user = { email: email };
                const token = jwt.sign(user, process.env.secret);
                res.status(200).send({ token });
            } else {
                res.status(404).send("User does not exist");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error logging in with Google");
    }
}

// Google Signup Controller
async function googleSignup(req, res) {
    try {
        const token = req.body.code;

        const client = new google.auth.OAuth2(client_id, client_secret, 'postmessage');
        const response = await client.getToken(token);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.tokens.access_token}`
        );

        const { email, name } = userRes.data;

        conn.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Database error");
            }

            if (result.length > 0) {
                return res.status(409).send("User already exists");
            }
            let id=uuidv4();
            conn.query("INSERT INTO users (id,email, password) VALUES (?,?,'')", [id,email,''], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Failed to create user");
                }

                const user = { email: email };
                const token = jwt.sign(user, process.env.secret);
                res.status(201).send({ token });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error signing up with Google");
    }
}

module.exports = { login, signup, googleLogin, googleSignup };
