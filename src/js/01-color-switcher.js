const refs = {
    bgc: document.body,
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let timerId = 0;

refs.stopBtn.setAttribute('disabled', true);

function onStartBtnClick() {

    timerId = setInterval(() => {
        refs.bgc.style.backgroundColor = getRandomHexColor();
    }, 1000);
  
    refs.startBtn.toggleAttribute('disabled', true);
    refs.stopBtn.toggleAttribute('disabled');
};


function onStopBtnClick() {
    
    clearInterval(timerId);
    refs.stopBtn.toggleAttribute('disabled');
    refs.startBtn.toggleAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
