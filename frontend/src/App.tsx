import React, { useState } from 'react';

const App: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleMicrosoftLogin = async (): Promise<void> => {
    setIsLoggingIn(true);
    // Simulate Microsoft OAuth 2.0 Login redirect/callback
    try {
      const response = await fetch('http://localhost:3000/login');
      const authUrl = await response.text();
      window.location.href = authUrl; // Redirect to Microsoft login
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };


  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '448px',
          width: '100%',
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header / About Section */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.025em',
              margin: '0 0 8px 0',
            }}
          >
            OAuth 2.0 Auth Portal
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: '#818cf8',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: '0 0 8px 0',
            }}
          >
            Designed by Vinay
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: '1.5',
              margin: '0',
            }}
          >
            A minimalist authentication portal demonstrating Microsoft OAuth 2.0 Single Sign-On (SSO).
          </p>
        </div>

        <hr
          style={{
            border: 'none',
            borderTop: '1px solid #1e293b',
            margin: '24px 0',
          }}
        />

        {/* Dynamic Auth Section */}
       
          <div>
            <button
              onClick={handleMicrosoftLogin}
              disabled={isLoggingIn}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: '500',
                fontSize: '14px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #334155',
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                opacity: isLoggingIn ? 0.5 : 1,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box',
              }}
            >
              {isLoggingIn ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              ) : (
                <>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>Click here to Login with Microsoft</span>
                </>
              )}
            </button>

            {/* Spinner Keyframes Animation */}
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
       
      </div>
    </div>
  );
};

export default App;