import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  AlertCircle, 
  User, 
  Cpu, 
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { api } from '../services/api';

const DEFAULT_SUGGESTIONS = [
  "Why does this product not match my requirements?",
  "Which alternative is better for my budget?",
  "Does this product have enough RAM for machine learning?",
  "Which important specification should I verify before buying?"
];

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "assistant",
      text: "Hello! I am your Amazon Alexa+ shopping assistant. I evaluate hardware specifications, analyze return catalysts, and help verify if a product truly matches your intended use case. What are you looking to purchase today?",
      timestamp: "Just now",
      suggestions: DEFAULT_SUGGESTIONS
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setErrorState(null);

    try {
      const response = await api.askAssistant(query);
      const assistantMessage = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: response.reply,
        timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions || DEFAULT_SUGGESTIONS
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setErrorState("Connection to assistant failed. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: "Conversation reset. Feel free to ask about any laptop, phone, or audio specification, or describe your planned workload!",
        timestamp: "Just now",
        suggestions: DEFAULT_SUGGESTIONS
      }
    ]);
  };

  return (
    <div className="page-wrapper">
      <div className="chat-layout card-base">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-brand">
            <div className="bot-avatar">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="chat-bot-name">Amazon Alexa+ Assistant</h2>
              <span className="chat-bot-status">
                <span className="status-dot"></span> Active • Ready for Hardware Inquiries
              </span>
            </div>
          </div>

          <div className="chat-header-actions">
            <button 
              type="button" 
              onClick={handleClearChat}
              className="chat-action-btn"
              title="Reset conversation"
            >
              <RefreshCw size={15} />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Suggested Quick Inquiries Bar */}
        <div className="suggested-pills-bar">
          <span className="pills-label">
            <Sparkles size={14} className="text-amber-500" /> Suggested Inquiries:
          </span>
          <div className="pills-scroll-row">
            {DEFAULT_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSuggestionClick(sug)}
                className="sug-pill-btn"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="chat-messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'message-user' : 'message-assistant'}`}>
              <div className="message-avatar">
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className="message-content-wrap">
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                </div>
                <span className="message-time">{msg.timestamp}</span>

                {/* Inline follow-up suggestions */}
                {msg.sender === 'assistant' && msg.suggestions && (
                  <div className="inline-suggestions-row">
                    {msg.suggestions.slice(0, 2).map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSuggestionClick(item)}
                        className="inline-sug-btn"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message-row message-assistant">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorState && (
            <div className="chat-error-banner">
              <AlertCircle size={16} />
              <span>{errorState}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form 
          className="chat-input-bar" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about specs, why a product failed compatibility, or budget alternatives..."
            className="chat-input-field"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={isTyping || !inputValue.trim()}
            className="chat-send-btn btn-primary"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <style>{`
        .chat-layout {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 680px;
          background: #ffffff;
          overflow: hidden;
        }
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background-color: var(--color-navy-dark);
          color: #ffffff;
        }
        .chat-header-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .bot-avatar {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0f172a;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-bot-name {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.15rem;
        }
        .chat-bot-status {
          font-size: 0.78rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
        }
        .chat-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #cbd5e1;
          font-size: 0.8rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .chat-action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }
        .suggested-pills-bar {
          background: #f8fafc;
          border-bottom: 1px solid var(--color-border);
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
        }
        .pills-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-muted);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .pills-scroll-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          white-space: nowrap;
        }
        .sug-pill-btn {
          background: #ffffff;
          border: 1px solid var(--color-border);
          color: var(--color-navy-dark);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .sug-pill-btn:hover {
          background: var(--color-amber-light);
          border-color: var(--color-amber);
          color: #92400e;
        }
        .chat-messages-container {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #fdfdfd;
        }
        .message-row {
          display: flex;
          gap: 0.75rem;
          max-width: 82%;
        }
        .message-assistant {
          align-self: flex-start;
        }
        .message-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .message-assistant .message-avatar {
          background: var(--color-navy-dark);
          color: var(--color-amber);
        }
        .message-user .message-avatar {
          background: var(--color-amber);
          color: #0f172a;
        }
        .message-content-wrap {
          display: flex;
          flex-direction: column;
        }
        .message-user .message-content-wrap {
          align-items: flex-end;
        }
        .message-bubble {
          padding: 0.9rem 1.15rem;
          border-radius: var(--radius-lg);
          font-size: 0.92rem;
          line-height: 1.55;
        }
        .message-assistant .message-bubble {
          background-color: #f1f5f9;
          color: #1e293b;
          border-bottom-left-radius: 2px;
        }
        .message-user .message-bubble {
          background-color: var(--color-navy-dark);
          color: #ffffff;
          border-bottom-right-radius: 2px;
        }
        .message-time {
          font-size: 0.72rem;
          color: var(--color-text-light);
          margin-top: 0.35rem;
        }
        .inline-suggestions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.6rem;
        }
        .inline-sug-btn {
          font-size: 0.75rem;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          cursor: pointer;
        }
        .inline-sug-btn:hover {
          border-color: var(--color-amber);
          color: var(--color-amber-hover);
        }
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.75rem 1rem;
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          background: var(--color-text-muted);
          border-radius: 50%;
          animation: pulse 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .chat-error-banner {
          background-color: var(--color-danger-bg);
          color: var(--color-danger);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chat-input-bar {
          display: flex;
          padding: 1rem 1.5rem;
          background: #ffffff;
          border-top: 1px solid var(--color-border);
          gap: 0.75rem;
        }
        .chat-input-field {
          flex: 1;
          padding: 0.8rem 1.15rem;
          font-size: 0.95rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .chat-input-field:focus {
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .chat-send-btn {
          padding: 0 1.25rem;
        }
        @media (max-width: 600px) {
          .chat-layout {
            height: calc(100vh - 160px);
            border-radius: 0;
          }
          .message-row {
            max-width: 92%;
          }
        }
      `}</style>
    </div>
  );
}
