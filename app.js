var express = require('express');
var app = express();
var realm = require("realm-js");

app.use('/re.js', realm.serve.express());
app.use('/bower_components', express.static(__dirname + '/bower_components'));

require('./build.js');
app.use('/', express.static(__dirname));

var port = process.env.PORT || 3060;
var server = app.listen(port, function() {
   var host = server.address().address;
   console.log('Example app listening at http://%s:%s', host, port);
});
