"use realm";
import lodash as _, sharedImagePath, from morrr.editor.utils;
import frzr

const Gallery = function(editor, parentId, done) {
   parentId = parentId || '';
   var modal = editor.createModal('Insert image');
   var images = $('<div class="images"></div>');
   var multiupLoadElement = $('<div class="multiupload"></div>');
   var buttonElements = $(
      '<div class="actions"><div class="ui button cancel">Cancel</div><div class="ui button primary okay">Insert</div></div>')
   modal.append(multiupLoadElement)
   modal.append(images);
   modal.append(buttonElements);

   var selected = [];
   var loader = $('<div class="image"><div class="ui active large inline loader image-loader"></div></div>');
   // fetching existing images ******
   var updateImageList = function() {
      images.empty();
      $.get('/api/editor/images?parent=' + parentId, function(data) {
         var initialImage;
         _.each(data, function(item) {
            var image = $('<div class="image"><img src="' + sharedImagePath(item.image, 70) + '"/></div>');
            image.appendTo(images);
            image.data("item", item);
            initialImage = {
               item: item,
               image: image
            };
            image.click(function() {
               var item = $(this).data("item");
               if (_.indexOf(selected, item.image) > -1) {
                  var self = this;
                  _.remove(selected, function(i) {
                     return item.image === i;
                  })
                  image.removeClass('selected')
               } else {
                  selected.push(item.image);
                  image.addClass('selected')
               }
            });
         });
         if (initialImage) {
            initialImage.image.addClass('selected');
            selected.push(initialImage.item.image);
         }
      });
   }
   updateImageList();
   // cancel
   buttonElements.find('.cancel').click(function() {
      modal.close();
   });
   // Okay
   buttonElements.find('.okay').click(function() {
      done(selected);
      modal.close();
   })

   // Bind multi upload thingy *********************
   multiupLoadElement.uploadFile({
      url: "/api/editor/upload?parentId=" + parentId,
      multiple: true,
      fileName: "myfile",
      showProgress: true,
      onSubmit: function(files, xhr) {
         images.append(loader)
      },
      afterUploadAll: function() {
         loader.remove();
         // get updated file list here ************
         $.get('/api/editor/images', {
            parent: parentId
         }, function() {
            updateImageList();
         });
      }
   });
}

export Gallery;
