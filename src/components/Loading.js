import React from 'react';
import { ReactComponent as Castle } from '../Assets/SVGs/castle.svg';
import '../CSS Components/Loading.css';

export default function Loading() {
  return (
    <div className="loading-window">
      <div className="loading-sidebar-logo">
        <Castle />
        <span>Memesfr</span>
      </div>
    </div>
  );
}
