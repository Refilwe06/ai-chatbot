const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, user_password } = req.body;
    try {
        const [[dbUser], _fields] = (await db.query(`SELECT * FROM users WHERE email = '${email}'`));
        if (dbUser) return res.status(409).send({ err: 'User already exists' });
        else {
            const hashedPassword = await bcrypt.hash(user_password, 10);
            const insertQuery = `INSERT INTO users (first_name, last_name, email, user_password) VALUES (?, ?, ?, ?)`;
            const newEntry = await db.query(insertQuery, [first_name, last_name, email, hashedPassword]);
            if (newEntry.affectedRows < 0) return res.status(400).send({ err: 'Error saving user details' });

            const [[newUser], _fields] = (await db.query(`SELECT * FROM users WHERE email = '${email}'`));
            const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
            delete newUser.user_password;
            res.send({ ...newUser, token });
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

router.post('/login', async (req, res) => {
    const { email, user_password } = req.body;
    try {
        const [[dbUser], _fields] = (await db.query(`SELECT * FROM users WHERE email = '${email}'`));
        if (!dbUser) return res.status(400).send({ err: 'User does not exist' });
        else {
            if (await bcrypt.compare(user_password, dbUser.user_password)) {
                delete dbUser.user_password;
                const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.send({ ...dbUser, token });
            }
            return res.status(401).json({ err: 'Invalid Credentials' })
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

module.exports = router;