"use realm backend";

import route, cors from realm.router.decorators;
import Image from morrr.editor.models;

@route("/api/editor/images")

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

export GalleryRoute;
