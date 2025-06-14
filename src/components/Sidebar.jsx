import React from "react";
import "./Sidebar.css";
import "../App.css"

const Sidebar = ({ isOpen, toggleSidebar, setActiveTab }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "x" : "☰"}
      </button>

      {isOpen && (
        <div className="sidebar-content">
          <button onClick={() => setActiveTab("home")}>Home</button>
          <button onClick={() => setActiveTab("watched")}>Watched</button>
          <button onClick={() => setActiveTab("liked")}>Favorites</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
