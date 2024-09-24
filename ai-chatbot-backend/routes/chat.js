const db = require('../db');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

const main = async (prompt) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": prompt }
        ],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}


router.post('/send-message', authMiddleware, async (req, res) => {
    const { prompt, user_id } = req.body;
    try {
        const aiResponse = await main(prompt);
        const question_history = {
            user: prompt,
            aiResponse
        }

        const selectQuery = `SELECT * from chat_sessions WHERE user_id = ?`;
        const [dbChats] = await db.execute(selectQuery, [user_id]);
        if (!dbChats.length) {
            const insertQuery = `INSERT INTO chat_sessions (user_id, first_question, question_history) VALUES(?, ?, ?)`;
            const [newChat] = await db.execute(insertQuery, [user_id, prompt, [question_history]]);

            const [result] = await db.execute(`SELECT * from chat_sessions WHERE session_id = ?`, [newChat.insertId]);

            return res.send(result);
        }

        const recordToUpdate = { ...dbChats[0] };

        recordToUpdate.question_history.push(question_history);
        const updateQuery = `UPDATE chat_sessions SET question_history = ? WHERE session_id = ?`;

        await db.execute(updateQuery, [recordToUpdate.question_history, recordToUpdate.session_id]);
        const [result] = await db.execute(`SELECT * from chat_sessions WHERE session_id = ?`, [recordToUpdate.session_id]);

        res.send(result);
    } catch (err) {
        console.error(err);
        res.send(err);
    }

})


module.exports = router;