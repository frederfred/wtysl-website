var rsync = require("rsyncwrapper").rsync;
var gulp = require("gulp");
var gutil = require("gulp-util");
var yargs = require("yargs").argv;
var config = require("../config").deploy;
var allowedTargets = ["staging", "production"];

gulp.task("deploy", ["uglify", "cssnano"], function() {
  var target = yargs.env;
  var settings;
  var rsyncConfig;

  if (allowedTargets.indexOf(target) > -1) {
    settings = require("../../deploy-settings.json")[target];
    rsyncConfig = Object.assign({
      dest: settings.user + "@" + settings.host + ":" + settings.destination
    }, config.rsync);

    rsync(rsyncConfig, function(error) {
      if (error) {
        gutil.log(gutil.colors.red("Deploy error"));
        gutil.log(error.message);
      } else {
        gutil.log(gutil.colors.green("Deploy complete"));
      }
    });
  } else {
    gutil.log(gutil.colors.red("Error.") + " --env must be either " + allowedTargets.join(" or "));
  }
});
