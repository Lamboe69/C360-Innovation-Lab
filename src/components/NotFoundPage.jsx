import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'var(--font-b)',
      background: 'var(--ink)',
      color: 'var(--cream)',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{
        fontSize: 'clamp(5rem, 15vw, 10rem)',
        fontWeight: 900,
        fontFamily: 'var(--font-d)',
        lineHeight: 1,
        marginBottom: 8,
          background: 'linear-gradient(135deg, var(--blue), var(--blue-dark))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        404
      </div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Page not found</h1>
      <p style={{ color: 'var(--silver)', maxWidth: 420, marginBottom: 32, lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{
        background: 'linear-gradient(135deg, var(--blue), var(--blue-dark))',
          color: 'var(--ink)',
          padding: '12px 28px',
          borderRadius: 12,
          fontWeight: 600,
          textDecoration: 'none',
        }}>
          Go Home
        </Link>
        <Link to="/dashboard" style={{
          border: '1px solid var(--border)',
          color: 'var(--cream)',
          padding: '12px 28px',
          borderRadius: 12,
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
