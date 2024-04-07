import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('.btn-start');
const spanValEl = document.querySelectorAll('.value');

let intervalId = null;

btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const result = Date.now() > selectedDates;
    btnEl.disabled = result;
    if (result) {
      iziToast.error({
        title: '❌ Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }
  },
};

flatpickr(inputEl, options);

btnEl.addEventListener('click', onClick);
function onClick() {
  let selectedDates = new Date(inputEl.value).getTime() - Date.now();
  intervalId = setInterval(() => {
    selectedDates -= 1000;
    if (selectedDates < 100) {
      clearInterval(intervalId);
      updateTimer();
      return;
    }
    const date = convertMs(selectedDates);
    updateTimer(date);
    btnEl.disabled = true;
    inputEl.disabled = true;
  }, 1000);
}

function updateTimer({
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00',
} = {}) {
  spanValEl[0].textContent = addLeadingZero(days);
  spanValEl[1].textContent = addLeadingZero(hours);
  spanValEl[2].textContent = addLeadingZero(minutes);
  spanValEl[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}