module.exports = function(config) {
    var dependencies = require('./package.json').dependencies;
    var excludedDependencies = [
        'systemjs',
        'zone.js'
    ];
    var configuration = {

        basePath: '',

        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],
        
        preprocessors: {
            'app/dist/**/!(*.spec)+(.js)': ['coverage'],
            'app/dist/**/*.js': ['sourcemap']
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'json', subdir: 'report-json' }
            ]
        },

        files: [
            'node_modules/traceur/bin/traceur-runtime.js',

            // Polyfills.
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            
            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',

            'app/config/systemjs.config.js',
            'karma-test-shim.js',
            
            {
                pattern  : 'app/dist/**/*.js',
                included : false
            },
//            {
//                pattern: 'app/test/matchers.js',
//                included: false
//            },
            
            // paths loaded via Angular's component compiler
            {
                pattern: 'app/views/**/*.pug',
                included: false
            }, {
                pattern: 'app/dist/**/*.css',
                included: false
            },
            
            // paths to support debugging with source maps
            {
                pattern: 'app/scripts/**/*.ts',
                included: false,
                watched: false
            }, {
                pattern: 'app/dist/**/*.js.map',
                included: false,
                watched: false
            },
            
            {
                pattern: 'node_modules/karma-sourcemap-loader/**/*.js',
                included: false
            }
        ],

        proxies: {
            // required for component assests fetched by Angular's compiler
            "/lib/"  : "/base/node_modules/",
            "/app/"  : "/base/app/"
        },

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-sourcemap-loader'
        ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        failOnEmptyTestSuite: false,
        autoWatch: true,
        singleRun: true
    };

    Object.keys(dependencies).forEach(function(key) {
        if(excludedDependencies.indexOf(key) >= 0) { return; }

        configuration.files.push({
            pattern: 'node_modules/' + key + '/**/*.js',
            included: false,
            watched: false
        });
    });

    config.set(configuration);
};