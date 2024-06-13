import shipFactory from '../modules/ship';

describe('No edge cases', () => {
  it('ship can be sunked', () => {
    const shipLength = 4;
    const ship = shipFactory(shipLength);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toEqual(true);
  });

  it('ship should be not sunked', () => {
    const shipLength = 4;
    const ship = shipFactory(shipLength);

    ship.hit();

    expect(ship.isSunk()).toEqual(false);
  });

  it('counts hit ammounts', () => {
    const shipLength = 2;
    const ship = shipFactory(shipLength);

    ship.hit();

    expect(ship.getHitAmounts()).toBe(1);
  });
});

describe('Edge cases', () => {
  it('Should not take more hits than the length', () => {
    const shipLength = 4;
    const ship = shipFactory(shipLength);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.getHitAmounts()).toBe(4);

    ship.hit();
    ship.hit();

    expect(ship.getHitAmounts()).toBe(4);
  });
});
