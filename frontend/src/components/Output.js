import React from 'react';

const Output = ({ output, loading }) => {
  return (
    <div style={{
      marginTop: '20px',
      whiteSpace: 'pre-wrap',
      background: '#f4f4f4',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    }}>
      <strong>Output:</strong><br />
      {loading ? 'Running...' : output || 'No output yet.'}
      <br /><br />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)}>
          Copy Output
        </button>
      )}
    </div>
  );
};

export default Output;
