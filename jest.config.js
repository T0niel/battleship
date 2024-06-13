const config = {
  // collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

module.exports = config;
