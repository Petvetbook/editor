"use realm";

const Link = {
   tag: 'a',
   menu: true,
   inline: true,
   icon: 'linkify',
   hint: 'Insert a link',
   toBBCode: function(root) {
      root.find('a').each(function(index, element) {
         $(element).replaceWith('[url=' + $(element).attr("href") + ']' + $(element).text() + '[/url]');
      });
   },
   cmd: function() {
      var link = prompt('Please specify the link.');
      if (link) {

         this.execCommand('createLink', false, link);
      }
   },
   toProduction: function(item) {
      var link = item.attrs.self;
      link = link.replace(/\sp=.*/, '')
      if (link.indexOf("http") === -1) {
         link = "http://" + link;
      }
      return '<a target="_blank" href="' + link + '">'
   }
}
export Link;
