"use realm";

import BBCodeEngine, Generator, BBCodeExtractor, BBCodeHandlers from morrr.editor.bbcode;
import lodash as _ from morrr.editor.utils;
import utils, Modal from morrr.editor;

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
      this.editableWrapper = $('<div class="sane-editor-editable-wrapper"></div>');
      this.translateWrapper = $('<div class="sane-editor-translate-pane-wrapper"></div>');
      this.contentPane = $('<div class="sane-editor-translate-content"></div>');

      this.contentWrapper = $('<div class="sane-editor-content-wrapper"></div>');
      this.content = $('<div class="sane-editor-content" contenteditable="true"></div>');

      this.content.appendTo(this.contentWrapper);
      this.contentWrapper.appendTo(this.editableWrapper);
      this.contentPane.appendTo(this.translateWrapper);
      this.formattingWrapper.appendTo(this.contentAreaWrapper);
      this.editableWrapper.appendTo(this.contentAreaWrapper);
      this.translateWrapper.appendTo(this.contentAreaWrapper);
      this.contentAreaWrapper.appendTo(this.element);

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
      this.toggleTranslateMode();
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
         this.fileToolbar.appendTo(this.formattingWrapper);
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
         this.langToolbar.prependTo(this.editableWrapper);
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
      } else {
         $('body').css('overflow', 'hidden');
         $(this.element).addClass("full-screen-mode");

         // if (self._onFullScreenLeftMenu) {
         //    var element = $("<div class='left-menu' style='color:white'></div>");
         //    $(this.element).find(".sane-editor-content-wrapper").append(element);

         //    self._onFullScreenLeftMenu(element);
         // }
      }
   }

   toggleTranslateMode() {
      var self = this;
      if ($(this.element).hasClass("translate-mode")) {
         $(this.element).removeClass("translate-mode");
      } else {
         $('body').css('overflow', 'hidden');
         $(this.element).addClass("translate-mode");
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
export SaneEditor;
