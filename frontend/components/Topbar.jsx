import { Search, ShieldCheck } from "lucide-react";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search..." />
      </div>

      <div className="profile-box">
        <ShieldCheck size={20} />
        <div>
          <h4>Headmaster</h4>
          <p>Admin Access</p>
        </div>
      </div>
    </div>
  );
}