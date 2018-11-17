module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: './dist/**/*.spec.js' },
    ],
    frameworks: ['jasmine'],
  })
}
