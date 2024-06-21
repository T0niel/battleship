const body = document.querySelector('body');
import playerVsBot from './playerVsBot';

export default (rows = 10, cols = 10) => {
  body.innerHTML = '';

  const header = document.createElement('h1');
  header.textContent = 'Difficulty';

  header.classList.add('difficulty-header');
  body.appendChild(header);

  const difficultyWrapper = document.createElement('div');
  difficultyWrapper.classList.add('difficulty-wrapper');

  const difficultyContainer = document.createElement('div');
  difficultyContainer.classList.add('difficulty-container');

  const angryElement = document.createElement('div');
  angryElement.classList.add('angry');

  angryElement.addEventListener('click', () => {
    body.innerHTML = '';
    body.classList.add('transition');

    //0.5 makes it hard because it picks random moves but also considers adjecent squares
    playerVsBot(rows, cols, 0.5);
  });

  const happyElement = document.createElement('div');
  happyElement.classList.add('happy');

  happyElement.addEventListener('click', () => {
    body.innerHTML = '';
    body.classList.add('transition');
    //0 makes it easy because it picks random moves
    playerVsBot(rows, cols, 0);
  });

  const fineElement = document.createElement('div');
  fineElement.classList.add('fine');

  fineElement.addEventListener('click', () => {
    body.innerHTML = '';
    body.classList.add('transition');

    playerVsBot(rows, cols, 0.8);
  });

  difficultyContainer.appendChild(happyElement);
  difficultyContainer.appendChild(fineElement);
  difficultyContainer.appendChild(angryElement);

  difficultyWrapper.appendChild(difficultyContainer);
  body.appendChild(difficultyWrapper);
};
