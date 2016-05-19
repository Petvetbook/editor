"use realm";
import utils from morrr.editor;
const Heading3 = {
   tag: 'h1',
   icon: 'header1',
   hint: 'Heading 1',
   bindEditorEvents: function(element) {
      this.basicStringWrapper(element, {
         service: 'h1',
         onRemove: function(dom) {
            dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
         }
      });
   },
   toBBCode: function(root) {
      var self = this;
      root.find('*[data-service="h1"]').each(function(index, element) {
         var text = $(element).find('.wrapper-editable-area').text();
         $(element).replaceWith('[h1]' + utils.trimText(text) + '[/h1]');
      })
   },
   cmdSmart: function(range) {
      var heading = $('<h1>' + range.text.join(' ') + '</h1>');
      $(range.elements).remove();
      range.inject(heading[0]);
      Heading3.bindEditorEvents.apply(this, [heading[0]]);
   },
   toProduction: function() {
      return '<h1>'
   }
}
export Heading3;
