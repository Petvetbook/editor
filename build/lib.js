(function(global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (factory((global.frzr = global.frzr || {})));
}(this, function(exports) {
   'use strict';

   function text(str) {
      return document.createTextNode(str);
   }

   var customElements;
   var customAttributes;

   function el(tagName) {
      if (customElements) {
         var customElement = customElements[tagName];

         if (customElement) {
            return customElement.apply(this, arguments);
         }
      }

      var element = document.createElement(tagName);

      for (var i = 1; i < arguments.length; i++) {
         var arg = arguments[i];

         if (arg == null) {
            continue;
         } else if (mount(element, arg)) {
            continue;
         } else if (typeof arg === 'object') {
            for (var attr in arg) {
               if (customAttributes) {
                  var customAttribute = customAttributes[attr];
                  if (customAttribute) {
                     customAttribute(element, arg[attr]);
                     continue;
                  }
               }
               var value = arg[attr];
               if (attr === 'style' || (element[attr] == null && typeof value != 'function')) {
                  element.setAttribute(attr, value);
               } else {
                  element[attr] = value;
               }
            }
         }
      }

      return element;
   }

   function registerElement(tagName, handler) {
      customElements || (customElements = {});
      customElements[tagName] = handler;
   }

   function registerAttribute(attr, handler) {
      customAttributes || (customAttributes = {});
      customAttributes[attr] = handler;
   }

   function unregisterElement(tagName) {
      if (customElements && customElements[tagName]) {
         delete customElements[tagName];
      }
   }

   function unregisterAttribute(attr) {
      if (customAttributes && customAttributes[attr]) {
         delete customAttributes[attr];
      }
   }

   function svg(tagName) {
      var element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

      for (var i = 1; i < arguments.length; i++) {
         var arg = arguments[i];

         if (arg == null) {
            continue;
         } else if (mount(element, arg)) {
            continue;
         } else if (typeof arg === 'object') {
            for (var attr in arg) {
               element.setAttribute(attr, arg[attr]);
            }
         }
      }

      return element;
   }

   function list(View, key, initData, skipRender) {
      return new List(View, key, initData, skipRender);
   }

   function List(View, key, initData, skipRender) {
      this.View = View;
      this.views = [];
      this.initData = initData;
      this.skipRender = skipRender;

      if (key) {
         this.key = key;
         this.lookup = {};
      }
   }

   List.prototype.update = function(data, cb) {
      var View = this.View;
      var views = this.views;
      var parent = this.parent;
      var key = this.key;
      var initData = this.initData;
      var skipRender = this.skipRender;

      if (cb) {
         var added = [];
         var updated = [];
         var removed = [];
      }

      if (key) {
         var lookup = this.lookup;
         var newLookup = {};

         views.length = data.length;

         for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var id = item[key];
            var view = lookup[id];

            if (!view) {
               view = new View(initData, item, i);
               cb && added.push(view);
            } else {
               cb && updated.push(view);
            }

            views[i] = newLookup[id] = view;

            view.update && view.update(item, i);
         }

         if (cb) {
            for (var id in lookup) {
               if (!newLookup[id]) {
                  removed.push(lookup[id]);
                  !skipRender && parent && unmount(parent, lookup[id]);
               }
            }
         }

         this.lookup = newLookup;
      } else {
         if (cb) {
            for (var i = data.length; i < views.length; i++) {
               var view = views[i];

               !skipRender && parent && unmount(parent, view);
               removed.push(view);
            }
         }

         views.length = data.length;

         for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var view = views[i];

            if (!view) {
               view = new View(initData, item, i);
               cb && added.push(view);
            } else {
               cb && updated.push(view);
            }

            view.update && view.update(item, i);
            views[i] = view;
         }
      }

      !skipRender && parent && setChildren(parent, views);
      cb && cb(added, updated, removed);
   }

   function mount(parent, child, before) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;
      var childWasMounted = childEl.parentNode != null;

      if (childWasMounted) {
         child.remounting && child.remounting();
      } else {
         child.mounting && child.mounting();
      }

      if (childEl instanceof Node) {
         if (before) {
            var beforeEl = before;
            parentEl.insertBefore(childEl, beforeEl);
         } else {
            parentEl.appendChild(childEl);
         }

         if (childWasMounted) {
            child.remounted && child.remounted();
         } else {
            child.mounted && child.mounted();
         }
         if (childEl !== child) {
            childEl.view = child;
            child.parent = parent;
         }

      } else if (typeof childEl === 'string' || typeof childEl === 'number') {
         mount(parentEl, document.createTextNode(childEl), before);

      } else if (childEl instanceof Array) {
         for (var i = 0; i < childEl.length; i++) {
            mount(parentEl, childEl[i], before);
         }

      } else if (child instanceof List) {
         child.parent = parent;
         setChildren(parentEl, child.views);

      } else {
         return false;
      }
      return true;
   }

   var mountBefore = mount;

   function replace(parent, child, replace) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;
      var replaceEl = replace.el || replace;
      var childWasMounted = childEl.parentNode != null;

      replace.unmounting && replace.unmounting();

      if (childWasMounted) {
         child.remounting && child.remounting();
      } else {
         child.mounting && child.mounting();
      }

      parentEl.replaceChild(childEl, replaceEl);

      replace.unmounted && replace.unmounted();

      if (replaceEl !== replace) {
         replace.parent = null;
      }

      if (childWasMounted) {
         child.remounted && child.remounted();
      } else {
         child.mounted && child.mounted();
      }
      if (childEl !== child) {
         childEl.view = child;
         child.parent = parent;
      }
   }

   function unmount(parent, child) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;

      child.unmounting && child.unmounting();

      parentEl.removeChild(childEl);

      child.unmounted && child.unmounted();

      if (childEl !== child) {
         child.parent = null;
      }
   }

   function setChildren(parent, children) {
      var parentEl = parent.el || parent;
      var traverse = parentEl.firstChild;

      for (var i = 0; i < children.length; i++) {
         var child = children[i];
         var childEl = child.el || child;

         if (traverse === childEl) {
            traverse = traverse.nextSibling;
            continue;
         }

         mount(parent, child, traverse);
      }

      while (traverse) {
         var next = traverse.nextSibling;

         unmount(parent, traverse.view || traverse);

         traverse = next;
      }
   }

   exports.text = text;
   exports.el = el;
   exports.registerElement = registerElement;
   exports.registerAttribute = registerAttribute;
   exports.unregisterElement = unregisterElement;
   exports.unregisterAttribute = unregisterAttribute;
   exports.svg = svg;
   exports.list = list;
   exports.List = List;
   exports.mount = mount;
   exports.mountBefore = mountBefore;
   exports.replace = replace;
   exports.unmount = unmount;
   exports.setChildren = setChildren;

}));

