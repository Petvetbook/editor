(function(___scope___) { "use strict"; var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;

RegExp.prototype.execAll = function(string) {
   var match = null;
   var matches = new Array();
   while (match = this.exec(string)) {
      var matchArray = [];
      for (var i in match) {
         if (parseInt(i) == i) {
            matchArray.push(match[i]);
         }
      }
      matches.push(matchArray);
   }
   return matches;
}

realm.module("morrr.editor.utils.lodash", function() {
   return $isBackend ? require("lodash") : window._;
});
if ($isBackend) {
   require("image-server-client")
}

realm.module("frzr", function() {
   return $isBackend ? {} : window.frzr;
});
realm.module("morrr.editor.utils.Promise", function() {
   return $isBackend ? require("promise") : window.Promise;
});

realm.module("morrr.editor.utils.sharedImagePath", ['morrr.editor.runtime.config'], function(cfg) {

   return function(img, size) {
      return cfg.server + "/" + cfg.folder + "/" + img + "?&height=" + (size || 400) + "&quality=80";
   }
});

realm.module("morrr.editor.Engine",["morrr.editor.bbcode.BBCodeEngine", "morrr.editor.bbcode.Generator", "morrr.editor.bbcode.BBCodeExtractor", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils.lodash", "morrr.editor.utils", "morrr.editor.Modal"],function(BBCodeEngine, Generator, BBCodeExtractor, BBCodeHandlers, _, utils, Modal){ var $_exports;


class SaneEditor {

   initialize(target, opts) {
      this.opts = opts || {};
      this.tags = {};

      this.toolbarConfig = opts.toolbar || [];
      this.element = $('<div class="sane-editor"></div>');
      this.formattingWrapper = $('<div class="sane-formatting-toolbar-wrapper"></div>');
      this.toolbarWrapper = $('<div class="sane-editor-toolbar-wrapper"></div>');
      this.toolbarWrapper.appendTo(this.element);
      this.toolbar = $('<div class="sane-formatting-toolbar"></div>');
      this.toolbar.appendTo(this.formattingWrapper);
      this.modalWrapper = $('<div class="sane-editor-modal-wrapper"></div>');
      this.modalWrapper.appendTo(this.element);
      this.contentAreaWrapper = $('<div class="sane-editor-content-area-wrapper"></div>');
      this.contentWrapper = $('<div class="sane-editor-content-wrapper"></div>');
      this.leftMenu = $('<div class="sane-editor-left-menu"></div>');

      this.element.append(this.leftMenu)
      this.element.append(this.contentPane);
      this.formattingWrapper.appendTo(this.contentAreaWrapper);
      this.contentWrapper.appendTo(this.contentAreaWrapper);
      this.contentAreaWrapper.appendTo(this.element);
      this.content = $('<div class="sane-editor-content" contenteditable="true"></div>'); //.appendTo(this.toolbar);
      this.content.appendTo(this.contentWrapper);
      this.contentPane = $('<div class="sane-editor-content-pane"></div>');
      this.contentPane.hide();
      this.contentPane.appendTo(this.contentWrapper)

      target.replaceWith(this.element);

      this.inializeToolbar();
      this.fixCloningFeature();
      var self = this;
      this.setValue('')
      $(this.content).bind("paste", function(e) {
         var el = $(e.currentTarget);
         var text = e.originalEvent.clipboardData.getData('Text');
         var cleanText = utils.trimText(text);
         e.originalEvent.preventDefault();
         self.execCommand("insertHTML", false, '<x></x><div>' + cleanText + '</div>');
      });
      this.hideEditor();
      this.toggleFullScreenMode();
   }

   mountToolbar(riotTag, props) {
      var toolbar = this.menuToolbar;
      if (!toolbar) {
         this.menuToolbar = $("<div class='main-toolbar'></div>");
         this.menuToolbar.appendTo(this.toolbarWrapper);
         toolbar = this.menuToolbar;
      }

      var tag = riot.mount(toolbar[0], riotTag, props || {});
      this.tags.mainToolbar = tag ? tag[0] : undefined;
      return this.tags.mainToolbar;
   }

   mountFileToolbar(riotTag, props) {
      var toolbar = this.fileToolbar;
      if (!toolbar) {
         this.fileToolbar = $("<div class='sane-file-toolbar-wrapper'></div>");
         this.fileToolbar.appendTo(this.contentAreaWrapper);
         toolbar = this.fileToolbar;
      }
      var tag = riot.mount(toolbar[0], riotTag, props || {});
      this.tags.fileToolbar = tag ? tag[0] : undefined;
      return this.tags.fileToolbar;
   }

   mountLanguageToolbar(riotTag, props) {
      var toolbar = this.langToolbar;
      if (!toolbar) {
         this.langToolbar = $("<div class='sane-language-toolbar-wrapper'></div>");
         this.langToolbar.prependTo(this.contentAreaWrapper);
         toolbar = this.langToolbar;
      }
      var tag = riot.mount(toolbar[0], riotTag, props || {});
      this.tags.langToolbar = tag ? tag[0] : undefined;
      return this.tags.langToolbar;
   }

   update(specific) {
      var self = this;
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(function() {
         _.each(self.tags, function(tag) {
            if (tag && tag.update) {
               tag.update();
            }
         });
      }, 1);
   }

   openContentPane() {
      var self = this;
      this.content.fadeOut(function() {
         self.contentPane.fadeIn();
      });
   }

   closeContentPane() {
      var self = this;
      this.contentPane.fadeOut(function() {
         self.content.fadeIn();
      });
   }

   onActivity(cb) {
      this.activity_cb = cb;
   }

   triggerActivity() {
      var self = this;
      if (this.activity_cb) {
         clearTimeout(this.updateTyping);
         this.updateTyping = setTimeout(function() {
            self.activity_cb();
         }, 50);
      }
   }

   getValue() {
      this.$value = this.generate()
      return this.$value;
   }

   getHeadings() {

   }

   generate() {
      return Generator(this)
   }

   toolbarIconClick(cmd) {
      var self = this;
      self.triggerActivity();
      if (_.isFunction(cmd)) {
         // Custom handler
         var range = self.getRange();
         if (range) {
            var selectedText = range.commonAncestorContainer;
            var parent = $(selectedText).parent();
            var withinEditor = $(selectedText).parents(".sane-editor-content");
            var text;
            if (withinEditor[0]) {

               if (parent.hasClass("content")) {
                  text = selectedText;
               }
               cmd.apply(self, [text, parent, range]);
            } else {
               cmd.apply(self, [null, null, range]);
            }
         }
      };
   }

   hideEditor() {
      $(this.content).hide();
      $(this.formattingWrapper).hide();
   }
   showEditor() {
      $(this.content).show();
      $(this.formattingWrapper).show();
   }

   showError(message) {
      this.element.find(".notification").remove();
      var notification = $('<div class="notification"><div class="text">' + message + '</div></div>');
      notification.insertBefore(this.content);
      notification.addClass('show')
      setTimeout(function() {
         notification.removeClass('show')
      }, 1500)
   }

   createModal(header) {
      var modal = Modal.create({
         title: header,
         target: this.modalWrapper
      });
      return modal;
   }
   onFullScreenLeftMenu(fn) {
      this._onFullScreenLeftMenu = fn;
   }

   smartRangeDetect(callback) {

      var self = this;
      return new Promise(function(resolve, reject) {
         var range = self.getRange();

         //9
         if (range) {

            var elements = [];
            var interations = 0;

            var targetValue = range.endContainer.innerHTML || range.endContainer.nodeValue;

            var elementFound = false;
            var isDestination = function(element) {
               // check for boundaries
               if (element) {
                  var parent = $(element).parents('.sane-editor-content')[0];
                  var wrappableArea = $(element).parents('.wrapper-editable-area')[0]
                  if (!parent) {
                     throw {
                        message: "Your selection should be within editor area!"
                     }
                  }
                  if ($(element).parents('.wrapper')[0] || wrappableArea) {
                     throw {
                        message: "You can't use text within formatted blocks"
                     }
                  }
               }

               if (element == undefined) {
                  return false;
               }
               var destination = false;
               var currentValue = element.nodeValue || element.innerHTML;
               if (currentValue !== undefined) {
                  destination = currentValue === targetValue;
                  if (!elementFound) {

                     elements.push(element);
                  }
                  if (!elementFound && destination) {
                     elementFound = true;
                  }
               }
               return destination;
            };
            var deepIteration = function(element) {

               if (isDestination(element)) {
                  return elements;
               }
               while (element) {
                  var element = element.nextSibling;
                  if (isDestination(element)) {
                     element = null;
                     return elements;
                  } else {
                     if (!elementFound && element && element.childNodes.length) {
                        deepIteration(element.childNodes[0])
                     }
                  }
                  interations++
                  if (interations > 100) {
                     return elements;
                  }
               }
               return element;
            }
            var startContainer = range.startContainer;
            if (range.startContainer.nodeType === 3) { // if is text
               // check for amount of parent child nodes
               if (range.startContainer.parentNode.childNodes.length === 1) {
                  startContainer = range.startContainer.parentNode;
                  var endContainerText = range.endContainer.nodeValue || range.endContainer.innerHTML;
                  var startContainerText = range.startContainer.nodeValue || range.startContainer.innerHTML;
                  if (endContainerText === startContainerText) {
                     elements = [range.endContainer.nodeValue ? range.endContainer.parentNode : range.endContainer];
                  }
               }
            }
            var text = [];
            var finalElements = [];
            if (elements.length === 0) {
               deepIteration(startContainer);
               _.each(elements, function(element) {

                  if (!element.childNodes || element.childNodes.length === 0) {
                     finalElements.push(element);
                     text.push($(element).text())
                  } else {
                     if (element.childNodes && element.childNodes.length === 1) {
                        finalElements.push(element);
                        text.push($(element).text())
                     }
                  }
               });
            } else {
               _.each(elements, function(item) {
                  finalElements.push(item);
                  text.push($(item).text());
               });
            }
            return callback.apply(self, [{
               range: range,
               text: text,
               elements: finalElements,
               inject: function(el) {

                  self.triggerActivity();
                  var endContainer = $(range.endContainer);
                  if (!endContainer.parent('.sane-editor-content')[0] && !$(range.endContainer).hasClass("sane-editor-content")) {
                     var found = false;
                     var parent = endContainer.parent();
                     var target;
                     var iterations = 0;
                     while (!found && iterations < 50) {

                        if (parent.hasClass('sane-editor-content')) {
                           found = true;
                        } else {
                           target = parent;
                           parent = parent.parent()
                        }
                        iterations++;
                     }
                     if (found && target[0]) {
                        $(el).insertBefore(target)
                     }
                  } else {
                     console.log('yes here....')
                     range.insertNode(el);
                  }
               }
            }]);
         } else {
            self.showError("You need to select something");
         }
      })

   }

   inializeToolbar() {
      var self = this;
      var currentHint;

      _.each(this.toolbarConfig, function(str) {
         var handler = BBCodeHandlers[str]
         if (handler) {
            var icon = $('<div class="button"><span>' + handler.hint + '</span></div>')
            icon.addClass(handler.icon);

            $(self.toolbar).append(icon);
            icon.mousedown(function(e) {
               e.preventDefault();
            })
            icon.click(function(e) {
               handler.cmd ? self.toolbarIconClick(handler.cmd) : '';

               if (handler.cmdSmart) {
                  self.smartRangeDetect(handler.cmdSmart).then(function() {

                  }).catch(function(data) {
                     self.showError(data.message)
                  })
               }
               self.triggerActivity();
            });
         }
      });
      var fScreen = $('<div class="button maximize"><span>Toggle fullscreen</span></div>');
      fScreen.appendTo($(self.toolbar));
      fScreen.click(function() {
         self.toggleFullScreenMode();
      });
      // this.bindFullScreenButtons();
   }

   basicStringWrapper(element, opts) {
      if ($(element).parents('.wrapper')[0])
         return;
      opts = opts || {};
      var cls = "wrapper";
      var serviceAttr = '';
      if (opts.service) {
         cls += " sane-editor-service"
         serviceAttr = ' data-service="' + opts.service + '" '
      }

      var html = ['<div class="' + cls + '" ' + serviceAttr + ' contenteditable="false">'];
      html.push('<div class="user-controls">');
      html.push('<i class="ui icon remove"></i>');
      html.push('</div>');
      html.push('<div class="user-content">');
      html.push('</div>');
      html.push('</div>');
      var dom = $(html.join(''));
      var el = $(element).clone();
      dom.find('.user-content').append(el);
      var innerContents = el.html();
      el.empty();
      el.append("<div class='wrapper-editable-area' contenteditable='true'>" + innerContents + "</div>");
      $(element).replaceWith(dom);
      dom.find('.remove').click(function() {
         if (_.isFunction(opts.onRemove)) {
            opts.onRemove(dom);
         }
      })
      return {
         element: dom
      }
   }

   basicModuleWrapper(element, opts) {
      if ($(element).parents('.wrapper')[0])
         return;

      opts = opts || {};
      var cls = "wrapper";
      var serviceAttr = '';
      if (opts.service) {
         cls += " sane-editor-service"
         serviceAttr = ' data-service="' + opts.service + '" '
      }

      var html = ['<div class="' + cls + '" ' + serviceAttr + ' contenteditable="false">'];
      html.push('<div class="user-controls">');
      html.push('<i class="ui icon remove"></i>');
      html.push('</div>');
      html.push('<div class="user-content">');
      html.push('</div>');
      html.push('</div>');
      var dom = $(html.join(''));
      var el = $(element).clone();
      dom.find('.user-content').append(el);
      $(element).replaceWith(dom);
      dom.find('.remove').click(function() {
         if (_.isFunction(opts.onRemove)) {
            opts.onRemove(dom);
         }
      });
      if (opts.onReady) {
         opts.onReady(dom[0]);
      }
      return {
         element: dom
      }
   }

   setValue(data) {
      this.content.empty();

      BBCodeEngine.toEditor("<x></x>" + data + "<x></x>", this);
   }

   getSelection(opts) {
      opts = opts || {};
      if (opts.focus !== false) {
         this.content[0].focus();
      }
      return window.getSelection();
   }

   getRange(opts) {
      var s = this.getSelection(opts);
      if (!s) {
         return null;
      }

      if (s.getRangeAt) {
         if (s.rangeCount > 0) {

            var gotRange = s.getRangeAt(0)

            return gotRange
         }
      }
      if (s.createRange) {
         var createdRange = s.createRange()
         return createdRange;
      }
      return null;
   }

   execCommand(a, b, c) {
      this.triggerActivity();
      this.content.focus();

      document.execCommand(a, b || false, c || null);
   }

   setCaretPosition(elem, caretPos) {
      var el = elem;
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(elem, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      setTimeout(function() {
         $(elem).remove();
      }, 0);
   }

   bindFullScreenButtons() {
      var self = this;
      this.floatingSave = $('<div class="floating button save"></div>');
      this.floatingPreview = $('<div class="floating button preview"></div>');
      this.floatingPreview.click(function() {
         if (self.onFloatingPreview) {
            self.onFloatingPreview();
         }
      });

      self.exitFullScreenModeButton = $('<div class="floating button exit"></div>');
      self.exitFullScreenModeButton.click(function() {
         self.toggleFullScreenMode();
      });
      this.floatingSave.click(function() {
         if (self.onFloatingSave) {
            self.onFloatingSave();
            self.floatingSave.removeClass("primary").addClass("green");
            self.floatingSave.find("i").removeClass('save').addClass('checkmark');
            self.floatingSave.animate({
               zoom: 1.2
            }, {
               duration: 100,
               complete: function() {
                  self.floatingSave.animate({
                     zoom: 1
                  }, {
                     duration: 100,
                     complete: function() {
                        setTimeout(function() {
                           self.floatingSave.removeClass("green").addClass("primary");
                           self.floatingSave.find("i").removeClass('checkmark').addClass('save');
                        }, 500);
                     }
                  })
               }
            })
         };
      });
      this.element.append(this.floatingSave);
      this.element.append(this.floatingPreview);
      this.element.append(self.exitFullScreenModeButton)
   }

   toggleFullScreenMode() {
      var self = this;
      if ($(this.element).hasClass("full-screen-mode")) {
         $(this.element).removeClass("full-screen-mode");
         $('body').css('overflow', 'auto');
         $(this.element).find('.left-menu').remove();
         // this.floatingSave.hide();
         // this.floatingPreview.hide();
         // this.exitFullScreenModeButton.hide();
      } else {
         $('body').css('overflow', 'hidden');
         $(this.element).addClass("full-screen-mode");

         if (self._onFullScreenLeftMenu) {
            var element = $("<div class='left-menu' style='color:white'></div>");
            $(this.element).find(".sane-editor-content-wrapper").append(element);

            self._onFullScreenLeftMenu(element);
         }

         // this.floatingSave.show();
         // this.floatingPreview.show();
         // this.exitFullScreenModeButton.show();
      }
   }

   fixCloningFeature() {
      var updateTimeout;
      var self = this;
      $(this.content).bind("keydown", function(e) {
         self.triggerActivity();
         tabPressed = false;
         var range = self.getRange({
            focus: false
         });
         if (!range) {
            return;
         }
         // Check for no-keyboard-interaction
         // IF class is there, we should jump from the wrapper
         var currentPosition = $(range.commonAncestorContainer);
         var parentWrapper = currentPosition.parents('.wrapper');
         if (parentWrapper.hasClass("capture-keyboard-interaction")) {
            var newline = $('<div></br></div>');
            newline.insertAfter(parentWrapper);

            self.setCaretPosition(newline[0], 1);
            return;
         }

         // ENTER TRICK
         if (e.keyCode === 13) {

            // If we are in a wrapper
            if (parentWrapper[0]) {
               if (currentPosition[0].nodeType === 3) {
                  currentPosition = currentPosition.parent();
               }
               var currentIsEmpty = $(currentPosition).text() === '';
               var nextEmptySiblings = 0;
               // Checking how many previous items are empty
               var prevItems = [];
               currentPosition.prevAll().each(function() {
                  prevItems.push(this);
               });
               prevItems.reverse();
               var toRemove = [];
               _.each(prevItems, function(item) {
                  if ($(item).text() === '') {
                     nextEmptySiblings++;
                     toRemove.push(item);
                  } else {
                     toRemove = [];
                     nextEmptySiblings = 0;
                  }
               });

               // Current one has to be removed as well
               // If it's empty
               if (currentIsEmpty) {
                  toRemove.push(currentPosition);
                  nextEmptySiblings++;
               }
               // Jumping out of the box
               if (nextEmptySiblings === 2) {
                  if (toRemove.length > 0) {
                     // Get the rest guys with us
                     var thelast = toRemove[toRemove.length - 1];
                     if (thelast) {
                        $(thelast).nextAll().insertAfter(parentWrapper);
                     }
                  }
                  _.each(toRemove, function(item) {
                     $(item).remove();
                  });
                  var newline = $('<div></br></div>');
                  newline.insertAfter(parentWrapper);

                  self.setCaretPosition(newline[0], 1);

               }
            }
         }
      });
   }
}

$_exports = SaneEditor;

return $_exports;
});
realm.module("morrr.editor.Gallery",["morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath", "frzr"],function(_, sharedImagePath, frzr){ var $_exports;


const Gallery = function(editor, parentId, done) {
   parentId = parentId || '';
   var modal = editor.createModal('Insert image');
   var images = $('<div class="images"></div>');
   var multiupLoadElement = $('<div class="multiupload"></div>');
   var buttonElements = $(
      '<div class="actions"><div class="button cancel">Cancel</div><div class="ui button primary okay">Insert</div></div>')
   modal.append(multiupLoadElement)
   modal.append(images);

   var selected = [];
   var loader = $('<div class="image"><div class="active large inline loader image-loader"></div></div>');
   // fetching existing images ******
   var updateImageList = function() {
      images.empty();
      $.get('/api/editor/images?parent=' + parentId, function(data) {
         var initialImage;
         _.each(data, function(item) {
            var image = $('<div class="image"><img src="' + sharedImagePath(item.image, 120) + '"/></div>');
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
               if (selected.length === 0) {
                  modal.disableSuccess();
               } else {
                  modal.enableSuccess();
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
   modal.onSuccess(function() {
      done(selected);
      modal.close();
   });

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


$_exports = Gallery;

return $_exports;
});
realm.module("morrr.editor.Modal",["frzr"],function(frzr){ var $_exports;


let modalIndex = 1000;
let instances = 0;
let el = frzr.el;
let overlay = false;

class Modal {

   /**
    * constructor - description
    *
    * @param  {type} opts description
    * @return {type}      description
    */
   constructor(opts) {
      var self = this;
      opts = opts || {};
      var target = opts.target || document.body;

      this.header = el('div', {
         class: "header",
         textContent: opts.title || "opts.title"
      });

      this.successButton = el('div', {
         class: 'button success'
            // textContent: opts.successButton || "Done"
      });
      this.closeButton = el('div', {
         class: 'button close'
            // textContent: opts.successButton || "Close"
      });
      $(this.closeButton).click(function() {
         self.close();
      });
      this.footer = el('div', {
         class: 'footer'
      }, [this.closeButton, this.successButton]);

      this.content = el('div', {
         class: 'content'
      });
      this.modal = el('div', {
         class: "modal",
         style: ("z-index:" + modalIndex++),
      }, [this.header, this.content, this.footer]);

      $(target).prepend(this.modal);
      instances++;
   }

   close() {
      instances--;
      $(this.modal).remove();
   }

   append(element) {
      $(this.content).append(element)
   }

   // createOverlay() {
   //    if (overlay === false) {
   //       this.overlay = el('div', {
   //          class: "overlay"
   //       });
   //       $(document.body).prepend(this.overlay);
   //    }
   // }

   onSuccess(cb) {
      var self = this;
      $(this.successButton).click(function() {
         if (!self.saveLock) {
            cb();
         }
      });
   }

   /**
    * disableSuccess - description
    *
    * @return {type}  description
    */
   disableSuccess() {
      if (!$(this.successButton).hasClass('disabled')) {
         $(this.successButton).addClass('disabled');
      }
      this.saveLock = true;
   }

   /**
    * enableSuccess - description
    *
    * @return {type}  description
    */
   enableSuccess() {
      $(this.successButton).removeClass('disabled');
      this.saveLock = false;
   }

   /**
    * static - description
    *
    * @param  {type} opts description
    * @return {type}      description
    */
   static create(opts) {
      var modal = new Modal(opts);
      return modal;
   }
}

$_exports = Modal;

return $_exports;
});
realm.module("morrr.editor.utils",["morrr.editor.utils.lodash"],function(_){ var $_exports;

class Utils {
   static stringInject(str, idx, rem, inputString) {
      return str.slice(0, idx) + inputString + str.slice(idx + Math.abs(rem));
   }

   static trimText(text, trimEnds) {
      text = text.replace(new RegExp(String.fromCharCode(160), 'g'), ' ')
      text = text.replace(/\s+/g, " ");
      if (trimEnds) {
         text = text.trim();
      }
      return text;
   }

   static replaceEmptyLines(text) {
      var lines = text.split(/\n/);
      var newLines = [];
      _.each(lines, function(line, index) {

         if (line.length > 0 && !line.match(/^\s+$/) && !(index === 0 && line === "[/br]")) {
            newLines.push(line)
         }
      });
      return newLines.join('\n')
   }
   static cleanUpItems(text) {
      var replaced = text.match(/(\[\w+\]\s*\[\/\w+\])/ig);
      _.each(replaced, function(item) {
         text = text.split(item).join('')
      });
      if (replaced && replaced.length > 0) {
         text = Utils.cleanUpItems(text);
      } else {

         text = Utils.replaceEmptyLines(text)
      }
      return text;
   }

   static flattenNodes(editor, rootNode) {
      var root = document.createElement('div');
      var currentLayer = root;
      var flattenNodes = function(elements, deep) {
         for (var i = 0; i <= elements.length; i++) {
            var node = elements[i];
            if (node) {
               if (node.nodeName === 'BR') { // New line to the root right away
                  root.appendChild(document.createElement('div'))
               } else {
                  var isWrapper = node.className && node.className.indexOf('wrapper') > -1;
                  if (node.nodeName === 'DIV' && !isWrapper) {
                     var last = root.childNodes[root.childNodes.length - 1];
                     var prevLineEmpty = false;
                     if (last) {
                        prevLineEmpty = last.innerHTML.match(/^\s+$/g);
                     }
                     currentLayer = document.createElement('div');
                     root.appendChild(currentLayer);
                  }
                  if (node.className && isWrapper) {
                     // wrappers go instantly
                     //root.appendChild(document.createElement('div')); // Empty div to separate things
                     root.appendChild(node);
                     // Append after module
                     currentLayer = document.createElement('div');
                     root.appendChild(currentLayer);
                     i--;
                  } else {
                     if (node.childNodes && node.childNodes.length) {
                        flattenNodes(node.childNodes, true)
                     } else {
                        if (node.nodeType === 3) {
                           if (currentLayer === root) {
                              currentLayer = document.createElement('div');
                              root.appendChild(currentLayer);
                           }
                           node.nodeValue = node.nodeValue;
                        }
                        currentLayer.appendChild(node);
                        i--;
                     }
                  }
               }
            }
         }
      }
      flattenNodes(rootNode);
      return root;
   }

}

$_exports = Utils;

return $_exports;
});
realm.module("morrr.editor.runtime.config",["morrr.editor.utils.Promise"],function(Promise){ var $_exports;


const Config = new Promise(function(resolve, reject) {
   if (realm.isRegistered('morrr.editor.config')) {
      return realm.require('morrr.editor.config', function(cfg) {
         return cfg;
      }).then(resolve).catch(reject);
   }
   return resolve({
      token: "c0b7bdf9b9f645f9f7b106d41082f50d14726129",
      server: "http://img.dev.morrr.com",
      folder: "editortest",
      fullPath: function(publicPath) {
         return this.server + "/" + publicPath;
      }
   })
});


$_exports = Config;

return $_exports;
});
realm.module("morrr.editor.elements.b",["morrr.editor.utils"],function(utils){ var $_exports;


const Strong = {
   tag: 'b',
   inline: true,
   toBBCode: function(root) {
      var self = this;
      root.find('b').each(function(index, element) {
         $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
      });
   }
}


$_exports = Strong

return $_exports;
});
realm.module("morrr.editor.elements.blockquote",["morrr.editor.utils"],function(utils){ var $_exports;
const BlockQuote = {
   index: 1,
   tag: 'blockquote',
   menu: true,
   hint: 'Quote',
   icon: 'quote',
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
         $(element).replaceWith('[blockquote]' + utils.trimText(text) + '[/blockquote]');
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

$_exports = BlockQuote;

return $_exports;
});
realm.module("morrr.editor.elements.gallery",["morrr.editor.Gallery", "morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath"],function(Gallery, _, sharedImagePath){ var $_exports;


const GalleryTag = {
   tag: 'div',
   hint: 'Insert images',
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
         self.triggerActivity();
      });
   },
   _bindFigure: function(element, figure) {
      var removeIcon = $('<i class="ui icon remove"></i>');

      var caption = $(figure).find('figcaption')[0]
      var cnt = $('<figcaption><input type="text" placeholder="Image description" class="figcontent"></input></figcaption>');

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

$_exports = GalleryTag;

return $_exports;
});
realm.module("morrr.editor.elements.h1",["morrr.editor.utils"],function(utils){ var $_exports;
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

$_exports = Heading3;

return $_exports;
});
realm.module("morrr.editor.elements.h3",["morrr.editor.utils"],function(utils){ var $_exports;
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

$_exports = Heading3;

return $_exports;
});
realm.module("morrr.editor.elements.i",[],function(){ var $_exports;

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

$_exports = Italic;

return $_exports;
});
realm.module("morrr.editor.elements.img",["morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath"],function(_, sharedImagePath){ var $_exports;

const ImgTag = {
   tag: 'figure',
   menu: false,
   toProduction: function(data, opts) {
      opts = opts || {};
      var alt = opts.imageTitle;
      var query = opts.query;
      var imgString = [];
      _.each(query, function(value, key) {
         if (key.indexOf("img") === 0) {
            imgString.push(key.split("img-")[1] + "=" + value);
         }

      });
      imgString = imgString.join('&');

      var img = sharedImagePath(data.attrs.id) + (imgString ? "?" + imgString : '');
      var html = '<figure data-id="' + data.attrs.id + '"><img ' + (alt ? 'alt="' + alt + '" ' : '') + 'src="' + img + '">';
      if (data.attrs.caption) {
         html += '<figcaption>' + data.attrs.caption + '</figcaption>';
      }
      return html;
   }
}

$_exports = ImgTag;

return $_exports;
});
realm.module("morrr.editor.elements.innerad",[],function(){ var $_exports;

const InnerAd = {
   tag: 'div',
   menu: false,
   toBBCode: function(root) {},
   toProduction: function(item, opts) {
      var attrs = item.attrs;
      var html = ['<span class="recommended">' + attrs.caption + '</span><div class="blog-item"><a href="' + attrs.link +
         '"><figure class="profile-image">'
      ];
      html.push('<img src="' + attrs.img + '?width=525&height=450&mode=crop&quality=60"></img>');
      html.push('<figcaption>');
      html.push(' <span class="category" style="background-color: ' + attrs.catcolor + ';">' + attrs.catname + '</span>');
      html.push('<h2 class="title">' + attrs.title + '</h2>');
      html.push('</figcaption></figure></a></div>');
      return '<div class="blog-list article-inline-promo hide-desktop">' + html.join('')
   }
}


$_exports = InnerAd;

return $_exports;
});
realm.module("morrr.editor.elements.intro",["morrr.editor.utils"],function(utils){ var $_exports;
const Intro = {
   tag: 'div',
   menu: true,
   stringWrapper: true,
   icon: 'intro',
   hint: 'Intro paragraph',
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

$_exports = Intro;

return $_exports;
});
realm.module("morrr.editor.elements.li",[],function(){ var $_exports;

const orderedList = {
   tag: 'li',
   inline: true,
   toBBCode: function(root) {
      while (root.find('li').length > 0) {
         root.find('li').each(function(index, element) {
            $(element).replaceWith('[li]' + $(element).html() + '[/li]');
         });
      }
   }
}

$_exports = orderedList;

return $_exports;
});
realm.module("morrr.editor.elements.list",[],function(){ var $_exports;

const List = {
   tag: 'li',
   menu: false,
   inline: true,
   toBBCode: function(root) {
      root.find('li').each(function(index, element) {
         $(element).replaceWith('[li]' + $(element).html() + '[/li]');
      });
   }
}

$_exports = List;

return $_exports;
});
realm.module("morrr.editor.elements.ol",[],function(){ var $_exports;

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

$_exports = orderedList;

return $_exports;
});
realm.module("morrr.editor.elements.panorama",[],function(){ var $_exports;

const Panorama = {
   tag: 'div',
   menu: false,
   toBBCode: function(root) {},
   toProduction: function(item, opts) {
      return '<div class="article-inline-ad hide-desktop">';
   }
}

$_exports = Panorama;

return $_exports;
});
realm.module("morrr.editor.elements.strong",["morrr.editor.utils"],function(utils){ var $_exports;

const Strong = {
   tag: 'strong',
   menu: false,
   inline: true,
   icon: 'bold',
   hint: 'Bold',
   toBBCode: function(root) {
      var self = this;
      root.find('strong,b').each(function(index, element) {
         $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
      });
   },
   cmd: function() {

      this.execCommand('bold')
   }
}


$_exports = Strong

return $_exports;
});
realm.module("morrr.editor.elements.ul",[],function(){ var $_exports;

const UL = {
   tag: 'ul',
   menu: true,
   inline: true,
   icon: 'unordered-list',
   hint: 'Bulleted list',
   toBBCode: function(root) {

      while (root.find('ul').length > 0) {
         root.find('ul').each(function(index, element) {
            $(element).replaceWith('[ul]' + $(element).html() + '[/ul]');
         });
      }
   },
   cmd: function() {
      this.execCommand('insertunorderedlist');
   },
   toProduction: function(item) {
      return '<ul>'
   }
}

$_exports = UL;

return $_exports;
});
realm.module("morrr.editor.elements.unlink",[],function(){ var $_exports;

const Unlink = {
   menu: true,
   inline: true,
   icon: 'unlink',
   hint: 'Remove link',
   cmd: function() {
      this.execCommand("unlink", false, []);
   }
}

$_exports = Unlink;

return $_exports;
});
realm.module("morrr.editor.elements.url",[],function(){ var $_exports;

const Link = {
   tag: 'a',
   menu: true,
   inline: true,
   icon: 'link',
   hint: 'Insert link',
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

$_exports = Link;

return $_exports;
});
realm.module("morrr.editor.bbcode.AttributeParser",[],function(){ var $_exports;

const AttributeParser = function(input) {
   if (!input) {
      return {};
   }
   if (input[0] === "=") {

      return {
         self: input.slice(1, input.length)
      }
   }
   var attrWating = true;
   var valueWaiting = false;
   var myAttrs = {};
   var myAttr = '';
   var value = '';
   var openingValueString;
   var escapeOccured = false;
   for (var i in input) {
      var letter = input[i];
      if (letter === "=") {
         attrWating = false;
         myAttrs[myAttr] = '';
         valueWaiting = true;
      }
      if (attrWating && letter.match(/[a-z0-9_]/i)) {
         myAttr += letter;
      }
      if (valueWaiting) {
         if (openingValueString) {
            if (letter === openingValueString && !escapeOccured) {
               valueWaiting = false;
               attrWating = true;
               myAttrs[myAttr] = value;
               openingValueString = false;
               myAttr = '';
               value = '';
            } else {
               if (letter === "\\" && !escapeOccured) {
                  escapeOccured = true;
               } else {
                  value += letter;
                  escapeOccured = false;
               }
            }
         } else {
            if (letter.match(/'|"/)) {
               openingValueString = letter;
            }
         }
      }
   }
   return myAttrs;
}


$_exports = AttributeParser;

return $_exports;
});
realm.module("morrr.editor.bbcode.BBCodeEngine",["morrr.editor.bbcode.BBCodeExtractor", "morrr.editor.utils.lodash", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils"],function(BBCodeExtractor, _, BBCodeHandlers, utils){ var $_exports;



const BBCodeEngine = {
   replaceEndTags: function(input) {
      _.each(BBCodeHandlers, function(item, bbcodeName) {
         if (item.tag) {
            input = input.split("[/" + bbcodeName + "]").join('</' + item.tag + '>')
         }
      });
      return input;
   },
   _injectSystemId: function(tag, id) {
      tag = utils.stringInject(tag, tag.length - 1, 0, ' id="' + id + '"');
      return tag;
   },
   _prepareInput: function(input) {
      input = input.replace(/\[row\]/g, '<div>');
      input = input.replace(/\[\/row\]/g, '</div>');
      input = input.replace(/\[\/br\]/g, '<div><br></div>')
      input = this.replaceEndTags(input);
      return input;
   },
   toProduction: function(input, opts) {
      opts = opts || {};

      input = this._prepareInput(input)
      var data = BBCodeExtractor(input);
      var self = this;
      input = data.input;
      var codes = data.codes;
      var binders = {};

      _.each(codes, function(item) {
         var handler, html
         if ((handler = $BBCodeHandlers[item.name])) {
            if (_.isFunction(handler.toProduction)) {

               html = handler.toProduction(item, opts);
            } else {
               html = '<' + handler.tag + '>';
            };
            input = input.replace(item.str, html);
         }
      });

      _.each(codes, function(item) {
         var handler, html;
         if ((handler = BBCodeHandlers[item.name])) {
            if (_.isFunction(handler.processAfterRender)) {
               html = handler.processAfterRender(input, item, opts);
            }
         }
      });
      return input;
   },
   toEditor: function(input, editor) {
      input = this._prepareInput(input)
      var data = BBCodeExtractor(input);
      var self = this;
      input = data.input;
      var codes = data.codes;
      var binders = {};

      _.each(codes, function(item) {
         var handler, html;

         if ((handler = BBCodeHandlers[item.name])) {
            if (_.isFunction(handler.toProduction)) {
               html = handler.toProduction(item);
            } else {
               html = '<' + handler.tag + '>';
            };

            if (_.isFunction(handler.bindEditorEvents)) {
               var systemId = "sane-element-" + item.attrs.p;
               html = self._injectSystemId(html, systemId);
               binders[item.name] = binders[item.name] || [];
               binders[item.name].push(systemId)
            }
            input = input.replace(item.str, html);

         }
      });
      var dom = $(input);

      editor.content.append(dom)
      _.each(binders, function(ids, handlerName) {
         _.each(ids, function(id) {
            var el = editor.content.find("#" + id)[0];
            BBCodeHandlers[handlerName].bindEditorEvents.apply(editor, [el])
         });
      });
   }
}


$_exports = BBCodeEngine;

return $_exports;
});
realm.module("morrr.editor.bbcode.BBCodeExtractor",["morrr.editor.bbcode.AttributeParser", "morrr.editor.utils"],function(AttributeParser, utils){ var $_exports;

const BBCodeExtractor = function(input) {
   var positions = [];

   var index = 1;
   var expectingAttr = false;
   var attrStarted = false;
   for (var i = 0; i < input.length; i++) {
      var letter = input[i];
      if (letter === "/") {
         expectingAttr = false;
      }
      if (expectingAttr) {
         if (attrStarted && letter === ']') {
            var attr = ' p="' + (index++) + '"';
            input = utils.stringInject(input, i, 0, attr)
            i += attr.length - 1;
            attrStarted = false;
            expectingAttr = false;
         }

         if (letter.match(/[a-z0-9_]/i)) {
            attrStarted = true;
         }
      }
      if (letter === "[") {
         expectingAttr = true;
      }
   }
   var rx = /\[([a-z0-9]+)\s?([^\]]+)?]/igm;
   var data = rx.execAll(input);
   var output = [];
   _.each(data, function(item) {
      output.push({
         str: item[0],
         name: item[1],
         attrs: AttributeParser(item[2])
      });
   });
   return {
      input: input,
      codes: output
   };
}


$_exports = BBCodeExtractor;

return $_exports;
});
realm.module("morrr.editor.bbcode.BBCodeHandlers",["morrr.editor.utils.Promise", "morrr.editor.utils.lodash"],function(Promise, _){ var $_exports;


const BBCodeHandlers = realm.requirePackage('morrr.editor.elements').then(function(packages) {
   var packs = {};
   _.each(packages, function(pack, name) {
      packs[name.substring(22, name.length)] = pack;
   });
   return packs;
})


$_exports = BBCodeHandlers;

return $_exports;
});
realm.module("morrr.editor.bbcode.Generator",["morrr.editor.utils", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils.lodash"],function(utils, BBCodeHandlers, _){ var $_exports;


const Generator = function(editor) {
   var el = editor.content.clone();

   // Process inline styles first
   _.each(BBCodeHandlers, function(handler) {
      if (handler.toBBCode && handler.inline) {
         handler.toBBCode.bind(editor)(el);
      }
   });
   //var root = el[0];
   var root = utils.flattenNodes(editor, el[0].childNodes);
   // // Process the rest wrappers
   _.each(BBCodeHandlers, function(handler) {
      if (handler.toBBCode && !handler.inline) {
         handler.toBBCode.bind(editor)($(root));
      }
   });
   var BBCODE = [];
   var prevEmpty = false;
   var lineInsertedAt;

   for (var i = 0; i <= root.childNodes.length; i++) {
      var node = root.childNodes[i];
      if (node && node.nodeName !== 'X') {
         if (node.nodeType === 3) {
            //Text is here

            if (!node.nodeValue.match(/\[\S+\]/)) {

               BBCODE.push('[row]' + utils.trimText(node.nodeValue, true) + '[/row]');
            } else {
               var text = utils.trimText(node.nodeValue);
               var isBlockModule = text.match(/^\[(blockquote|gallery|intro|h3|h1)/);
               BBCODE.push(text);
               if (isBlockModule) {
                  prevEmpty = true;
                  if (lineInsertedAt) { // Removing prev inserted break (we dont' need it)
                     var supposedlyBr = BBCODE[lineInsertedAt];
                     if (supposedlyBr === '[/br]') {
                        BBCODE.splice(lineInsertedAt, 1);
                     }
                  }
               }

            }
         }
         if (node.nodeType === 1) {
            var text = utils.trimText($(node).text(), true);
            var isEmpty = text.replace(/\[\/?[^\]]+(\]|$)/g, "") === "";
            if (isEmpty) {
               text = "";
            }
            if (text.length > 0) {
               lineInsertedAt = null;
               prevEmpty = false;
            }
            if (!prevEmpty) {
               if (text.length === 0) {
                  BBCODE.push('[/br]');
                  lineInsertedAt = BBCODE.length - 1;
               } else {
                  BBCODE.push('[row]' + text + '[/row]');
               }
            }
            prevEmpty = !text ? true : false;
         }

      };
   }
   var _bbcode = utils.cleanUpItems(BBCODE.join('\n'));
   return _bbcode;
}


$_exports = Generator;

return $_exports;
});

})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : window.realm}}());