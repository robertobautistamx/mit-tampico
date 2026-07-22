import React, { useState } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    } as React.CSSProperties,
    label: {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#475569',
    } as React.CSSProperties,
    textarea: {
      padding: '0.8rem 1rem',
      borderRadius: '8px',
      border: `1px solid ${isFocused ? '#3B82F6' : '#CBD5E1'}`,
      backgroundColor: '#FFFFFF',
      color: '#0F172A',
      boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : 'none',
      fontSize: '1rem',
      fontFamily: 'inherit',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'all 0.2s',
      width: '100%',
      boxSizing: 'border-box',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <textarea 
        style={styles.textarea} 
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)} 
        {...props} 
      />
    </div>
  );
};

export default Textarea;