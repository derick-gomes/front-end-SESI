import React from 'react';

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    width: '100%',
    maxWidth: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export default Input;
