"use realm"
import lodash as _ from morrr.editor.utils;

class Utils {
   static stringInject(str, idx, rem, inputString) {
      return str.slice(0, idx) + inputString + str.slice(idx + Math.abs(rem));
   }
   static replaceEmptyLines(text) {
      var lines = text.split(/\n/);
      var newLines = [];
      _.each(lines, function(line, index) {

         if (line.length > 0 && !line.match(/^\s+$/) && !(index === 0 && line === "[/br]")) {
            newLines.push(line)
         }
      });
      return newLines.join('\n')
   }
   static cleanUpItems(text) {
      var replaced = text.match(/(\[\w+\]\s*\[\/\w+\])/ig);
      _.each(replaced, function(item) {
         text = text.split(item).join('')
      });
      if (replaced && replaced.length > 0) {
         text = Utils.cleanUpItems(text);
      } else {

         text = Utils.replaceEmptyLines(text)
      }
      return text;
   }

   static flattenNodes(editor, rootNode) {
      var root = document.createElement('div');
      var currentLayer = root;
      var flattenNodes = function(elements, deep) {
         for (var i = 0; i <= elements.length; i++) {
            var node = elements[i];
            if (node) {
               if (node.nodeName === 'BR') { // New line to the root right away
                  root.appendChild(document.createElement('div'))
               } else {
                  var isWrapper = node.className && node.className.indexOf('wrapper') > -1;
                  if (node.nodeName === 'DIV' && !isWrapper) {
                     var last = root.childNodes[root.childNodes.length - 1];
                     var prevLineEmpty = false;
                     if (last) {
                        prevLineEmpty = last.innerHTML.match(/^\s+$/g);
                     }
                     currentLayer = document.createElement('div');
                     root.appendChild(currentLayer);
                  }
                  if (node.className && isWrapper) {
                     // wrappers go instantly
                     //root.appendChild(document.createElement('div')); // Empty div to separate things
                     root.appendChild(node);
                     // Append after module
                     currentLayer = document.createElement('div');
                     root.appendChild(currentLayer);
                     i--;
                  } else {
                     if (node.childNodes && node.childNodes.length) {
                        flattenNodes(node.childNodes, true)
                     } else {
                        if (node.nodeType === 3) {
                           if (currentLayer === root) {
                              currentLayer = document.createElement('div');
                              root.appendChild(currentLayer);
                           }
                           node.nodeValue = node.nodeValue;
                        }
                        currentLayer.appendChild(node);
                        i--;
                     }
                  }
               }
            }
         }
      }
      flattenNodes(rootNode);
      return root;
   }

}
export Utils;
