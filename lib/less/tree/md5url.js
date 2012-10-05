(function (tree, crypto, fs, path) {

tree.MD5Url = function (relative_path, directory, filename) {
    var fullpath = path.resolve(path.dirname(filename), relative_path);
    this.directory = directory;
    this.basename = path.basename(fullpath);
    this.hash = crypto
        .createHash('md5')
        .update(fs.readFileSync(fullpath))
        .digest("hex");
};
tree.MD5Url.prototype = {
    toCSS: function () {
        var self = this;
        return "url(" + this.directory + this.basename.replace(/\.(js|css|png|jpg|gif)$/, function (match) {
            return '.v' + self.hash + match;
        }) + ")";
    },
    eval: function () { return this },
};

})(require('../tree'), require('crypto'), require('fs'), require('path'));
