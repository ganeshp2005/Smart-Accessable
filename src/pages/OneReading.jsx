import React, { useState } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  Star, 
  Sparkles, 
  CheckCircle, 
  ExternalLink,
  Plus,
  BookMarked,
  Sun,
  Moon,
  Type,
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useOne } from '../context/OneContext';

const INITIAL_BOOKS = [
  { 
    id: "b1", 
    title: "Atomic Habits", 
    author: "James Clear", 
    category: "Productivity", 
    pages: 320, 
    currentPage: 218,
    progress: 68, 
    rating: 4.9, 
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    snippet: "Changes that seem small and unimportant at first will compound into remarkable results if you are willing to stick with them for years. We all deal with setbacks, but in the long run, the quality of our lives often depends on the quality of our habits. With the same habits, you’ll end up with the same results. But with better habits, anything is possible."
  },
  { 
    id: "b2", 
    title: "Project Hail Mary", 
    author: "Andy Weir", 
    category: "Science Fiction", 
    pages: 496, 
    currentPage: 496,
    progress: 100, 
    rating: 4.9, 
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    snippet: "I’m in a spaceship. Why? What’s my name? What’s going on? I don’t know anything. I just know that my crewmates didn’t survive the coma, and the solar system is dying because an alien organism is eating the sun. And I am humanity's last hope."
  },
  { 
    id: "b3", 
    title: "Deep Work: Rules for Focused Success", 
    author: "Cal Newport", 
    category: "Cognitive Science", 
    pages: 304, 
    currentPage: 76,
    progress: 25, 
    rating: 4.7, 
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    snippet: "Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time. Deep work will make you better at what you do and provide the sense of true fulfillment that comes from craftsmanship."
  }
];

