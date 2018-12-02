module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: './dist/node_modules/**/*.js', type: 'module' },
      { pattern: './dist/src/component/**/*.js', type: 'module' },
      { pattern: './dist/src/global-declarations/index.js', type: 'module' },
      { pattern: './dist/src/**/*.spec.js', type: 'module' },
    ],
    frameworks: ['jasmine'],
  })
}
