// Generated on 2015-04-27 using generator-dangular 2.0.13
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    yeoman: {
      // configurable paths
      app: 'src',
      dist: 'dist'
    },

    version: require('./package.json').version,

    portPick: {
      livereload: {
          options: {
            port: 1337,
            name: 'livereload'
          },
          targets: [
            'connect.options.livereload'
          ]
      },
      server: {
        options: {
          port: 9000,
          name: 'server'
        },
        targets: [
          'connect.options.port',
          'connect.test.options.port'
        ]
      }
    },

    watch: {
      injectJS: {
        files: [
          '<%%= yeoman.app %>/**/*.js',
          '!<%%= yeoman.app %>/**/*.spec.js',
          '!<%%= yeoman.app %>/**/*.mock.js',
          '!<%%= yeoman.app %>/app.js'],
        tasks: ['injector:scripts']
      },
      injectSass: {
        files: [
          '<%%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      <% if (filters.compass) { %>
      compass: {
        files: ['<%%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else { %>
      sass: {
        files: [
          '<%%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },<% } %>
      injectCss: {
        files: [
          '<%%= yeoman.app %>/**/*.css'
        ],
        tasks: ['injector:css']
      },
      jsTest: {
        files: [
          '<%%= yeoman.app %>/**/*.spec.js',
          '<%%= yeoman.app %>/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%%= yeoman.app %>}/**/*.css',
          '{.tmp,<%%= yeoman.app %>}/**/*.html',
          '{.tmp,<%%= yeoman.app %>}/**/*.js',
          '!{.tmp,<%%= yeoman.app %>}/**/*.spec.js',
          '!{.tmp,<%%= yeoman.app %>}/**/*.mock.js',
          '<%%= yeoman.app %>/assets/img/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      open: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('src')
            ];
          }
        }
      },
      livereload: {
        options: {
          open: false,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('src')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('<%%= yeoman.app %>')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%%= yeoman.dist %>'
        }
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%%= yeoman.app %>/**/*.js',
        '!<%%= yeoman.app %>/**/*.spec.js',
        '!<%%= yeoman.app %>/**/*.mock.js'
      ],
      test: {
        src: [
          '<%%= yeoman.app %>/**/*.spec.js',
          '<%%= yeoman.app %>/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%%= yeoman.app %>/index.html',
        ignorePath:  /\.\.\//
      }<% if (filters.compass) { %>,
      sass: {
        src: ['<%%= yeoman.app %>/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }<% } %>
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/{,*/}*.js',
            '<%%= yeoman.dist %>/{,*/}*.css',
            '<%%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/assets/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%%= yeoman.app %>/index.html'],
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/{,*/}*.css'],
      js: ['<%%= yeoman.dist %>/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%%= yeoman.dist %>',
          '<%%= yeoman.dist %>/assets/img'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved img']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'testApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: '<%%= yeoman.app %>/app.js'
      },
      main: {
        cwd: '<%%= yeoman.app %>',
        src: ['**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/img/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%%= yeoman.dist %>/assets/img',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%%= yeoman.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>',
        dest: '.tmp/',
        src: ['**/*.css']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        <% if (filters.compass) { %>'compass'<% } else { %>'sass'<% } %>
      ],
      test: [
        <% if (filters.compass) { %>'compass'<% } else { %>'sass'<% } %>
      ],
      dist: [
        <% if (filters.compass) { %>'compass'<% } else { %>'sass'<% } %>,
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    <% if (filters.compass) { %>
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/',
        cssDir: '.tmp/',
        generatedImagesDir: '.tmp/src/assets/img/generated',
        imagesDir: '<%%= yeoman.app %>/assets/img',
        javascriptsDir: '<%%= yeoman.app %>/',
        fontsDir: '<%%= yeoman.app %>/assets/fonts',
        importPath: './bower_components',
        httpImagesPath: '/assets/img',
        httpGeneratedImagesPath: '/assets/img/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/assets/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } else { %>

    // Compiles Sass to CSS
    sass: {
      server: {
        options: {
          loadPath: [
            'bower_components',
            '<%%= yeoman.app %>'
          ],
          compass: false
        },
        files: {
          '.tmp/src/app.css' : '<%%= yeoman.app %>/app.scss'
        }
      }
    },
    <% } %>

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/src/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%%= yeoman.app %>/index.html': [
              ['{.tmp,<%%= yeoman.app %>}/**/*.js',
               '!{.tmp,<%%= yeoman.app %>}/app.js',
               '!{.tmp,<%%= yeoman.app %>}/**/*.spec.js',
               '!{.tmp,<%%= yeoman.app %>}/**/*.mock.js']
            ]
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/src/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%%= yeoman.app %>/app.scss': [
            '<%%= yeoman.app %>/**/*.{scss,sass}',
            '!<%%= yeoman.app %>/app.{scss,sass}'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/src/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%%= yeoman.app %>/index.html': [
            '<%%= yeoman.app %>/**/*.css'
          ]
        }
      }
    },


  });

  grunt.registerTask('serve', function (target, arg2) {
    var open = 'livereload';

    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    if (target === 'open' || arg2 === 'open') {
      open = 'open';
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'injector:sass',
      'concurrent:server',
      'autoprefixer',
      'portPick:livereload',
      'portPick:server',
      'injector',
      'connect:'+open,
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'injector:sass',
    'concurrent:test',
    'injector',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);


  grunt.registerTask('build', [
    'clean:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
