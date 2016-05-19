"use realm";

const Italic = {
   tag: 'i',
   menu: false,
   inline: true,
   icon: 'italic',
   hint: 'Italic',
   toBBCode: function(root) {
      root.find('i').each(function(index, element) {
         $(element).replaceWith('[i]' + $(element).text() + '[/i]');
      });
   },
   cmd: function() {
      this.execCommand('italic');
   }
}
export Italic;