/*!
 * jQuery Upload File Plugin
 * version: 3.1.10
 * @requires jQuery v1.5 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function(b) {
   if (b.fn.ajaxForm == undefined) {
      b.getScript(("https:" == document.location.protocol ? "https://" : "http://") +
         "malsup.github.io/jquery.form.js")
   }
   var a = {};
   a.fileapi = b("<input type='file'/>").get(0).files !== undefined;
   a.formdata = window.FormData !== undefined;
   b.fn.uploadFile = function(f) {
      var p = b.extend({
         url: "",
         method: "POST",
         enctype: "multipart/form-data",
         returnType: null,
         allowDuplicates: true,
         duplicateStrict: false,
         allowedTypes: "*",
         acceptFiles: "*",
         fileName: "file",
         formData: {},
         dynamicFormData: function() {
            return {}
         },
         maxFileSize: -1,
         maxFileCount: -1,
         multiple: true,
         dragDrop: true,
         autoSubmit: true,
         showCancel: true,
         showAbort: true,
         showDone: true,
         showDelete: false,
         showError: true,
         showStatusAfterSuccess: true,
         showStatusAfterError: true,
         showFileCounter: true,
         fileCounterStyle: "). ",
         showProgress: false,
         nestedForms: true,
         showDownload: false,
         onLoad: function(s) {},
         onSelect: function(s) {
            return true
         },
         onSubmit: function(s, x) {},
         onSuccess: function(y, x, z, s) {},
         onError: function(z, s, y, x) {},
         onCancel: function(x, s) {},
         downloadCallback: false,
         deleteCallback: false,
         afterUploadAll: false,
         abortButtonClass: "ajax-file-upload-abort",
         cancelButtonClass: "ajax-file-upload-cancel",
         dragDropContainerClass: "ajax-upload-dragdrop",
         dragDropHoverClass: "state-hover",
         errorClass: "ajax-file-upload-error",
         uploadButtonClass: "ajax-file-upload",
         dragDropStr: "<span><b>Drag &amp; Drop Files</b></span>",
         abortStr: "Abort",
         cancelStr: "Cancel",
         deletelStr: "Delete",
         doneStr: "Done",
         multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.",
         extErrorStr: "is not allowed. Allowed extensions: ",
         duplicateErrorStr: "is not allowed. File already exists.",
         sizeErrorStr: "is not allowed. Allowed Max size: ",
         uploadErrorStr: "Upload is not allowed",
         maxFileCountErrorStr: " is not allowed. Maximum allowed files are:",
         downloadStr: "Download",
         customErrorKeyStr: "jquery-upload-file-error",
         showQueueDiv: false,
         statusBarWidth: 500,
         dragdropWidth: 500,
         showPreview: false,
         previewHeight: "auto",
         previewWidth: "100%",
         uploadFolder: "uploads/"
      }, f);
      this.fileCounter = 1;
      this.selectedFiles = 0;
      this.fCounter = 0;
      this.sCounter = 0;
      this.tCounter = 0;
      var e = "ajax-file-upload-" + (new Date().getTime());
      this.formGroup = e;
      this.hide();
      this.errorLog = b("<div></div>");
      this.after(this.errorLog);
      this.responses = [];
      this.existingFileNames = [];
      if (!a.formdata) {
         p.dragDrop = false
      }
      if (!a.formdata) {
         p.multiple = false
      }
      var n = this;
      var q = b("<div>" + b(this).html() + "</div>");
      b(q).addClass(p.uploadButtonClass);
      (function l() {
         if (b.fn.ajaxForm) {
            if (p.dragDrop) {
               var s = b('<div class="' + p.dragDropContainerClass + '" style="vertical-align:top;"></div>').width(
                  p.dragdropWidth);
               b(n).before(s);
               b(s).append(q);
               b(s).append(b(p.dragDropStr));
               c(n, p, s)
            } else {
               b(n).before(q)
            }
            p.onLoad.call(this, n);
            k(n, e, p, q)
         } else {
            window.setTimeout(l, 10)
         }
      })();
      this.startUpload = function() {
         b("." + this.formGroup).each(function(x, s) {
            if (b(this).is("form")) {
               b(this).submit()
            }
         })
      };
      this.getFileCount = function() {
         return n.selectedFiles
      };
      this.stopUpload = function() {
         b("." + p.abortButtonClass).each(function(x, s) {
            if (b(this).hasClass(n.formGroup)) {
               b(this).click()
            }
         })
      };
      this.cancelAll = function() {
         b("." + p.cancelButtonClass).each(function(x, s) {
            if (b(this).hasClass(n.formGroup)) {
               b(this).click()
            }
         })
      };
      this.update = function(s) {
         p = b.extend(p, s)
      };
      this.createProgress = function(y) {
         var x = new j(this, p);
         x.progressDiv.show();
         x.progressbar.width("100%");
         var s = "";
         if (p.showFileCounter) {
            s = n.fileCounter + p.fileCounterStyle + y
         } else {
            s = y
         }
         x.filename.html(s);
         n.fileCounter++;
         n.selectedFiles++;
         if (p.showPreview) {
            x.preview.attr("src", p.uploadFolder + y);
            x.preview.show()
         }
         if (p.showDownload) {
            x.download.show();
            x.download.click(function() {
               if (p.downloadCallback) {
                  p.downloadCallback.call(n, [y])
               }
            })
         }
         x.del.show();
         x.del.click(function() {
            x.statusbar.hide().remove();
            var z = [y];
            if (p.deleteCallback) {
               p.deleteCallback.call(this, z, x)
            }
            n.selectedFiles -= 1;
            d(p, n)
         })
      };
      this.getResponses = function() {
         return this.responses
      };
      var m = false;

      function u() {
         if (p.afterUploadAll && !m) {
            m = true;
            (function s() {
               if (n.sCounter != 0 && (n.sCounter + n.fCounter == n.tCounter)) {
                  p.afterUploadAll(n);
                  m = false
               } else {
                  window.setTimeout(s, 100)
               }
            })()
         }
      }

      function c(z, x, y) {
         y.on("dragenter", function(s) {
            s.stopPropagation();
            s.preventDefault();
            b(this).addClass(x.dragDropHoverClass)
         });
         y.on("dragover", function(A) {
            A.stopPropagation();
            A.preventDefault();
            var s = b(this);
            if (s.hasClass(x.dragDropContainerClass) && !s.hasClass(x.dragDropHoverClass)) {
               s.addClass(x.dragDropHoverClass)
            }
         });
         y.on("drop", function(A) {
            A.preventDefault();
            b(this).removeClass(x.dragDropHoverClass);
            z.errorLog.html("");
            var s = A.originalEvent.dataTransfer.files;
            if (!x.multiple && s.length > 1) {
               if (x.showError) {
                  b("<div class='" + x.errorClass + "'>" + x.multiDragErrorStr + "</div>").appendTo(z.errorLog)
               }
               return
            }
            if (x.onSelect(s) == false) {
               return
            }
            r(x, z, s)
         });
         y.on("dragleave", function(s) {
            b(this).removeClass(x.dragDropHoverClass)
         });
         b(document).on("dragenter", function(s) {
            s.stopPropagation();
            s.preventDefault()
         });
         b(document).on("dragover", function(A) {
            A.stopPropagation();
            A.preventDefault();
            var s = b(this);
            if (!s.hasClass(x.dragDropContainerClass)) {
               s.removeClass(x.dragDropHoverClass)
            }
         });
         b(document).on("drop", function(s) {
            s.stopPropagation();
            s.preventDefault();
            b(this).removeClass(x.dragDropHoverClass)
         })
      }

      function t(s) {
         var y = "";
         var x = s / 1024;
         if (parseInt(x) > 1024) {
            var z = x / 1024;
            y = z.toFixed(2) + " MB"
         } else {
            y = x.toFixed(2) + " KB"
         }
         return y
      }

      function i(A) {
         var B = [];
         if (jQuery.type(A) == "string") {
            B = A.split("&")
         } else {
            B = b.param(A).split("&")
         }
         var x = B.length;
         var s = [];
         var z, y;
         for (z = 0; z < x; z++) {
            B[z] = B[z].replace(/\+/g, " ");
            y = B[z].split("=");
            s.push([decodeURIComponent(y[0]), decodeURIComponent(y[1])])
         }
         return s
      }

      function r(K, E, x) {
         for (var F = 0; F < x.length; F++) {
            if (!g(E, K, x[F].name)) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.extErrorStr + K.allowedTypes +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (!K.allowDuplicates && o(E, x[F].name)) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.duplicateErrorStr +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (K.maxFileSize != -1 && x[F].size > K.maxFileSize) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.sizeErrorStr + t(K.maxFileSize) +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (K.maxFileCount != -1 && E.selectedFiles >= K.maxFileCount) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.maxFileCountErrorStr + K.maxFileCount +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            E.selectedFiles++;
            E.existingFileNames.push(x[F].name);
            var G = K;
            var z = new FormData();
            var D = K.fileName.replace("[]", "");
            z.append(D, x[F]);
            var B = K.formData;
            if (B) {
               var I = i(B);
               for (var C = 0; C < I.length; C++) {
                  if (I[C]) {
                     z.append(I[C][0], I[C][1])
                  }
               }
            }
            G.fileData = z;
            var H = new j(E, K);
            var J = "";
            if (K.showFileCounter) {
               J = E.fileCounter + K.fileCounterStyle + x[F].name
            } else {
               J = x[F].name
            }
            H.filename.html(J);
            var y = b("<form style='display:block; position:absolute;left: 150px;' class='" + E.formGroup +
               "' method='" + K.method + "' action='" + K.url + "' enctype='" + K.enctype + "'></form>");
            y.appendTo("body");
            var A = [];
            A.push(x[F].name);
            w(y, G, H, A, E, x[F]);
            E.fileCounter++
         }
      }

      function g(z, y, B) {
         var A = y.allowedTypes.toLowerCase().split(",");
         var x = B.split(".").pop().toLowerCase();
         if (y.allowedTypes != "*" && jQuery.inArray(x, A) < 0) {
            return false
         }
         return true
      }

      function o(A, y) {
         var z = false;
         if (A.existingFileNames.length) {
            for (var s = 0; s < A.existingFileNames.length; s++) {
               if (A.existingFileNames[s] == y || p.duplicateStrict && A.existingFileNames[s].toLowerCase() == y.toLowerCase()) {
                  z = true
               }
            }
         }
         return z
      }

      function h(y, z) {
         if (y.existingFileNames.length) {
            for (var s = 0; s < z.length; s++) {
               var A = y.existingFileNames.indexOf(z[s]);
               if (A != -1) {
                  y.existingFileNames.splice(A, 1)
               }
            }
         }
      }

      function v(x, y) {
         if (x) {
            y.show();
            var s = new FileReader();
            s.onload = function(z) {
               y.attr("src", z.target.result)
            };
            s.readAsDataURL(x)
         }
      }

      function d(x, z) {
         if (x.showFileCounter) {
            var y = b(".ajax-file-upload-filename").length;
            z.fileCounter = y + 1;
            b(".ajax-file-upload-filename").each(function(D, B) {
               var s = b(this).html().split(x.fileCounterStyle);
               var A = parseInt(s[0]) - 1;
               var C = y + x.fileCounterStyle + s[1];
               b(this).html(C);
               y--
            })
         }
      }

      function k(D, C, z, x) {
         var E = "ajax-upload-id-" + (new Date().getTime());
         var B = b("<form method='" + z.method + "' action='" + z.url + "' enctype='" + z.enctype + "'></form>");
         var y = "<input type='file' id='" + E + "' name='" + z.fileName + "' accept='" + z.acceptFiles + "'/>";
         if (z.multiple) {
            if (z.fileName.indexOf("[]") != z.fileName.length - 2) {
               z.fileName += "[]"
            }
            y = "<input type='file' id='" + E + "' name='" + z.fileName + "' accept='" + z.acceptFiles +
               "' multiple/>"
         }
         var A = b(y).appendTo(B);
         A.change(function() {
            D.errorLog.html("");
            var L = z.allowedTypes.toLowerCase().split(",");
            var H = [];
            if (this.files) {
               for (I = 0; I < this.files.length; I++) {
                  H.push(this.files[I].name)
               }
               if (z.onSelect(this.files) == false) {
                  return
               }
            } else {
               var J = b(this).val();
               var G = [];
               H.push(J);
               if (!g(D, z, J)) {
                  if (z.showError) {
                     b("<div class='" + z.errorClass + "'><b>" + J + "</b> " + z.extErrorStr + z.allowedTypes +
                        "</div>").appendTo(D.errorLog)
                  }
                  return
               }
               G.push({
                  name: J,
                  size: "NA"
               });
               if (z.onSelect(G) == false) {
                  return
               }
            }
            d(z, D);
            x.unbind("click");
            B.hide();
            k(D, C, z, x);
            B.addClass(C);
            if (a.fileapi && a.formdata) {
               B.removeClass(C);
               var K = this.files;
               r(z, D, K)
            } else {
               var F = "";
               for (var I = 0; I < H.length; I++) {
                  if (z.showFileCounter) {
                     F += D.fileCounter + z.fileCounterStyle + H[I] + "<br>"
                  } else {
                     F += H[I] + "<br>"
                  }
                  D.fileCounter++
               }
               if (z.maxFileCount != -1 && (D.selectedFiles + H.length) > z.maxFileCount) {
                  if (z.showError) {
                     b("<div class='" + z.errorClass + "'><b>" + F + "</b> " + z.maxFileCountErrorStr + z.maxFileCount +
                        "</div>").appendTo(D.errorLog)
                  }
                  return
               }
               D.selectedFiles += H.length;
               var s = new j(D, z);
               s.filename.html(F);
               w(B, z, s, H, D, null)
            }
         });
         if (z.nestedForms) {
            B.css({
               margin: 0,
               padding: 0
            });
            x.css({
               position: "relative",
               overflow: "hidden",
               cursor: "default"
            });
            A.css({
               position: "absolute",
               cursor: "pointer",
               top: "0px",
               width: "100%",
               height: "100%",
               left: "0px",
               "z-index": "100",
               opacity: "0.0",
               filter: "alpha(opacity=0)",
               "-ms-filter": "alpha(opacity=0)",
               "-khtml-opacity": "0.0",
               "-moz-opacity": "0.0"
            });
            B.appendTo(x)
         } else {
            B.appendTo(b("body"));
            B.css({
               margin: 0,
               padding: 0,
               display: "block",
               position: "absolute",
               left: "-250px"
            });
            if (navigator.appVersion.indexOf("MSIE ") != -1) {
               x.attr("for", E)
            } else {
               x.click(function() {
                  A.click()
               })
            }
         }
      }

      function j(y, x) {
         this.statusbar = b("<div class='ajax-file-upload-statusbar'></div>").width(x.statusBarWidth);
         this.preview = b("<img class='ajax-file-upload-preview' />").width(x.previewWidth).height(x.previewHeight)
            .appendTo(this.statusbar).hide();
         this.filename = b("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar);
         this.progressDiv = b("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide();
         this.progressbar = b("<div class='ajax-file-upload-bar " + y.formGroup + "'></div>").appendTo(this.progressDiv);
         this.abort = b("<div class='ajax-file-upload-red " + x.abortButtonClass + " " + y.formGroup + "'>" + x.abortStr +
            "</div>").appendTo(this.statusbar).hide();
         this.cancel = b("<div class='ajax-file-upload-red " + x.cancelButtonClass + " " + y.formGroup + "'>" + x
            .cancelStr + "</div>").appendTo(this.statusbar).hide();
         this.done = b("<div class='ajax-file-upload-green'>" + x.doneStr + "</div>").appendTo(this.statusbar).hide();
         this.download = b("<div class='ajax-file-upload-green'>" + x.downloadStr + "</div>").appendTo(this.statusbar)
            .hide();
         this.del = b("<div class='ajax-file-upload-red'>" + x.deletelStr + "</div>").appendTo(this.statusbar).hide();
         if (x.showQueueDiv) {
            b("#" + x.showQueueDiv).append(this.statusbar)
         } else {
            y.errorLog.after(this.statusbar)
         }
         return this
      }

      function w(D, C, x, z, E, B) {
         var A = null;
         var y = {
            cache: false,
            contentType: false,
            processData: false,
            forceSync: false,
            type: C.method,
            data: C.formData,
            formData: C.fileData,
            dataType: C.returnType,
            beforeSubmit: function(J, G, I) {
               if (C.onSubmit.call(this, z) != false) {
                  var F = C.dynamicFormData();
                  if (F) {
                     var s = i(F);
                     if (s) {
                        for (var H = 0; H < s.length; H++) {
                           if (s[H]) {
                              if (C.fileData != undefined) {
                                 I.formData.append(s[H][0], s[H][1])
                              } else {
                                 I.data[s[H][0]] = s[H][1]
                              }
                           }
                        }
                     }
                  }
                  E.tCounter += z.length;
                  u();
                  return true
               }
               x.statusbar.append("<div class='" + C.errorClass + "'>" + C.uploadErrorStr + "</div>");
               x.cancel.show();
               D.remove();
               x.cancel.click(function() {
                  h(E, z);
                  x.statusbar.remove();
                  C.onCancel.call(E, z, x);
                  E.selectedFiles -= z.length;
                  d(C, E)
               });
               return false
            },
            beforeSend: function(F, s) {
               x.progressDiv.show();
               x.cancel.hide();
               x.done.hide();
               if (C.showAbort) {
                  x.abort.show();
                  x.abort.click(function() {
                     h(E, z);
                     F.abort();
                     E.selectedFiles -= z.length
                  })
               }
               if (!a.formdata) {
                  x.progressbar.width("5%")
               } else {
                  x.progressbar.width("1%")
               }
            },
            uploadProgress: function(I, s, H, G) {
               if (G > 98) {
                  G = 98
               }
               var F = G + "%";
               if (G > 1) {
                  x.progressbar.width(F)
               }
               if (C.showProgress) {
                  x.progressbar.html(F);
                  x.progressbar.css("text-align", "center")
               }
            },
            success: function(F, s, H) {
               if (C.returnType == "json" && b.type(F) == "object" && F.hasOwnProperty(C.customErrorKeyStr)) {
                  x.abort.hide();
                  var G = F[C.customErrorKeyStr];
                  C.onError.call(this, z, 200, G, x);
                  if (C.showStatusAfterError) {
                     x.progressDiv.hide();
                     x.statusbar.append("<span class='" + C.errorClass + "'>ERROR: " + G + "</span>")
                  } else {
                     x.statusbar.hide();
                     x.statusbar.remove()
                  }
                  E.selectedFiles -= z.length;
                  D.remove();
                  E.fCounter += z.length;
                  return
               }
               E.responses.push(F);
               x.progressbar.width("100%");
               if (C.showProgress) {
                  x.progressbar.html("100%");
                  x.progressbar.css("text-align", "center")
               }
               x.abort.hide();
               C.onSuccess.call(this, z, F, H, x);
               if (C.showStatusAfterSuccess) {
                  if (C.showDone) {
                     x.done.show();
                     x.done.click(function() {
                        x.statusbar.hide("slow");
                        x.statusbar.remove()
                     })
                  } else {
                     x.done.hide()
                  }
                  if (C.showDelete) {
                     x.del.show();
                     x.del.click(function() {
                        x.statusbar.hide().remove();
                        if (C.deleteCallback) {
                           C.deleteCallback.call(this, F, x)
                        }
                        E.selectedFiles -= z.length;
                        d(C, E)
                     })
                  } else {
                     x.del.hide()
                  }
               } else {
                  x.statusbar.hide("slow");
                  x.statusbar.remove()
               }
               if (C.showDownload) {
                  x.download.show();
                  x.download.click(function() {
                     if (C.downloadCallback) {
                        C.downloadCallback(F)
                     }
                  })
               }
               D.remove();
               E.sCounter += z.length
            },
            error: function(G, s, F) {
               x.abort.hide();
               if (G.statusText == "abort") {
                  x.statusbar.hide("slow").remove();
                  d(C, E)
               } else {
                  C.onError.call(this, z, s, F, x);
                  if (C.showStatusAfterError) {
                     x.progressDiv.hide();
                     x.statusbar.append("<span class='" + C.errorClass + "'>ERROR: " + F + "</span>")
                  } else {
                     x.statusbar.hide();
                     x.statusbar.remove()
                  }
                  E.selectedFiles -= z.length
               }
               D.remove();
               E.fCounter += z.length
            }
         };
         if (C.showPreview && B != null) {
            if (B.type.toLowerCase().split("/").shift() == "image") {
               v(B, x.preview)
            }
         }
         if (C.autoSubmit) {
            D.ajaxSubmit(y)
         } else {
            if (C.showCancel) {
               x.cancel.show();
               x.cancel.click(function() {
                  h(E, z);
                  D.remove();
                  x.statusbar.remove();
                  C.onCancel.call(E, z, x);
                  E.selectedFiles -= z.length;
                  d(C, E)
               })
            }
            D.ajaxForm(y)
         }
      }
      return this
   }
}(jQuery));
