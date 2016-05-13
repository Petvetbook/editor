"use realm";

import Promise, lodash as _ from morrr.editor.utils;

const BBCodeHandlers = realm.requirePackage('morrr.editor.elements').then(function(packages) {
   var packs = {};
   _.each(packages, function(pack, name) {
      packs[name.substring(22, name.length)] = pack;
   });
   return packs;
})

export BBCodeHandlers;
