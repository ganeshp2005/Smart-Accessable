import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Tv, 
  Music, 
  Headphones, 
  Play, 
  Pause, 
  Star, 
  Sparkles, 
  Search, 
  CheckCircle,
  ExternalLink,
  Volume2,
  Maximize2,
  Film,
  Radio,
  Bookmark,
  Share2
} from 'lucide-react';
import { useOne } from '../context/OneContext';

const VIDEO_TITLES = [
  { 
    id: "v1", 
    title: "Fallout (Season 2)", 
    type: "Amazon Original Series", 
    rating: 4.8, 
    genre: "Sci-Fi / Action", 
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", 
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "48m", 
    desc: "In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits."
  },
  { 
    id: "v2", 
    title: "The Boys: Season 4", 
    type: "Amazon Original", 
    rating: 4.7, 
    genre: "Superhero / Satire", 
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", 
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "1h 12m", 
    desc: "A fun and irreverent take on what happens when superheroes abuse their superpowers rather than use them for good."
  },
  { 
    id: "v3", 
    title: "Reacher Season 3", 
    type: "Prime Action Thriller", 
    rating: 4.9, 
    genre: "Action / Crime", 
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=800&q=80", 
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "52m", 
    desc: "When retired Military Police Officer Jack Reacher is arrested for a murder he did not commit, he finds himself in the middle of a deadly conspiracy."
  }
];

