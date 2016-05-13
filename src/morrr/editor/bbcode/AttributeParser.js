"use realm";

const AttributeParser = function(input) {
   if (!input) {
      return {};
   }
   if (input[0] === "=") {

      return {
         self: input.slice(1, input.length)
      }
   }
   var attrWating = true;
   var valueWaiting = false;
   var myAttrs = {};
   var myAttr = '';
   var value = '';
   var openingValueString;
   var escapeOccured = false;
   for (var i in input) {
      var letter = input[i];
      if (letter === "=") {
         attrWating = false;
         myAttrs[myAttr] = '';
         valueWaiting = true;
      }
      if (attrWating && letter.match(/[a-z0-9_]/i)) {
         myAttr += letter;
      }
      if (valueWaiting) {
         if (openingValueString) {
            if (letter === openingValueString && !escapeOccured) {
               valueWaiting = false;
               attrWating = true;
               myAttrs[myAttr] = value;
               openingValueString = false;
               myAttr = '';
               value = '';
            } else {
               if (letter === "\\" && !escapeOccured) {
                  escapeOccured = true;
               } else {
                  value += letter;
                  escapeOccured = false;
               }
            }
         } else {
            if (letter.match(/'|"/)) {
               openingValueString = letter;
            }
         }
      }
   }
   return myAttrs;
}

export AttributeParser;
