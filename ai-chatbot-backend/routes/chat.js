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
            messages.push({
                role: 'user',
                content: prompt
            });

            const assistant = await main(messages);
            messages.push({
                role: 'assistant',
                content: assistant
            });


            const insertQuery = `INSERT INTO chat_sessions (user_id, first_question, question_history) VALUES (?, ?, ?)`;
            const [newChat] = await db.execute(insertQuery, [user_id, prompt, JSON.stringify(messages)]);


            const [result] = await db.execute(`SELECT * FROM chat_sessions WHERE session_id = ?`, [newChat.insertId]);

            let finalRes = result.map(res => ({ ...res, question_history: JSON.parse(res.question_history) }))
            return res.send(finalRes);
        }

        const selectQuery = `SELECT * FROM chat_sessions WHERE session_id = ?`;
        const [dbChats] = await db.execute(selectQuery, [+session_id]);

        if (dbChats.length === 0) {
            return res.status(404).send({ message: "Chat not found" });
        }

        const recordToUpdate = { ...dbChats[0] };

        let previousMessages = JSON.parse(recordToUpdate.question_history);

        messages = [
            ...previousMessages,
            {
                role: 'user',
                content: prompt
            }
        ];

        const assistant = await main(messages);
        messages.push({
            role: 'assistant',
            content: assistant
        });

        const updateQuery = `UPDATE chat_sessions SET question_history = ? WHERE session_id = ?`;
        await db.execute(updateQuery, [JSON.stringify(messages), recordToUpdate.session_id]);

        const [result] = await db.execute(`SELECT * FROM chat_sessions WHERE session_id = ?`, [recordToUpdate.session_id]);
        if (result) {
            let finalRes = result.map(res => ({ ...res, question_history: JSON.parse(res.question_history) }))
            return res.send(finalRes);
        }
        throw new Error('Error starting chat');
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", error: err });
    }
});


router.get('/get-messages/:user_id', authMiddleware, async (req, res) => {
    const { user_id } = req.params;
    try {
        const selectQuery = `SELECT * from chat_sessions WHERE user_id = ?`;
        const [result] = await db.execute(selectQuery, [user_id]);
        if (result) {
            let finalRes = result.map(res => ({ ...res, question_history: JSON.parse(res.question_history) }))
            return res.send(finalRes);
        }
        throw new Error('Error fetching chats');
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
        if (result) {
            let finalRes = result.map(res => ({ ...res, question_history: JSON.parse(res.question_history) }))
            return res.send(finalRes);
        }
        throw new Error('Error fetching chats');
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

router.post('/review-answer', authMiddleware, async (req, res) => {
    const { review, session_id } = req.body;
    try {
        const updateQuery = `UPDATE chat_sessions SET is_correct_answer = ? WHERE session_id = ?`;

        await db.execute(updateQuery, [review, session_id]);
        const [result] = await db.execute(`SELECT * from chat_sessions WHERE session_id = ?`, [session_id]);
        if (result) {
            let finalRes = result.map(res => ({ ...res, question_history: JSON.parse(res.question_history) }))
            return res.send(finalRes);
        }
        throw new Error('Error fetching chats');
    } catch (err) {
        console.error(err);
        res.send(err);
    }

})

module.exports = router;