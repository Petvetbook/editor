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

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (___scope___) {
   "use strict";
   var $isBackend = ___scope___.isNode;var realm = ___scope___.realm;

   RegExp.prototype.execAll = function (string) {
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
   };

   realm.module("morrr.editor.utils.lodash", function () {
      return $isBackend ? require("lodash") : window._;
   });
   if ($isBackend) {
      require("image-server-client");
   }

   realm.module("frzr", function () {
      return $isBackend ? {} : window.frzr;
   });
   realm.module("morrr.editor.utils.Promise", function () {
      return $isBackend ? require("promise") : window.Promise;
   });

   realm.module("morrr.editor.utils.sharedImagePath", ['morrr.editor.runtime.config'], function (cfg) {

      return function (img, size) {
         return cfg.server + "/" + cfg.folder + "/" + img + "?&height=" + (size || 400) + "&quality=80";
      };
   });

   realm.module("morrr.editor.Engine", ["morrr.editor.bbcode.BBCodeEngine", "morrr.editor.bbcode.Generator", "morrr.editor.bbcode.BBCodeExtractor", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils.lodash", "morrr.editor.utils", "morrr.editor.Modal"], function (BBCodeEngine, Generator, BBCodeExtractor, BBCodeHandlers, _, utils, Modal) {
      var $_exports;

      var SaneEditor = function () {
         function SaneEditor() {
            _classCallCheck(this, SaneEditor);
         }

         _createClass(SaneEditor, [{
            key: "initialize",
            value: function initialize(target, opts) {
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
               this.setValue('');
               $(this.content).bind("paste", function (e) {
                  var el = $(e.currentTarget);
                  var text = e.originalEvent.clipboardData.getData('Text');
                  var cleanText = utils.trimText(text);
                  e.originalEvent.preventDefault();
                  self.execCommand("insertHTML", false, '<x></x><div>' + cleanText + '</div>');
               });
               this.hideEditor();
               this.toggleFullScreenMode();
               // this.toggleTranslateMode();
            }
         }, {
            key: "mountToolbar",
            value: function mountToolbar(riotTag, props) {
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
         }, {
            key: "mountFileToolbar",
            value: function mountFileToolbar(riotTag, props) {
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
         }, {
            key: "mountLanguageToolbar",
            value: function mountLanguageToolbar(riotTag, props) {
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
         }, {
            key: "update",
            value: function update(specific) {
               var self = this;
               clearTimeout(this.updateTimeout);
               this.updateTimeout = setTimeout(function () {
                  _.each(self.tags, function (tag) {
                     if (tag && tag.update) {
                        tag.update();
                     }
                  });
               }, 1);
            }
         }, {
            key: "onActivity",
            value: function onActivity(cb) {
               this.activity_cb = cb;
            }
         }, {
            key: "triggerActivity",
            value: function triggerActivity() {
               var self = this;
               if (this.activity_cb) {
                  clearTimeout(this.updateTyping);
                  this.updateTyping = setTimeout(function () {
                     self.activity_cb();
                  }, 50);
               }
            }
         }, {
            key: "getValue",
            value: function getValue() {
               this.$value = this.generate();
               return this.$value;
            }
         }, {
            key: "getHeadings",
            value: function getHeadings() {}
         }, {
            key: "generate",
            value: function generate() {
               return Generator(this);
            }
         }, {
            key: "toolbarIconClick",
            value: function toolbarIconClick(cmd) {
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
         }, {
            key: "hideEditor",
            value: function hideEditor() {
               $(this.editableWrapper).hide();
               $(this.formattingWrapper).hide();
            }
         }, {
            key: "showEditor",
            value: function showEditor() {
               $(this.editableWrapper).show();
               $(this.formattingWrapper).show();
            }
         }, {
            key: "showError",
            value: function showError(message) {
               this.element.find(".notification").remove();
               var notification = $('<div class="notification"><div class="text">' + message + '</div></div>');
               notification.insertBefore(this.content);
               notification.addClass('show');
               setTimeout(function () {
                  notification.removeClass('show');
               }, 1500);
            }
         }, {
            key: "createModal",
            value: function createModal(header) {
               var modal = Modal.create({
                  title: header,
                  target: this.modalWrapper
               });
               return modal;
            }
         }, {
            key: "onFullScreenLeftMenu",
            value: function onFullScreenLeftMenu(fn) {
               this._onFullScreenLeftMenu = fn;
            }
         }, {
            key: "smartRangeDetect",
            value: function smartRangeDetect(callback) {

               var self = this;
               return new Promise(function (resolve, reject) {
                  var range = self.getRange();

                  //9
                  if (range) {

                     var elements = [];
                     var interations = 0;

                     var targetValue = range.endContainer.innerHTML || range.endContainer.nodeValue;

                     var elementFound = false;
                     var isDestination = function isDestination(element) {
                        // check for boundaries
                        if (element) {
                           var parent = $(element).parents('.sane-editor-content')[0];
                           var wrappableArea = $(element).parents('.wrapper-editable-area')[0];
                           if (!parent) {
                              throw {
                                 message: "Your selection should be within editor area!"
                              };
                           }
                           if ($(element).parents('.wrapper')[0] || wrappableArea) {
                              throw {
                                 message: "You can't use text within formatted blocks"
                              };
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
                     var deepIteration = function deepIteration(element) {

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
                                 deepIteration(element.childNodes[0]);
                              }
                           }
                           interations++;
                           if (interations > 100) {
                              return elements;
                           }
                        }
                        return element;
                     };
                     var startContainer = range.startContainer;
                     if (range.startContainer.nodeType === 3) {
                        // if is text
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
                        _.each(elements, function (element) {

                           if (!element.childNodes || element.childNodes.length === 0) {
                              finalElements.push(element);
                              text.push($(element).text());
                           } else {
                              if (element.childNodes && element.childNodes.length === 1) {
                                 finalElements.push(element);
                                 text.push($(element).text());
                              }
                           }
                        });
                     } else {
                        _.each(elements, function (item) {
                           finalElements.push(item);
                           text.push($(item).text());
                        });
                     }
                     return callback.apply(self, [{
                        range: range,
                        text: text,
                        elements: finalElements,
                        inject: function inject(el) {

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
                                    parent = parent.parent();
                                 }
                                 iterations++;
                              }
                              if (found && target[0]) {
                                 $(el).insertBefore(target);
                              }
                           } else {
                              console.log('yes here....');
                              range.insertNode(el);
                           }
                        }
                     }]);
                  } else {
                     self.showError("You need to select something");
                  }
               });
            }
         }, {
            key: "inializeToolbar",
            value: function inializeToolbar() {
               var self = this;
               var currentHint;

               _.each(this.toolbarConfig, function (str) {
                  var handler = BBCodeHandlers[str];
                  if (handler) {
                     var icon = $('<div class="button"><span>' + handler.hint + '</span></div>');
                     icon.addClass(handler.icon);

                     $(self.toolbar).append(icon);
                     icon.mousedown(function (e) {
                        e.preventDefault();
                     });
                     icon.click(function (e) {
                        handler.cmd ? self.toolbarIconClick(handler.cmd) : '';

                        if (handler.cmdSmart) {
                           self.smartRangeDetect(handler.cmdSmart).then(function () {}).catch(function (data) {
                              self.showError(data.message);
                           });
                        }
                        self.triggerActivity();
                     });
                  }
               });

               // var refText = $('<div class="button reference"><span>Reference text</span></div>');
               // refText.appendTo($(self.toolbar));
               // refText.click(function() {
               //    self.toggleTranslateMode();
               // });

               // var fScreen = $('<div class="button maximize"><span>Fullscreen</span></div>');
               // fScreen.appendTo($(self.toolbar));
               // fScreen.click(function() {
               //    self.toggleFullScreenMode();
               // });

               // this.bindFullScreenButtons();
            }
         }, {
            key: "basicStringWrapper",
            value: function basicStringWrapper(element, opts) {
               if ($(element).parents('.wrapper')[0]) return;
               opts = opts || {};
               var cls = "wrapper";
               var serviceAttr = '';
               if (opts.service) {
                  cls += " sane-editor-service";
                  serviceAttr = ' data-service="' + opts.service + '" ';
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
               dom.find('.remove').click(function () {
                  if (_.isFunction(opts.onRemove)) {
                     opts.onRemove(dom);
                  }
               });
               return {
                  element: dom
               };
            }
         }, {
            key: "basicModuleWrapper",
            value: function basicModuleWrapper(element, opts) {
               if ($(element).parents('.wrapper')[0]) return;

               opts = opts || {};
               var cls = "wrapper";
               var serviceAttr = '';
               if (opts.service) {
                  cls += " sane-editor-service";
                  serviceAttr = ' data-service="' + opts.service + '" ';
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
               dom.find('.remove').click(function () {
                  if (_.isFunction(opts.onRemove)) {
                     opts.onRemove(dom);
                  }
               });
               if (opts.onReady) {
                  opts.onReady(dom[0]);
               }
               return {
                  element: dom
               };
            }
         }, {
            key: "setValue",
            value: function setValue(data) {
               this.content.empty();

               BBCodeEngine.toEditor("<x></x>" + data + "<x></x>", this);
            }
         }, {
            key: "getSelection",
            value: function getSelection(opts) {
               opts = opts || {};
               if (opts.focus !== false) {
                  this.content[0].focus();
               }
               return window.getSelection();
            }
         }, {
            key: "getRange",
            value: function getRange(opts) {
               var s = this.getSelection(opts);
               if (!s) {
                  return null;
               }

               if (s.getRangeAt) {
                  if (s.rangeCount > 0) {

                     var gotRange = s.getRangeAt(0);

                     return gotRange;
                  }
               }
               if (s.createRange) {
                  var createdRange = s.createRange();
                  return createdRange;
               }
               return null;
            }
         }, {
            key: "execCommand",
            value: function execCommand(a, b, c) {
               this.triggerActivity();
               this.content.focus();

               document.execCommand(a, b || false, c || null);
            }
         }, {
            key: "setCaretPosition",
            value: function setCaretPosition(elem, caretPos) {
               var el = elem;
               var range = document.createRange();
               var sel = window.getSelection();
               range.setStart(elem, 1);
               range.collapse(true);
               sel.removeAllRanges();
               sel.addRange(range);

               setTimeout(function () {
                  $(elem).remove();
               }, 0);
            }
         }, {
            key: "bindFullScreenButtons",
            value: function bindFullScreenButtons() {
               var self = this;
               this.floatingSave = $('<div class="floating button save"></div>');
               this.floatingPreview = $('<div class="floating button preview"></div>');
               this.floatingPreview.click(function () {
                  if (self.onFloatingPreview) {
                     self.onFloatingPreview();
                  }
               });

               self.exitFullScreenModeButton = $('<div class="floating button exit"></div>');
               self.exitFullScreenModeButton.click(function () {
                  self.toggleFullScreenMode();
               });
               this.floatingSave.click(function () {
                  if (self.onFloatingSave) {
                     self.onFloatingSave();
                     self.floatingSave.removeClass("primary").addClass("green");
                     self.floatingSave.find("i").removeClass('save').addClass('checkmark');
                     self.floatingSave.animate({
                        zoom: 1.2
                     }, {
                        duration: 100,
                        complete: function complete() {
                           self.floatingSave.animate({
                              zoom: 1
                           }, {
                              duration: 100,
                              complete: function complete() {
                                 setTimeout(function () {
                                    self.floatingSave.removeClass("green").addClass("primary");
                                    self.floatingSave.find("i").removeClass('checkmark').addClass('save');
                                 }, 500);
                              }
                           });
                        }
                     });
                  };
               });
               this.element.append(this.floatingSave);
               this.element.append(this.floatingPreview);
               this.element.append(self.exitFullScreenModeButton);
            }
         }, {
            key: "toggleFullScreenMode",
            value: function toggleFullScreenMode() {
               var self = this;
               if ($(this.element).hasClass("full-screen-mode")) {
                  $(this.element).removeClass("full-screen-mode");
               } else {
                  $('body').css('overflow', 'hidden');
                  $(this.element).addClass("full-screen-mode");
               }
            }
         }, {
            key: "resetTranslationMode",
            value: function resetTranslationMode() {
               if ($(this.element).hasClass("translate-mode")) {
                  $(this.element).removeClass("translate-mode");
               }
            }
         }, {
            key: "toggleTranslateMode",
            value: function toggleTranslateMode() {
               var self = this;
               if ($(this.element).hasClass("translate-mode")) {
                  $(this.element).removeClass("translate-mode");
                  return false;
               } else {
                  $('body').css('overflow', 'hidden');
                  $(this.element).addClass("translate-mode");
                  return true;
               }
            }
         }, {
            key: "fixCloningFeature",
            value: function fixCloningFeature() {
               var updateTimeout;
               var self = this;
               $(this.content).bind("keydown", function (e) {
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
                        currentPosition.prevAll().each(function () {
                           prevItems.push(this);
                        });
                        prevItems.reverse();
                        var toRemove = [];
                        _.each(prevItems, function (item) {
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
                           _.each(toRemove, function (item) {
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
         }]);

         return SaneEditor;
      }();

      $_exports = SaneEditor;

      return $_exports;
   });
   realm.module("morrr.editor.Gallery", ["morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath", "frzr"], function (_, sharedImagePath, frzr) {
      var $_exports;

      var Gallery = function Gallery(editor, parentId, done) {
         parentId = parentId || '';
         var modal = editor.createModal('Insert image');
         var images = $('<div class="images"></div>');
         var multiupLoadElement = $('<div class="multiupload"></div>');
         var buttonElements = $('<div class="actions"><div class="button cancel">Cancel</div><div class="ui button primary okay">Insert</div></div>');
         modal.append(multiupLoadElement);
         modal.append(images);

         var selected = [];
         var loader = $('<div class="image"><div class="active large inline loader image-loader"></div></div>');
         // fetching existing images ******
         var updateImageList = function updateImageList() {
            images.empty();
            $.get('/api/editor/images?parent=' + parentId, function (data) {
               var initialImage;
               _.each(data, function (item) {
                  var image = $('<div class="image"><img src="' + sharedImagePath(item.image, 120) + '"/></div>');
                  image.appendTo(images);
                  image.data("item", item);
                  initialImage = {
                     item: item,
                     image: image
                  };
                  image.click(function () {
                     var item = $(this).data("item");
                     if (_.indexOf(selected, item.image) > -1) {
                        var self = this;
                        _.remove(selected, function (i) {
                           return item.image === i;
                        });
                        image.removeClass('selected');
                     } else {
                        selected.push(item.image);
                        image.addClass('selected');
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
         };
         updateImageList();
         modal.onSuccess(function () {
            done(selected);
            modal.close();
         });

         // Bind multi upload thingy *********************
         multiupLoadElement.uploadFile({
            url: "/api/editor/upload?parentId=" + parentId,
            multiple: true,
            fileName: "myfile",
            showProgress: true,
            onSubmit: function onSubmit(files, xhr) {
               images.append(loader);
            },
            afterUploadAll: function afterUploadAll() {
               loader.remove();
               // get updated file list here ************
               $.get('/api/editor/images', {
                  parent: parentId
               }, function () {
                  updateImageList();
               });
            }
         });
      };

      $_exports = Gallery;

      return $_exports;
   });
   realm.module("morrr.editor.Modal", ["frzr"], function (frzr) {
      var $_exports;

      var modalIndex = 1000;
      var instances = 0;
      var el = frzr.el;
      var overlay = false;

      var Modal = function () {

         /**
          * constructor - description
          *
          * @param  {type} opts description
          * @return {type}      description
          */

         function Modal(opts) {
            _classCallCheck(this, Modal);

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
            $(this.closeButton).click(function () {
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
               style: "z-index:" + modalIndex++
            }, [this.header, this.content, this.footer]);

            $(target).prepend(this.modal);
            instances++;
         }

         _createClass(Modal, [{
            key: "close",
            value: function close() {
               instances--;
               $(this.modal).remove();
            }
         }, {
            key: "append",
            value: function append(element) {
               $(this.content).append(element);
            }

            // createOverlay() {
            //    if (overlay === false) {
            //       this.overlay = el('div', {
            //          class: "overlay"
            //       });
            //       $(document.body).prepend(this.overlay);
            //    }
            // }

         }, {
            key: "onSuccess",
            value: function onSuccess(cb) {
               var self = this;
               $(this.successButton).click(function () {
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

         }, {
            key: "disableSuccess",
            value: function disableSuccess() {
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

         }, {
            key: "enableSuccess",
            value: function enableSuccess() {
               $(this.successButton).removeClass('disabled');
               this.saveLock = false;
            }

            /**
             * static - description
             *
             * @param  {type} opts description
             * @return {type}      description
             */

         }], [{
            key: "create",
            value: function create(opts) {
               var modal = new Modal(opts);
               return modal;
            }
         }]);

         return Modal;
      }();

      $_exports = Modal;

      return $_exports;
   });
   realm.module("morrr.editor.utils", ["morrr.editor.utils.lodash"], function (_) {
      var $_exports;

      var Utils = function () {
         function Utils() {
            _classCallCheck(this, Utils);
         }

         _createClass(Utils, null, [{
            key: "stringInject",
            value: function stringInject(str, idx, rem, inputString) {
               return str.slice(0, idx) + inputString + str.slice(idx + Math.abs(rem));
            }
         }, {
            key: "trimText",
            value: function trimText(text, trimEnds) {
               text = text.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
               text = text.replace(/\s+/g, " ");
               if (trimEnds) {
                  text = text.trim();
               }
               return text;
            }
         }, {
            key: "replaceEmptyLines",
            value: function replaceEmptyLines(text) {
               var lines = text.split(/\n/);
               var newLines = [];
               _.each(lines, function (line, index) {

                  if (line.length > 0 && !line.match(/^\s+$/) && !(index === 0 && line === "[/br]")) {
                     newLines.push(line);
                  }
               });
               return newLines.join('\n');
            }
         }, {
            key: "cleanUpItems",
            value: function cleanUpItems(text) {
               var replaced = text.match(/(\[\w+\]\s*\[\/\w+\])/ig);
               _.each(replaced, function (item) {
                  text = text.split(item).join('');
               });
               if (replaced && replaced.length > 0) {
                  text = Utils.cleanUpItems(text);
               } else {

                  text = Utils.replaceEmptyLines(text);
               }
               return text;
            }
         }, {
            key: "flattenNodes",
            value: function flattenNodes(editor, rootNode) {
               var root = document.createElement('div');
               var currentLayer = root;
               var flattenNodes = function flattenNodes(elements, deep) {
                  for (var i = 0; i <= elements.length; i++) {
                     var node = elements[i];
                     if (node) {
                        if (node.nodeName === 'BR') {
                           // New line to the root right away
                           root.appendChild(document.createElement('div'));
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
                                 flattenNodes(node.childNodes, true);
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
               };
               flattenNodes(rootNode);
               return root;
            }
         }]);

         return Utils;
      }();

      $_exports = Utils;

      return $_exports;
   });
   realm.module("morrr.editor.runtime.config", ["morrr.editor.utils.Promise"], function (Promise) {
      var $_exports;

      var Config = new Promise(function (resolve, reject) {
         if (realm.isRegistered('morrr.editor.config')) {
            return realm.require('morrr.editor.config', function (cfg) {
               return cfg;
            }).then(resolve).catch(reject);
         }
         return resolve({
            token: "c0b7bdf9b9f645f9f7b106d41082f50d14726129",
            server: "http://img.dev.morrr.com",
            folder: "editortest",
            fullPath: function fullPath(publicPath) {
               return this.server + "/" + publicPath;
            }
         });
      });

      $_exports = Config;

      return $_exports;
   });
   realm.module("morrr.editor.elements.b", ["morrr.editor.utils"], function (utils) {
      var $_exports;

      var Strong = {
         tag: 'b',
         inline: true,
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('b').each(function (index, element) {
               $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
            });
         }
      };

      $_exports = Strong;

      return $_exports;
   });
   realm.module("morrr.editor.elements.blockquote", ["morrr.editor.utils"], function (utils) {
      var $_exports;
      var BlockQuote = {
         index: 1,
         tag: 'blockquote',
         menu: true,
         hint: 'Quote',
         icon: 'quote',
         bindEditorEvents: function bindEditorEvents(element) {
            this.basicStringWrapper(element, {
               service: 'blockquote',
               onRemove: function onRemove(dom) {
                  dom.replaceWith('<div>' + dom.find('blockquote').text() + '</div>');
               }
            });
         },
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('*[data-service="blockquote"]').each(function (index, element) {
               var text = $(element).find('.wrapper-editable-area').text();
               $(element).replaceWith('[blockquote]' + utils.trimText(text) + '[/blockquote]');
            });
         },
         cmdSmart: function cmdSmart(range) {
            var blockQuote = $('<blockquote>' + range.text.join(' ') + '</blockquote>');
            $(range.elements).remove();
            range.inject(blockQuote[0]);
            BlockQuote.bindEditorEvents.apply(this, [blockQuote[0]]);
         },
         toProduction: function toProduction() {
            return '<blockquote>';
         }
      };

      $_exports = BlockQuote;

      return $_exports;
   });
   realm.module("morrr.editor.elements.gallery", ["morrr.editor.Gallery", "morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath"], function (Gallery, _, sharedImagePath) {
      var $_exports;

      var GalleryTag = {
         tag: 'div',
         hint: 'Insert images',
         icon: 'picture',
         cmdSmart: function cmdSmart(range) {

            var self = this;
            Gallery(this, this.parentId, function (images) {

               var figures = ['<div class="blog-gallery">'];
               _.each(images, function (image) {
                  figures.push('<figure data-id="' + image + '"><img src="' + sharedImagePath(image) + '"></figure>');
               });
               figures.push('</div>');
               var gl = $(figures.join(''))[0];

               range.inject(gl);
               GalleryTag.bindEditorEvents.bind(self)(gl);
               self.triggerActivity();
            });
         },
         _bindFigure: function _bindFigure(element, figure) {
            var removeIcon = $('<i class="ui icon remove"></i>');

            var caption = $(figure).find('figcaption')[0];
            var cnt = $('<figcaption><input type="text" placeholder="Image description" class="figcontent"></input></figcaption>');

            if (!caption) {
               caption = cnt;
               $(figure).append(caption);
            } else {
               var figText = $(caption).text();
               cnt.find('.figcontent').val(figText);
               $(caption).replaceWith(cnt);
            }

            removeIcon.appendTo(figure);
            removeIcon.click(function () {
               // check amount of images
               if ($(element).find('figure').length <= 1) {
                  $(element).fadeOut(function () {
                     $(this).remove();
                  });
               } else {
                  // Remove one image in particular
                  $(this).parent('figure').fadeOut(function () {
                     $(this).remove();
                  });
               }
            });
         },
         bindEditorEvents: function bindEditorEvents(element) {
            var editor = this;
            var parentId = editor.parentId;
            // Create image gallery based on current parent id

            this.basicModuleWrapper(element, {
               service: 'gallery',
               onReady: function onReady(element) {

                  // creating placeholder for new picture
                  var addPlaceHolder = $('<div class="floating button placeholder"></div>');
                  addPlaceHolder.appendTo($(element).find(".blog-gallery"));

                  // Adding new picture from the gallery
                  addPlaceHolder.click(function () {
                     Gallery(editor, parentId, function (images) {
                        _.each(images, function (image) {
                           var figure = $('<figure data-id="' + image + '"><img src="' + sharedImagePath(image) + '"/></figure>');
                           figure.insertBefore(addPlaceHolder);
                           GalleryTag._bindFigure(element, figure);
                        });
                     });
                  });

                  // removing entire module
                  $(element).find('.user-controls .remove').click(function () {
                     $(element).remove();
                  });

                  // bind image events
                  $(element).find('figure').each(function (index, figure) {
                     GalleryTag._bindFigure(element, figure);
                  });
               }
            });
         },
         toBBCode: function toBBCode(root) {
            root.find('*[data-service="gallery"]').each(function (index, element) {
               var gallery = ['[gallery]'];
               $(element).find('figure').each(function (index, element) {

                  var attrs = ['id="' + $(element).data("id") + '"'];
                  var caption = $(element).find('figcaption .figcontent');
                  if (caption[0] && caption.val()) {
                     attrs.push('caption="' + caption.val() + '"');
                  }
                  gallery.push('[img ' + attrs.join(' ') + '"][/img]');
               });
               gallery.push('[/gallery]');
               $(element).replaceWith(gallery.join(''));
            });
         },

         toProduction: function toProduction(data) {
            return '<div class="blog-gallery">';
         }
      };

      $_exports = GalleryTag;

      return $_exports;
   });
   realm.module("morrr.editor.elements.h1", ["morrr.editor.utils"], function (utils) {
      var $_exports;
      var Heading3 = {
         tag: 'h1',
         icon: 'header1',
         hint: 'Heading 1',
         bindEditorEvents: function bindEditorEvents(element) {
            this.basicStringWrapper(element, {
               service: 'h1',
               onRemove: function onRemove(dom) {
                  dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
               }
            });
         },
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('*[data-service="h1"]').each(function (index, element) {
               var text = $(element).find('.wrapper-editable-area').text();
               $(element).replaceWith('[h1]' + utils.trimText(text) + '[/h1]');
            });
         },
         cmdSmart: function cmdSmart(range) {
            var heading = $('<h1>' + range.text.join(' ') + '</h1>');
            $(range.elements).remove();
            range.inject(heading[0]);
            Heading3.bindEditorEvents.apply(this, [heading[0]]);
         },
         toProduction: function toProduction() {
            return '<h1>';
         }
      };

      $_exports = Heading3;

      return $_exports;
   });
   realm.module("morrr.editor.elements.h3", ["morrr.editor.utils"], function (utils) {
      var $_exports;
      var Heading3 = {
         tag: 'h3',
         icon: 'header3',
         hint: 'Heading 3',
         bindEditorEvents: function bindEditorEvents(element) {
            this.basicStringWrapper(element, {
               service: 'h3',
               onRemove: function onRemove(dom) {
                  dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
               }
            });
         },
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('*[data-service="h3"]').each(function (index, element) {
               var text = $(element).find('.wrapper-editable-area').text();
               $(element).replaceWith('[h3]' + utils.trimText(text) + '[/h3]');
            });
         },
         cmdSmart: function cmdSmart(range) {
            var heading = $('<h3>' + range.text.join(' ') + '</h3>');
            $(range.elements).remove();
            range.inject(heading[0]);
            Heading3.bindEditorEvents.apply(this, [heading[0]]);
         },
         toProduction: function toProduction() {
            return '<h3>';
         }
      };

      $_exports = Heading3;

      return $_exports;
   });
   realm.module("morrr.editor.elements.i", [], function () {
      var $_exports;

      var Italic = {
         tag: 'i',
         menu: false,
         inline: true,
         icon: 'italic',
         hint: 'Italic',
         toBBCode: function toBBCode(root) {
            root.find('i').each(function (index, element) {
               $(element).replaceWith('[i]' + $(element).text() + '[/i]');
            });
         },
         cmd: function cmd() {
            this.execCommand('italic');
         }
      };

      $_exports = Italic;

      return $_exports;
   });
   realm.module("morrr.editor.elements.img", ["morrr.editor.utils.lodash", "morrr.editor.utils.sharedImagePath"], function (_, sharedImagePath) {
      var $_exports;

      var ImgTag = {
         tag: 'figure',
         menu: false,
         toProduction: function toProduction(data, opts) {
            opts = opts || {};
            var alt = opts.imageTitle;
            var query = opts.query;
            var imgString = [];
            _.each(query, function (value, key) {
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
      };

      $_exports = ImgTag;

      return $_exports;
   });
   realm.module("morrr.editor.elements.innerad", [], function () {
      var $_exports;

      var InnerAd = {
         tag: 'div',
         menu: false,
         toBBCode: function toBBCode(root) {},
         toProduction: function toProduction(item, opts) {
            var attrs = item.attrs;
            var html = ['<span class="recommended">' + attrs.caption + '</span><div class="blog-item"><a href="' + attrs.link + '"><figure class="profile-image">'];
            html.push('<img src="' + attrs.img + '?width=525&height=450&mode=crop&quality=60"></img>');
            html.push('<figcaption>');
            html.push(' <span class="category" style="background-color: ' + attrs.catcolor + ';">' + attrs.catname + '</span>');
            html.push('<h2 class="title">' + attrs.title + '</h2>');
            html.push('</figcaption></figure></a></div>');
            return '<div class="blog-list article-inline-promo hide-desktop">' + html.join('');
         }
      };

      $_exports = InnerAd;

      return $_exports;
   });
   realm.module("morrr.editor.elements.intro", ["morrr.editor.utils"], function (utils) {
      var $_exports;
      var Intro = {
         tag: 'div',
         menu: true,
         stringWrapper: true,
         icon: 'intro',
         hint: 'Intro paragraph',
         bindEditorEvents: function bindEditorEvents(element) {
            this.basicStringWrapper(element, {
               service: 'intro',
               onRemove: function onRemove(dom) {
                  dom.replaceWith('<div>' + dom.find('.wrapper-editable-area').text() + '</div>');
               }
            });
         },
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('*[data-service="intro"]').each(function (index, element) {
               var text = $(element).find('.wrapper-editable-area').text();
               $(element).replaceWith('[intro]' + utils.trimText(text) + '[/intro]');
            });
         },
         cmdSmart: function cmdSmart(range) {
            var heading = $('<div class="blog-intro">' + range.text.join(' ') + '</div>');
            $(range.elements).remove();
            range.inject(heading[0]);
            Intro.bindEditorEvents.apply(this, [heading[0]]);
         },
         toProduction: function toProduction() {
            return '<div class="blog-intro">';
         },
         processAfterRender: function processAfterRender(html, item, opts) {

            return html;
         }
      };

      $_exports = Intro;

      return $_exports;
   });
   realm.module("morrr.editor.elements.li", [], function () {
      var $_exports;

      var orderedList = {
         tag: 'li',
         inline: true,
         toBBCode: function toBBCode(root) {
            while (root.find('li').length > 0) {
               root.find('li').each(function (index, element) {
                  $(element).replaceWith('[li]' + $(element).html() + '[/li]');
               });
            }
         }
      };

      $_exports = orderedList;

      return $_exports;
   });
   realm.module("morrr.editor.elements.list", [], function () {
      var $_exports;

      var List = {
         tag: 'li',
         menu: false,
         inline: true,
         toBBCode: function toBBCode(root) {
            root.find('li').each(function (index, element) {
               $(element).replaceWith('[li]' + $(element).html() + '[/li]');
            });
         }
      };

      $_exports = List;

      return $_exports;
   });
   realm.module("morrr.editor.elements.ol", [], function () {
      var $_exports;

      var orderedList = {
         tag: 'ol',
         menu: true,
         inline: true,
         icon: 'ordered-list',
         hint: 'Numbered list',
         toBBCode: function toBBCode(root) {
            root.find('ol').each(function (index, element) {
               $(element).replaceWith('[ol]' + $(element).html() + '[/ol]');
            });
         },
         cmd: function cmd() {
            this.execCommand('insertorderedlist');
         },
         toProduction: function toProduction(item) {
            return '<ol>';
         }
      };

      $_exports = orderedList;

      return $_exports;
   });
   realm.module("morrr.editor.elements.panorama", [], function () {
      var $_exports;

      var Panorama = {
         tag: 'div',
         menu: false,
         toBBCode: function toBBCode(root) {},
         toProduction: function toProduction(item, opts) {
            return '<div class="article-inline-ad hide-desktop">';
         }
      };

      $_exports = Panorama;

      return $_exports;
   });
   realm.module("morrr.editor.elements.strong", ["morrr.editor.utils"], function (utils) {
      var $_exports;

      var Strong = {
         tag: 'strong',
         menu: false,
         inline: true,
         icon: 'bold',
         hint: 'Bold',
         toBBCode: function toBBCode(root) {
            var self = this;
            root.find('strong,b').each(function (index, element) {
               $(element).replaceWith('[strong]' + utils.trimText($(element).text()) + '[/strong]');
            });
         },
         cmd: function cmd() {

            this.execCommand('bold');
         }
      };

      $_exports = Strong;

      return $_exports;
   });
   realm.module("morrr.editor.elements.ul", [], function () {
      var $_exports;

      var UL = {
         tag: 'ul',
         menu: true,
         inline: true,
         icon: 'unordered-list',
         hint: 'Bulleted list',
         toBBCode: function toBBCode(root) {

            while (root.find('ul').length > 0) {
               root.find('ul').each(function (index, element) {
                  $(element).replaceWith('[ul]' + $(element).html() + '[/ul]');
               });
            }
         },
         cmd: function cmd() {
            this.execCommand('insertunorderedlist');
         },
         toProduction: function toProduction(item) {
            return '<ul>';
         }
      };

      $_exports = UL;

      return $_exports;
   });
   realm.module("morrr.editor.elements.unlink", [], function () {
      var $_exports;

      var Unlink = {
         menu: true,
         inline: true,
         icon: 'unlink',
         hint: 'Remove link',
         cmd: function cmd() {
            this.execCommand("unlink", false, []);
         }
      };

      $_exports = Unlink;

      return $_exports;
   });
   realm.module("morrr.editor.elements.url", [], function () {
      var $_exports;

      var Link = {
         tag: 'a',
         menu: true,
         inline: true,
         icon: 'link',
         hint: 'Insert link',
         toBBCode: function toBBCode(root) {
            root.find('a').each(function (index, element) {
               $(element).replaceWith('[url=' + $(element).attr("href") + ']' + $(element).text() + '[/url]');
            });
         },
         cmd: function cmd() {
            var link = prompt('Please specify the link.');
            if (link) {

               this.execCommand('createLink', false, link);
            }
         },
         toProduction: function toProduction(item) {
            var link = item.attrs.self;
            link = link.replace(/\sp=.*/, '');
            if (link.indexOf("http") === -1) {
               link = "http://" + link;
            }
            return '<a target="_blank" href="' + link + '">';
         }
      };

      $_exports = Link;

      return $_exports;
   });
   realm.module("morrr.editor.bbcode.AttributeParser", [], function () {
      var $_exports;

      var AttributeParser = function AttributeParser(input) {
         if (!input) {
            return {};
         }
         if (input[0] === "=") {

            return {
               self: input.slice(1, input.length)
            };
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
      };

      $_exports = AttributeParser;

      return $_exports;
   });
   realm.module("morrr.editor.bbcode.BBCodeEngine", ["morrr.editor.bbcode.BBCodeExtractor", "morrr.editor.utils.lodash", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils"], function (BBCodeExtractor, _, BBCodeHandlers, utils) {
      var $_exports;

      var BBCodeEngine = {
         replaceEndTags: function replaceEndTags(input) {
            _.each(BBCodeHandlers, function (item, bbcodeName) {
               if (item.tag) {
                  input = input.split("[/" + bbcodeName + "]").join('</' + item.tag + '>');
               }
            });
            return input;
         },
         _injectSystemId: function _injectSystemId(tag, id) {
            tag = utils.stringInject(tag, tag.length - 1, 0, ' id="' + id + '"');
            return tag;
         },
         _prepareInput: function _prepareInput(input) {
            input = input.replace(/\[row\]/g, '<div>');
            input = input.replace(/\[\/row\]/g, '</div>');
            input = input.replace(/\[\/br\]/g, '<div><br></div>');
            input = this.replaceEndTags(input);
            return input;
         },
         toProduction: function toProduction(input, opts) {
            opts = opts || {};

            input = this._prepareInput(input);
            var data = BBCodeExtractor(input);
            var self = this;
            input = data.input;
            var codes = data.codes;
            var binders = {};

            _.each(codes, function (item) {
               var handler, html;
               if (handler = BBCodeHandlers[item.name]) {
                  if (_.isFunction(handler.toProduction)) {

                     html = handler.toProduction(item, opts);
                  } else {
                     html = '<' + handler.tag + '>';
                  };
                  input = input.replace(item.str, html);
               }
            });

            _.each(codes, function (item) {
               var handler, html;
               if (handler = BBCodeHandlers[item.name]) {
                  if (_.isFunction(handler.processAfterRender)) {
                     html = handler.processAfterRender(input, item, opts);
                  }
               }
            });
            return input;
         },
         toEditor: function toEditor(input, editor) {
            input = this._prepareInput(input);
            var data = BBCodeExtractor(input);
            var self = this;
            input = data.input;
            var codes = data.codes;
            var binders = {};

            _.each(codes, function (item) {
               var handler, html;

               if (handler = BBCodeHandlers[item.name]) {
                  if (_.isFunction(handler.toProduction)) {
                     html = handler.toProduction(item);
                  } else {
                     html = '<' + handler.tag + '>';
                  };

                  if (_.isFunction(handler.bindEditorEvents)) {
                     var systemId = "sane-element-" + item.attrs.p;
                     html = self._injectSystemId(html, systemId);
                     binders[item.name] = binders[item.name] || [];
                     binders[item.name].push(systemId);
                  }
                  input = input.replace(item.str, html);
               }
            });
            var dom = $(input);

            editor.content.append(dom);
            _.each(binders, function (ids, handlerName) {
               _.each(ids, function (id) {
                  var el = editor.content.find("#" + id)[0];
                  BBCodeHandlers[handlerName].bindEditorEvents.apply(editor, [el]);
               });
            });
         }
      };

      $_exports = BBCodeEngine;

      return $_exports;
   });
   realm.module("morrr.editor.bbcode.BBCodeExtractor", ["morrr.editor.bbcode.AttributeParser", "morrr.editor.utils"], function (AttributeParser, utils) {
      var $_exports;

      var BBCodeExtractor = function BBCodeExtractor(input) {
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
                  var attr = ' p="' + index++ + '"';
                  input = utils.stringInject(input, i, 0, attr);
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
         _.each(data, function (item) {
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
      };

      $_exports = BBCodeExtractor;

      return $_exports;
   });
   realm.module("morrr.editor.bbcode.BBCodeHandlers", ["morrr.editor.utils.Promise", "morrr.editor.utils.lodash"], function (Promise, _) {
      var $_exports;

      var BBCodeHandlers = realm.requirePackage('morrr.editor.elements').then(function (packages) {
         var packs = {};
         _.each(packages, function (pack, name) {
            packs[name.substring(22, name.length)] = pack;
         });
         return packs;
      });

      $_exports = BBCodeHandlers;

      return $_exports;
   });
   realm.module("morrr.editor.bbcode.Generator", ["morrr.editor.utils", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils.lodash"], function (utils, BBCodeHandlers, _) {
      var $_exports;

      var Generator = function Generator(editor) {
         var el = editor.content.clone();

         // Process inline styles first
         _.each(BBCodeHandlers, function (handler) {
            if (handler.toBBCode && handler.inline) {
               handler.toBBCode.bind(editor)(el);
            }
         });
         //var root = el[0];
         var root = utils.flattenNodes(editor, el[0].childNodes);
         // // Process the rest wrappers
         _.each(BBCodeHandlers, function (handler) {
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
                        if (lineInsertedAt) {
                           // Removing prev inserted break (we dont' need it)
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
      };

      $_exports = Generator;

      return $_exports;
   });
})(function (self) {
   var isNode = typeof exports !== 'undefined';return { isNode: isNode, realm: isNode ? require('realm-js') : window.realm };
}());