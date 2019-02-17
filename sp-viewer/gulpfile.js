(function () {
    "use strict";
    var gulp = require("gulp");
    var spsave = require("gulp-spsave");

    var spsaveCredential = require("./settings.js");

    var spsaveCoreOption = {
        siteUrl: "https://svbpfa.sharepoint.com/sp-viewer",
        folder: "SiteAssets/sp-viewer",
        checkin: true,
        checkinType: 1,
        flatten: false,
        notification: true
    };

    gulp.task("sp-upload", function () {
        return gulp.src("./src/**/*").pipe(spsave(spsaveCoreOption, spsaveCredential));
    });

    gulp.task("watch", function(){
        gulp.watch(["./Scripts/**/*.js"], ["sp-upload"]);
    });
})();
