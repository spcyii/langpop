const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// สร้างการเชื่อมต่อกับ SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'popcat.db'), (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// สร้างตารางถ้ายังไม่มี
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS score (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// ให้บริการไฟล์ static จากไดเรกทอรี 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// เส้นทาง GET สำหรับ '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// เส้นทาง POST สำหรับ '/api/score'
app.post('/api/score', (req, res) => {
  const { score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).send('Invalid score');
  }

  const stmt = db.prepare('INSERT INTO score (score) VALUES (?)');
  stmt.run(score, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send('Score saved successfully');
  });
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ปิดการเชื่อมต่อฐานข้อมูลเมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database ' + err.message);
    } else {
      console.log('Database closed.');
    }
    process.exit(0);
  });
});

