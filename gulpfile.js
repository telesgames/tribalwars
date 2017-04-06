/**
 * Created by Rafael Teles <rmteles@translucentcomputing.com> on 20-Feb-17.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var safetyNet = require('gulp-safety-net');
var browserify = require('gulp-browserify');
var stripComments = require('gulp-strip-comments');
var international = require('gulp-international');
var removeEmptyLines = require('gulp-remove-empty-lines');

var emptyFn = function () {
};

var internationalOpts = {
    locales: "lang",
    filename: '${path}/${lang}/${name}.${ext}',
    delimiter: {
        prefix: '${',
        suffix: '}'
    }
};

var safetyNetOpts = {
    logger: 'console.error(e);alert(e)'
};

gulp.task('default', ['clean', 'scriptsDry', 'scripts'], emptyFn);

gulp.task('clean', [], function () {
    return gulp.src("dist/*", {read: false}).pipe(clean());
});

gulp.task('scriptsDry', ['clean'], function () {
    var src = [
        "scripts/groupVillageCoordinatesExtractor/coordinatesExtractor.js",
        "scripts/selectedMaxLootReports/selectedMaxLootReports.js"
    ];

    gulp.src(src)
        .pipe(stripComments()).pipe(removeEmptyLines())
        .pipe(international(internationalOpts))
        .pipe(safetyNet(safetyNetOpts))
        .pipe(gulp.dest('./dist'));

    gulp.src(src)
        .pipe(uglify())
        .pipe(international(internationalOpts))
        .pipe(rename({suffix: '.min'}))
        .pipe(safetyNet(safetyNetOpts))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', ['clean'], function () {
    var src = [
        "scripts/reportDiscoveredResourcesTroopsCalculator/reportDiscoveredResourcesTroopsCalculator.js",
        "scripts/marketplaceBalance/marketplaceBalance.js",
        "scripts/marketplaceScout/*",
        "scripts/marketplaceTrader/marketplaceTrader.js",
        "scripts/lootAssistant/*"
    ];

    gulp.src(src)
        .pipe(browserify({}))
        .pipe(stripComments()).pipe(removeEmptyLines())
        .pipe(international(internationalOpts))
        .pipe(safetyNet(safetyNetOpts))
        .pipe(gulp.dest('./dist'));

    gulp.src(src)
        .pipe(browserify({}))
        .pipe(uglify())
        .pipe(international(internationalOpts))
        .pipe(rename({suffix: '.min'}))
        .pipe(safetyNet(safetyNetOpts))
        .pipe(gulp.dest('./dist'));
});
