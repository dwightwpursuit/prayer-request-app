import React, { useState } from 'react';
import './App.css';
import PrayerRequestForm from './PrayerRequestForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleSubmitRequest = (newRequest) => {
    setRequests([newRequest, ...requests]);
    setShowForm(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🙏 Prayer Requests</h1>
        <p>A safe space to share and support</p>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2>Welcome</h2>
          <p>Share your prayer requests or offer support to others in need.</p>
          <button 
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            Submit Prayer Request
          </button>
        </div>

        {requests.length > 0 && (
          <div className="requests-section">
            <h2>Prayer Requests</h2>
            {requests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <span className="request-name">{request.name}</span>
                  <span className="request-date">{request.date}</span>
                </div>
                <p className="request-text">{request.text}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <PrayerRequestForm 
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitRequest}
        />
      )}
    </div>
  );
}

export default App;