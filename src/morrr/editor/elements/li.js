"use realm";

const orderedList = {
   tag: 'li',
   inline: true,
   toBBCode: function(root) {
      while (root.find('li').length > 0) {
         root.find('li').each(function(index, element) {
            $(element).replaceWith('[li]' + $(element).html() + '[/li]');
         });
      }
   }
}
export orderedList;
