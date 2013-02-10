ALBUMS_BASE_URL = "http://www.radiozerozero.com:1337/"

Template.albumlist.albums = function () {
    return Albums.find();
};

Template.albumlist.albumPath = function (albumName) {
    return ALBUMS_BASE_URL + encodeURIComponent(albumName) + ".zip";
};

Template.albumlist.events({
    'click button.btn-download' : function () {
        Meteor.call("downloadAlbum", this.albumName, function (error, zipPath) {
            console.log("ZIP PATH : ", zipPath);
        });
    }
});
