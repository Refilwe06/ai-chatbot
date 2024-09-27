const db = require('../db');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

const main = async (messages) => {
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}


router.post('/send-message', authMiddleware, async (req, res) => {
    const { prompt, user_id, session_id } = req.body;
    try {
        let messages = [];

        if (!session_id) {
            messages.push(
                {
                    role: 'user',
                    content: prompt
                }
            )
            const assistant = await main(messages);
            messages.push(
                {
                    role: 'assistant',
                    content: assistant
                }
            )
            const insertQuery = `INSERT INTO chat_sessions (user_id, first_question, question_history) VALUES(?, ?, ?)`;
            const [newChat] = await db.execute(insertQuery, [user_id, prompt, [...messages]]);

            const [result] = await db.execute(`SELECT * from chat_sessions WHERE session_id = ?`, [newChat.insertId]);

            return res.send(result);
        }

        const selectQuery = `SELECT * from chat_sessions WHERE session_id = ?`;
        const [dbChats] = await db.execute(selectQuery, [+session_id]);
        const recordToUpdate = { ...dbChats[0] };

        messages = [
            ...recordToUpdate.question_history,
            {
                role: 'user',
                content: prompt
            }
        ]
        const assistant = await main(messages);
        messages.push(
            {
                role: 'assistant',
                content: assistant
            }
        )

        const updateQuery = `UPDATE chat_sessions SET question_history = ? WHERE session_id = ?`;

        await db.execute(updateQuery, [[...messages], recordToUpdate.session_id]);
        const [result] = await db.execute(`SELECT * from chat_sessions WHERE session_id = ?`, [recordToUpdate.session_id]);

        res.send(result);
    } catch (err) {
        console.error(err);
        res.send(err);
    }

})

router.get('/get-messages/:user_id', authMiddleware, async (req, res) => {
    const { user_id } = req.params;
    try {
        const selectQuery = `SELECT * from chat_sessions WHERE user_id = ?`;
        const [result] = await db.execute(selectQuery, [user_id]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

router.delete('/clear-history/:user_id', authMiddleware, async (req, res) => {
    const { user_id } = req.params;
    try {
        const deleteQuery = `DELETE FROM chat_sessions WHERE user_id = ?`;
        const [result] = await db.execute(deleteQuery, [user_id]);
        if (result.affectedRows > 0) return res.send([]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

module.exports = router;