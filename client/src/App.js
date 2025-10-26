import React, { useState, useEffect } from 'react';
import './App.css';
import PrayerRequestForm from './PrayerRequestForm';
import PrayerCard from './PrayerCard';
import Toast from './Toast';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showPastorChat, setShowPastorChat] = useState(false);

  // Load saved requests when app starts
  useEffect(() => {
    const savedRequests = localStorage.getItem('prayerRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save requests whenever they change
  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem('prayerRequests', JSON.stringify(requests));
    }
  }, [requests]);

  const handleSubmitRequest = (newRequest) => {
    setRequests([newRequest, ...requests]);
    setShowForm(false);
    setToastMessage('Your request has been received—thank you for sharing. Your prayer is now visible to the community.');
  };

  const handleAddResponse = (requestId, newResponse) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          responses: [...request.responses, newResponse]
        };
      }
      return request;
    }));
    setToastMessage('Thank you for supporting this prayer. Your encouragement matters.');
  };

  const handleViewRequest = (requestId) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          views: (request.views || 0) + 1
        };
      }
      return request;
    }));
  };

  const handlePastorChat = () => {
    setShowPastorChat(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🙏 Prayer Requests</h1>
        <p>A safe space to share and support</p>
      </header>

      {/* Pastor Chat Button - Fixed Position */}
      <button className="pastor-chat-button" onClick={handlePastorChat}>
        💬 Chat with a Pastor
      </button>

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
          
          {requests.length > 0 && (
            <button 
              className="secondary-button"
              style={{marginTop: '1rem'}}
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all prayer requests?')) {
                  setRequests([]);
                  localStorage.removeItem('prayerRequests');
                }
              }}
            >
              Clear All Requests
            </button>
          )}
        </div>

        {requests.length > 0 ? (
          <div className="requests-section">
            <h2>Prayer Requests</h2>
            <div className="prayer-grid">
              {requests.map(request => (
                <PrayerCard
                  key={request.id}
                  request={request}
                  onAddResponse={handleAddResponse}
                  onView={handleViewRequest}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>No prayer requests yet. Be the first to share! 🙏</p>
          </div>
        )}
      </main>

      {showForm && (
        <PrayerRequestForm 
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitRequest}
        />
      )}

      {toastMessage && (
        <Toast 
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

      {/* Pastor Chat Modal */}
      {showPastorChat && (
        <div className="modal-overlay" onClick={() => setShowPastorChat(false)}>
          <div className="pastor-chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💬 Chat with a Pastor</h2>
              <button className="close-button" onClick={() => setShowPastorChat(false)}>✕</button>
            </div>
            <div className="pastor-chat-content">
              <div className="pastor-info">
               <div className="pastor-avatar">🧑‍💼</div>
                <div>
                  <h3>Pastor Support Available</h3>
                  <p className="online-status">🟢 Online 24/7</p>
                </div>
              </div>
              <div className="chat-description">
                <p>Connect with a caring pastor for:</p>
                <ul>
                  <li>🙏 Prayer support and guidance</li>
                  <li>💬 Confidential spiritual counseling</li>
                  <li>❤️ Emotional and mental wellness support</li>
                  <li>📖 Biblical encouragement</li>
                </ul>
              </div>
              <button className="primary-button" style={{width: '100%', marginTop: '1rem'}}>
                Start Chat Now
              </button>
              <p className="chat-disclaimer">
                * This is a demo feature. In production, this would connect to live pastoral support.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;