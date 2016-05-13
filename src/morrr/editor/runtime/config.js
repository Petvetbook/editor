"use realm";

import route, cors from realm.router.decorators;
import Image from morrr.editor.models;
import Promise from morrr.editor.utils;

const Config = new Promise(function(resolve, reject) {
   if (realm.isRegistered('morrr.editor.config')) {
      return realm.require('morrr.editor.config').then(resolve).catch(reject);
   }
   return resolve({
      token: "c0b7bdf9b9f645f9f7b106d41082f50d14726129",
      server: "http://img.dev.morrr.com",
      folder: "editortest",
      fullPath: function(publicPath) {
         return this.server + "/" + publicPath;
      }
   })
});

export Config;
