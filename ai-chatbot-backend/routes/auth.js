const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
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
            res.send({ ...newUser, token });
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

module.exports = router;