/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'app'                  : 'app',
        'dist'                 : 'dist',
        'rxjs'                 : 'lib/rxjs',
        '@angular'             : 'lib/@angular',
        'moment'               : 'lib/moment/moment.js',
        'angular2localization' : 'lib/angular2localization'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app' : {
            defaultExtension : 'js'
        },
        'dist' : {
            type             : 'register',
            main             : 'main',
            defaultExtension : 'js'
        },
        'rxjs' : {
            defaultExtension : 'js'
        },
        'angular2localization': {
            main             : 'bundles/angular2localization.umd.min.js',
            defaultExtension : 'js'
        }
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/router',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);