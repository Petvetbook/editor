(function(___scope___) { "use strict"; var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;

realm.module("morrr.editor.routes.GalleryImages",["realm.router.decorators.route", "realm.router.decorators.cors", "morrr.editor.models.Image"],function(route, cors, Image){ var $_exports;



class GalleryRoute {

   static get($query, $body) {

      var parent = $query.get('parent') || "test";
      var q = Image.find({
         parent: parent
      });
      q.sort('_id', 'desc')
      if (parent === "test") {
         q.limit(5);
      }
      return q.all();
   }
}


$_exports = GalleryRoute;

route("/api/editor/images")(GalleryRoute,undefined);
return $_exports;
});
realm.module("morrr.editor.routes.Upload",["realm.router.decorators.route", "realm.router.decorators.cors", "morrr.editor.models.Image", "morrr.editor.runtime.config"],function(route, cors, Image, config){ var $_exports;



class Upload {
   static post($req, $query, $res, $imageServer) {
      var parentId = $query.get("parentId") || "test";
      return $imageServer.send({
         server: config.server,
         token: config.token,
         folder: config.folder
      }).then(function(files) {
         return realm.each(files, function(fileInfo) {
            return new Image({
               image: fileInfo.name,
               parent: parentId
            }).save();
         });
      });

   }
}


$_exports = Upload;

route("/api/editor/upload")(Upload,undefined);
return $_exports;
});
realm.module("morrr.editor.models.Image",["wires.mongo.Model"],function(Model){ var $_exports;


const UserImages = Model.extend({
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
   onBeforeCreate: function(resolve, reject) {
      this.attrs.created_time = new Date();
      return resolve();
   },
});

$_exports = UserImages

return $_exports;
});

})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : window.realm}}());