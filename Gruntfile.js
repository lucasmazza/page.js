module.exports = function(grunt) {

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-jasmine',
    'grunt-contrib-uglify'
  ];

  var config = {};
  config.pkg = grunt.file.readJSON('bower.json');

  config.jshint = {};
  config.jshint.options = { jshintrc: '.jshintrc' };
  config.jshint.all = ['./page.js', 'spec/**/*_spec.js'];

  config.jasmine = {};
  config.jasmine.options = {};
  config.jasmine.src = './page.js';
  config.jasmine.options.specs = 'spec/**/*_spec.js';

  config.uglify = {};
  config.uglify.options = {};
  config.uglify.compress = {};
  config.uglify.compress.files = {
    './page.min.js': ['./page.js']
  };

  config.uglify.options.banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n';

  grunt.initConfig(config);
  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'jasmine']);
};
