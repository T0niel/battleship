import botCreator from '../modules/bot';
import gameboard from '../../modules/gameboard';
import shipCreator from '../../modules/ship';

describe('No edge cases', () => {
  it('makes an random attack if theres no ships in the enemy', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0.3);

    const playerGameboard = gameboard(10, 10, shipCreator);
    const botGameBoard = gameboard(10, 10, shipCreator);

    const randomizeFactor = 0.4;
    const bot = botCreator(randomizeFactor, playerGameboard, botGameBoard);

    expect(bot.attack()).toBe(false);
    expect(playerGameboard.getBoard()[3][3].isHit).toBe(true);
  });

  it('makes adjecent attacks if an ship was hited (based on the heatmap),  randomizeFactor = 1', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0.3);

    const playerGameboard = gameboard(10, 10, shipCreator);
    const botGameBoard = gameboard(10, 10, shipCreator);

    playerGameboard.placeShip(3, 3, 3, false);

    const randomizeFactor = 1;
    const bot = botCreator(randomizeFactor, playerGameboard, botGameBoard);

    const possibleAdjecentAttacks = [
      { row: 3, col: 4 },
      { row: 3, col: 2 },
      { row: 4, col: 3 },
      { row: 2, col: 3 },
    ];

    expect(bot.attack()).toBe(true);
    expect(playerGameboard.getBoard()[3][3].isHit).toBe(true);
    bot.attack();

    const out = possibleAdjecentAttacks.map((possibleMove) => {
      return playerGameboard.getBoard()[possibleMove.row][possibleMove.col]
        .isHit;
    });

    let pass = false;
    out.forEach((move) => {
      //If we made an move
      if (move && !pass) {
        pass = true;
        //If we somehow made more that one hit
      } else if (move && pass) {
        pass = false;
      }
    });

    expect(pass).toBe(true);
  });

  it('makes adjecent attacks if an ship was hited (based on the heatmap), randomizeFactor = 0.3', () => {
    jest
      .spyOn(Math, 'random')
      .mockImplementationOnce(() => 0.3)
      .mockImplementation(() => 0.3);

    const playerGameboard = gameboard(10, 10, shipCreator);
    const botGameBoard = gameboard(10, 10, shipCreator);

    playerGameboard.placeShip(3, 3, 3, false);

    //The bot should flip this to 0.7 and use that as the control for the heatmap randomization
    const randomizeFactor = 0.3;

    const bot = botCreator(randomizeFactor, playerGameboard, botGameBoard);

    bot.attack();
    bot.attack();

    expect(playerGameboard.getBoard()[3][3].isHit).toBe(true);
  });

  it('can check weather theres enough place for attack', () => {
    const botGameboard = gameboard(10, 10, shipCreator);
    const playerGameboard = gameboard(2, 2, shipCreator);

    // randomizeFactor does not mater because the ships are placed randomly
    const randomizeFactor = 1;
    const bot = botCreator(randomizeFactor, playerGameboard, botGameboard);

    playerGameboard.recieveAttack(0, 0);
    playerGameboard.recieveAttack(0, 1);
    playerGameboard.recieveAttack(1, 0);

    expect(bot.canAttack()).toBe(true);
  });
});

describe('Edge cases', () => {
  it('returns false if theres no space for placing', () => {
    const botGameboard = gameboard(3, 3, shipCreator);
    const playerGameboard = gameboard(10, 10, shipCreator);

    // randomizeFactor does not mater because the ships are placed randomly
    const randomizeFactor = 1;

    botGameboard.placeShip(1, 0, 3, false);
    botGameboard.placeShip(1, 1, 3, false);
    botGameboard.placeShip(1, 2, 3, false);

    const bot = botCreator(
      randomizeFactor,
      playerGameboard,
      botGameboard,
      10,
      10
    );
    expect(bot.play(3)).toBe(false);
  });

  it('returns false if theres no space for attack', () => {
    const botGameboard = gameboard(10, 10, shipCreator);
    const playerGameboard = gameboard(2, 2, shipCreator);

    // randomizeFactor does not mater because the ships are placed randomly
    const randomizeFactor = 1;
    const bot = botCreator(randomizeFactor, playerGameboard, botGameboard);

    playerGameboard.recieveAttack(0, 0);
    playerGameboard.recieveAttack(0, 1);
    playerGameboard.recieveAttack(1, 0);
    playerGameboard.recieveAttack(1, 1);

    expect(bot.attack()).toBe(false);
  });

  it('can check weather theres enough place for attack (should return false)', () => {
    const botGameboard = gameboard(10, 10, shipCreator);
    const playerGameboard = gameboard(2, 2, shipCreator);

    // randomizeFactor does not mater because the ships are placed randomly
    const randomizeFactor = 1;
    const bot = botCreator(randomizeFactor, playerGameboard, botGameboard);

    playerGameboard.recieveAttack(0, 0);
    playerGameboard.recieveAttack(0, 1);
    playerGameboard.recieveAttack(1, 0);
    playerGameboard.recieveAttack(1, 1);

    expect(bot.canAttack()).toBe(false);
  });
});
