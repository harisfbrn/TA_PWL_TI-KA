import React, { useState, useRef, useEffect } from 'react';
import '../ChatWindow.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
    
  //   if (newMessage.trim() === "") return;

  //   // Tambahkan pesan baru dari pengguna
  //   setMessages([...messages, { text: newMessage, sender: "sent" }]);
  //   setNewMessage(""); 

  //   // Simulasikan balasan otomatis setelah 1 detik
  //   setTimeout(() => {
  //     setMessages(prev => [...prev, { 
  //       text: "Pesan Anda sudah diterima. Terima kasih atas kontribusinya!", 
  //       sender: "received" 
  //     }]);
  //   }, 1000);
  // };

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (newMessage.trim() === "") return;

  const userMessage = newMessage;
  setMessages([...messages, { text: userMessage, sender: "sent" }]);
  setNewMessage("");

  try {
    const res = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { text: `Sentimen: ${data.sentiment}`, sender: "received" },
    ]);
  } catch (error) {
    console.error("Terjadi error:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Error saat menganalisis sentimen.", sender: "received" },
    ]);
  }
};

  return (
    <div className="chatbot-container">

      <div className="chatbot-header">
          <div className="chatbot-info">
            <h3>Pak RT</h3>
            <p className="online-status">Online</p>
          </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p className="message-text">{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message here"
        />
        <button type="submit">send</button>
      </form>
      </div>
  );
};

export default Chatbot;