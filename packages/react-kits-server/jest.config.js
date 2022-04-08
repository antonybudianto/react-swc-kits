module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  moduleDirectories: [
    'src',
    'node_modules',
    '../react-kits-cli/template/node_modules'
  ]
};
