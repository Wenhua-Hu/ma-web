'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    connect: {
      app: {
        options: {
          port: 8888,
          hostname: '*',
          base: ['app', 'bower_components', 'node_modules'],
          livereload: true
        }
      }
    },

    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: 'app/**/*.html'
    },
    jscs: {
      options: {
        config: '.jscsrc',
      },
      app: {
        src: 'app/js/**/*.js'
      },
      grunt: {
        src: 'Gruntfile.js'
      }
    },
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      app: {
        options: {
          globals: {
            angular: true,
            console: true
          }
        },
        src: 'app/js/**/*.js'
      },
      grunt: {
        options: {
          globals: {
            module: true
          }
        },
        src: 'Gruntfile.js'
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['app/css/*.css']
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      html: {
        files: 'app/**/*.html',
        tasks: ['htmlhint']
      },
      js: {
        files: 'app/js/**/*.js',
        tasks: ['jshint:app', 'jscs:app']
      },
       css: {
        files: 'app/css/*.css',
        tasks: ['csslint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('test', [
    'htmlhint',
    'jshint',
    'csslint'
  ]);

  grunt.registerTask('default', [
    'connect',
    'watch'
  ]);
};
