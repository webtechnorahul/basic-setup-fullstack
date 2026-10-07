import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { LuSend, LuBot, LuUser, LuLoader } from 'react-icons/lu';
import '../style/ChatAi.css'; // Import the clean CSS stylesheet matching your styles

const ChatAi = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Refactored to handle asynchronous network cycles safely without buggy setTimeouts
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // NOTE: Passing userMessage.text (string) matches your backend's expected destructured structure: const { question } = req.body;
      const response = await axios.post('/api/ai/chat', { question: userMessage.text });
      
      const aiResponse = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("API Communication Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I am having trouble connecting to the server right now.",
        sender: 'ai'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      
      {/* Top Application Navigation Bar / Header */}
      <header className="chat-header">
        <div className="header-icon-container">
          <LuBot className="icon-large" />
        </div>
        <div className="header-text">
          <h1 className="header-title">Core AI Agent</h1>
          <div className="status-indicator-container">
            <span className="status-pulse-dot"></span>
            <span className="status-text">Systems Operational</span>
          </div>
        </div>
      </header>

      {/* Main Container displaying the linear dialogue thread */}
      <main className="chat-main-content">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div 
              key={msg.id} 
              className={`message-row ${isAi ? 'msg-ai-row' : 'msg-user-row'}`}
            >
              {/* Conditional avatar rendering based on message ownership status */}
              <div className={`avatar-box ${isAi ? 'avatar-ai' : 'avatar-user'}`}>
                {isAi ? <LuBot className="icon-small" /> : <LuUser className="icon-small" />}
              </div>

              {/* Styled message dialogue bubble layout block */}
              <div className={`message-bubble ${isAi ? 'bubble-ai' : 'bubble-user'}`}>
                <p className="message-text-content">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {/* Dynamic visual placeholder reflecting pending computational streaming threads */}
        {isLoading && (
          <div className="message-row msg-ai-row">
            <div className="avatar-box avatar-ai">
              <LuBot className="icon-small" />
            </div>
            <div className="message-bubble bubble-ai loader-bubble">
              <LuLoader className="icon-small spin-animation loader-icon" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        
        {/* DOM node injection reference pointer used by scroll anchoring scripts */}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Interface Form capturing manual text submission blocks */}
      <footer className="chat-footer">
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="chat-submit-btn"
          >
            <LuSend className="icon-small" />
          </button>
        </form>
      </footer>

    </div>
  );
};

export default ChatAi;
