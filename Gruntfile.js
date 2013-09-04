module.exports = function(grunt) {

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-jasmine',
    'grunt-contrib-uglify'
  ];

  var config = {};

  config.jshint = {};
  config.jshint.options = { jshintrc: '.jshintrc' };
  config.jshint.all = ['./page.js', 'spec/**/*_spec.js'];

  config.jasmine = {};
  config.jasmine.options = {};
  config.jasmine.src = './page.js';
  config.jasmine.options.specs = 'spec/**/*_spec.js';

  config.uglify = {};
  config.uglify.compress = {};
  config.uglify.compress.files = {
    './page.min.js': ['./page.js']
  };

  grunt.initConfig(config);
  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'jshint jasmine');
};
