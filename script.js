function startGame() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('stage-1').classList.remove('hidden');
}

function nextStage(stageId) {
    document.querySelectorAll('.container').forEach(container => container.classList.add('hidden'));
    document.getElementById(stageId).classList.remove('hidden');
}

let balloonSize = 1;
function inflateBalloon() {
    balloonSize += 0.02;
    const balloon = document.getElementById('balloon');
    balloon.style.transform = `scale(${balloonSize})`;

    // Change color as it inflates
    balloon.style.backgroundColor = `rgba(255, ${255 - balloonSize * 60}, ${255 - balloonSize * 60}, 0.8)`;

    if (balloonSize >= 3) {
        balloon.classList.add('hidden');
        document.getElementById('message').innerText = "Your love fills my heart like this balloon!";
    }
}

// Microphone-based balloon blowing
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);

        function detectSound() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

            if (volume > 60) {
                inflateBalloon();
            }

            requestAnimationFrame(detectSound);
        }

        detectSound();
    })
    .catch(error => {
        console.error('Microphone access error:', error);
    });

// Drawing on canvas (mobile-friendly)
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!drawing) return;

    event.preventDefault();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff69b4';

    const rect = canvas.getBoundingClientRect();
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Snakes and Ladders game with sound detection
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);

        function detectSssSound() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

            if (volume > 70) {
                moveSnake();
            }

            requestAnimationFrame(detectSssSound);
        }

        detectSssSound();
    })
    .catch(error => {
        console.error('Microphone access error:', error);
    });

function moveSnake() {
    // Logic to animate the snake visually moving
    console.log("Snake moves in response to sound!");
}
