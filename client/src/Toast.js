import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Message disappears after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-content">
        <span className="toast-icon">✨</span>
        <p className="toast-message">{message}</p>
        <button className="toast-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default Toast;