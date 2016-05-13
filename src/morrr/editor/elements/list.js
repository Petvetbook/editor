"use realm";

const List = {
   tag: 'li',
   menu: false,
   inline: true,
   toBBCode: function(root) {
      root.find('li').each(function(index, element) {
         $(element).replaceWith('[li]' + $(element).html() + '[/li]');
      });
   }
}
export List;
