module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  testURL: 'http://localhost',
  globals: {
    __DEV__: false,
    __TEST__: true,
    __PROD__: false,
    __STAG__: false
  }
}
