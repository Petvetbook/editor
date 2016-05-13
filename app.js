var express = require('express');
var app = express();
var realm = require("realm-js");

app.use('/realm.js', realm.serve.express());

require('./build/build.js');
app.use('/', express.static(__dirname + "/build"));

var port = process.env.PORT || 3060;
var server = app.listen(port, function() {
   var host = server.address().address;
   console.log('Example app listening at http://%s:%s', host, port);
});
