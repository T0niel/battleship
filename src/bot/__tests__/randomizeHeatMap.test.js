import randomzieHeatMap from '../modules/randomizeHeatMap'

//Formula: randomized_value = 1 + (Math.random() × 2 − 1) × control

it('Empty heatmap', () => {
    const randomizeFactor = 1;
    const heatMap = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    expect(randomzieHeatMap(heatMap, randomizeFactor)).toEqual(heatMap);
})

it('Populated heatmap high randomize factor', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0.3);
    const randomizeFactor = 1;
    const heatMap = [
      [1, 2, 2, 4],
      [1, 2, 2, 4],
      [1, 2, 2, 4],
    ];

    expect(randomzieHeatMap(heatMap, randomizeFactor)).toEqual([
      [0.6, 1.2, 1.2, 2.4],
      [0.6, 1.2, 1.2, 2.4],
      [0.6, 1.2, 1.2, 2.4],
    ]);
})

it('Populated heatmap with no randomize factor', () => {
  jest.spyOn(Math, 'random').mockImplementation(() => 0.3);
  const randomizeFactor = 0;
  const heatMap = [
    [1, 2, 2, 4],
    [1, 2, 2, 4],
    [1, 2, 2, 4],
  ];

  expect(randomzieHeatMap(heatMap, randomizeFactor)).toEqual([
    [1, 2, 2, 4],
    [1, 2, 2, 4],
    [1, 2, 2, 4],
  ]);
});

