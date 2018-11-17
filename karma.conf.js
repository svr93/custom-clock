module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: './dist/component/**/*.js', type: 'module' },
      { pattern: './dist/global-declarations/index.js', type: 'module' },
      { pattern: './dist/**/*.spec.js', type: 'module' },
    ],
    frameworks: ['jasmine'],
  })
}
