import React from 'react';
import '../CSS Components/TrendingTopics.css';
export default function TrendingTopics() {
  const trendingTopics = [
    { title: 'Political' },
    { title: 'JoeExotic' },
    { title: 'Dank' },
    { title: 'Cheetos' },
    { title: 'ElonMusk' },
  ];

  return (
    <div className="trendingtopics-section">
      <div className="trendingtopics-text-container">
        {trendingTopics.map((topic, index) => {
          return (
            <div key={index} className="trendingtopics-text">
              <span>#{topic.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
