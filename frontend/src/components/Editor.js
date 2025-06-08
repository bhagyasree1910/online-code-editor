import React from 'react';

const Editor = ({ code, setCode, theme }) => {
  const style = {
    width: '100%',
    minHeight: '200px',
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  return (
    <textarea
      style={style}
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Enter your code here..."
    />
  );
};

export default Editor;
