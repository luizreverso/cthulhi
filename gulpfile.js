var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var eslint = require("gulp-eslint");

gulp.task("default", function () {
	return gulp.src("./engine/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/."));
});

gulp.task("watcher", function () {
	gulp.watch("./engine/**/*.js",["default"]);
});