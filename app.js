var express = require('express');
var app = express();
var realm = require("realm-js");
var router = require('realm-router');
var wiresMongo = require('wires-mongo');

app.use('/realm.js', realm.serve.express());

require('./dist/backend/editor.js');
require("./db.js")

app.use('/', express.static(__dirname + "/build"));

realm.require('realm.router.Express', function(router) {
   app.use(router("morrr.editor.routes"))
});

var port = process.env.PORT || 3060;
var server = app.listen(port, function() {
   var host = server.address().address;
   console.log('Example app listening at http://%s:%s', host, port);
});
