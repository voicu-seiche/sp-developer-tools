(function () {
    "use strict";
    var gulp = require("gulp");
    var spsave = require("gulp-spsave");

    var spConfig = require("./config/sp-config.js");

    var spsaveCredential = {
        username: spConfig.username,
        password: spConfig.password
    };

    var spsaveCoreOption = {
        siteUrl: spConfig.siteUrl,
        folder: spConfig.folder,
        checkin: true,
        checkinType: 1,
        flatten: false,
        notification: true
    };

    gulp.task("sp-upload", function () {
        return gulp.src("./src/**/*").pipe(spsave(spsaveCoreOption, spsaveCredential));
    });

    gulp.task("watch", function(){
        gulp.watch(["./src/**/*"], ["sp-upload"]);
    });
})();
