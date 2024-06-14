export default (opponentGameboard, playerGameboard) => {
  function play(row, col, length, horizontal) {
    let err;
    try {
      playerGameboard.placeShip(row, col, length, horizontal);
    } catch (e) {
      err = e;
    }

    if (err) {
      return false;
    }

    return true;
  }

  function attack(row, col) {
    return opponentGameboard.recieveAttack(row, col);
  }

  return {
    play,
    attack
  };
};
