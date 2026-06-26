"use client";

import { Shield, Bell, Search, Mic, Volume2 } from "lucide-react";
import useVoice from "../hooks/useVoice";

export default function Topbar({
  headmaster,
  searchText,
  setSearchText,
  notificationCount = 0,
}) {
  const { startVoice, listening } = useVoice();

  const speakText = (text) => {
    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    startVoice((text) => {
      if (!text) return;

      setSearchText("");

      let i = 0;
      const interval = setInterval(() => {
        setSearchText(text.slice(0, i));
        i++;

        if (i > text.length) clearInterval(interval);
      }, 12);
    });
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="search-box">
          <div className="search-icon">
            <Search size={18} />
          </div>

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search students..."
            className="search-input"
          />

          <div className="search-actions">
            <button
              className="speak-btn"
              onClick={() => speakText(searchText)}
              title="Speak text"
              type="button"
            >
              <Volume2 size={16} />
            </button>

            <button
              className={`mic-btn ${listening ? "active" : ""}`}
              onClick={handleVoiceInput}
              title="Voice input"
              type="button"
            >
              <Mic size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="notification-bell">
          <Bell size={22} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>

        <div className="profile-card">
          <Shield size={22} />
          <div>
            <h3>Welcome {headmaster?.name || "Headmaster"}</h3>
            <p>{headmaster?.role || "Admin Access"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}