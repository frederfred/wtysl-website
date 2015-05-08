var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");

gulp.task("build", function(cb) {
  var tasks = ["clean", ["images"], ["sass", "browserify"]];

  tasks.push("rev");
  tasks.push(cb);

  gulpSequence.apply(this, tasks);
});
