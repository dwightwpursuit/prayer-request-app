import React, { useState } from 'react';
import './PrayerCard.css';
import { formatDate } from './utils';
import ResponseSection from './ResponseSection';

function PrayerCard({ request, onAddResponse }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Get preview of text (first 100 characters)
  const previewText = request.text.length > 100 
    ? request.text.substring(0, 100) + '...' 
    : request.text;

  return (
    <>
      {/* FRONT CARD IN GRID */}
      <div className="prayer-card-container">
        <div className="prayer-card-front">
          <div className="card-header">
            <span className="card-name">{request.name}</span>
            <span className="card-date">{formatDate(request.date)}</span>
          </div>
          
          <div className="card-content">
            <p className="card-preview">{previewText}</p>
          </div>
          
          <div className="card-footer">
            <div className="card-stats">
              {request.responses.length > 0 && (
                <span className="card-badge">
                  💬 {request.responses.length} {request.responses.length === 1 ? 'response' : 'responses'}
                </span>
              )}
            </div>
            <button className="card-button" onClick={handleFlip}>
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* EXPANDED MODAL VIEW */}
      {isFlipped && (
        <div className="card-modal-overlay" onClick={handleFlip}>
          <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="prayer-card-back-expanded">
              <div className="card-header">
                <span className="card-name">{request.name}</span>
                <button className="back-button" onClick={handleFlip}>
                  ✕ Close
                </button>
              </div>
              
              <div className="card-content-full">
                <p className="card-full-text">{request.text}</p>
                <span className="card-date-full">Submitted {formatDate(request.date)}</span>
              </div>
              
              <div className="card-responses">
                <ResponseSection 
                  requestId={request.id}
                  responses={request.responses}
                  onAddResponse={onAddResponse}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PrayerCard;