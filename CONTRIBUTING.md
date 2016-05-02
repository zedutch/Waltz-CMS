#Contributing to Waltz

##Local Installation:
1. Install the latest versions of [MongoDB](http://www.mongodb.org/downloads) and [Node.js](http://nodejs.org).
2. Clone the Git repository to your machine:
	`git clone https://github.com/zedutchgandalf/Waltz-CMS.git Waltz`
3. Install the NPM dependencies:
	`cd Waltz`
	`npm install`
4. Install Gulp globally:
	`npm install -g gulp`
5. Copy `app/config/express.conf.example` to `app/config/express.conf` and edit it according to the configuration you want to use on your machine.

##Running Locally:
1. Open a terminal window and start the application:
	`gulp`
2. Open a browser window and navigate to `localhost:8080`.

You can install the [LiveReload browser extension](http://livereload.com/extensions/) to automatically reload the browser window whenever a file changes.