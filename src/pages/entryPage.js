import header from '../components/header';

const body = document.querySelector('body');

export default () => {
    header();

    const btnContainer = document.createElement('div');

    btnContainer.classList.add('btn-container')

    const btnPlayerVsPlayer = document.createElement('button');
    const btnPlayerVsBot = document.createElement('button');

    btnPlayerVsPlayer.textContent = 'Player vs Player';
    btnPlayerVsPlayer.classList.add('player-vs-player-btn');

    btnPlayerVsBot.textContent = 'Player vs Bot';
    btnPlayerVsBot.classList.add('player-vs-bot-btn');

    btnContainer.appendChild(btnPlayerVsPlayer);
    btnContainer.appendChild(btnPlayerVsBot);

    body.appendChild(btnContainer);
}