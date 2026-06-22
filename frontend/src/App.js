import React, { useState, useEffect } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h1>Message Board</h1>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Type something..."
      />
      <button onClick={sendMessage}>Send to Backend</button>
      
      <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  );
}

export default App;