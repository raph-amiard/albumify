var http = require('http');
var url = require('url');
var spawn = require('child_process').spawn;
var path = require('path');

ALBUMS_ROOT_PATH = "/media/stock2/rtorrent/incoming";

function albumPath(albumName) {
    return path.join(ALBUMS_ROOT_PATH, albumName);
}

http.createServer(function (req, res) {

    console.log("FFFUFUUFUUFUUFU");
    var albumName = decodeURIComponent(path.basename(url.parse(req.url).pathname, ".zip"));
    console.log("ALBUM NAME : ", albumName);
    res.setHeader("Content-Type", "application/zip");
    var zipProcess = spawn('zip', ['-rj', '-', albumPath(albumName)]);

    zipProcess.stdout.on('data', function (data) { res.write(data); });

    //zipProcess.stderr.on('data', function (data) { console.log(data); });

    zipProcess.on('exit', function (code) {
        if (code !== 0) {
            res.statusCode = 500;
            console.log("zip process exited with code " + code);
        } 
        res.end();
    });

}).listen(1337, 'radiozerozero.com');

console.log('Server running at http://127.0.0.1:1337/')
