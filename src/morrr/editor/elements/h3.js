"use realm";
import utils from morrr.editor;
const Heading3 = {
   tag: 'h3',
   icon: 'header3',
   hint: 'Heading 3',
   bindEditorEvents: function(element) {
      this.basicStringWrapper(element, {
         service: 'h3',
         onRemove: function(dom) {
            dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
         }
      });
   },
   toBBCode: function(root) {
      var self = this;
      root.find('*[data-service="h3"]').each(function(index, element) {
         var text = $(element).find('.wrapper-editable-area').text();
         $(element).replaceWith('[h3]' + utils.trimText(text) + '[/h3]');
      })
   },
   cmdSmart: function(range) {
      var heading = $('<h3>' + range.text.join(' ') + '</h3>');
      $(range.elements).remove();
      range.inject(heading[0]);
      Heading3.bindEditorEvents.apply(this, [heading[0]]);
   },
   toProduction: function() {
      return '<h3>'
   }
}
export Heading3;
