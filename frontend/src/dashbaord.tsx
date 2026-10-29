import React, { useEffect, useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  jobTitle?: string;
  officeLocation?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // credentials: 'include' is REQUIRED to send the httpOnly cookie back to NestJS
        const response = await fetch('http://localhost:3000/users/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile. Please log in again.');
        }

        const data: UserProfile = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ ...styles.container, justifyContent: 'center' }}>
        <div style={styles.spinner} />
        <p style={{ color: '#94a3b8', marginTop: '16px', fontSize: '14px' }}>Loading profile from backend...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ color: '#f87171', fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>Session Expired</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 20px 0' }}>{error}</p>
          <a href="/" style={styles.button}>Return to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={styles.avatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 style={styles.title}>{user?.name}</h1>
            <p style={styles.subtitle}>{user?.email}</p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.row}>
            <span style={styles.label}>Job Title</span>
            <span style={styles.value}>{user?.jobTitle || 'Not specified'}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Office Location</span>
            <span style={styles.value}>{user?.officeLocation || 'Remote'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#f8fafc',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    maxWidth: '448px',
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box' as const,
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '700',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 4px 0',
  },
  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: '0',
  },
  section: {
    borderTop: '1px solid #1e293b',
    paddingTop: '20px',
    marginTop: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
  },
  label: {
    color: '#64748b',
  },
  value: {
    color: '#f8fafc',
    fontWeight: '500',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '10px 16px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #3b82f6',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default Dashboard;