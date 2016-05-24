"use realm backend";

import route, cors from realm.router.decorators;
import Image from morrr.editor.models;
import config from morrr.editor.runtime;

@route("/api/editor/upload")

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

export Upload;
