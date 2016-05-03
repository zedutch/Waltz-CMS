#Contributing to Waltz

I would love it if you'd want to contribute to Waltz and help make it the best, most user-friendly CMS out there!
Here are some of the things that might help you along the way:

 - [Questions or Problems?](#questions)
 - [Issues or Bugs](#issues)
 - [Requests for Features](#features)
 - [Installing Locally](#installation)
 - [Running Locally](#running)
 
 ## <a name="questions"></a> Do you have Questions or Problems?
If you have questions about how to use Waltz or are finding some problems using it, please [contact zedutchgandalf](mailto:contact@zedutchgandalf.be) instead of posting an issue here.

## <a name="issues"></a> Did you find an Issue or a Bug?
### <a name="submit-issue"></a> Report an Issue or Bug
If you'd like to report an issue or bug with the Waltz CMS, please check the [issue archive on GitHub][GHIssues] to make sure it hasn't been reported before. If it hasn't, feel free to [submit a new issue][new-issue]. Please provide as much information as possible in your issue, this helps us with dealing with it more quickly.

### <a name="make-pr"></a> Submit a Pull Request
If you know how to fix the bug yourself, or if you want to fix a bug someone else has reported, you can also submit a Pull Request (PR). Before you do, though, please search the [archive of pull requests][prs] for an open or closed PR related to the bug you want to fix, this helps prevent duplicate effort. To create a Pull Request, first create your own branch using:
    ```
    git checkout -b fix-your-bug master
    ```
Please try to always start a bug fix branch name with "fix-".
You can then try to fix the bug in that branch. If you're done, please push your branch to GitHub:
    ```
    git push origin fix-your-bug
    ```
You can then send a Pull Request in GitHub to `Waltz-CMS:master`.
Your PR will now be reviewed by other contributors. If someone suggests changes, please implement them and push them to your `fix-your-bug` branch, this should also update your Push Request.
After your PR is merged, you can safely delete your fix-branch and return your local repository to the master branch:
    ```
    git checkout master -f
    ```

## <a name="features"></a> Do you want to Request a Feature?
If you'd like to request a new feature for Waltz, you can do so by [submitting a new issue][new-issue] for your feature. This will allow other contributors to discuss about the usefullness or details of your feature, and to divide the work needed to implement it.
If you want to implement the feature yourself and it's kind of a big feature, please also [submit a new issue][new-issue] so we can discuss it first. It'd be a shame to let you work on something for a few hours, only to discover afterwards that nobody in the community actually finds it helpfull or necessary to have.
If it's a small feature however, feel free to implement it yourself and to [submit a Pull Request](#make-pr) afterwards.

## <a name="installation"></a> Do you want to Install Waltz Locally?
1. Install the latest versions of [MongoDB](http://www.mongodb.org/downloads) and [Node.js](http://nodejs.org).
2. Clone the Git repository to your machine:
	`git clone https://github.com/zedutchgandalf/Waltz-CMS.git Waltz`
3. Install the NPM dependencies:
	`cd Waltz`
	`npm install`
4. Install Gulp globally:
	`npm install -g gulp`
5. Copy `app/config/express.conf.example` to `app/config/express.conf` and edit it according to the configuration you want to use on your machine.

## <a name="running"></a> Do you want to Run Waltz Locally?
1. Open a terminal window and start the application:
	`gulp`
2. Open a browser window and navigate to `localhost:8080`.

You can install the [LiveReload browser extension](http://livereload.com/extensions/) to automatically reload the browser window whenever a file changes.

[GHIssues]: https://github.com/zedutchgandalf/Waltz-CMS/issues
[new-issue]: https://github.com/zedutchgandalf/Waltz-CMS/issues/new
[prs]: https://github.com/zedutchgandalf/Waltz-CMS/pulls
