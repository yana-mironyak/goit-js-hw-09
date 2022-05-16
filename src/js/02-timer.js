import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    input: document.querySelector('#datetime-picker'),
    btn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.btn.addEventListener('click', onStartBtn);
refs.btn.setAttribute('disabled', true);

let currentDate = Date.now();
let selectedDate = '';
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();

        if (selectedDate < currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        
        refs.btn.toggleAttribute('disabled');  
    }  
}

function onStartBtn() {
    refs.btn.toggleAttribute('disabled');

    setInterval(() => {
        currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;

        if (deltaTime >= 0) {
            changeClockFace(deltaTime)
        } else {
            clearInterval(intervalId);
        };
    }, 1000);   
}

function changeClockFace(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
}
 
function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr(refs.input, options);
