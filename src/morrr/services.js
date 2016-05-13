RegExp.prototype.execAll = function(string) {
   var match = null;
   var matches = new Array();
   while (match = this.exec(string)) {
      var matchArray = [];
      for (i in match) {
         if (parseInt(i) == i) {
            matchArray.push(match[i]);
         }
      }
      matches.push(matchArray);
   }
   return matches;
}

realm.module("morrr.editor.utils.lodash", function() {
   return $isBackend ? require("lodash") : window._;
});

realm.module("frzr", function() {
   return $isBackend ? {} : window.frzr;
});
realm.module("morrr.editor.utils.Promise", function() {
   return $isBackend ? require("promise") : window.Promise;
});

realm.module("morrr.editor.utils.sharedImagePath", function() {
   return function(img, size) {
      return IMAGE_SERVER_FULL + img + "?width=" + (size || 150) + "&height=" + (size || 150) + "&mode=crop&quality=80";
   }
});
