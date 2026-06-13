"use client";

import { Shield, Bell, Search } from "lucide-react";

export default function Topbar({
  headmaster,
  searchText,
  setSearchText,
  notificationCount = 0,
}) {
  return (
    <div className="topbar">

      {/* Left side search */}

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search students..."
        />
      </div>

      {/* Right side */}

      <div className="topbar-right">

        {/* Notification Bell */}

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