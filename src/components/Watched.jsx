import React, {useState} from 'react';

export default function WatchButton() {
  const [watched, setWatched] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();

    setWatched(!watched);
  }
  if (watched){
      return <div className = "watchButton" onClick={handleClick}>



    <p>watched</p>
    </div>
  }
  return <div className = "notWatchedButton" onClick={handleClick}>



  <p>!watched</p>
  </div>


}
