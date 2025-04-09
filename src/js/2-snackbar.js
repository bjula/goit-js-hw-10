import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import doneIcon from '../img/done.svg';
import errorIcon from '../img/error.svg';

const refs = {
    form: document.querySelector('.form'),
};

function createPromis(state, delay){
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
    return promise;
};

refs.form.addEventListener('submit', e => {
    e.preventDefault();

    const userDelay = Number(refs.form.querySelector('input[name="delay"]').value);
    const userState = refs.form.querySelector('input[name="state"]:checked').value;

    createPromis(userState, userDelay)
      .then(() => {
        iziToast.show({
          message: `Fulfilled promise in ${userDelay}ms`,
          iconUrl: doneIcon,
          backgroundColor: '#59a10d',
          position: 'topRight',
          messageSize: '18',
        });
      })
      .catch(() => {
        iziToast.show({
          message: `Rejected promise in ${userDelay}ms`,
          iconUrl: errorIcon,
          backgroundColor: '#ef4040',
          position: 'topRight',
          messageSize: '18',
        });
      });
    e.target.reset();
});
