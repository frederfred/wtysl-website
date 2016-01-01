var gulp = require("gulp");
var nano = require("gulp-cssnano");
var rename = require("gulp-rename");
var publicAssets = require("../config").publicAssets;

gulp.task("cssnano", function() {
  return gulp.src(publicAssets + "/stylesheets/application.css")
    .pipe(nano())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(publicAssets + "/stylesheets"));
});
