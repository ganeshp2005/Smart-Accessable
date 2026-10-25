import React, { useState } from 'react';
import { 
  Mic, 
  Tv2, 
  Image as ImageIcon, 
  Sparkles, 
  Power, 
  Volume2, 
  Sun, 
  CheckCircle2, 
  ExternalLink,
  Sliders,
  RotateCcw,
  Wifi,
  SlidersHorizontal,
  Home,
  Shield,
  Video,
  Play
} from 'lucide-react';
import { useOne } from '../context/OneContext';

const SMART_DEVICES = [
  { 
    id: "d1", 
    name: "Living Room Echo Show 10", 
    type: "Smart Screen Display", 
    room: "Living Room", 
    state: true, 
    volume: 65,
    screenMode: "Photo Slideshow",
    ip: "192.168.1.102",
    features: ["Motion-tracking motorized screen", "13MP camera auto-framing", "Zigbee Smart Home Hub"]
  },
  { 
    id: "d2", 
    name: "Bedroom Echo Dot (5th Gen)", 
    type: "Smart Audio Speaker", 
    room: "Master Bedroom", 
    state: true, 
    volume: 40,
    screenMode: "LED Clock Display",
    ip: "192.168.1.105",
    features: ["Temperature sensor routines", "Tap to snooze gesture", "Vibrant vocal sound"]
  },
  { 
    id: "d3", 
    name: "Fire TV Stick 4K Max", 
    type: "Streaming Player", 
    room: "Media Den", 
    state: true, 
    volume: 50,
    screenMode: "Ambient Art Mode",
    ip: "192.168.1.114",
    features: ["Wi-Fi 6E ultra-fast streaming", "Live picture-in-picture security feed", "Alexa Voice Remote Enhanced"]
  },
  { 
    id: "d4", 
    name: "Ring Video Doorbell Pro 2", 
    type: "Smart Security Camera", 
    room: "Front Porch", 
    state: true, 
    volume: 80,
    screenMode: "Live HD Camera Feed",
    ip: "192.168.1.120",
    features: ["Head-to-toe 1536p HD video", "3D Motion Detection with Bird's Eye View", "Color Night Vision"]
  },
  { 
    id: "d5", 
    name: "Smart Ambient Light Strip", 
    type: "Connected Lighting", 
    room: "Executive Office", 
    state: false, 
    brightness: 85,
    colorHex: "#f59e0b",
    screenMode: "Sunset Warm Glow",
    ip: "192.168.1.135",
    features: ["16 million RGB colors", "Sync with PC audio/music", "Automated circadian sleep rhythm"]
  }
];

const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"
];

