"use realm";

const BlockQuote = {
   index: 1,
   tag: 'blockquote',
   menu: true,
   hint: 'Quote',
   icon: 'quote left',
   bindEditorEvents: function(element) {
      this.basicStringWrapper(element, {
         service: 'blockquote',
         onRemove: function(dom) {
            dom.replaceWith('<div>' + dom.find('blockquote').text() + '</div>')
         }
      });
   },
   toBBCode: function(root) {
      var self = this;
      root.find('*[data-service="blockquote"]').each(function(index, element) {
         var text = $(element).find('.wrapper-editable-area').text();
         $(element).replaceWith('[blockquote]' + self.trimText(text) + '[/blockquote]');
      })
   },
   cmdSmart: function(range) {
      var blockQuote = $('<blockquote>' + range.text.join(' ') + '</blockquote>');
      $(range.elements).remove();
      range.inject(blockQuote[0]);
      BlockQuote.bindEditorEvents.apply(this, [blockQuote[0]]);
   },
   toProduction: function() {
      return '<blockquote>'
   }
}
export BlockQuote;
