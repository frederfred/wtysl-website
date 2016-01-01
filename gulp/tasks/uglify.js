var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var publicAssets = require("../config").publicAssets;

gulp.task("uglify", function() {
  return gulp.src(publicAssets + "/javascripts/application.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(publicAssets + "/javascripts"));
});
