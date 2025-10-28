import React, { useState } from 'react';
import './ResponseSection.css';
import { formatDate } from './utils';
import { getAISuggestions } from './aiSuggestions';

function ResponseSection({ requestId, responses, onAddResponse, prayerText }) {
  const [showForm, setShowForm] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responderName, setResponderName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleShowForm = () => {
    setShowForm(true);
    const aiSuggestions = getAISuggestions(prayerText);
    setSuggestions(aiSuggestions);
    setShowSuggestions(true);
  };

  const handleUseSuggestion = (suggestion) => {
    setResponseText(suggestion);
    setShowSuggestions(false);
  };

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
      setShowSuggestions(false);
    }
  };

  return (
    <div className="response-section">
      <div className="response-header">
        <h4>Responses ({responses.length})</h4>
        <button 
          className="respond-button"
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setShowSuggestions(false);
            } else {
              handleShowForm();
            }
          }}
        >
          {showForm ? 'Cancel' : '💬 Respond'}
        </button>
      </div>

      {showForm && (
        <>
          {showSuggestions && (
            <div className="ai-suggestions">
              <div className="ai-header">
                <span className="ai-badge">🤖 AI Suggestions</span>
                <p className="ai-description">Click a suggestion to use it, or write your own response below</p>
              </div>
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-card"
                    onClick={() => handleUseSuggestion(suggestion)}
                    type="button"
                  >
                    <span className="suggestion-icon">💭</span>
                    <span className="suggestion-text">{suggestion}</span>
                  </button>
                ))}
              </div>
              <button 
                className="write-own-button"
                onClick={() => setShowSuggestions(false)}
                type="button"
              >
                ✏️ Write my own response
              </button>
            </div>
          )}

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
            <div className="response-form-actions">
              {!showSuggestions && responseText === '' && (
                <button 
                  type="button"
                  className="show-suggestions-button"
                  onClick={() => setShowSuggestions(true)}
                >
                  🤖 Show AI Suggestions
                </button>
              )}
              <button type="submit" className="submit-response-button">
                Send Response
              </button>
            </div>
          </form>
        </>
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