const MUSIC_TRACKS = [
  { id: "m1", title: "Blinding Lights (Ultra HD Spatial)", artist: "The Weeknd", album: "After Hours", duration: "3:20", genre: "Synthwave / Pop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
  { id: "m2", title: "Ra Ra Rakkamma (Kannada Hit)", artist: "Sunidhi Chauhan, Nakash Aziz", album: "Vikrant Rona", duration: "3:42", genre: "Regional Indian", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80" },
  { id: "m3", title: "Kesariya (Hindi Romantic)", artist: "Arijit Singh, Pritam", album: "Brahmastra", duration: "4:28", genre: "Bollywood Melody", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80" },
  { id: "m4", title: "Midnight City (Lossless 24-bit)", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:03", genre: "Electronic Ambient", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "https://images.unsplash.com/photo-1445985543469-433ecdd625a6?auto=format&fit=crop&w=400&q=80" }
];

const AUDIBLE_TITLES = [
  { id: "a1", title: "Atomic Habits: An Easy & Proven Way to Build Good Habits", author: "James Clear", narrator: "James Clear", rating: 4.9, duration: "5 hrs 35 mins", chapter: "Chapter 1: The Surprising Power of Atomic Habits", sampleAudio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80" },
  { id: "a2", title: "Project Hail Mary: A Novel", author: "Andy Weir", narrator: "Ray Porter (Audie Award Winner)", rating: 4.9, duration: "16 hrs 10 mins", chapter: "Chapter 3: Solitary Awakening in Erid Space", sampleAudio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" }
];

export default function OneEntertainment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'video';
  const { showToast } = useOne();

  // Active playing states
  const [activeVideo, setActiveVideo] = useState(VIDEO_TITLES[0]);
  const [activeMusicTrack, setActiveMusicTrack] = useState(MUSIC_TRACKS[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeAudible, setActiveAudible] = useState(AUDIBLE_TITLES[0]);

  const handlePlayMusic = (track) => {
    setActiveMusicTrack(track);
    setIsAudioPlaying(true);
    showToast(`Streaming in Ultra HD: "${track.title}"`, 'success');
  };

  return (
    <div className="entertainment-immersive-root">
      {/* Prime Media Cinema Banner */}
      <div className="cinema-header-strip">
        <div className="cinema-brand">
          <Film size={20} className="text-amber-500" />
          <span className="brand-text">Amazon One <strong>Cinema & Studio Hub</strong></span>
        </div>

        {/* Tab Switcher */}
        <div className="immersive-tabs-row">
          <button 
            type="button" 
            onClick={() => setSearchParams({ tab: 'video' })}
            className={`imm-tab-btn ${activeTab === 'video' ? 'tab-video-active' : ''}`}
          >
            <Tv size={16} /> Prime Video Theater
          </button>
          <button 
            type="button" 
            onClick={() => setSearchParams({ tab: 'music' })}
            className={`imm-tab-btn ${activeTab === 'music' ? 'tab-music-active' : ''}`}
          >
            <Music size={16} /> Amazon Music Ultra HD
          </button>
          <button 
            type="button" 
            onClick={() => setSearchParams({ tab: 'audible' })}
            className={`imm-tab-btn ${activeTab === 'audible' ? 'tab-audible-active' : ''}`}
          >
            <Headphones size={16} /> Audible Spoken Word
          </button>
        </div>
      </div>

      {/* SUB-APP 1: PRIME VIDEO CINEMA THEATER */}
      {activeTab === 'video' && (
        <div className="video-theater-layout">
          {/* Main Hero Video Player */}
          <div className="theater-screen-card">
            <div className="video-player-container">
              <video 
                key={activeVideo.id}
                controls 
                autoPlay={false}
                poster={activeVideo.image}
                className="cinema-video-element"
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video preview.
              </video>
            </div>

            <div className="screen-metadata-bar">
              <div>
                <span className="theater-badge">{activeVideo.type}</span>
                <h2 className="screen-title">{activeVideo.title}</h2>
                <div className="screen-tags">
                  <span className="rating-badge">★ {activeVideo.rating} IMDb</span>
                  <span>{activeVideo.genre}</span>
                  <span>•</span>
                  <span>4K HDR 10+</span>
                  <span>•</span>
                  <span>Spatial Audio</span>
                </div>
              </div>

              <div className="screen-actions">
                <a href="https://www.primevideo.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                  <span>Watch on Prime Video</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <p className="screen-synopsis">{activeVideo.desc}</p>
          </div>

          {/* Prime Video Queue Playlist */}
          <div className="video-queue-sidebar">
            <h3 className="queue-title">Up Next on Prime Video</h3>
            <div className="queue-items-list">
              {VIDEO_TITLES.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => { setActiveVideo(item); showToast(`Loaded "${item.title}" into player`, 'info'); }}
                  className={`queue-item ${activeVideo.id === item.id ? 'queue-item-active' : ''}`}
                >
                  <img src={item.image} alt={item.title} className="queue-thumb" />
                  <div className="queue-meta">
                    <span className="queue-genre">{item.genre}</span>
                    <h4 className="queue-name">{item.title}</h4>
                    <span className="queue-dur">{item.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-APP 2: AMAZON MUSIC ULTRA HD STUDIO */}
      {activeTab === 'music' && (
        <div className="music-studio-layout">
          {/* Left: Interactive Media Player Console */}
          <div className="music-player-card card-base">
            <div className="album-art-wrap">
              <img src={activeMusicTrack.cover} alt={activeMusicTrack.title} className="album-art-img" />
              <div className="ultra-hd-badge">
                <Sparkles size={13} /> 24-bit / 192 kHz FLAC (Ultra HD)
              </div>
            </div>

            <div className="player-track-info">
              <h2 className="player-track-title">{activeMusicTrack.title}</h2>
              <p className="player-track-artist">{activeMusicTrack.artist} — {activeMusicTrack.album}</p>
            </div>

            {/* Simulated Audio Stream Control */}
            <div className="audio-control-bar">
              <audio 
                controls 
                src={activeMusicTrack.audioUrl} 
                className="html5-audio-element"
                autoPlay={false}
              />
            </div>

            <div className="audio-perks-row">
              <span>✓ Dolby Atmos Spatial Audio</span>
              <span>✓ Offline Prime Downloads</span>
              <span>✓ Lyrics Sync</span>
            </div>
          </div>

          {/* Right: Regional Indian & Global Track Catalog */}
          <div className="music-catalog-card card-base">
            <div className="catalog-header">
              <h3 className="catalog-title">Curated Trending Tracks (Kannada, Hindi & Global)</h3>
              <span className="badge-pass">Ad-Free Prime Music</span>
            </div>

            <div className="track-table">
              {MUSIC_TRACKS.map((t, idx) => (
                <div 
                  key={t.id} 
                  onClick={() => handlePlayMusic(t)}
                  className={`track-row ${activeMusicTrack.id === t.id ? 'track-row-active' : ''}`}
                >
                  <span className="track-num">0{idx + 1}</span>
                  <img src={t.cover} alt={t.title} className="track-thumb" />
                  <div className="track-names">
                    <strong>{t.title}</strong>
                    <span>{t.artist}</span>
                  </div>
                  <span className="track-genre-pill">{t.genre}</span>
                  <span className="track-dur">{t.duration}</span>
                  <button type="button" className="track-play-btn">
                    <Play size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-APP 3: AUDIBLE SPOKEN WORD AUDIOBOOK STUDIO */}
      {activeTab === 'audible' && (
        <div className="audible-studio-layout">
          <div className="audible-player-hero card-base">
            <div className="audible-hero-grid">
              <img src={activeAudible.cover} alt={activeAudible.title} className="audible-cover-large" />
              <div className="audible-hero-meta">
                <span className="audible-badge">Audible Original Bestseller</span>
                <h2 className="audible-title-lg">{activeAudible.title}</h2>
                <p className="audible-author">Written by <strong>{activeAudible.author}</strong></p>
                <p className="audible-narrator">Narrated with nuance by <strong>{activeAudible.narrator}</strong></p>
                
                <div className="audible-rating-strip">
                  <span className="badge-pass">★ {activeAudible.rating} (34,000+ member reviews)</span>
                  <span className="text-muted">• Unabridged Audiobook ({activeAudible.duration})</span>
                </div>

                <div className="audible-sample-box">
                  <span className="chapter-label">Sample Chapter Preview:</span>
                  <p className="chapter-title">{activeAudible.chapter}</p>
                  <audio controls src={activeAudible.sampleAudio} className="audible-audio-control" />
                </div>
              </div>
            </div>
          </div>

          {/* Audible Library Queue */}
          <div className="audible-library-grid">
            {AUDIBLE_TITLES.map(item => (
              <div 
                key={item.id} 
                onClick={() => { setActiveAudible(item); showToast(`Loaded narration for "${item.title}"`, 'info'); }}
                className={`audible-card card-base ${activeAudible.id === item.id ? 'audible-card-active' : ''}`}
              >
                <img src={item.cover} alt={item.title} className="audible-card-thumb" />
                <div>
                  <h4 className="audible-card-title">{item.title}</h4>
                  <p className="audible-card-sub">By {item.author}</p>
                  <span className="audible-card-time">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .entertainment-immersive-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .cinema-header-strip {
          background: #0f172a;
          color: #ffffff;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          box-shadow: var(--shadow-md);
        }
        .cinema-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .brand-text {
          font-size: 0.95rem;
          color: #cbd5e1;
        }
        .brand-text strong {
          color: #ffffff;
        }
        .immersive-tabs-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .imm-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .imm-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
        }
        .tab-video-active {
          background: #1e3a8a !important;
          color: #93c5fd !important;
          border-color: #3b82f6 !important;
        }
        .tab-music-active {
          background: #064e3b !important;
          color: #6ee7b7 !important;
          border-color: #10b981 !important;
        }
        .tab-audible-active {
          background: #78350f !important;
          color: #fde68a !important;
          border-color: #f59e0b !important;
        }
        /* Video Theater */
        .video-theater-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 1.75rem;
        }
        .theater-screen-card {
          background: #020617;
          border-radius: var(--radius-lg);
          overflow: hidden;
          color: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }
        .video-player-container {
          background: #000000;
          aspect-ratio: 16 / 9;
          width: 100%;
        }
        .cinema-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .screen-metadata-bar {
          padding: 1.5rem 1.5rem 0.5rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        .theater-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #60a5fa;
          margin-bottom: 0.25rem;
        }
        .screen-title {
          font-size: 1.7rem;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .screen-tags {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: #94a3b8;
        }
        .rating-badge {
          background: #f59e0b;
          color: #0f172a;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }
        .screen-synopsis {
          padding: 0 1.5rem 1.5rem 1.5rem;
          font-size: 0.9rem;
          color: #cbd5e1;
          line-height: 1.6;
        }
        .video-queue-sidebar {
          background: #0f172a;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          color: #ffffff;
        }
        .queue-title {
          font-size: 1.1rem;
          color: #ffffff;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .queue-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .queue-item {
          display: flex;
          gap: 0.85rem;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .queue-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .queue-item-active {
          background: rgba(59, 130, 246, 0.2) !important;
          border: 1px solid #3b82f6;
        }
        .queue-thumb {
          width: 80px;
          height: 55px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }
        .queue-meta {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .queue-genre {
          font-size: 0.68rem;
          color: #60a5fa;
          font-weight: 600;
        }
        .queue-name {
          font-size: 0.88rem;
          color: #ffffff;
          margin: 0.1rem 0;
        }
        .queue-dur {
          font-size: 0.72rem;
          color: #94a3b8;
        }
        /* Music Studio */
        .music-studio-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 1.75rem;
        }
        .music-player-card {
          padding: 1.75rem;
          background: #0f172a;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .album-art-wrap {
          position: relative;
          width: 240px;
          height: 240px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }
        .album-art-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ultra-hd-badge {
          position: absolute;
          bottom: 0.65rem;
          left: 0.65rem;
          right: 0.65rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          font-size: 0.68rem;
          color: #10b981;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
        }
        .player-track-title {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        .player-track-artist {
          font-size: 0.88rem;
          color: #94a3b8;
          margin-bottom: 1.25rem;
        }
        .audio-control-bar {
          width: 100%;
          margin-bottom: 1rem;
        }
        .html5-audio-element {
          width: 100%;
          filter: invert(1);
        }
        .audio-perks-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #6ee7b7;
        }
        .music-catalog-card {
          padding: 1.75rem;
          background: #ffffff;
        }
        .catalog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .catalog-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
        }
        .track-table {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .track-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          background: var(--color-surface-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .track-row:hover {
          background: #e2e8f0;
        }
        .track-row-active {
          background: #ecfdf5 !important;
          border: 1px solid #10b981;
        }
        .track-num {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted);
          width: 20px;
        }
        .track-thumb {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }
        .track-names {
          flex: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .track-names strong {
          font-size: 0.9rem;
          color: var(--color-navy-dark);
        }
        .track-names span {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .track-genre-pill {
          font-size: 0.72rem;
          color: #047857;
          background: #d1fae5;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .track-dur {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .track-play-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-navy-dark);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        /* Audible Layout */
        .audible-studio-layout {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .audible-player-hero {
          padding: 2.25rem;
          background: #ffffff;
          border-left: 5px solid var(--color-amber);
        }
        .audible-hero-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2rem;
          align-items: center;
        }
        .audible-cover-large {
          width: 100%;
          border-radius: var(--radius-lg);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }
        .audible-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #92400e;
          background: #fef3c7;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.4rem;
        }
        .audible-title-lg {
          font-size: 1.8rem;
          color: var(--color-navy-dark);
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }
        .audible-author {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 0.2rem;
        }
        .audible-narrator {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }
        .audible-rating-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .audible-sample-box {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
        }
        .chapter-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }
        .chapter-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--color-navy-dark);
          margin: 0.2rem 0 0.65rem 0;
        }
        .audible-audio-control {
          width: 100%;
        }
        .audible-library-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .audible-card {
          padding: 1.25rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }
        .audible-card:hover {
          transform: translateY(-2px);
        }
        .audible-card-active {
          border-color: var(--color-amber) !important;
          background: #fffbeb !important;
        }
        .audible-card-thumb {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          object-fit: cover;
        }
        .audible-card-title {
          font-size: 0.92rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.2rem;
        }
        .audible-card-sub {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .audible-card-time {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-amber-hover);
        }
        @media (max-width: 900px) {
          .video-theater-layout {
            grid-template-columns: 1fr;
          }
          .music-studio-layout {
            grid-template-columns: 1fr;
          }
          .audible-hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
