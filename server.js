const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/popcat', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
    score: Number,
    timestamp: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

app.use(bodyParser.json());

app.post('/api/score', (req, res) => {
    const newScore = new Score({ score: req.body.score });
    newScore.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Score saved successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
