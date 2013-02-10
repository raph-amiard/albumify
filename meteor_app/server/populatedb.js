var require = __meteor_bootstrap__.require;
var fs = require("fs");
var _ = require("underscore");
var path = require("path");

function albumFromDisk(albumName) {
    return {albumName:albumName, dirName:albumName};
}

function addAlbumtoDb(albumName) {
    var albumsByDir = getAlbumsByDir();
    if (!albumsByDir[albumName])
        Albums.insert(albumFromDisk(albumName));
}

function getAlbumsByDir() {
    var res = {}
    Albums.find().forEach(function (album) {
        res[album.albumName] = album;
    })
    return res;
}

Meteor.startup(function() {
    dirs = fs.readdirSync(INCOMING_MUSIC_PATH);
    _.each(dirs, function(dir) {
        if (isMusicDir(dir)) addAlbumtoDb(dir);
    });
})
