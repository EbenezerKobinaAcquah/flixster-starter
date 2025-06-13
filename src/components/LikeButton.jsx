import React from 'react';

export default function LikeButton({isLiked, onLikeToggle}) {

  if (isLiked) {
    return <span className = "likeButton" onClick={onLikeToggle}>❤️</span>;
  }
  return <span className = "likeButton" onClick={onLikeToggle}>🤍</span>
}
