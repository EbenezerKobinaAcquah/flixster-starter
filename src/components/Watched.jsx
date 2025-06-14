import React from "react";

export default function WatchButton({ isWatched, onWatchToggle }) {
  if (isWatched) {
    return (
      <div className="watchButton" onClick={onWatchToggle}>
        <p>watched</p>
      </div>
    );
  }
  return (
    <div className="notWatchedButton" onClick={onWatchToggle}>
      <p>
        Not watched
      </p>
    </div>
  );
}
