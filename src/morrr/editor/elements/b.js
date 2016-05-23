"use realm";
import utils from morrr.editor;

const Strong = {
   tag: 'b',
   inline: true,
   toBBCode: function(root) {
      var self = this;
      root.find('b').each(function(index, element) {
         $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
      });
   }
}

export Strong
