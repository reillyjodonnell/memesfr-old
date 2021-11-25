import React from 'react';
import '../CSS Components/RightSidebar.css';
import Countdown from './Countdown';
import TrendingTopics from './TrendingTopics';
import Doge from '../Assets/doge.svg';
export default function RightSidebar() {
  return (
    <div className="rightsidebar-fixed">
      <div className="rightsidebar-content">
        <div className="daily-counter">
          <Countdown />
        </div>
        <div className="rightsidebar-main-section">
          <span className="main-section-title">today's memelord 👑</span>
          <div className="rightsidebar-user-profile">
            <img className="rightsidebar-avatar" src={Doge} />
            <span>@reilly</span>
          </div>

          <div className="rightsidebar-user-stats">
            <span className="rightsidebar-crown-count">1.6k 👑</span>
            <span className="rightsidebar-meme-count">24 memes</span>
          </div>
        </div>
        <div className="rightsidebar-secondary-section">
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}
