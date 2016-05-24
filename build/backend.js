"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (___scope___) {
   var $isBackend = ___scope___.isNode;var realm = ___scope___.realm;

   realm.module("morrr.editor.routes.GalleryImages", ["realm.router.decorators.route", "realm.router.decorators.cors", "morrr.editor.models.Image"], function (route, cors, Image) {
      var _dec, _class;

      var $_exports;

      var GalleryRoute = (_dec = route("/api/editor/images"), _dec(_class = function () {
         function GalleryRoute() {
            _classCallCheck(this, GalleryRoute);
         }

         _createClass(GalleryRoute, null, [{
            key: "get",
            value: function get($query, $body) {

               var parent = $query.get('parent') || "test";
               var q = Image.find({
                  parent: parent
               });
               q.sort('_id', 'desc');
               if (parent === "test") {
                  q.limit(5);
               }
               return q.all();
            }
         }]);

         return GalleryRoute;
      }()) || _class);


      $_exports = GalleryRoute;

      return $_exports;
   });
   realm.module("morrr.editor.routes.Upload", ["realm.router.decorators.route", "realm.router.decorators.cors", "morrr.editor.models.Image", "morrr.editor.runtime.config"], function (route, cors, Image, config) {
      var _dec2, _class2;

      var $_exports;

      var Upload = (_dec2 = route("/api/editor/upload"), _dec2(_class2 = function () {
         function Upload() {
            _classCallCheck(this, Upload);
         }

         _createClass(Upload, null, [{
            key: "post",
            value: function post($req, $query, $res, $imageServer) {
               var parentId = $query.get("parentId") || "test";
               return $imageServer.send({
                  server: config.server,
                  token: config.token,
                  folder: config.folder
               }).then(function (files) {
                  return realm.each(files, function (fileInfo) {
                     return new Image({
                        image: fileInfo.name,
                        parent: parentId
                     }).save();
                  });
               });
            }
         }]);

         return Upload;
      }()) || _class2);


      $_exports = Upload;

      return $_exports;
   });
   realm.module("morrr.editor.models.Image", ["wires.mongo.Model"], function (Model) {
      var $_exports;

      var UserImages = Model.extend({
         collection: "user_images",
         schema: {
            _id: [],
            parent: {
               required: true,
               reference: true,
               index: true
            },
            image: {
               required: true
            },
            created_time: {}
         },
         onBeforeCreate: function onBeforeCreate(resolve, reject) {
            this.attrs.created_time = new Date();
            return resolve();
         }
      });

      $_exports = UserImages;

      return $_exports;
   });
})(function (self) {
   var isNode = typeof exports !== 'undefined';return { isNode: isNode, realm: isNode ? require('realm-js') : window.realm };
}());