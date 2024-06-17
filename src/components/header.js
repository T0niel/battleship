import moonImg from '../imgs/icons/moon.png';
import githubImg from '../imgs/icons/github.png';
import sunImg from '../imgs/icons/sun.png';
import githubLight from '../imgs/icons/githubLight.png';

const body = document.querySelector('body');

export default () => {
  const header = document.createElement('div');
  header.classList.add('header');

  const h1 = document.createElement('h1');
  header.appendChild(h1);
  h1.classList.add('heading');

  h1.textContent = 'Battleship';

  const githubLinkRepository = 'https://github.com/Elton-1/battleship';

  const githubLink = document.createElement('a');
  githubLink.href = githubLinkRepository;
  githubLink.classList.add('github');
  githubLink.target = '__blank';

  const github = new Image();
  github.src = githubImg;
  github.classList.add('github');

  githubLink.appendChild(github);

  header.appendChild(githubLink);

  const theme = new Image();
  theme.src = moonImg;
  theme.classList.add('theme');

  theme.addEventListener('click', () => {
    if (document.documentElement.className === 'dark') {
      document.documentElement.className = 'light';
      theme.src = moonImg;
      github.src = githubImg;
    } else {
      document.documentElement.className = 'dark';
      theme.src = sunImg;
      github.src = githubLight;
    }
  });

  header.appendChild(theme);

  body.appendChild(header);
};
