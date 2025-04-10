import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import doneIcon from '../img/done.svg';
import errorIcon from '../img/error.svg';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
};
const timerBox = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

const iziToastOptions = {
  titleColor: '#fff',
  titleSize: '16px',
  messageColor: '#fff',
  messageSize: '16px',
  position: 'topRight',
  transitionIn: 'bounceInLeft',
  closeOnClick: true,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        ...iziToastOptions,
        title: 'Error',
        message: 'Please choose a date in the future',
        color: '#EF4040',
        iconUrl: errorIcon,
      });
      refs.startBtn.disabled = true;
    } else {
      iziToast.show({
        ...iziToastOptions,
        title: 'OK',
        message: 'Your timer is ready to run',
        color: '#03a14d',
        iconUrl: doneIcon,
      });
      refs.startBtn.disabled = false;
    }
  },
};
const inputDate = flatpickr('#datetime-picker', options);

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
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  startTimer(userSelectedDate);
});

function startTimer() {
  timerId = setInterval(() => {
    const timeDiff = userSelectedDate - Date.now();

    if (timeDiff <= 0) {
      clearInterval(timerId);
      iziToast.show({
        message: 'Time came out!',
        color: '#03a14d',
        titleColor: '#fff',
        titleSize: '16px',
        messageColor: '#fff',
        messageSize: '16px',
        iconUrl: doneIcon,
        position: 'topRight',
        transitionIn: 'bounceInLeft',
        closeOnClick: true,
      });
      refs.input.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDiff);
      timerBox.days.textContent = addLeadingZero(days);
      timerBox.hours.textContent = addLeadingZero(hours);
      timerBox.minutes.textContent = addLeadingZero(minutes);
      timerBox.seconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
};




