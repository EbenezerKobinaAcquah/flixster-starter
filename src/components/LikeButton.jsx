import React, {useState} from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();

    setLiked(!liked);
  }
  if (liked) {
    return <span className = "likeButton" onClick={handleClick}>❤️</span>;

  }
  return <span className = "likeButton" onClick={handleClick}>🤍</span>
}
