const body = document.querySelector('body');
import entryPage from '../pages/entryPage';

export default (messsage, currentPage, currentPageArgs) => {
  body.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.classList.add('end-game-wrapper');

  const header = document.createElement('h1');
  header.textContent = messsage;

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('play-again-btn');
  playAgainBtn.textContent = 'Play again';

  playAgainBtn.addEventListener('click', () => {
    body.innerHTML = '';
    currentPage(...currentPageArgs);
  });

  const back = document.createElement('button');
  back.classList.add('back-btn');
  back.textContent = 'back';

  back.addEventListener('click', () => {
    body.innerHTML = '';
    entryPage();
  })

  buttonWrapper.appendChild(playAgainBtn);
  buttonWrapper.appendChild(back);

  wrapper.appendChild(header);
  wrapper.appendChild(buttonWrapper);

  body.appendChild(wrapper);
};
