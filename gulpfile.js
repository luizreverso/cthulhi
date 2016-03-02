var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var eslint = require("gulp-eslint");

// gulp.task("default", function () {

//     return gulp.src("engine/**/*.js")
//         .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(concat("cthulhi.js"))
//         .pipe(sourcemaps.write("."))
//         .pipe(gulp.dest("public"));
// });

// gulp.task('default', () =>
//     gulp.src('engine/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(concat('cthulhi.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('public'))
// );

gulp.task("default", function () {
	return gulp.src("./engine/**/*.js")
    .pipe(babel())
    // .pipe(concat("cthulhi.js"))
    .pipe(gulp.dest("public/."));
});

gulp.task("watcher", function () {
	gulp.watch("./engine/**/*.js",["default"]);
});

// gulp.task("scripts", function() {
// 	gulp.src("engine/**/*.js")
// 		.pipe(concat("bundle.js"))
// 		.pipe(gulp.dest("public /"));
// });

// gulp.task("scripts-dist", function() {
// 	gulp.src("engine/**/*.js")
// 		.pipe(concat("bundle.js"))
// 		.pipe(gulp.dest("public/"));
// });

gulp.task("lint", function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
	return gulp.src(["engine/**/*.js", "!node_modules/**"])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// var sass = require("gulp-sass");
// gulp.task("style", function() {
// 	return gulp.src("sass/**/*.scss")
// 		.pipe(sass().on("error", sass.logError)).
// 		.pipe(gulp.dest("../public/css/."));
// })