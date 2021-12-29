import React from 'react';
import '../../../CSS Components/routes/notifications/Notifications.css';
export default function Notifications({ notificationCount }) {
  if (notificationCount > 0) {
    document.title = `(${notificationCount}) Memesfr`;
  }

  return (
    <div className="main-content">
      <span>{notificationCount} notifications</span>
    </div>
  );
}
