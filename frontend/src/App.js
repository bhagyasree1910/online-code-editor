import React, { useState } from 'react';
import axios from 'axios';

const backendURL = 'http://localhost:5000';

function App() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/run`, {
        language,
        code,
        input
      });
      setOutput(response.data.output);
    } catch (err) {
      setOutput('❌ Error: Could not connect to server.');
    }
    setLoading(false);
  };

  // Styles based on darkMode state
  const containerStyle = {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: darkMode ? '#121212' : '#f9f9f9',
    color: darkMode ? '#e0e0e0' : '#121212',
    borderRadius: '8px',
    boxShadow: darkMode
      ? '0 0 15px rgba(255, 255, 255, 0.1)'
      : '0 0 10px rgba(0,0,0,0.1)'
  };

  const labelStyle = { fontWeight: '600', marginBottom: '6px', display: 'block' };

  const textareaStyle = {
    width: '100%',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '10px',
    borderRadius: '4px',
    border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
    backgroundColor: darkMode ? '#1e1e1e' : 'white',
    color: darkMode ? '#f8f8f2' : '#121212',
    resize: 'vertical',
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
    fontSize: '16px',
    backgroundColor: darkMode ? '#1e1e1e' : 'white',
    color: darkMode ? '#f8f8f2' : '#121212',
  };

  const buttonStyle = {
    marginTop: '15px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,123,255,0.3)',
  };

  const outputBoxStyle = {
    marginTop: '20px',
    backgroundColor: darkMode ? '#272822' : '#f4f4f4',
    color: darkMode ? '#f8f8f2' : '#121212',
    padding: '15px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    minHeight: '120px',
    boxShadow: darkMode
      ? 'inset 0 0 10px rgba(0,0,0,0.5)'
      : 'inset 0 0 10px rgba(0,0,0,0.1)',
  };

  const copyButtonStyle = {
    marginTop: '10px',
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🧠 Online Code Editor</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: darkMode ? '#555' : '#ddd',
            color: darkMode ? '#eee' : '#333',
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <label style={labelStyle} htmlFor="language-select">Select Language:</label>
      <select
        id="language-select"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={selectStyle}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="bash">Bash</option>
        <option value="php">PHP</option>
      </select>

      <label style={{ ...labelStyle, marginTop: '20px' }} htmlFor="code-area">Write your code:</label>
      <textarea
        id="code-area"
        rows="12"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Write your code here..."
        style={textareaStyle}
      ></textarea>

      <label style={{ ...labelStyle, marginTop: '20px' }} htmlFor="input-area">Standard Input (optional):</label>
      <textarea
        id="input-area"
        rows="4"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter input for your program (if any)"
        style={textareaStyle}
      ></textarea>

      <button onClick={runCode} style={buttonStyle} disabled={loading}>
        {loading ? 'Running...' : 'Run Code'}
      </button>

      <div style={outputBoxStyle}>
        <strong>Output:</strong><br />
        {loading ? 'Running...' : output || 'No output yet.'}
      </div>

      {output && !loading && (
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          style={copyButtonStyle}
          title="Copy output to clipboard"
        >
          📋 Copy Output
        </button>
      )}
    </div>
  );
}

export default App;
