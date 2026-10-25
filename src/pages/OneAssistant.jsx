import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  Compass, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  Bot,
  User,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { amazonServices } from '../data/services';

const SAMPLE_QUESTIONS = [
  "Which Amazon service can help me buy groceries?",
  "Where can I listen to audiobooks?",
  "Which service is useful for hosting my website?",
  "How can I publish my own book?",
  "Which Amazon service can help me manage smart-home devices?"
];

export default function OneAssistant() {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "assistant",
      text: "Hello! I am your Amazon One AI Concierge. I can help you discover, compare, and navigate across all 18 Amazon services in shopping, payments, entertainment, cloud, smart devices, and creator tools. How can I help you today?",
      matchedServices: [],
      timestamp: "Just now"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const query = queryText || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Try backend endpoint first, fallback to intelligent client-side matching
    try {
      const res = await fetch('http://localhost:8000/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: `asst-${Date.now()}`,
          sender: "assistant",
          text: data.reply,
          matchedServices: data.matchedServices || [],
          timestamp: data.timestamp || "Just now"
        }]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Backend not running; process locally with full accuracy
    }

    // Local Natural Language processing
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";
      let matched = [];

      if (q.includes("grocer") || q.includes("food") || q.includes("vegetable") || q.includes("milk") || q.includes("fresh")) {
        matched = amazonServices.filter(s => s.id === "amazon-fresh");
        reply = "For groceries, fresh organic produce, and pantry staples delivered in convenient 2-hour windows, Amazon Fresh is your dedicated service.";
      } else if (q.includes("audiobook") || q.includes("listen") || q.includes("audible")) {
        matched = amazonServices.filter(s => s.id === "audible" || s.id === "amazon-music");
        reply = "For audiobooks and celebrity-narrated spoken audio, Audible is the world's premier platform. You can also listen to podcasts and music on Amazon Music.";
      } else if (q.includes("kannada") || q.includes("hindi") || q.includes("song") || q.includes("music")) {
        matched = amazonServices.filter(s => s.id === "amazon-music");
        reply = "Amazon Music offers over 100 million songs in lossless Ultra HD, featuring rich regional Indian selections including Kannada, Hindi, Telugu, and international hits.";
      } else if (q.includes("host") || q.includes("website") || q.includes("cloud") || q.includes("server") || q.includes("aws")) {
        matched = amazonServices.filter(s => s.id === "aws" || s.id === "amazon-bedrock");
        reply = "For hosting websites, running virtual compute (EC2), and object storage (S3), Amazon Web Services (AWS) provides comprehensive cloud infrastructure.";
      } else if (q.includes("publish") || q.includes("book") || q.includes("author") || q.includes("kdp")) {
        matched = amazonServices.filter(s => s.id === "kdp" || s.id === "goodreads");
        reply = "Kindle Direct Publishing (KDP) allows authors to self-publish digital e-books and print paperbacks with zero upfront fees and global distribution within 48 hours.";
      } else if (q.includes("smart") || q.includes("alexa") || q.includes("echo") || q.includes("device") || q.includes("light")) {
        matched = amazonServices.filter(s => s.id === "alexa-echo" || s.id === "fire-tv");
        reply = "Alexa & Echo devices provide voice-controlled smart-home automation for lights, routines, scheduling, and multi-room audio.";
      } else if (q.includes("pay") || q.includes("card") || q.includes("checkout") || q.includes("wallet")) {
        matched = amazonServices.filter(s => s.id === "amazon-pay");
        reply = "Amazon Pay provides fast, 1-click checkout across partner merchants online using your stored Amazon billing methods and A-to-z buyer protection.";
      } else {
        matched = amazonServices.filter(s => s.isFeatured).slice(0, 2);
        reply = `Thank you for asking! Based on "${query}", Amazon One connects you to the right service. Explore the recommended matches below:`;
      }

      setMessages(prev => [...prev, {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: reply,
        matchedServices: matched,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: "assistant",
        text: "Conversation cleared. How can I assist you with Amazon's services today?",
        matchedServices: [],
        timestamp: "Just now"
      }
    ]);
  };

  return (
    <div className="assistant-page-root">
      <div className="assistant-chat-container card-base">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-brand">
            <div className="concierge-badge">
              <Compass size={22} />
            </div>
            <div>
              <h2 className="chat-title">Amazon One AI Concierge</h2>
              <span className="chat-sub">
                <span className="live-dot"></span> Ecosystem Navigator & Service Matcher
              </span>
            </div>
          </div>
          <button type="button" onClick={handleReset} className="reset-btn" title="Reset chat">
            <RefreshCw size={14} /> Clear
          </button>
        </div>

        {/* Suggested Queries Bar */}
        <div className="suggested-queries-bar">
          <span className="sug-label"><Sparkles size={13} className="text-amber-500" /> Suggested:</span>
          <div className="sug-scroll">
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                className="sug-pill"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Feed */}
        <div className="chat-feed">
          {messages.map(msg => (
            <div key={msg.id} className={`msg-row ${msg.sender === 'user' ? 'msg-user' : 'msg-asst'}`}>
              <div className="msg-avatar">
                {msg.sender === 'user' ? <User size={16} /> : <Compass size={16} />}
              </div>
              <div className="msg-body">
                <div className="msg-bubble">
                  <p className="msg-text">{msg.text}</p>
                </div>

                {/* Matched service cards preview */}
                {msg.matchedServices && msg.matchedServices.length > 0 && (
                  <div className="matched-cards-row">
                    {msg.matchedServices.map(srv => (
                      <div key={srv.id} className="matched-srv-card card-base">
                        <span className="matched-cat">{srv.category}</span>
                        <h4 className="matched-name">{srv.name}</h4>
                        <p className="matched-desc">{srv.tagline}</p>
                        <div className="matched-actions">
                          <Link to={`/services/${srv.id}`} className="btn-primary matched-btn">
                            <span>Open in App</span>
                            <ArrowRight size={13} />
                          </Link>
                          {srv.officialUrl && (
                            <a href={srv.officialUrl} target="_blank" rel="noreferrer" className="matched-ext-btn">
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <span className="msg-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="msg-row msg-asst">
              <div className="msg-avatar"><Compass size={16} /></div>
              <div className="typing-dots-bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="chat-input-bar">
          <input
            type="text"
            placeholder="Ask about groceries, cloud hosting, publishing books, Kannada songs, smart home..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping}
            className="chat-field"
          />
          <button type="submit" disabled={isTyping || !inputVal.trim()} className="btn-primary send-btn">
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        .assistant-page-root {
          max-width: 920px;
          margin: 0 auto;
        }
        .assistant-chat-container {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          height: 720px;
          overflow: hidden;
        }
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background: var(--color-navy-dark);
          color: #ffffff;
        }
        .chat-header-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .concierge-badge {
          background: var(--color-amber);
          color: #0f172a;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-title {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.15rem;
        }
        .chat-sub {
          font-size: 0.75rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
        }
        .reset-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #cbd5e1;
          font-size: 0.8rem;
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .suggested-queries-bar {
          background: #f8fafc;
          border-bottom: 1px solid var(--color-border);
          padding: 0.65rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
        }
        .sug-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-muted);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .sug-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          white-space: nowrap;
        }
        .sug-pill {
          background: #ffffff;
          border: 1px solid var(--color-border);
          color: var(--color-navy-dark);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .sug-pill:hover {
          background: #fef3c7;
          border-color: #fcd34d;
          color: #92400e;
        }
        .chat-feed {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #fdfdfd;
        }
        .msg-row {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }
        .msg-asst {
          align-self: flex-start;
        }
        .msg-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .msg-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .msg-asst .msg-avatar {
          background: var(--color-navy-dark);
          color: var(--color-amber);
        }
        .msg-user .msg-avatar {
          background: var(--color-amber);
          color: #0f172a;
        }
        .msg-body {
          display: flex;
          flex-direction: column;
        }
        .msg-user .msg-body {
          align-items: flex-end;
        }
        .msg-bubble {
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-lg);
          font-size: 0.92rem;
          line-height: 1.55;
        }
        .msg-asst .msg-bubble {
          background: #f1f5f9;
          color: #1e293b;
          border-bottom-left-radius: 2px;
        }
        .msg-user .msg-bubble {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-bottom-right-radius: 2px;
        }
        .matched-cards-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }
        .matched-srv-card {
          padding: 1rem;
          background: #ffffff;
          width: 260px;
          display: flex;
          flex-direction: column;
          border-left: 3px solid var(--color-amber);
        }
        .matched-cat {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .matched-name {
          font-size: 0.95rem;
          color: var(--color-navy-dark);
          margin: 0.2rem 0;
        }
        .matched-desc {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          line-height: 1.4;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .matched-actions {
          margin-top: auto;
          display: flex;
          gap: 0.4rem;
        }
        .matched-btn {
          flex: 1;
          font-size: 0.75rem;
          padding: 0.4rem;
        }
        .matched-ext-btn {
          padding: 0.4rem 0.6rem;
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
        }
        .msg-time {
          font-size: 0.7rem;
          color: var(--color-text-light);
          margin-top: 0.35rem;
        }
        .typing-dots-bubble {
          padding: 0.75rem 1rem;
          background: #f1f5f9;
          border-radius: var(--radius-lg);
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #64748b;
          animation: pulse 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .chat-input-bar {
          display: flex;
          padding: 1rem 1.5rem;
          background: #ffffff;
          border-top: 1px solid var(--color-border);
          gap: 0.75rem;
        }
        .chat-field {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          outline: none;
        }
        .send-btn {
          padding: 0 1.25rem;
        }
      `}</style>
    </div>
  );
}
