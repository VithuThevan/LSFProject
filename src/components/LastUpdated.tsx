import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface LastUpdatedProps {
  lastUpdateTime: Date | null;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ lastUpdateTime }) => {
  const { theme } = useTheme();
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const themeColors = {
    dark: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      text: '#e0e0e0',
      accent: '#00ffd5',
      border: '#404040',
      shadow: 'rgba(255, 255, 255, 0.1)',
      highlight: '#ff6b6b'
    },
    light: {
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%)',
      text: '#2c3e50',
      accent: '#3498db',
      border: '#bde0fe',
      shadow: 'rgba(0, 0, 0, 0.1)',
      highlight: '#e74c3c'
    }
  };

  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <div className="last-updated mb-3 p-2 rounded-3"
         style={{
           background: colors.background,
           boxShadow: `0 2px 8px ${colors.shadow}`,
           border: `1px solid ${colors.border}`,
           transition: 'all 0.3s ease'
         }}>
      {lastUpdateTime && (
        <div className="d-flex align-items-center justify-content-center">
          <span className="me-2" style={{ 
            color: colors.accent,
            fontSize: '1.2em',
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))'
          }}>
            🕒
          </span>
          <small className="fw-medium" style={{ 
            color: colors.text,
            textShadow: `0 1px 2px ${colors.shadow}`
          }}>
            Last updated: <span style={{ color: colors.highlight }}>{formatTime(lastUpdateTime)}</span>
          </small>
        </div>
      )}
    </div>
  );
};

export default LastUpdated; 