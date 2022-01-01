import React from 'react';

export default function FullscreenPlayer() {
  return (
    <div className="fullscreen-player">
      <div></div>
      <div></div>
      <video
        autoPlay={true}
        loop={true}
        controls={false}
        playsInline
        muted
        src="https://img.ifunny.co/videos/0cd25f1380890c3939a1785d5b9c416a645a563e18e401cbc6645bf5384208af_1.mp4"
        className="fullscreen-player-video"
      />
    </div>
  );
}
