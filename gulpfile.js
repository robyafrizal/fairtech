var gulp = require("gulp");
var sass = require("gulp-sass");
var gulpMinifyCss = require("gulp-minify-css");
var gulpConcat = require("gulp-concat");
var gulpUglify = require("gulp-uglify");
var gulpHtmlmin = require("gulp-htmlmin");

gulp.task("styles", async function () {
  gulp.src("./app/sass/*.scss").pipe(sass()).pipe(gulp.dest("app/css"));
});

gulp.task("minify-css", async function () {
  gulp
    .src("./app/css/*.css")
    .pipe(
      gulpMinifyCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("minify-js", async function () {
  gulp
    .src(["./app/js/*.js"])
    .pipe(gulpConcat("bundle.js"))
    .pipe(gulpUglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-html", async function () {
  gulp
    .src("app/*.html")
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", async function () {
  gulp.watch("./app/sass/*.scss", gulp.series("styles"));
  gulp.watch("./app/js/*.js", gulp.series("minify-js"));
  gulp.watch("./app/css/*.css", gulp.series("minify-css"));
  gulp.watch("./app/*.html", gulp.series("minify-html"));
});

gulp.task("default", gulp.series("watch"));
