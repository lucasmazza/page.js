module.exports = function(config) {
  config.set({
    plugins: ['karma-webpack', 'karma-qunit', 'karma-phantomjs-launcher'],
    frameworks: ['qunit'],
    files: ['test/*.js'],
    preprocessors: { 'test/**/*.js': ['webpack'] },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    webpack: { module: require('./webpack.config.js').module },
    singleRun: false
  })
}
