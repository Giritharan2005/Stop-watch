// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Update digital clock
    document.getElementById('clock').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update analog clock
    const hourHand = document.querySelector('.analog-clock .hour-hand');
    const minuteHand = document.querySelector('.analog-clock .minute-hand');
    const secondHand = document.querySelector('.analog-clock .second-hand');
    
    const hourDegrees = (hours % 12) * 30 + minutes * 0.5; // 30 degrees per hour + 0.5 degrees per minute
    const minuteDegrees = minutes * 6; // 6 degrees per minute
    const secondDegrees = seconds * 6; // 6 degrees per second
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Stopwatch functionality
let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let lastLapTime = 0;

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateStopwatch() {
    const now = Date.now();
    elapsedTime = now - startTime;
    
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
    // Update digital stopwatch
    document.getElementById('stopwatch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update analog stopwatch
    const hourHand = document.querySelector('.analog-stopwatch .hour-hand');
    const minuteHand = document.querySelector('.analog-stopwatch .minute-hand');
    const secondHand = document.querySelector('.analog-stopwatch .second-hand');
    
    const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
}

function addLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = elapsedTime - lastLapTime;
        lastLapTime = elapsedTime;
        
        const lapList = document.getElementById('lapList');
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formatTime(lapTime)}</span>
        `;
        
        lapList.insertBefore(lapItem, lapList.firstChild);
    }
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    document.getElementById('stopwatch').textContent = '00:00:00';
    document.getElementById('lapList').innerHTML = '';
    
    // Reset analog stopwatch hands
    const hourHand = document.querySelector('.analog-stopwatch .hour-hand');
    const minuteHand = document.querySelector('.analog-stopwatch .minute-hand');
    const secondHand = document.querySelector('.analog-stopwatch .second-hand');
    
    hourHand.style.transform = 'translateX(-50%) rotate(0deg)';
    minuteHand.style.transform = 'translateX(-50%) rotate(0deg)';
    secondHand.style.transform = 'translateX(-50%) rotate(0deg)';
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('stopBtn').addEventListener('click', stopStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', addLap); 