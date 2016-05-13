"use realm";

const UL = {
   tag: 'ul',
   menu: true,
   inline: true,
   icon: 'unordered list',
   hint: 'Unordered list',
   toBBCode: function(root) {
      root.find('ul').each(function(index, element) {
         $(element).replaceWith('[ul]' + $(element).html() + '[/ul]');
      });
   },
   cmd: function() {
      this.execCommand('insertunorderedlist');
   },
   toProduction: function(item) {
      return '<ul>'
   }
}
export UL;