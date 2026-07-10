import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
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
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            marginBottom: 24,
          }}>
            !
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: 'var(--silver)', maxWidth: 440, marginBottom: 32, lineHeight: 1.7 }}>
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
            background: 'linear-gradient(135deg, var(--blue), var(--blue-dark))',
            color: 'var(--ink)',
              border: 'none',
              padding: '12px 32px',
              borderRadius: 12,
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
