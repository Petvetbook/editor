"use realm";

const Strong = {
   tag: 'strong',
   menu: false,
   inline: true,
   icon: 'bold',
   hint: 'Bold',
   toBBCode: function(root) {
      var self = this;
      root.find('b').each(function(index, element) {
         $(element).replaceWith('[strong]' + self.trimText($(element).text()) + '[/strong]');
      });
   },
   cmd: function() {
      this.execCommand('bold')
   }
}

export Strong
