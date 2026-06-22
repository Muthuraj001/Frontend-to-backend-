const express = require('express');
const cors = require('cors'); // Allows the frontend to talk to the backend
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Allows the backend to read JSON data

// This is our "database" (just a variable for now)
let messages = ["Hello from the server!", "Learning is fun!"];

// 1. GET Route: Sends the list of messages to the frontend
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// 2. POST Route: Receives a new message from the frontend
app.post('/api/messages', (req, res) => {
    const newMessage = req.body.text;
    messages.push(newMessage);
    res.json({ status: "Success", messages });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});