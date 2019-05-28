(function () {
    "use strict";
    var gulp = require("gulp");
    var concat = require("gulp-concat");
    var minify = require("gulp-uglify");
    var spsave = require("gulp-spsave");
    var clean = require('gulp-clean');
    var spConfig = require("./config/sp-config.js");
    var merge = require('merge-stream');
    var sourcemaps = require('gulp-sourcemaps');
    var replace = require('gulp-replace');

    var srcPath = './src/';
    var buildPath = './build';
    var distPath = './dist';

    var spsaveCredentials = {
        username: spConfig.username,
        password: spConfig.password
    };

    var spsaveOptions = {
        siteUrl: spConfig.siteUrl,
        folder: 'sp-api-helper-client',
        checkin: true,
        checkinType: 1,
        flatten: false,
        notification: true
    };

    // gulp.task("watch-all", function () {
    //     gulp.watch([srcPath + "/build/*"], gulp.series("sp-upload"));
    // });

    // gulp.task("watch", function () {
    //     gulp.watch(["build/**"])
    //         .on('change', function (file) {
    //             file = file.replace(/\\/g, '/');

    //             spsaveOptions.folder = file.substring(file.indexOf('SiteAssets/'), file.lastIndexOf('/'));

    //             return gulp.src(file).pipe(spsave(spsaveOptions, spsaveCredentials));
    //         });
    // });

    gulp.task('clean-build', function () {
        return gulp.src(buildPath, {
                read: false,
                allowEmpty: true
            })
            .pipe(clean());
    });

    var vendors = ['jquery/dist/jquery.js'];

    gulp.task('build-vendors', function () {
        return merge(vendors.map(function (vendor) {
            return gulp.src('node_modules/' + vendor)
                .pipe(gulp.dest(buildPath + '/vendors/'));
        }));
    });

    gulp.task('build-api', function () {
        return gulp.src(srcPath + "/js/**/*.js")
            .pipe(sourcemaps.init())
            .pipe(concat('sp-api-helper.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(buildPath + "/api/"));
    });

    gulp.task('build', gulp.series('clean-build', 'build-vendors', 'build-api'));

    gulp.task('clean-dist', function () {
        return gulp.src(distPath, {
                read: false,
                allowEmpty: true
            })
            .pipe(clean());
    });

    gulp.task('dist-api', function () {
        return gulp.src(srcPath + "/js/**/*.js")
            .pipe(sourcemaps.init())
            .pipe(concat('sp-api-helper.js'))
            .pipe(gulp.dest(distPath + "/"));
    });

    gulp.task('dist-api-min', function () {
        return gulp.src(srcPath + "/js/**/*.js")
            .pipe(sourcemaps.init())
            .pipe(minify())
            .pipe(concat('sp-api-helper.min.js'))
            .pipe(gulp.dest(distPath + "/"));
    });

    gulp.task('dist', gulp.series('clean-dist', 'dist-api', 'dist-api-min'));

    gulp.task('build-client', function () {
        return gulp.src(srcPath + "/client/**/*")
            .pipe(gulp.dest(buildPath + "/client/"));
    });

    gulp.task('sp-upload', function () {
        spsaveOptions.folder = spConfig.folder;

        var vendorFiles = gulp.src(buildPath + "/vendors/**/*")
            .pipe(spsave(spsaveOptions, spsaveCredentials));

        var apiFiles = gulp.src(buildPath + "/api/**/*")
            .pipe(spsave(spsaveOptions, spsaveCredentials));

        var clientFiles = gulp.src(buildPath + "/client/**/*")
            .pipe(spsave(spsaveOptions, spsaveCredentials));

        return merge(vendorFiles, apiFiles, clientFiles);
    });

    gulp.task('publish', gulp.series('build', 'build-client', 'sp-upload'));
})();
