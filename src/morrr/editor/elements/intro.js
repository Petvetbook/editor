"use realm";
import utils from morrr.editor;
const Intro = {
   tag: 'div',
   menu: true,
   stringWrapper: true,
   icon: 'info',
   hint: 'Opening paragraph',
   bindEditorEvents: function(element) {
      this.basicStringWrapper(element, {
         service: 'intro',
         onRemove: function(dom) {
            dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
         }
      });
   },
   toBBCode: function(root) {
      var self = this;
      root.find('*[data-service="intro"]').each(function(index, element) {
         var text = $(element).find('.wrapper-editable-area').text();
         $(element).replaceWith('[intro]' + utils.trimText(text) + '[/intro]');
      })
   },
   cmdSmart: function(range) {
      var heading = $('<div class="blog-intro">' + range.text.join(' ') + '</div>');
      $(range.elements).remove();
      range.inject(heading[0]);
      Intro.bindEditorEvents.apply(this, [heading[0]]);
   },
   toProduction: function() {
      return '<div class="blog-intro">'
   },
   processAfterRender: function(html, item, opts) {

      return html;
   }
}
export Intro;
