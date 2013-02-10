var require = __meteor_bootstrap__.require;
var spawn = require("child_process").spawn;
var Future = require('fibers/future');

function makeZipForAlbum(albumName) {
}

Meteor.methods({
    downloadAlbum: function (albumName) {
        var album = Albums.findOne({albumName: albumName});
        var zipName = getZipName(albumName);
        var zipPath = getZipPath(zipName);
        var zipProcess = spawn("zip", ["-r", zipPath, albumPath(albumName)]);
        var fut = new Future();

        zipProcess.on("exit", function (code) { 
          console.log(code);
          fut.ret("zips/" + zipName); 
        });
        
        return fut.wait();
    }
});
