import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {  
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');

      // Call Node.js chat endpoint
      try {
        const response = await axios.post('/api/chat', { message: inputValue });

        const botMessage = { text: response.data, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error calling chat endpoint:', error);
      }
    }
  };

  const handleClearMessage = () => {
    setMessages([]);
    setInputValue('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Open AI Chat Application</h1>
        <div className="chat-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <img
                  src={message.sender === 'user' ? '/user-icon.png' : '/bot-icon.png'}
                  alt={`${message.sender} icon`}
                  className="icon"
                />
                <div className="message-text">{message.text}</div>
              </div>
            ))}
          </div>
          <div className='input-container'>
            <input
              className="App-input"
              type='text'
              name='gtText'
              value={inputValue}
              placeholder='Enter your prompt here...' 
              onChange={handleInputChange}/>
            <button onClick={handleSendMessage}>Send</button> 
            <button onClick={handleClearMessage}>Clear</button> 
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;