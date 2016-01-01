var rsync = require("rsyncwrapper").rsync;
var gulp = require("gulp");
var gutil = require("gulp-util");
var config = require("../config").deploy;
var target = require("../../deploy-settings.json").staging;
var rsyncConfig = Object.assign({
  dest: target.user + "@" + target.host + ":" + target.destination
}, config.rsync);

gulp.task("deploy", function() {
  rsync(rsyncConfig, function(error) {
    if (error) {
      gutil.log(gutil.colors.red("Deploy error"));
      gutil.log(error.message);
    } else {
      gutil.log(gutil.colors.green("Deploy complete"));
    }
  });
});
