"use client";

import { useState, useRef, useEffect } from "react";
import {
  Shield,
  Bell,
  Search,
  Mic,
  Volume2,
  Languages,
  Check,
  ChevronDown,
} from "lucide-react";
import useVoice from "../hooks/useVoice";

export default function Topbar({
  headmaster,
  searchText,
  setSearchText,
  notificationCount = 0,
}) {
  const { startVoice, listening } = useVoice();

  // Language Dropdown
  const [language, setLanguage] = useState("English");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langRef = useRef(null);

  const languages = ["English", "తెలుగు", "हिन्दी"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const speakText = (text) => {
    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
  };

 const handleVoiceInput = () => {
  startVoice(async (text) => {
    if (!text) return;

    try {
      const translated = await translateText(text, language);

      setSearchText(translated);

      speakText(translated);
    } catch (error) {
      console.error("Translation Error:", error);
    }
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

        {/* Language */}
        <div className="language-wrapper" ref={langRef}>
          <button
            className="language-btn"
            type="button"
            onClick={() => setShowLangMenu((prev) => !prev)}
          >
            <Languages size={18} />

            <span>{language}</span>

            <ChevronDown
              size={16}
              className={showLangMenu ? "rotate" : ""}
            />
          </button>

          {showLangMenu && (
            <div className="language-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`language-item ${
                    language === lang ? "selected" : ""
                  }`}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLangMenu(false);
                  }}
                >
                  <span>{lang}</span>

                  {language === lang && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification */}
        <div className="notification-bell">
          <Bell size={22} />

          {notificationCount > 0 && (
            <span className="notification-badge">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="profile-card">
          <Shield size={22} />

          <div>
            <h3>
              Welcome {headmaster?.name || "Headmaster"}
            </h3>

            <p>
              {headmaster?.role || "Admin Access"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}