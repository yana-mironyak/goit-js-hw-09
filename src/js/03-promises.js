import Notiflix from "notiflix";

const refs = {
    form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onClickBtn);

function onClickBtn(evt) {
  evt.preventDefault();
  let position = 1;
  const { elements: { delay, step, amount } } = evt.currentTarget;
  let delayTime = Number(delay.value);
  const stepTime = Number(step.value);
  
  for (let i = position; i <= amount.value; i += 1) {
    createPromise(position, delayTime);
    position += 1;
    delayTime += stepTime;
  }
}

function createPromise(position, delay) {
  return new Promise(() => {
      const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  }
)}
