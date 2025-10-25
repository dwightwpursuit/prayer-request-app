import React, { useState } from 'react';
import './PrayerRequestForm.css';

function PrayerRequestForm({ onClose, onSubmit }) {
  const [requestText, setRequestText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (requestText.trim()) {
      const newRequest = {
        id: Date.now(),
        text: requestText,
        isAnonymous: isAnonymous,
        name: isAnonymous ? 'Anonymous' : name || 'Anonymous',
        date: new Date().toISOString(),
        responses: []
      };
      
      onSubmit(newRequest);
      setRequestText('');
      setName('');
      setIsAnonymous(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Submit Prayer Request</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Your Prayer Request * 
              <span style={{float: 'right', color: '#999', fontWeight: 'normal'}}>
                {requestText.length} characters
              </span>
            </label>
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Share what's on your heart..."
              rows="6"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Post anonymously
            </label>
          </div>

          {!isAnonymous && (
            <div className="form-group">
              <label>Your Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we address you?"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrayerRequestForm;