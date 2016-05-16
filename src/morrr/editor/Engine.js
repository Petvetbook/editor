"use realm";

import BBCodeEngine, Generator, BBCodeExtractor, BBCodeHandlers from morrr.editor.bbcode;
import lodash as _ from morrr.editor.utils;
import utils, Modal from morrr.editor;

class SaneEditor {

   initialize(target, opts) {
      this.opts = opts || {};
      this.toolbarConfig = opts.toolbar || [];
      this.element = $('<div class="sane-editor"></div>');
      this.toolbarWrapper = $('<div class="sane-editor-toolbar-wrapper"></div>');
      this.toolbarWrapper.appendTo(this.element);
      this.toolbar = $('<div class="toolbar"></div>');
      this.toolbar.appendTo(this.toolbarWrapper);
      this.modalWrapper = $('<div class="sane-editor-modal-wrapper"></div>');
      this.modalWrapper.appendTo(this.element);
      this.contentWrapper = $('<div class="sane-editor-content-wrapper"></div>');
      this.contentWrapper.appendTo(this.element);
      this.content = $('<div class="sane-editor-content" contenteditable="true"></div>').appendTo(this.toolbar);
      this.content.appendTo(this.contentWrapper);
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
   }

   onActivity(cb) {
      this.activity_cb = cb;
   }

   triggerActivity() {
      if (this.activity_cb) {
         this.activity_cb();
      }
   }

   getValue() {
      return this.generate();
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
   showError(message) {
      this.element.find(".notification").remove();
      var notification = $('<div class="notification"><div class="text"><i class="ui icon warning sign"></i>' + message + '</div></div>');
      notification.hide();
      notification.insertBefore(this.content);
      notification.fadeIn({
         duration: 200,
         queue: false
      }).css('display', 'none').slideDown(200, function() {
         setTimeout(function() {
            notification.show();
            notification.fadeOut({
               duration: 200,
               queue: false
            }).css('display', 'block').slideIn(200, function() {
               notification.remove();
            });
         }, 2000);
      });
   }

   createModal(header) {
      var modal = Modal.create({
         title: "Insert image",
         target: this.modalWrapper
      });
      return modal;
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
                  console.log("inject element", el)
                  self.triggerActivity();
                  var endContainer = $(range.endContainer);
                  if (!endContainer.parent('.content')[0] && !$(range.endContainer).hasClass("content")) {
                     var found = false;
                     var parent = endContainer.parent();
                     var target;
                     var iterations = 0;
                     while (!found && iterations < 50) {
                        if (parent.hasClass('content')) {
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
      var bindHint = function(icon, text) {
         icon.mouseover(function(e) {
            var offset = icon.position();
            currentHint = $('<div class="toolbar-hint">' + text +
               '</div>');
            currentHint.appendTo(self.toolbar);
            currentHint.css({
               top: (offset.top + 35) + "px",
               left: offset.left + "px",
               position: "absolute"
            });
         });
         icon.mouseout(function() {
            if (currentHint) {
               currentHint.remove();
            }
         });
      }
      _.each(this.toolbarConfig, function(str) {
         var handler = BBCodeHandlers[str]
         if (handler) {
            var icon = $('<div class="button"><i class="icon"></i></div>')
            icon.find('i').addClass(handler.icon);

            if (handler.hint) {
               bindHint(icon, handler.hint)
            }
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
            });
         }
      });
      var fScreen = $('<div class="button"><i class="icon maximize"></i></div>');
      fScreen.appendTo($(self.toolbar));
      fScreen.click(function() {
         self.toggleFullScreenMode();
      });
      bindHint(fScreen, "Full screen")
      this.bindFullScreenButtons();
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
      return document.getSelection();
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
      console.log(this.content[0]);
      document.execCommand(a, b || false, c || null);
   }

   setCaretPosition(elem, caretPos) {
      if (elem !== null) {
         var range = this.getRange();
         var sel = this.getSelection();
         if (range) {
            range.setStart(elem, 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
         }
      }
   }

   bindFullScreenButtons() {
      var self = this;
      this.floatingSave = $('<div class="circular ui icon button primary small floating-save"><i class="icon save"></i></div>');
      this.floatingPreview = $('<div class="circular ui icon button small floating-preview"><i class="icon zoom"></i></div>');
      this.floatingPreview.click(function() {
         if (self.onFloatingPreview) {
            self.onFloatingPreview();
         }
      });

      self.exitFullScreenModeButton = $(
         '<div class="circular ui icon button small floating-exit"><i class="icon angle double down"></i></div>');
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
      if ($(this.element).hasClass("full-screen-mode")) {
         $(this.element).removeClass("full-screen-mode");
         $('body').css('overflow', 'auto');
         this.floatingSave.hide();
         this.floatingPreview.hide();
         this.exitFullScreenModeButton.hide();
      } else {
         $('body').css('overflow', 'hidden');
         $(this.element).addClass("full-screen-mode");
         this.floatingSave.show();
         this.floatingPreview.show();
         this.exitFullScreenModeButton.show();
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
