import React from 'react';

const InputBox = ({ input, setInput }) => (
  <div style={{ marginTop: '10px' }}>
    <label>Standard Input (stdin):</label><br />
    <textarea
      rows={3}
      cols={60}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter input here (if any)"
    />
  </div>
);

export default InputBox;
