import randomzieHeatMap from '../modules/randomizeHeatMap'

//Formula: randomized_value = 1 + (Math.random() × 2 − 1) × control

//Randomize factor can be between 0 and 1. 1 Mean no randomization, and 0 means complete randomization
it('Empty heatmap', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 1);
    const randomizeFactor = 0.5;
    const heatMap = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    //If it is 0 we expect it to ignore the 0 and plug 0.5 into the formula instead
    expect(randomzieHeatMap(heatMap, randomizeFactor)).toEqual([
      [0.75, 0.75, 0.75, 0.75, 0.75],
      [0.75, 0.75, 0.75, 0.75, 0.75],
      [0.75, 0.75, 0.75, 0.75, 0.75],
    ]);
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

