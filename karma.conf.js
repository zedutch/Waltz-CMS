module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            // Polyfills.
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/reflect-metadata/Reflect.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // RxJs.
            {
                pattern: 'node_modules/rxjs/**/*.js',
                included: false,
                watched: false
            }, {
                pattern: 'node_modules/rxjs/**/*.js.map',
                included: false,
                watched: false
            },
            
            {
                pattern: 'karma-test-shim.js',
                included: true,
                watched: true
//            }, {
//                pattern: 'app/test/matchers.js',
//                included: true,
//                watched: true
            },

            // paths loaded via module imports
            // Angular itself
            {
                pattern: 'node_modules/@angular/**/*.js',
                included: false,
                watched: true
            }, {
                pattern: 'node_modules/@angular/**/*.js.map',
                included: false,
                watched: true
            },

            // Our built application code
            {
                pattern: 'app/dist/**/*.js',
                included: false,
                watched: true
            },

            // paths loaded via Angular's component compiler
            {
                pattern: 'app/views/**/*.pug',
                included: false,
                watched: true
            }, {
                pattern: 'app/dist/**/*.css',
                included: false,
                watched: true
            },

            // paths to support debugging with source maps in dev tools
            {
                pattern: 'app/scripts/**/*.ts',
                included: false,
                watched: false
            }, {
                pattern: 'app/dist/**/*.js.map',
                included: false,
                watched: false
            }
        ],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            'app/**/!(*.spec)+(.js)': ['coverage']//,
//            'app/**/*.js': ['sourcemap']
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'json', subdir: 'report-json' }
            ]
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        failOnEmptyTestSuite: false,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
  });
};
