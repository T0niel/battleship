export function shipContainer() {
  const shipContainerElement = document.createElement('div');
  shipContainerElement.classList.add('ship-container');

  return shipContainerElement;
}

export function addShipToShipContainer(length, shipimage, name) {
  const shipContainer = document.querySelector('.ship-container');

  const ship = document.createElement('div');
  ship.classList.add('ship');
  ship.classList.add(name);
  ship.id = length;

  ship.style.width = `${length * 4}rem`;
  ship.style.backgroundSize = `${length * 3}rem`;
  ship.style.backgroundImage = `url(${shipimage})`;

  shipContainer.appendChild(ship);
}

export function placeShips(ships) {
  ships.forEach((ship) => {
    addShipToShipContainer(ship.length, ship.img, ship.name);
  });
}

export function addShip(length, img, name, ships) {
  ships.push({ length, img, name });
}

