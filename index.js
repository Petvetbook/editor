var realm = require('realm-js');
var fs = require('fs');

var dist = "/dist/editor.min.js";
require(__dirname + "/dist/editor.min.js");

var contents;
module.exports = {
   express: function(req, res, next) {
      var self = this;
      return function(req, res, next) {
         res.setHeader('content-type', 'text/javascript');
         return res.end(self.getContents());
      }
   },
   getContents: function() {
      contents = contents || fs.readFileSync(dist).toString();
      return contents;
   }
}