export default function OneDevices() {
  const { showToast } = useOne();
  const [devices, setDevices] = useState(SMART_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState(SMART_DEVICES[0]);
  const [voiceInput, setVoiceInput] = useState('');
  const [voiceLog, setVoiceLog] = useState([
    { query: "Alexa, turn on living room lights", reply: "Okay, setting Ambient Light Strip to Sunset Warm Glow (85% brightness).", time: "2 mins ago" },
    { query: "Alexa, show the front door camera", reply: "Showing Ring Video Doorbell live feed on Echo Show 10.", time: "15 mins ago" }
  ]);
  const [activeRoom, setActiveRoom] = useState('All');

  const rooms = ["All", "Living Room", "Master Bedroom", "Media Den", "Front Porch", "Executive Office"];

  const filteredDevices = devices.filter(d => activeRoom === 'All' || d.room === activeRoom);

  const toggleDeviceState = (id, e) => {
    e?.stopPropagation();
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        const next = !d.state;
        showToast(`${d.name} switched ${next ? 'ON' : 'OFF'} via Alexa command`, 'info');
        return { ...d, state: next };
      }
      return d;
    }));
  };

  const speakAlexa = (text) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback
      }
    }
  };

  const executeRoutine = (routineName) => {
    let reply = "";
    if (routineName === "Good Morning") {
      setDevices(prev => prev.map(d => ({ ...d, state: true, volume: 40, brightness: 80 })));
      reply = "Good morning Ganesh! Turned on your office lights to 80%, currently 71°F in your area, and your morning briefing is ready.";
    } else if (routineName === "Leaving Home") {
      setDevices(prev => prev.map(d => d.type.includes("Lighting") ? { ...d, state: false } : d));
      reply = "Goodbye! All ambient lighting switched off, smart locks engaged, and Ring alarm armed in Away Mode.";
    } else if (routineName === "Movie Night") {
      setDevices(prev => prev.map(d => {
        if (d.type.includes("Lighting")) return { ...d, state: true, brightness: 15, colorHex: "#3b82f6" };
        if (d.name.includes("Fire TV")) return { ...d, state: true, volume: 70 };
        return d;
      }));
      reply = "Setting Movie Night mode: Dimming ambient lights to 15% sapphire blue and turning on Fire TV 4K Max.";
    } else {
      setDevices(prev => prev.map(d => ({ ...d, state: false })));
      reply = "Goodnight! All smart home devices set to standby sleep mode.";
    }

    setVoiceLog(prev => [{ query: `Alexa Routine: ${routineName}`, reply, time: "Just now" }, ...prev]);
    showToast(`Executed Alexa Routine: "${routineName}"`, "success");
    speakAlexa(reply);
  };

  const handleSendVoice = (e) => {
    e.preventDefault();
    if (!voiceInput.trim()) return;

    const q = voiceInput.toLowerCase();
    let reply = "";

    if (q.includes("light") || q.includes("turn")) {
      setDevices(prev => prev.map(d => d.type.includes("Lighting") ? { ...d, state: !d.state } : d));
      reply = "Okay, toggled your smart ambient light strip in Executive Office.";
    } else if (q.includes("door") || q.includes("camera") || q.includes("ring")) {
      reply = "Streaming live 1536p HD feed from Front Porch Ring Doorbell to your Echo Show 10 screen.";
    } else if (q.includes("weather")) {
      reply = "Currently 71°F and sunny in your area. Zero chance of precipitation for the remainder of the evening.";
    } else if (q.includes("music") || q.includes("play")) {
      reply = "Playing Amazon Music Ultra HD Spatial playlist on Echo Show 10 and Echo Dot.";
    } else {
      reply = `Okay, executed Alexa routine for "${voiceInput}". Devices in your smart home updated.`;
    }

    setVoiceLog(prev => [{ query: voiceInput, reply, time: "Just now" }, ...prev]);
    showToast("Alexa routine executed", "success");
    speakAlexa(reply);
    setVoiceInput('');
  };

  return (
    <div className="smarthome-studio-root">
      {/* Smart Home Header */}
      <div className="smarthome-header card-base">
        <div className="header-meta">
          <div className="alexa-status-badge">
            <span className="pulse-dot"></span>
            <span>Alexa Smart Home Automation Engine Active</span>
          </div>
          <h1 className="header-title">Connected Devices, Echo Show & Cameras</h1>
          <p className="header-desc">
            Directly control smart home devices, stream Ring security feeds, execute voice routines, and synchronize full-resolution photo slideshows.
          </p>
        </div>

        {/* 1-Click Alexa Routines */}
        <div className="routines-launcher-bar">
          <span className="routines-label"><Sparkles size={14} className="text-pink-500" /> Alexa 1-Click Routines:</span>
          <div className="routines-buttons-row">
            <button type="button" onClick={() => executeRoutine("Good Morning")} className="routine-btn">
              🌅 Good Morning
            </button>
            <button type="button" onClick={() => executeRoutine("Leaving Home")} className="routine-btn">
              🚪 Leaving Home
            </button>
            <button type="button" onClick={() => executeRoutine("Movie Night")} className="routine-btn">
              🎬 Movie Night
            </button>
            <button type="button" onClick={() => executeRoutine("Goodnight")} className="routine-btn">
              🌙 Goodnight
            </button>
          </div>
        </div>

        <div className="room-pills-bar">
          {rooms.map(room => (
            <button
              key={room}
              type="button"
              onClick={() => setActiveRoom(room)}
              className={`room-pill ${activeRoom === room ? 'active' : ''}`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-APP SECTION: ALEXA VOICE COMMAND CONSOLE + DEVICE CONTROLLER */}
      <div className="smarthome-main-grid">
        {/* Left: Interactive Device Cards Matrix */}
        <div className="devices-matrix-col">
          <div className="devices-grid">
            {filteredDevices.map(d => {
              const isSelected = selectedDevice.id === d.id;
              return (
                <div 
                  key={d.id} 
                  onClick={() => setSelectedDevice(d)}
                  className={`smart-device-card card-base ${isSelected ? 'card-selected' : ''}`}
                >
                  <div className="card-top-row">
                    <div className={`status-led ${d.state ? 'led-on' : 'led-off'}`}></div>
                    <button 
                      type="button" 
                      onClick={(e) => toggleDeviceState(d.id, e)}
                      className={`power-btn ${d.state ? 'btn-power-on' : 'btn-power-off'}`}
                      title="Toggle Power"
                    >
                      <Power size={15} />
                    </button>
                  </div>

                  <span className="room-label">{d.room}</span>
                  <h3 className="device-title">{d.name}</h3>
                  <p className="device-type-txt">{d.type}</p>

                  <div className="card-bottom-row">
                    <span className={d.state ? "badge-pass" : "badge-fail"} style={{ fontSize: '0.72rem' }}>
                      {d.state ? "ONLINE" : "STANDBY"}
                    </span>
                    <span className="mode-txt">{d.screenMode}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Amazon Photos Echo Screen Sync */}
          <div className="photos-sync-card card-base">
            <div className="photos-head">
              <div>
                <h3 className="section-title">Amazon Photos Cloud Screensaver (Echo Show 10)</h3>
                <p className="section-sub">Unlimited cloud photo backup automatically streamed to smart display</p>
              </div>
              <span className="badge-pass">Unlimited Prime Storage</span>
            </div>
            <div className="photos-strip">
              {SAMPLE_PHOTOS.map((src, i) => (
                <img key={i} src={src} alt="Backup" className="photo-thumb" />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Device Inspector & Alexa Voice Routine Terminal */}
        <div className="inspector-sidebar-col">
          {/* Active Device Deep Dive */}
          <div className="inspector-card card-base">
            <div className="inspector-head">
              <span className="inspector-tag">{selectedDevice.room}</span>
              <h3 className="inspector-title">{selectedDevice.name}</h3>
              <p className="inspector-type">{selectedDevice.type} • IP: {selectedDevice.ip}</p>
            </div>

            <div className="device-controls-box">
              <div className="control-row">
                <span>Power State:</span>
                <strong className={selectedDevice.state ? "text-success" : "text-muted"}>
                  {selectedDevice.state ? "ACTIVE & RUNNING" : "POWERED OFF"}
                </strong>
              </div>

              {selectedDevice.volume !== undefined && (
                <div className="slider-box">
                  <div className="slider-label">
                    <Volume2 size={15} /> Volume: <strong>{selectedDevice.volume}%</strong>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={selectedDevice.volume} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setDevices(prev => prev.map(x => x.id === selectedDevice.id ? { ...x, volume: val } : x));
                      setSelectedDevice(prev => ({ ...prev, volume: val }));
                    }}
                    className="smart-slider"
                  />
                </div>
              )}

              {selectedDevice.brightness !== undefined && (
                <div className="slider-box">
                  <div className="slider-label">
                    <Sun size={15} /> Brightness: <strong>{selectedDevice.brightness}%</strong>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={selectedDevice.brightness} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setDevices(prev => prev.map(x => x.id === selectedDevice.id ? { ...x, brightness: val } : x));
                      setSelectedDevice(prev => ({ ...prev, brightness: val }));
                    }}
                    className="smart-slider"
                  />
                </div>
              )}
            </div>

            <div className="device-capabilities-list">
              <span className="cap-head">Hardware Features:</span>
              {selectedDevice.features?.map((f, i) => (
                <div key={i} className="cap-item">
                  <CheckCircle2 size={14} className="text-success" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alexa Voice Console */}
          <div className="voice-console-card card-base">
            <div className="console-head">
              <Mic size={18} className="text-amber-500" />
              <h3 className="section-title">Alexa Voice Routine Terminal</h3>
            </div>

            <form onSubmit={handleSendVoice} className="voice-form-strip">
              <input 
                type="text" 
                placeholder="Type 'Alexa, turn off lights' or 'Alexa, show camera'..."
                value={voiceInput}
                onChange={(e) => setVoiceInput(e.target.value)}
                className="voice-input-field"
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1rem' }}>
                Run Routine
              </button>
            </form>

            <div className="voice-logs-list">
              {voiceLog.map((log, i) => (
                <div key={i} className="log-item">
                  <div className="log-user-query">
                    <Mic size={12} className="text-amber-500" />
                    <strong>"{log.query}"</strong>
                  </div>
                  <p className="log-alexa-reply">{log.reply}</p>
                  <span className="log-time">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .smarthome-studio-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .smarthome-header {
          background: #ffffff;
          padding: 2rem;
          border-left: 5px solid #ec4899;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .alexa-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #fdf2f8;
          color: #be185d;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ec4899;
          animation: pulse 1.5s infinite;
        }
        .header-title {
          font-size: 1.9rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.35rem;
        }
        .header-desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          max-width: 650px;
        }
        .routines-launcher-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #fdf2f8;
          border: 1px solid #fce7f3;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }
        .routines-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #9d174d;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .routines-buttons-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .routine-btn {
          background: #ffffff;
          border: 1px solid #fbcfe8;
          color: #831843;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .routine-btn:hover {
          background: #db2777;
          color: #ffffff;
          border-color: #db2777;
        }
        .room-pills-bar {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
          border-top: 1px solid var(--color-border);
        }
        .room-pill {
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-muted);
          cursor: pointer;
        }
        .room-pill.active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
        /* Layout Grid */
        .smarthome-main-grid {
          display: grid;
          grid-template-columns: 1.7fr 1.3fr;
          gap: 1.75rem;
        }
        .devices-matrix-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .devices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }
        .smart-device-card {
          padding: 1.25rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .smart-device-card:hover {
          transform: translateY(-2px);
        }
        .card-selected {
          border-color: #ec4899 !important;
          background: #fffbfa !important;
          box-shadow: 0 0 0 1px #ec4899;
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }
        .status-led {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .led-on {
          background: #16a34a;
          box-shadow: 0 0 8px rgba(22, 163, 74, 0.7);
        }
        .led-off {
          background: #cbd5e1;
        }
        .power-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .btn-power-on {
          background: #dcfce7;
          color: #15803d;
          border-color: #86efac;
        }
        .btn-power-off {
          background: #f1f5f9;
          color: #64748b;
        }
        .room-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #be185d;
          text-transform: uppercase;
        }
        .device-title {
          font-size: 1rem;
          color: var(--color-navy-dark);
          margin: 0.15rem 0 0.25rem 0;
        }
        .device-type-txt {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.85rem;
        }
        .card-bottom-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--color-border);
        }
        .mode-txt {
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }
        .photos-sync-card {
          padding: 1.5rem;
          background: #ffffff;
        }
        .photos-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: 1.1rem;
          color: var(--color-navy-dark);
        }
        .section-sub {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .photos-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .photo-thumb {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }
        /* Right Inspector Sidebar */
        .inspector-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .inspector-card, .voice-console-card {
          padding: 1.5rem;
          background: #ffffff;
        }
        .inspector-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #be185d;
          text-transform: uppercase;
        }
        .inspector-title {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin: 0.15rem 0;
        }
        .inspector-type {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }
        .device-controls-box {
          background: var(--color-surface-subtle);
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .control-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
        }
        .slider-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .slider-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--color-navy-dark);
        }
        .smart-slider {
          width: 100%;
        }
        .device-capabilities-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cap-head {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .cap-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #334155;
        }
        .console-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .voice-form-strip {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .voice-input-field {
          flex: 1;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
        }
        .voice-logs-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          max-height: 240px;
          overflow-y: auto;
        }
        .log-item {
          padding: 0.65rem 0.85rem;
          background: #f8fafc;
          border-radius: var(--radius-md);
          border-left: 3px solid var(--color-amber);
        }
        .log-user-query {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.2rem;
        }
        .log-alexa-reply {
          font-size: 0.78rem;
          color: #334155;
          margin: 0;
          line-height: 1.4;
        }
        .log-time {
          font-size: 0.68rem;
          color: var(--color-text-light);
          display: block;
          margin-top: 0.25rem;
        }
        @media (max-width: 960px) {
          .smarthome-main-grid {
            grid-template-columns: 1fr;
          }
          .photos-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