export default function OneReading() {
  const { showToast } = useOne();
  const [readingList, setReadingList] = useState(INITIAL_BOOKS);
  const [activeReadingBook, setActiveReadingBook] = useState(INITIAL_BOOKS[0]);
  
  const [readerTheme, setReaderTheme] = useState('paper'); // 'paper', 'sepia', 'night', 'mint'
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('Georgia');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [annualGoal, setAnnualGoal] = useState({ read: 14, target: 25 });
  const [highlights, setHighlights] = useState([
    { id: "h1", book: "Atomic Habits", text: "Changes that seem small and unimportant at first will compound into remarkable results if you are willing to stick with them for years.", color: "#fef08a" },
    { id: "h2", book: "Deep Work", text: "Deep work will make you better at what you do and provide the sense of true fulfillment that comes from craftsmanship.", color: "#bae6fd" }
  ]);
  const [activeXRayTerm, setActiveXRayTerm] = useState(null);

  const XRAY_TERMS = {
    "Habits": "A habit is a routine or behavior that is performed regularly—and, in many cases, automatically. James Clear explains habits through the four-step loop: Cue, Craving, Response, and Reward.",
    "Decimation": "In post-apocalyptic literature, widespread destruction of planetary infrastructure leading to subterranean survival vaults.",
    "Craftsmanship": "The dedicated mastery of focused technical or creative labor without distraction, delivering durable cognitive output."
  };

  const toggleReadAloud = () => {
    if (isReadingAloud) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      showToast("Whispersync Read Aloud paused", "info");
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeReadingBook.snippet);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsReadingAloud(false);
        window.speechSynthesis.speak(utterance);
      }
      setIsReadingAloud(true);
      showToast(`Whispersync Voice reading aloud "${activeReadingBook.title}"`, "success");
    }
  };

  const handleAddHighlight = (color) => {
    const newH = {
      id: `h-${Date.now()}`,
      book: activeReadingBook.title,
      text: activeReadingBook.snippet.slice(0, 120) + "...",
      color: color === 'yellow' ? '#fef08a' : color === 'pink' ? '#fbcfe8' : '#bae6fd'
    };
    setHighlights(prev => [newH, ...prev]);
    showToast(`Saved quote highlight to your Kindle Notebook (${color})`, "success");
  };

  const advancePages = (bookId, pagesToAdd) => {
    setReadingList(prev => prev.map(b => {
      if (b.id === bookId) {
        const nextPg = Math.min(b.pages, Math.max(1, b.currentPage + pagesToAdd));
        const nextPct = Math.round((nextPg / b.pages) * 100);
        showToast(`Whispersync updated "${b.title}" to page ${nextPg} (${nextPct}%)`, 'info');
        return { ...b, currentPage: nextPg, progress: nextPct };
      }
      return b;
    }));
  };

  return (
    <div className="kindle-experience-root">
      {/* Kindle Header Strip */}
      <div className="kindle-banner card-base">
        <div className="kindle-banner-meta">
          <div className="kindle-badge">
            <BookOpen size={14} />
            <span>Kindle E-Reader & Goodreads Challenge</span>
          </div>
          <h1 className="kindle-title">Paperwhite E-Ink Reader & Literary Studio</h1>
          <p className="kindle-sub">
            Synchronize book bookmarks across iOS, Android, and Kindle with Whispersync, adjust font typography, and monitor your 2026 Reading Challenge.
          </p>
        </div>

        {/* Goodreads Annual Challenge Card */}
        <div className="goodreads-challenge-box">
          <div className="challenge-head">
            <Award size={18} className="text-amber-500" />
            <strong>Goodreads 2026 Challenge</strong>
          </div>
          <div className="challenge-numbers">
            <span className="goal-big">{annualGoal.read} of {annualGoal.target}</span>
            <span className="goal-label">Books Read (56% Complete)</span>
          </div>
          <div className="challenge-bar">
            <div className="challenge-fill" style={{ width: `${(annualGoal.read / annualGoal.target) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* SUB-APP SECTION: KINDLE E-INK INTERACTIVE BOOK READER */}
      <div className="ereader-showcase-grid">
        {/* The Paperwhite Interactive Screen */}
        <div className={`ereader-chassis theme-${readerTheme}`}>
          <div className="ereader-top-hud">
            <span className="hud-title">{activeReadingBook.title} — {activeReadingBook.author}</span>
            <div className="hud-controls">
              {/* Font Family Selector */}
              <select 
                value={fontFamily} 
                onChange={(e) => setFontFamily(e.target.value)}
                className="font-family-select"
              >
                <option value="Georgia">Bookerly (Serif)</option>
                <option value="'Plus Jakarta Sans', sans-serif">Amazon Ember (Sans)</option>
                <option value="Georgia">Georgia</option>
                <option value="monospace">Monospace</option>
              </select>

              {/* Theme Toggles */}
              <button 
                type="button" 
                onClick={() => setReaderTheme('paper')} 
                className={`theme-btn ${readerTheme === 'paper' ? 'active' : ''}`}
                title="Paperwhite Light"
              >
                Paper
              </button>
              <button 
                type="button" 
                onClick={() => setReaderTheme('sepia')} 
                className={`theme-btn ${readerTheme === 'sepia' ? 'active' : ''}`}
                title="Warm Sepia"
              >
                Sepia
              </button>
              <button 
                type="button" 
                onClick={() => setReaderTheme('night')} 
                className={`theme-btn ${readerTheme === 'night' ? 'active' : ''}`}
                title="Dark E-Ink"
              >
                Dark
              </button>

              {/* Font Sizer */}
              <div className="font-stepper">
                <button type="button" onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="stepper-btn">A-</button>
                <span className="font-indicator">{fontSize}px</span>
                <button type="button" onClick={() => setFontSize(Math.min(26, fontSize + 1))} className="stepper-btn">A+</button>
              </div>

              {/* Whispersync Read Aloud Voice Button */}
              <button 
                type="button" 
                onClick={toggleReadAloud}
                className={`read-aloud-btn ${isReadingAloud ? 'aloud-active' : ''}`}
                title="Whispersync Read Aloud Voice"
              >
                {isReadingAloud ? "⏸ Pause Voice" : "🔊 Read Aloud"}
              </button>
            </div>
          </div>

          {/* Highlighter Tool Strip */}
          <div className="highlighter-tool-strip">
            <span className="tool-strip-label"><Bookmark size={13} /> Quick Highlight:</span>
            <div className="highlighter-pens-row">
              <button type="button" onClick={() => handleAddHighlight('yellow')} className="pen-btn bg-yellow-pen" title="Highlight Yellow"></button>
              <button type="button" onClick={() => handleAddHighlight('pink')} className="pen-btn bg-pink-pen" title="Highlight Pink"></button>
              <button type="button" onClick={() => handleAddHighlight('blue')} className="pen-btn bg-blue-pen" title="Highlight Blue"></button>
            </div>

            <div className="xray-chips-row">
              <span className="xray-label">X-Ray Lore:</span>
              {Object.keys(XRAY_TERMS).map(term => (
                <button 
                  key={term}
                  type="button"
                  onClick={() => setActiveXRayTerm(term)}
                  className="xray-chip-btn"
                >
                  ⚡ {term}
                </button>
              ))}
            </div>
          </div>

          {/* Book Text Area with Dynamic Typography */}
          <div 
            className="ereader-text-container" 
            style={{ 
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
              lineHeight: 1.75
            }}
          >
            <p className="ereader-paragraph">
              {activeReadingBook.snippet}
            </p>
          </div>

          {/* Active X-Ray Popover */}
          {activeXRayTerm && (
            <div className="xray-popover card-base">
              <div className="xray-popover-head">
                <div className="xray-popover-title">
                  <Sparkles size={14} className="text-amber-500" />
                  <strong>Kindle X-Ray: {activeXRayTerm}</strong>
                </div>
                <button type="button" onClick={() => setActiveXRayTerm(null)} className="xray-close-btn">✕</button>
              </div>
              <p className="xray-popover-body">{XRAY_TERMS[activeXRayTerm]}</p>
            </div>
          )}

          {/* E-Reader Footer HUD */}
          <div className="ereader-bottom-hud">
            <span>Page {activeReadingBook.currentPage} of {activeReadingBook.pages}</span>
            <span>{activeReadingBook.progress}% Read • 32 mins left in chapter</span>
            <div className="page-flip-actions">
              <button 
                type="button" 
                onClick={() => advancePages(activeReadingBook.id, -10)} 
                className="flip-btn"
              >
                <ChevronLeft size={16} /> Prev 10 pgs
              </button>
              <button 
                type="button" 
                onClick={() => advancePages(activeReadingBook.id, 10)} 
                className="flip-btn"
              >
                Next 10 pgs <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Bookshelf & Details */}
        <div className="bookshelf-panel card-base">
          <div className="bookshelf-head">
            <h3 className="panel-title">My Kindle Library</h3>
            <span className="badge-pass">Whispersync Active</span>
          </div>

          <div className="bookshelf-list">
            {readingList.map(b => (
              <div 
                key={b.id} 
                onClick={() => { setActiveReadingBook(b); showToast(`Loaded "${b.title}" into E-Reader`, 'info'); }}
                className={`book-item-row ${activeReadingBook.id === b.id ? 'book-row-selected' : ''}`}
              >
                <img src={b.cover} alt={b.title} className="book-thumb" />
                <div className="book-info">
                  <span className="book-genre">{b.category}</span>
                  <h4 className="book-item-title">{b.title}</h4>
                  <p className="book-item-author">{b.author}</p>
                  
                  <div className="item-progress-track">
                    <div className="item-progress-fill" style={{ width: `${b.progress}%` }}></div>
                  </div>
                  <span className="progress-txt">{b.progress}% • Page {b.currentPage} of {b.pages}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights & Notes Notebook */}
          <div className="highlights-notebook-section">
            <div className="notebook-head">
              <Bookmark size={15} className="text-amber-500" />
              <h4>Kindle Notebook & Highlights</h4>
            </div>
            <div className="highlights-list">
              {highlights.map(h => (
                <div key={h.id} className="highlight-card" style={{ borderLeftColor: h.color }}>
                  <span className="h-book-tag">{h.book}</span>
                  <p className="h-text">"{h.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .kindle-experience-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .kindle-banner {
          background: #ffffff;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-left: 5px solid #8b5cf6;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .kindle-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #6d28d9;
          background: #ede9fe;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.35rem;
        }
        .kindle-title {
          font-size: 1.85rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.35rem;
        }
        .kindle-sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          max-width: 620px;
        }
        .goodreads-challenge-box {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          min-width: 250px;
        }
        .challenge-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.5rem;
        }
        .challenge-numbers {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }
        .goal-big {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-navy-dark);
        }
        .goal-label {
          font-size: 0.72rem;
          color: var(--color-text-muted);
        }
        .challenge-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .challenge-fill {
          height: 100%;
          background: #8b5cf6;
        }
        /* E-Reader Chassis */
        .ereader-showcase-grid {
          display: grid;
          grid-template-columns: 1.7fr 1.1fr;
          gap: 1.75rem;
        }
        .ereader-chassis {
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: 0 12px 35px rgba(0,0,0,0.1);
          border: 12px solid #1e293b;
          display: flex;
          flex-direction: column;
          min-height: 480px;
          transition: background 200ms ease;
        }
        .theme-paper {
          background: #fbfbf9;
          color: #1a1a1a;
        }
        .theme-sepia {
          background: #f4ecd8;
          color: #3b2c1a;
        }
        .theme-night {
          background: #121212;
          color: #e0e0e0;
          border-color: #334155;
        }
        .ereader-top-hud {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px dashed rgba(0,0,0,0.15);
          margin-bottom: 1.5rem;
          font-size: 0.78rem;
          opacity: 0.8;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .theme-night .ereader-top-hud {
          border-bottom-color: rgba(255,255,255,0.15);
        }
        .hud-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .theme-btn {
          background: rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          cursor: pointer;
        }
        .theme-night .theme-btn {
          background: rgba(255,255,255,0.1);
          color: #ffffff;
        }
        .font-stepper {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .stepper-btn {
          background: rgba(0,0,0,0.08);
          border: none;
          padding: 0.2rem 0.45rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 700;
        }
        .font-indicator {
          font-size: 0.72rem;
          font-weight: 600;
        }
        .ereader-text-container {
          flex: 1;
          line-height: 1.85;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .ereader-paragraph {
          margin-bottom: 1.25rem;
          text-align: justify;
        }
        .ereader-bottom-hud {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px dashed rgba(0,0,0,0.15);
          margin-top: 1.5rem;
          font-size: 0.75rem;
          opacity: 0.85;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .theme-night .ereader-bottom-hud {
          border-top-color: rgba(255,255,255,0.15);
        }
        .page-flip-actions {
          display: flex;
          gap: 0.5rem;
        }
        .flip-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.12);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          cursor: pointer;
        }
        .theme-night .flip-btn {
          background: rgba(255,255,255,0.1);
          color: #ffffff;
        }
        /* Bookshelf Panel */
        .bookshelf-panel {
          padding: 1.5rem;
          background: #ffffff;
        }
        .bookshelf-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .panel-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
        }
        .bookshelf-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .book-item-row {
          display: flex;
          gap: 1rem;
          padding: 0.85rem;
          background: var(--color-surface-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
        }
        .book-item-row:hover {
          background: #e2e8f0;
        }
        .book-row-selected {
          border-color: #8b5cf6 !important;
          background: #f5f3ff !important;
        }
        .book-thumb {
          width: 55px;
          height: 80px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .book-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .book-genre {
          font-size: 0.68rem;
          font-weight: 700;
          color: #7c3aed;
          text-transform: uppercase;
        }
        .book-item-title {
          font-size: 0.95rem;
          color: var(--color-navy-dark);
          margin: 0.1rem 0;
        }
        .book-item-author {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          margin-bottom: 0.4rem;
        }
        .item-progress-track {
          height: 4px;
          background: #e2e8f0;
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        .item-progress-fill {
          height: 100%;
          background: #8b5cf6;
        }
        .progress-txt {
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }
        .font-family-select {
          background: rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          padding: 0.2rem 0.4rem;
          cursor: pointer;
        }
        .theme-night .font-family-select {
          background: rgba(255,255,255,0.1);
          color: #ffffff;
          border-color: rgba(255,255,255,0.2);
        }
        .read-aloud-btn {
          background: rgba(139, 92, 246, 0.15);
          color: #6d28d9;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          cursor: pointer;
        }
        .theme-night .read-aloud-btn {
          color: #c4b5fd;
          border-color: #a78bfa;
        }
        .aloud-active {
          background: #8b5cf6 !important;
          color: #ffffff !important;
        }
        /* Highlighter Strip */
        .highlighter-tool-strip {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0.75rem;
          background: rgba(0,0,0,0.03);
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
          font-size: 0.75rem;
          flex-wrap: wrap;
        }
        .theme-night .highlighter-tool-strip {
          background: rgba(255,255,255,0.05);
        }
        .tool-strip-label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
          opacity: 0.8;
        }
        .highlighter-pens-row {
          display: flex;
          gap: 0.35rem;
        }
        .pen-btn {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .bg-yellow-pen { background: #fef08a; }
        .bg-pink-pen { background: #fbcfe8; }
        .bg-blue-pen { background: #bae6fd; }
        .xray-chips-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-left: auto;
        }
        .xray-label {
          font-weight: 700;
          opacity: 0.7;
        }
        .xray-chip-btn {
          background: rgba(245, 158, 11, 0.15);
          color: #b45309;
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-full);
          padding: 0.15rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
        }
        .theme-night .xray-chip-btn {
          color: #fcd34d;
        }
        .xray-popover {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-top: 1rem;
          box-shadow: var(--shadow-md);
        }
        .theme-night .xray-popover {
          background: #1e293b;
          border-color: #334155;
          color: #ffffff;
        }
        .xray-popover-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .xray-popover-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-navy-dark);
        }
        .theme-night .xray-popover-title {
          color: #ffffff;
        }
        .xray-close-btn {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .xray-popover-body {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--color-text-muted);
        }
        .theme-night .xray-popover-body {
          color: #cbd5e1;
        }
        /* Notebook */
        .highlights-notebook-section {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border);
        }
        .notebook-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.75rem;
        }
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .highlight-card {
          background: #f8fafc;
          border-left: 4px solid #fef08a;
          padding: 0.65rem 0.85rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .h-book-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #7c3aed;
          display: block;
          margin-bottom: 0.2rem;
        }
        .h-text {
          font-size: 0.78rem;
          font-style: italic;
          color: var(--color-text-main);
          line-height: 1.4;
        }
        @media (max-width: 960px) {
          .ereader-showcase-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
