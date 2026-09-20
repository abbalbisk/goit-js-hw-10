
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const refs = {
    timerInput: document.querySelector("#datetime-picker"),
    dayEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minEl: document.querySelector('[data-minutes]'),
    secondEl: document.querySelector('[data-seconds]'),
    btnStart: document.querySelector('[data-start]'),
}

let userSelectedDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < Date.now()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',

            });

           refs.btnStart.disabled = true;
           refs.btnStart.classList.remove('is-active');

        } else {
            refs.btnStart.disabled = false;
            refs.btnStart.classList.add('is-active');
        }
  },
};


flatpickr(refs.timerInput, options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let intervalId;


refs.btnStart.addEventListener('click', () => {
    refs.btnStart.disabled = true;
    refs.btnStart.classList.remove('is-active');
    refs.timerInput.disabled = true;
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = userSelectedDate - currentTime;
        updateDisplay(diff)
        if (diff <= 0) {
            clearInterval(intervalId)
            refs.dayEl.textContent = '00';
            refs.hoursEl.textContent = '00';
            refs.minEl.textContent = '00';
            refs.secondEl.textContent = '00';

            refs.btnStart.disabled = false;
            refs.btnStart.classList.add('is-active');
            refs.timerInput.disabled = false;
        }

    }, 1000)



})
function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}


function updateDisplay(ms) {
    const str = convertMs(ms);
        refs.dayEl.textContent = addLeadingZero(str.days);
        refs.hoursEl.textContent = addLeadingZero(str.hours);
        refs.minEl.textContent = addLeadingZero(str.minutes);
        refs.secondEl.textContent = addLeadingZero(str.seconds);
}