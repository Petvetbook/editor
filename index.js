var realm = require('realm-js');
var fs = require('fs');

var jsFile = __dirname + "/dist/editor.min.js";
var cssFile = __dirname + "/dist/editor.min.css";
require(dist);

var js_contents, css_contents;
module.exports = {
   js: function(req, res, next) {
      var self = this;
      return function(req, res, next) {
         res.setHeader('content-type', 'text/javascript');
         return res.end(self.getJS());
      }
   },
   css: function(req, res, next) {
      var self = this;
      return function(req, res, next) {
         res.setHeader('content-type', 'text/css');
         return res.end(self.getCSS());
      }
   },
   getJS: function() {
      js_contents = js_contents || fs.readFileSync(jsFile).toString();
      return js_contents;
   },
   getCSS: function() {
      css_contents = css_contents || fs.readFileSync(cssFile).toString();
      return css_contents;
   }
}
