import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // FETCH: Get data from Backend when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // POST: Send data to Backend
  const sendMessage = () => {
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputValue })
    })
    .then(res => res.json())
    .then(data => {
      setMessages(data.messages); // Update the list with the new response
      setInputValue(""); // Clear input
    });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Message Board</h1>

      <div className="input-row">
        <input
          className="message-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>

      <ul className="message-list">
        {messages.map((m, i) => (
          <li className="message-item" key={i}>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;