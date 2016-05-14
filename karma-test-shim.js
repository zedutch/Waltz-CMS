/*global jasmine, __karma__, window*/
// Use full stack traces in errors, for debugging purposes.
Error.stackTraceLimit            = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start.
__karma__.loaded = function () {};

function isInDist (path) {
    var distLocation = '/base/app/dist/';
    return path.substr(0, distLocation.length) === distLocation;
}

function isSpecFile (path) {
    return isInDist(path) && path.slice(-8) === '.spec.js';
}

function toModule (path) {
    return path.replace(/\\/g, '/')
               .replace(/^\/base\//, '')
               .replace(/\.js/, '');
}

Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
])
.then(function () {
    return Promise.all(
        Object.keys(window.__karma__.files)
              .filter(isSpecFile)
              .map(toModule)
              .map(function (moduleName) {
                  return System.import(moduleName);
              })
    );
})
.then(__karma__.start,
      function (error) {
          __karma__.error(error.name + ": " + error.message);
      }
);