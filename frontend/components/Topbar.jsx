"use client";

import { Shield, Search } from "lucide-react";

export default function Topbar({
  headmaster,
  searchText,
  setSearchText
}) {
  return (
    <div className="topbar">

      {/* Left side search */}

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          placeholder="Search students..."
        />
      </div>


      {/* Right side profile */}

      <div className="topbar-right">
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