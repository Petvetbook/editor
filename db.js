var realm = require("realm-js")
var mongo = require('mongodb');
var Promise = require("promise");
var Connection;

var MONGO_DB_NAME = 'editor_test';
var MONGO_URI = 'mongodb://localhost:27017/' + MONGO_DB_NAME
if (process.env.MONGO_PORT_27017_TCP_ADDR) {
   MONGO_URI = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT + '/' +
      MONGO_DB_NAME
}
// Resolving connection
realm.service("$realmMongoConnection", function() {

   return new Promise(function(resolve, reject) {
      if (Connection) {
         return resolve(Connection);
      }

      console.log("connecting", MONGO_URI)
      mongo.MongoClient.connect(MONGO_URI, {
         server: {
            auto_reconnect: true
         }
      }, function(err, _db) {
         if (err) {
            return reject(err);
         }
         Connection = _db;
         return resolve(Connection);
      })
   })
});
