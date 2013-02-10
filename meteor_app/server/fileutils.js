var require = __meteor_bootstrap__.require;
var path = require("path");

function albumPath(albumName) {
    return path.join(INCOMING_MUSIC_PATH, albumName);
}

function isMusicFile(fileName) {
    return _.some([".MP3", ".FLAC", ".OGG", ".AAC", ".MP4"], function (ext) { 
        var fext = path.extname(fileName).toUpperCase();
        return fext == ext;
    });
}

function isMusicDir(albumName) {
    var stat = fs.statSync(albumPath(albumName));
    if (stat.isDirectory()) {
        var files = fs.readdirSync(albumPath(albumName));
        return _.some(files, isMusicFile);
    }
    return false;
}

function getZipName(albumName) {
  return albumName.replace(/ /g, "_") + ".zip";
}

function getZipPath(zipName) {
    return path.join(ZIP_ABS_PATH, zipName);
}
