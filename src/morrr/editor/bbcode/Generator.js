"use realm";

import utils from morrr.editor;
import BBCodeHandlers from morrr.editor.bbcode;
import lodash as _ from morrr.editor.utils;

const Generator = function(editor) {
   var el = editor.content.clone();

   // Process inline styles first
   _.each(BBCodeHandlers, function(handler) {
      if (handler.toBBCode && handler.inline) {
         handler.toBBCode.bind(editor)(el);
      }
   });
   //var root = el[0];
   var root = utils.flattenNodes(editor, el[0].childNodes);
   // // Process the rest wrappers
   _.each(BBCodeHandlers, function(handler) {
      if (handler.toBBCode && !handler.inline) {
         handler.toBBCode.bind(editor)($(root));
      }
   });
   var BBCODE = [];
   var prevEmpty = false;
   var lineInsertedAt;

   for (var i = 0; i <= root.childNodes.length; i++) {
      var node = root.childNodes[i];
      if (node && node.nodeName !== 'X') {
         if (node.nodeType === 3) {
            //Text is here

            if (!node.nodeValue.match(/\[\S+\]/)) {

               BBCODE.push('[row]' + utils.trimText(node.nodeValue, true) + '[/row]');
            } else {
               var text = utils.trimText(node.nodeValue);
               var isBlockModule = text.match(/^\[(blockquote|gallery|intro|h3)/);
               BBCODE.push(text);
               if (isBlockModule) {
                  prevEmpty = true;
                  if (lineInsertedAt) { // Removing prev inserted break (we dont' need it)
                     var supposedlyBr = BBCODE[lineInsertedAt];
                     if (supposedlyBr === '[/br]') {
                        BBCODE.splice(lineInsertedAt, 1);
                     }
                  }
               }

            }
         }
         if (node.nodeType === 1) {
            var text = utils.trimText($(node).text(), true);
            var isEmpty = text.replace(/\[\/?[^\]]+(\]|$)/g, "") === "";
            if (isEmpty) {
               text = "";
            }
            if (text.length > 0) {
               lineInsertedAt = null;
               prevEmpty = false;
            }
            if (!prevEmpty) {
               if (text.length === 0) {
                  BBCODE.push('[/br]');
                  lineInsertedAt = BBCODE.length - 1;
               } else {
                  BBCODE.push('[row]' + text + '[/row]');
               }
            }
            prevEmpty = !text ? true : false;
         }

      };
   }
   var _bbcode = utils.cleanUpItems(BBCODE.join('\n'));
   return _bbcode;
}

export Generator;
