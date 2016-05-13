"use realm";
import AttributeParser from morrr.editor.bbcode;
import utils from morrr.editor;

const BBCodeExtractor = function(input) {
   var positions = [];

   var index = 1;
   var expectingAttr = false;
   var attrStarted = false;
   for (var i = 0; i < input.length; i++) {
      var letter = input[i];
      if (letter === "/") {
         expectingAttr = false;
      }
      if (expectingAttr) {
         if (attrStarted && letter === ']') {
            var attr = ' p="' + (index++) + '"';
            input = utils.stringInject(input, i, 0, attr)
            i += attr.length - 1;
            attrStarted = false;
            expectingAttr = false;
         }

         if (letter.match(/[a-z0-9_]/i)) {
            attrStarted = true;
         }
      }
      if (letter === "[") {
         expectingAttr = true;
      }
   }
   var rx = /\[([a-z0-9]+)\s?([^\]]+)?]/igm;
   var data = rx.execAll(input);
   var output = [];
   _.each(data, function(item) {
      output.push({
         str: item[0],
         name: item[1],
         attrs: AttributeParser(item[2])
      });
   });
   return {
      input: input,
      codes: output
   };
}

export BBCodeExtractor;
