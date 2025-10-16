import React from 'react';

function Button({ onClick, children, type = 'button' }) {
  return (
    <button onClick={onClick} type={type} style={styles.button}>
      {children}
    </button>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Button;
