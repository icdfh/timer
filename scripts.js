const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const alarmSound = document.getElementById('alarm-sound');

let countdownInterval;
let timeRemaining;
let isPaused = false;

// Функция для форматирования времени
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Функция для обновления отображения таймера
function updateTimerDisplay(minutes, seconds) {
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Функция для начала обратного отсчета
function startTimer() {
    if (countdownInterval) return; // Если таймер уже запущен, выходим

    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    timeRemaining = minutes * 60 + seconds;

    countdownInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            alarmSound.play(); // Воспроизвести звуковое уведомление
            return;
        }

        if (!isPaused) {
            timeRemaining -= 1;
            const minutesLeft = Math.floor(timeRemaining / 60);
            const secondsLeft = timeRemaining % 60;
            updateTimerDisplay(minutesLeft, secondsLeft);
        }
    }, 1000);
}

// Функция для паузы таймера
function pauseTimer() {
    isPaused = !isPaused; // Переключаем состояние паузы
    pauseButton.textContent = isPaused ? 'Продолжить' : 'Пауза';
}

// Функция для сброса таймера
function resetTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    isPaused = false;
    pauseButton.textContent = 'Пауза';
    updateTimerDisplay(0, 0);
    minutesInput.value = '';
    secondsInput.value = '';
}

// Обработчики событий
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
