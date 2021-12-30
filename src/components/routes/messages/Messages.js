import React from 'react';
import '../../../CSS Components/routes/messages/Messages.css';

export default function Messages() {
  document.title = '✉️ Messages - Memesfr';

  return (
    <div className="main-content">
      <div className="messages-container">
        <div className="messages-header">
          <span>Here are the messages</span>
        </div>
        <div className="messages-sidebar">
          <span>Random user</span>
          <span>Random user</span>
          <span>Random user</span>
        </div>
        <div className="messages-main-content">
          <span>Messages go here</span>
        </div>
      </div>
    </div>
  );
}
