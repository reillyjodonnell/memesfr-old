import React, { useState } from 'react';
import { ReactComponent as MuteVolume } from '../Assets/Icons/MuteVolume.svg';
import { ReactComponent as Volume } from '../Assets/Icons/Volume.svg';
import { ReactComponent as Play } from '../Assets/Icons/Play.svg';
import { ReactComponent as Pause } from '../Assets/Icons/Pause.svg';
import { VolumeUp } from '@material-ui/icons';
import {
  faPause,
  faPlay,
  faVolumeMute,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VideoIconPlayback({
  openFullScreen,
  inView,
  poster,
  image,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleMuteVideo = () => {
    const videoId = document.getElementById('playback-video');
    if (!videoId.muted) {
      videoId.muted = true;
      setIsMuted(true);
    } else {
      videoId.muted = false;
      setIsMuted(false);
    }
  };

  const handlePauseVideo = () => {
    const videoId = document.getElementById('playback-video');
    if (!videoId.paused) {
      videoId.pause();
      setIsPaused(true);
    } else {
      setIsPaused(false);
      videoId.play();
    }
  };

  return (
    <>
      <div
        // onMouseOver={handleVideoHover}
        // onMouseOut={handleVideoUnHover}
        className="video-container"
      >
        <>
          <div
            onClick={handleMuteVideo}
            className="playback-icon-mute-container"
          >
            {isMuted ? (
              <FontAwesomeIcon
                className="playback-icon-volume"
                icon={faVolumeMute}
              />
            ) : (
              <FontAwesomeIcon
                className="playback-icon-volume"
                icon={faVolumeUp}
              />
            )}
          </div>
          <div
            onClick={handlePauseVideo}
            className="playback-icon-pause-container"
          >
            {isPaused ? (
              <Play className="playback-icon-play" />
            ) : (
              <Pause className="playback-icon-play" />
            )}
          </div>
        </>
        {inView ? (
          <video
            onClick={openFullScreen}
            id="playback-video"
            type="video/mp4"
            style={{ objectFit: 'cover' }}
            loop
            muted={isMuted}
            playsInline
            autoPlay
            // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
            className="meme-image"
            poster={poster}
            src={image}
          />
        ) : (
          <video
            onClick={openFullScreen}
            type="video/mp4"
            style={{ objectFit: 'cover' }}
            controls
            loop
            muted={true}
            playsInline
            autoPlay
            // onDoubleClick={currentUser ? toggleHeart : activatePrompt}
            className="meme-image"
            poster={poster}
            src={image}
          />
        )}
      </div>
    </>
  );
}
