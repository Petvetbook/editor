"use realm";
import utils from morrr.editor;

const Strong = {
   tag: 'strong',
   menu: false,
   inline: true,
   icon: 'bold',
   hint: 'Bold',
   toBBCode: function(root) {
      var self = this;
      root.find('b').each(function(index, element) {
         $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
      });
   },
   cmd: function() {

      this.execCommand('bold')
   }
}

export Strong
