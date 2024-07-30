let counter = 0;

document.getElementById('popcat').addEventListener('click', () => {
    counter++;
    console.log('Clicked!'); // ตรวจสอบว่าคลิกทำงาน
    document.getElementById('counter').innerText = counter;
    playPopSound();
    saveScore();
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

function saveScore() {
    console.log('Saving score:', counter); // ตรวจสอบค่าที่จะส่ง
    fetch('/api/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: counter })
    }).then(response => {
        console.log('Response status:', response.status); // ตรวจสอบสถานะการตอบสนอง
        return response.text();
    }).then(data => {
        console.log('Response data:', data); // ข้อมูลที่ได้รับจากเซิร์ฟเวอร์
    }).catch(error => {
        console.error('Error:', error);
    });
}
