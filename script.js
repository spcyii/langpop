// script.js
let counter = 0;

document.getElementById('popcat').addEventListener('click', () => {
    counter++;
    document.getElementById('counter').innerText = counter;
    playPopSound();
});

function playPopSound() {
    const audio = new Audio('pop.mp3');
    audio.play();
}

function saveScore() {
    fetch('/api/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: counter })
    }).then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}

// Save score every 10 clicks
setInterval(() => {
    if (counter > 0) {
        saveScore();
    }
}, 10000);

