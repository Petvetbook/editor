"use realm";

const orderedList = {
   tag: 'ol',
   menu: true,
   inline: true,
   icon: 'ordered-list',
   hint: 'Numbered list',
   toBBCode: function(root) {
      root.find('ol').each(function(index, element) {
         $(element).replaceWith('[ol]' + $(element).html() + '[/ol]');
      });
   },
   cmd: function() {
      this.execCommand('insertorderedlist');
   },
   toProduction: function(item) {
      return '<ol>'
   }
}
export orderedList;
