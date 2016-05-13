"use realm";

import route, cors from realm.router.decorators;
import Image from morrr.editor.models;

@route("/api/editor/images")

class GalleryRoute {

   static get($query, $body) {

      var parent = $query.get('parent')
      var q = Image.find({
         parent: $query.attrs.parent
      });
      if (!parent) {
         q.sort('_id', 'desc')
         q.limit(5);
      }
      return q.all();
   }
}

export GalleryRoute;
