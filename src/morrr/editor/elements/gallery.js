"use realm";

import Gallery from morrr.editor;
import lodash as _, sharedImagePath, from morrr.editor.utils;

const GalleryTag = {
   tag: 'div',
   hint: 'Insert image gallery',
   icon: 'picture',
   cmdSmart: function(range) {

      var self = this;
      Gallery(this, this.parentId, function(images) {

         var figures = ['<div class="blog-gallery">'];
         _.each(images, function(image) {
            figures.push('<figure data-id="' + image + '"><img src="' + sharedImagePath(image) + '"></figure>');
         });
         figures.push('</div>');
         var gl = $(figures.join(''))[0]

         range.inject(gl)
         GalleryTag.bindEditorEvents.bind(self)(gl);
      });
   },
   _bindFigure: function(element, figure) {
      var removeIcon = $('<i class="ui icon remove"></i>');

      var caption = $(figure).find('figcaption')[0]
      var cnt = $('<figcaption><div class="hint">Image caption</div><input type="text" placeholder="Image description" class="figcontent"></input></figcaption>');

      if (!caption) {
         caption = cnt;
         $(figure).append(caption);
      } else {
         var figText = $(caption).text()
         cnt.find('.figcontent').val(figText)
         $(caption).replaceWith(cnt);
      }

      removeIcon.appendTo(figure);
      removeIcon.click(function() {
         // check amount of images
         if ($(element).find('figure').length <= 1) {
            $(element).fadeOut(function() {
               $(this).remove();
            })
         } else {
            // Remove one image in particular
            $(this).parent('figure').fadeOut(function() {
               $(this).remove();
            });
         }
      });
   },
   bindEditorEvents: function(element) {
      var editor = this;
      var parentId = editor.parentId;
      // Create image gallery based on current parent id

      this.basicModuleWrapper(element, {
         service: 'gallery',
         onReady: function(element) {

            // creating placeholder for new picture
            var addPlaceHolder = $(
               '<div class="floating button placeholder"></div>'
            );
            addPlaceHolder.appendTo($(element).find(".blog-gallery"));

            // Adding new picture from the gallery
            addPlaceHolder.click(function() {
               Gallery(editor, parentId, function(images) {
                  _.each(images, function(image) {
                     var figure = $('<figure data-id="' + image + '"><img src="' + sharedImagePath(image) +
                        '"/></figure>');
                     figure.insertBefore(addPlaceHolder);
                     GalleryTag._bindFigure(element, figure);
                  });
               });
            });

            // removing entire module
            $(element).find('.user-controls .remove').click(function() {
               $(element).remove();
            });

            // bind image events
            $(element).find('figure').each(function(index, figure) {
               GalleryTag._bindFigure(element, figure);
            });
         }
      });
   },
   toBBCode: function(root) {
      root.find('*[data-service="gallery"]').each(function(index, element) {
         var gallery = ['[gallery]'];
         $(element).find('figure').each(function(index, element) {

            var attrs = ['id="' + $(element).data("id") + '"']
            var caption = $(element).find('figcaption .figcontent');
            if (caption[0] && caption.val()) {
               attrs.push('caption="' + caption.val() + '"');
            }
            gallery.push('[img ' + attrs.join(' ') + '"][/img]')
         });
         gallery.push('[/gallery]')
         $(element).replaceWith(gallery.join(''));
      })
   },

   toProduction: function(data) {
      return '<div class="blog-gallery">';
   }
}
export GalleryTag;
