const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Use express built-in JSON parser

app.post('/run', (req, res) => {
  const { language, code, input } = req.body;
  const filename = uuidv4();

  let filePath = '';
  let command = '';

  if (language === 'python') {
    filePath = `${filename}.py`;
    fs.writeFileSync(filePath, code);
    command = `python ${filePath}`;
  } else if (language === 'javascript') {
    filePath = `${filename}.js`;
    fs.writeFileSync(filePath, code);
    command = `node ${filePath}`;
  } else if (language === 'bash') {
    filePath = `${filename}.sh`;
    fs.writeFileSync(filePath, code);
    command = `bash ${filePath}`;
  } else if (language === 'php') {
    filePath = `${filename}.php`;
    fs.writeFileSync(filePath, code);
    command = `php ${filePath}`;
  } else {
    return res.status(400).json({ output: 'Unsupported language' });
  }

  const child = exec(command, (error, stdout, stderr) => {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    if (error) {
      return res.json({ output: stderr || error.message });
    }
    return res.json({ output: stdout });
  });

  if (input) {
    child.stdin.write(input);
    child.stdin.end();
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
