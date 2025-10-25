import React, { useState } from 'react';
import './ResponseSection.css';
import { formatDate } from './utils';

function ResponseSection({ requestId, responses, onAddResponse }) {
  const [showForm, setShowForm] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responderName, setResponderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (responseText.trim()) {
      const newResponse = {
        id: Date.now(),
        text: responseText,
        name: responderName || 'Anonymous',
        date: new Date().toISOString()
      };
      
      onAddResponse(requestId, newResponse);
      setResponseText('');
      setResponderName('');
      setShowForm(false);
    }
  };

  return (
    <div className="response-section">
      <div className="response-header">
        <h4>Responses ({responses.length})</h4>
        <button 
          className="respond-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '💬 Respond'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="response-form">
          <input
            type="text"
            value={responderName}
            onChange={(e) => setResponderName(e.target.value)}
            placeholder="Your name (optional)"
            className="response-input"
          />
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Share words of encouragement..."
            rows="3"
            required
            className="response-textarea"
          />
          <button type="submit" className="submit-response-button">
            Send Response
          </button>
        </form>
      )}

      {responses.length > 0 && (
        <div className="responses-list">
          {responses.map(response => (
            <div key={response.id} className="response-item">
              <div className="response-item-header">
                <span className="response-name">{response.name}</span>
                <span className="response-date">{formatDate(response.date)}</span>
              </div>
              <p className="response-text">{response.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResponseSection;