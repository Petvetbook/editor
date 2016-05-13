if (typeof exports === 'undefined') {

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

}

if (typeof exports === 'undefined') {
   /*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
    * http://jqueryui.com
    * Includes: widget.js
    * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

   (function(factory) {
      if (typeof define === "function" && define.amd) {

         // AMD. Register as an anonymous module.
         define(["jquery"], factory);

      } else if (typeof exports === "object") {

         // Node/CommonJS
         factory(require("jquery"));

      } else {

         // Browser globals
         factory(jQuery);
      }
   }(function($) {
      /*!
       * jQuery UI Widget 1.11.4
       * http://jqueryui.com
       *
       * Copyright jQuery Foundation and other contributors
       * Released under the MIT license.
       * http://jquery.org/license
       *
       * http://api.jqueryui.com/jQuery.widget/
       */

      var widget_uuid = 0,
         widget_slice = Array.prototype.slice;

      $.cleanData = (function(orig) {
         return function(elems) {
            var events, elem, i;
            for (i = 0;
               (elem = elems[i]) != null; i++) {
               try {

                  // Only trigger remove when necessary to save time
                  events = $._data(elem, "events");
                  if (events && events.remove) {
                     $(elem).triggerHandler("remove");
                  }

                  // http://bugs.jquery.com/ticket/8235
               } catch (e) {}
            }
            orig(elems);
         };
      })($.cleanData);

      $.widget = function(name, base, prototype) {
         var fullName, existingConstructor, constructor, basePrototype,
            // proxiedPrototype allows the provided prototype to remain unmodified
            // so that it can be used as a mixin for multiple widgets (#8876)
            proxiedPrototype = {},
            namespace = name.split(".")[0];

         name = name.split(".")[1];
         fullName = namespace + "-" + name;

         if (!prototype) {
            prototype = base;
            base = $.Widget;
         }

         // create selector for plugin
         $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
         };

         $[namespace] = $[namespace] || {};
         existingConstructor = $[namespace][name];
         constructor = $[namespace][name] = function(options, element) {
            // allow instantiation without "new" keyword
            if (!this._createWidget) {
               return new constructor(options, element);
            }

            // allow instantiation without initializing for simple inheritance
            // must use "new" keyword (the code above always passes args)
            if (arguments.length) {
               this._createWidget(options, element);
            }
         };
         // extend with the existing constructor to carry over any static properties
         $.extend(constructor, existingConstructor, {
            version: prototype.version,
            // copy the object used to create the prototype in case we need to
            // redefine the widget later
            _proto: $.extend({}, prototype),
            // track widgets that inherit from this widget in case this widget is
            // redefined after a widget inherits from it
            _childConstructors: []
         });

         basePrototype = new base();
         // we need to make the options hash a property directly on the new instance
         // otherwise we'll modify the options hash on the prototype that we're
         // inheriting from
         basePrototype.options = $.widget.extend({}, basePrototype.options);
         $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) {
               proxiedPrototype[prop] = value;
               return;
            }
            proxiedPrototype[prop] = (function() {
               var _super = function() {
                     return base.prototype[prop].apply(this, arguments);
                  },
                  _superApply = function(args) {
                     return base.prototype[prop].apply(this, args);
                  };
               return function() {
                  var __super = this._super,
                     __superApply = this._superApply,
                     returnValue;

                  this._super = _super;
                  this._superApply = _superApply;

                  returnValue = value.apply(this, arguments);

                  this._super = __super;
                  this._superApply = __superApply;

                  return returnValue;
               };
            })();
         });
         constructor.prototype = $.widget.extend(basePrototype, {
            // TODO: remove support for widgetEventPrefix
            // always use the name + a colon as the prefix, e.g., draggable:start
            // don't prefix for widgets that aren't DOM-based
            widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
         }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
         });

         // If this widget is being redefined then we need to find all widgets that
         // are inheriting from it and redefine all of them so that they inherit from
         // the new version of this widget. We're essentially trying to replace one
         // level in the prototype chain.
         if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
               var childPrototype = child.prototype;

               // redefine the child widget using the same prototype that was
               // originally used, but inherit from the new version of the base
               $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            // remove the list of existing child constructors from the old constructor
            // so the old child constructors can be garbage collected
            delete existingConstructor._childConstructors;
         } else {
            base._childConstructors.push(constructor);
         }

         $.widget.bridge(name, constructor);

         return constructor;
      };

      $.widget.extend = function(target) {
         var input = widget_slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key,
            value;
         for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
               value = input[inputIndex][key];
               if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                  // Clone objects
                  if ($.isPlainObject(value)) {
                     target[key] = $.isPlainObject(target[key]) ?
                        $.widget.extend({}, target[key], value) :
                        // Don't extend strings, arrays, etc. with objects
                        $.widget.extend({}, value);
                     // Copy everything else by reference
                  } else {
                     target[key] = value;
                  }
               }
            }
         }
         return target;
      };

      $.widget.bridge = function(name, object) {
         var fullName = object.prototype.widgetFullName || name;
         $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
               args = widget_slice.call(arguments, 1),
               returnValue = this;

            if (isMethodCall) {
               this.each(function() {
                  var methodValue,
                     instance = $.data(this, fullName);
                  if (options === "instance") {
                     returnValue = instance;
                     return false;
                  }
                  if (!instance) {
                     return $.error("cannot call methods on " + name + " prior to initialization; " +
                        "attempted to call method '" + options + "'");
                  }
                  if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                     return $.error("no such method '" + options + "' for " + name + " widget instance");
                  }
                  methodValue = instance[options].apply(instance, args);
                  if (methodValue !== instance && methodValue !== undefined) {
                     returnValue = methodValue && methodValue.jquery ?
                        returnValue.pushStack(methodValue.get()) :
                        methodValue;
                     return false;
                  }
               });
            } else {

               // Allow multiple hashes to be passed on init
               if (args.length) {
                  options = $.widget.extend.apply(null, [options].concat(args));
               }

               this.each(function() {
                  var instance = $.data(this, fullName);
                  if (instance) {
                     instance.option(options || {});
                     if (instance._init) {
                        instance._init();
                     }
                  } else {
                     $.data(this, fullName, new object(options, this));
                  }
               });
            }

            return returnValue;
         };
      };

      $.Widget = function( /* options, element */ ) {};
      $.Widget._childConstructors = [];

      $.Widget.prototype = {
         widgetName: "widget",
         widgetEventPrefix: "",
         defaultElement: "<div>",
         options: {
            disabled: false,

            // callbacks
            create: null
         },
         _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = widget_uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;

            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();

            if (element !== this) {
               $.data(element, this.widgetFullName, this);
               this._on(true, this.element, {
                  remove: function(event) {
                     if (event.target === element) {
                        this.destroy();
                     }
                  }
               });
               this.document = $(element.style ?
                  // element within the document
                  element.ownerDocument :
                  // element is window or document
                  element.document || element);
               this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }

            this.options = $.widget.extend({},
               this.options,
               this._getCreateOptions(),
               options);

            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
         },
         _getCreateOptions: $.noop,
         _getCreateEventData: $.noop,
         _create: $.noop,
         _init: $.noop,

         destroy: function() {
            this._destroy();
            // we can probably remove the unbind calls in 2.0
            // all event bindings should go through this._on()
            this.element
               .unbind(this.eventNamespace)
               .removeData(this.widgetFullName)
               // support: jquery <1.6.3
               // http://bugs.jquery.com/ticket/9413
               .removeData($.camelCase(this.widgetFullName));
            this.widget()
               .unbind(this.eventNamespace)
               .removeAttr("aria-disabled")
               .removeClass(
                  this.widgetFullName + "-disabled " +
                  "ui-state-disabled");

            // clean up events and states
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
         },
         _destroy: $.noop,

         widget: function() {
            return this.element;
         },

         option: function(key, value) {
            var options = key,
               parts,
               curOption,
               i;

            if (arguments.length === 0) {
               // don't return a reference to the internal hash
               return $.widget.extend({}, this.options);
            }

            if (typeof key === "string") {
               // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
               options = {};
               parts = key.split(".");
               key = parts.shift();
               if (parts.length) {
                  curOption = options[key] = $.widget.extend({}, this.options[key]);
                  for (i = 0; i < parts.length - 1; i++) {
                     curOption[parts[i]] = curOption[parts[i]] || {};
                     curOption = curOption[parts[i]];
                  }
                  key = parts.pop();
                  if (arguments.length === 1) {
                     return curOption[key] === undefined ? null : curOption[key];
                  }
                  curOption[key] = value;
               } else {
                  if (arguments.length === 1) {
                     return this.options[key] === undefined ? null : this.options[key];
                  }
                  options[key] = value;
               }
            }

            this._setOptions(options);

            return this;
         },
         _setOptions: function(options) {
            var key;

            for (key in options) {
               this._setOption(key, options[key]);
            }

            return this;
         },
         _setOption: function(key, value) {
            this.options[key] = value;

            if (key === "disabled") {
               this.widget()
                  .toggleClass(this.widgetFullName + "-disabled", !!value);

               // If the widget is becoming disabled, then nothing is interactive
               if (value) {
                  this.hoverable.removeClass("ui-state-hover");
                  this.focusable.removeClass("ui-state-focus");
               }
            }

            return this;
         },

         enable: function() {
            return this._setOptions({
               disabled: false
            });
         },
         disable: function() {
            return this._setOptions({
               disabled: true
            });
         },

         _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement,
               instance = this;

            // no suppressDisabledCheck flag, shuffle arguments
            if (typeof suppressDisabledCheck !== "boolean") {
               handlers = element;
               element = suppressDisabledCheck;
               suppressDisabledCheck = false;
            }

            // no element argument, shuffle and use this.element
            if (!handlers) {
               handlers = element;
               element = this.element;
               delegateElement = this.widget();
            } else {
               element = delegateElement = $(element);
               this.bindings = this.bindings.add(element);
            }

            $.each(handlers, function(event, handler) {
               function handlerProxy() {
                  // allow widgets to customize the disabled handling
                  // - disabled as an array instead of boolean
                  // - disabled class as method for disabling individual parts
                  if (!suppressDisabledCheck &&
                     (instance.options.disabled === true ||
                        $(this).hasClass("ui-state-disabled"))) {
                     return;
                  }
                  return (typeof handler === "string" ? instance[handler] : handler)
                     .apply(instance, arguments);
               }

               // copy the guid so direct unbinding works
               if (typeof handler !== "string") {
                  handlerProxy.guid = handler.guid =
                     handler.guid || handlerProxy.guid || $.guid++;
               }

               var match = event.match(/^([\w:-]*)\s*(.*)$/),
                  eventName = match[1] + instance.eventNamespace,
                  selector = match[2];
               if (selector) {
                  delegateElement.delegate(selector, eventName, handlerProxy);
               } else {
                  element.bind(eventName, handlerProxy);
               }
            });
         },

         _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") +
               this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);

            // Clear the stack to avoid memory leaks (#10056)
            this.bindings = $(this.bindings.not(element).get());
            this.focusable = $(this.focusable.not(element).get());
            this.hoverable = $(this.hoverable.not(element).get());
         },

         _delay: function(handler, delay) {
            function handlerProxy() {
               return (typeof handler === "string" ? instance[handler] : handler)
                  .apply(instance, arguments);
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
         },

         _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
               mouseenter: function(event) {
                  $(event.currentTarget).addClass("ui-state-hover");
               },
               mouseleave: function(event) {
                  $(event.currentTarget).removeClass("ui-state-hover");
               }
            });
         },

         _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
               focusin: function(event) {
                  $(event.currentTarget).addClass("ui-state-focus");
               },
               focusout: function(event) {
                  $(event.currentTarget).removeClass("ui-state-focus");
               }
            });
         },

         _trigger: function(type, event, data) {
            var prop, orig,
               callback = this.options[type];

            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ?
               type :
               this.widgetEventPrefix + type).toLowerCase();
            // the original event may come from any element
            // so we need to reset the target on the new event
            event.target = this.element[0];

            // copy original event properties over to the new event
            orig = event.originalEvent;
            if (orig) {
               for (prop in orig) {
                  if (!(prop in event)) {
                     event[prop] = orig[prop];
                  }
               }
            }

            this.element.trigger(event, data);
            return !($.isFunction(callback) &&
               callback.apply(this.element[0], [event].concat(data)) === false ||
               event.isDefaultPrevented());
         }
      };

      $.each({
         show: "fadeIn",
         hide: "fadeOut"
      }, function(method, defaultEffect) {
         $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
               options = {
                  effect: options
               };
            }
            var hasOptions,
               effectName = !options ?
               method :
               options === true || typeof options === "number" ?
               defaultEffect :
               options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
               options = {
                  duration: options
               };
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
               element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
               element[method](options);
            } else if (effectName !== method && element[effectName]) {
               element[effectName](options.duration, options.easing, callback);
            } else {
               element.queue(function(next) {
                  $(this)[method]();
                  if (callback) {
                     callback.call(element[0]);
                  }
                  next();
               });
            }
         };
      });

      var widget = $.widget;

   }));
   /*
    * jQuery File Upload Plugin
    * https://github.com/blueimp/jQuery-File-Upload
    *
    * Copyright 2010, Sebastian Tschan
    * https://blueimp.net
    *
    * Licensed under the MIT license:
    * http://www.opensource.org/licenses/MIT
    */

   /* jshint nomen:false */
   /* global define, require, window, document, location, Blob, FormData */

   (function(factory) {
      'use strict';
      if (typeof define === 'function' && define.amd) {
         // Register as an anonymous AMD module:
         define([
            'jquery',
            'jquery.ui.widget'
         ], factory);
      } else if (typeof exports === 'object') {
         // Node/CommonJS:
         factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
         );
      } else {
         // Browser globals:
         factory(window.jQuery);
      }
   }(function($) {
      'use strict';

      // Detect file input support, based on
      // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
      $.support.fileInput = !(new RegExp(
            // Handle devices which give false positives for the feature detection:
            '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
         ).test(window.navigator.userAgent) ||
         // Feature detection for all other devices:
         $('<input type="file">').prop('disabled'));

      // The FileReader API is not actually used, but works as feature detection,
      // as some Safari versions (5?) support XHR file uploads via the FormData API,
      // but not non-multipart XHR file uploads.
      // window.XMLHttpRequestUpload is not available on IE10, so we check for
      // window.ProgressEvent instead to detect XHR2 file upload capability:
      $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
      $.support.xhrFormDataFileUpload = !!window.FormData;

      // Detect support for Blob slicing (required for chunked uploads):
      $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
         Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

      // Helper function to create drag handlers for dragover/dragenter/dragleave:
      function getDragHandler(type) {
         var isDragOver = type === 'dragover';
         return function(e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
               this._trigger(
                  type,
                  $.Event(type, {
                     delegatedEvent: e
                  })
               ) !== false) {
               e.preventDefault();
               if (isDragOver) {
                  dataTransfer.dropEffect = 'copy';
               }
            }
         };
      }

      // The fileupload widget listens for change events on file input fields defined
      // via fileInput setting and paste or drop events of the given dropZone.
      // In addition to the default jQuery Widget methods, the fileupload widget
      // exposes the "add" and "send" methods, to add or directly send files using
      // the fileupload API.
      // By default, files added via file input selection, paste, drag & drop or
      // "add" method are uploaded immediately, but it is possible to override
      // the "add" callback option to queue file uploads.
      $.widget('blueimp.fileupload', {

         options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
               uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function(message, context) {
               message = this.messages[message] || message.toString();
               if (context) {
                  $.each(context, function(key, value) {
                     message = message.replace('{' + key + '}', value);
                  });
               }
               return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function(form) {
               return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function(e, data) {
               if (e.isDefaultPrevented()) {
                  return false;
               }
               if (data.autoUpload || (data.autoUpload !== false &&
                     $(this).fileupload('option', 'autoUpload'))) {
                  data.process().done(function() {
                     data.submit();
                  });
               }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
         },

         // A list of options that require reinitializing event listeners and/or
         // special initialization code:
         _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
         ],

         _blobSlice: $.support.blobSlice && function() {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
         },

         _BitrateTimer: function() {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function(now, loaded, interval) {
               var timeDiff = now - this.timestamp;
               if (!this.bitrate || !interval || timeDiff > interval) {
                  this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                  this.loaded = loaded;
                  this.timestamp = now;
               }
               return this.bitrate;
            };
         },

         _isXHRUpload: function(options) {
            return !options.forceIframeTransport &&
               ((!options.multipart && $.support.xhrFileUpload) ||
                  $.support.xhrFormDataFileUpload);
         },

         _getFormData: function(options) {
            var formData;
            if ($.type(options.formData) === 'function') {
               return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
               return options.formData;
            }
            if ($.type(options.formData) === 'object') {
               formData = [];
               $.each(options.formData, function(name, value) {
                  formData.push({
                     name: name,
                     value: value
                  });
               });
               return formData;
            }
            return [];
         },

         _getTotal: function(files) {
            var total = 0;
            $.each(files, function(index, file) {
               total += file.size || 1;
            });
            return total;
         },

         _initProgressObject: function(obj) {
            var progress = {
               loaded: 0,
               total: 0,
               bitrate: 0
            };
            if (obj._progress) {
               $.extend(obj._progress, progress);
            } else {
               obj._progress = progress;
            }
         },

         _initResponseObject: function(obj) {
            var prop;
            if (obj._response) {
               for (prop in obj._response) {
                  if (obj._response.hasOwnProperty(prop)) {
                     delete obj._response[prop];
                  }
               }
            } else {
               obj._response = {};
            }
         },

         _onProgress: function(e, data) {
            if (e.lengthComputable) {
               var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                  loaded;
               if (data._time && data.progressInterval &&
                  (now - data._time < data.progressInterval) &&
                  e.loaded !== e.total) {
                  return;
               }
               data._time = now;
               loaded = Math.floor(
                  e.loaded / e.total * (data.chunkSize || data._progress.total)
               ) + (data.uploadedBytes || 0);
               // Add the difference from the previously loaded state
               // to the global loaded counter:
               this._progress.loaded += (loaded - data._progress.loaded);
               this._progress.bitrate = this._bitrateTimer.getBitrate(
                  now,
                  this._progress.loaded,
                  data.bitrateInterval
               );
               data._progress.loaded = data.loaded = loaded;
               data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                  now,
                  loaded,
                  data.bitrateInterval
               );
               // Trigger a custom progress event with a total data property set
               // to the file size(s) of the current upload and a loaded data
               // property calculated accordingly:
               this._trigger(
                  'progress',
                  $.Event('progress', {
                     delegatedEvent: e
                  }),
                  data
               );
               // Trigger a global progress event for all current file uploads,
               // including ajax calls queued for sequential file uploads:
               this._trigger(
                  'progressall',
                  $.Event('progressall', {
                     delegatedEvent: e
                  }),
                  this._progress
               );
            }
         },

         _initProgressListener: function(options) {
            var that = this,
               xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
               $(xhr.upload).bind('progress', function(e) {
                  var oe = e.originalEvent;
                  // Make sure the progress event properties get copied over:
                  e.lengthComputable = oe.lengthComputable;
                  e.loaded = oe.loaded;
                  e.total = oe.total;
                  that._onProgress(e, options);
               });
               options.xhr = function() {
                  return xhr;
               };
            }
         },

         _isInstanceOf: function(type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
         },

         _initXHRData: function(options) {
            var that = this,
               formData,
               file = options.files[0],
               // Ignore non-multipart setting if not supported:
               multipart = options.multipart || !$.support.xhrFileUpload,
               paramName = $.type(options.paramName) === 'array' ?
               options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
               options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
               options.headers['Content-Disposition'] = 'attachment; filename="' +
                  encodeURI(file.name) + '"';
            }
            if (!multipart) {
               options.contentType = file.type || 'application/octet-stream';
               options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
               if (options.postMessage) {
                  // window.postMessage does not allow sending FormData
                  // objects, so we just add the File/Blob objects to
                  // the formData array and let the postMessage window
                  // create the FormData object out of this array:
                  formData = this._getFormData(options);
                  if (options.blob) {
                     formData.push({
                        name: paramName,
                        value: options.blob
                     });
                  } else {
                     $.each(options.files, function(index, file) {
                        formData.push({
                           name: ($.type(options.paramName) === 'array' &&
                              options.paramName[index]) || paramName,
                           value: file
                        });
                     });
                  }
               } else {
                  if (that._isInstanceOf('FormData', options.formData)) {
                     formData = options.formData;
                  } else {
                     formData = new FormData();
                     $.each(this._getFormData(options), function(index, field) {
                        formData.append(field.name, field.value);
                     });
                  }
                  if (options.blob) {
                     formData.append(paramName, options.blob, file.name);
                  } else {
                     $.each(options.files, function(index, file) {
                        // This check allows the tests to run with
                        // dummy objects:
                        if (that._isInstanceOf('File', file) ||
                           that._isInstanceOf('Blob', file)) {
                           formData.append(
                              ($.type(options.paramName) === 'array' &&
                                 options.paramName[index]) || paramName,
                              file,
                              file.uploadName || file.name
                           );
                        }
                     });
                  }
               }
               options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
         },

         _initIframeSettings: function(options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
               options.formData.push({
                  name: options.redirectParamName || 'redirect',
                  value: options.redirect
               });
            }
         },

         _initDataSettings: function(options) {
            if (this._isXHRUpload(options)) {
               if (!this._chunkedUpload(options, true)) {
                  if (!options.data) {
                     this._initXHRData(options);
                  }
                  this._initProgressListener(options);
               }
               if (options.postMessage) {
                  // Setting the dataType to postmessage enables the
                  // postMessage transport:
                  options.dataType = 'postmessage ' + (options.dataType || '');
               }
            } else {
               this._initIframeSettings(options);
            }
         },

         _getParamName: function(options) {
            var fileInput = $(options.fileInput),
               paramName = options.paramName;
            if (!paramName) {
               paramName = [];
               fileInput.each(function() {
                  var input = $(this),
                     name = input.prop('name') || 'files[]',
                     i = (input.prop('files') || [1]).length;
                  while (i) {
                     paramName.push(name);
                     i -= 1;
                  }
               });
               if (!paramName.length) {
                  paramName = [fileInput.prop('name') || 'files[]'];
               }
            } else if (!$.isArray(paramName)) {
               paramName = [paramName];
            }
            return paramName;
         },

         _initFormSettings: function(options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
               options.form = $(options.fileInput.prop('form'));
               // If the given file input doesn't have an associated form,
               // use the default widget file input's form:
               if (!options.form.length) {
                  options.form = $(this.options.fileInput.prop('form'));
               }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
               options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
               ($.type(options.form.prop('method')) === 'string' &&
                  options.form.prop('method')) || ''
            ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
               options.type !== 'PATCH') {
               options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
               options.formAcceptCharset = options.form.attr('accept-charset');
            }
         },

         _getAJAXSettings: function(data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
         },

         // jQuery 1.6 doesn't provide .state(),
         // while jQuery 1.8+ removed .isRejected() and .isResolved():
         _getDeferredState: function(deferred) {
            if (deferred.state) {
               return deferred.state();
            }
            if (deferred.isResolved()) {
               return 'resolved';
            }
            if (deferred.isRejected()) {
               return 'rejected';
            }
            return 'pending';
         },

         // Maps jqXHR callbacks to the equivalent
         // methods of the given Promise object:
         _enhancePromise: function(promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
         },

         // Creates and returns a Promise object enhanced with
         // the jqXHR methods abort, success, error and complete:
         _getXHRPromise: function(resolveOrReject, context, args) {
            var dfd = $.Deferred(),
               promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
               dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
               dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
         },

         // Adds convenience methods to the data callback argument:
         _addConvenienceMethods: function(e, data) {
            var that = this,
               getPromise = function(args) {
                  return $.Deferred().resolveWith(that, args).promise();
               };
            data.process = function(resolveFunc, rejectFunc) {
               if (resolveFunc || rejectFunc) {
                  data._processQueue = this._processQueue =
                     (this._processQueue || getPromise([this])).then(
                        function() {
                           if (data.errorThrown) {
                              return $.Deferred()
                                 .rejectWith(that, [data]).promise();
                           }
                           return getPromise(arguments);
                        }
                     ).then(resolveFunc, rejectFunc);
               }
               return this._processQueue || getPromise([this]);
            };
            data.submit = function() {
               if (this.state() !== 'pending') {
                  data.jqXHR = this.jqXHR =
                     (that._trigger(
                        'submit',
                        $.Event('submit', {
                           delegatedEvent: e
                        }),
                        this
                     ) !== false) && that._onSend(e, this);
               }
               return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function() {
               if (this.jqXHR) {
                  return this.jqXHR.abort();
               }
               this.errorThrown = 'abort';
               that._trigger('fail', null, this);
               return that._getXHRPromise(false);
            };
            data.state = function() {
               if (this.jqXHR) {
                  return that._getDeferredState(this.jqXHR);
               }
               if (this._processQueue) {
                  return that._getDeferredState(this._processQueue);
               }
            };
            data.processing = function() {
               return !this.jqXHR && this._processQueue && that
                  ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function() {
               return this._progress;
            };
            data.response = function() {
               return this._response;
            };
         },

         // Parses the Range header from the server response
         // and returns the uploaded bytes:
         _getUploadedBytes: function(jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
               parts = range && range.split('-'),
               upperBytesPos = parts && parts.length > 1 &&
               parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
         },

         // Uploads a file in multiple, sequential requests
         // by splitting the file up in multiple blob chunks.
         // If the second parameter is true, only tests if the file
         // should be uploaded in chunks, but does not invoke any
         // upload requests:
         _chunkedUpload: function(options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
               file = options.files[0],
               fs = file.size,
               ub = options.uploadedBytes,
               mcs = options.maxChunkSize || fs,
               slice = this._blobSlice,
               dfd = $.Deferred(),
               promise = dfd.promise(),
               jqXHR,
               upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
               options.data) {
               return false;
            }
            if (testOnly) {
               return true;
            }
            if (ub >= fs) {
               file.error = options.i18n('uploadedBytes');
               return this._getXHRPromise(
                  false,
                  options.context, [null, 'error', file.error]
               );
            }
            // The chunk upload method:
            upload = function() {
               // Clone the options object for each chunk upload:
               var o = $.extend({}, options),
                  currentLoaded = o._progress.loaded;
               o.blob = slice.call(
                  file,
                  ub,
                  ub + mcs,
                  file.type
               );
               // Store the current chunk size, as the blob itself
               // will be dereferenced after data processing:
               o.chunkSize = o.blob.size;
               // Expose the chunk bytes position range:
               o.contentRange = 'bytes ' + ub + '-' +
                  (ub + o.chunkSize - 1) + '/' + fs;
               // Process the upload data (the blob and potential form data):
               that._initXHRData(o);
               // Add progress listeners for this chunk upload:
               that._initProgressListener(o);
               jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                     that._getXHRPromise(false, o.context))
                  .done(function(result, textStatus, jqXHR) {
                     ub = that._getUploadedBytes(jqXHR) ||
                        (ub + o.chunkSize);
                     // Create a progress event if no final progress event
                     // with loaded equaling total has been triggered
                     // for this chunk:
                     if (currentLoaded + o.chunkSize - o._progress.loaded) {
                        that._onProgress($.Event('progress', {
                           lengthComputable: true,
                           loaded: ub - o.uploadedBytes,
                           total: ub - o.uploadedBytes
                        }), o);
                     }
                     options.uploadedBytes = o.uploadedBytes = ub;
                     o.result = result;
                     o.textStatus = textStatus;
                     o.jqXHR = jqXHR;
                     that._trigger('chunkdone', null, o);
                     that._trigger('chunkalways', null, o);
                     if (ub < fs) {
                        // File upload not yet complete,
                        // continue with the next chunk:
                        upload();
                     } else {
                        dfd.resolveWith(
                           o.context, [result, textStatus, jqXHR]
                        );
                     }
                  })
                  .fail(function(jqXHR, textStatus, errorThrown) {
                     o.jqXHR = jqXHR;
                     o.textStatus = textStatus;
                     o.errorThrown = errorThrown;
                     that._trigger('chunkfail', null, o);
                     that._trigger('chunkalways', null, o);
                     dfd.rejectWith(
                        o.context, [jqXHR, textStatus, errorThrown]
                     );
                  });
            };
            this._enhancePromise(promise);
            promise.abort = function() {
               return jqXHR.abort();
            };
            upload();
            return promise;
         },

         _beforeSend: function(e, data) {
            if (this._active === 0) {
               // the start callback is triggered when an upload starts
               // and no other uploads are currently running,
               // equivalent to the global ajaxStart event:
               this._trigger('start');
               // Set timer for global bitrate progress calculation:
               this._bitrateTimer = new this._BitrateTimer();
               // Reset the global progress values:
               this._progress.loaded = this._progress.total = 0;
               this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
         },

         _onDone: function(result, textStatus, jqXHR, options) {
            var total = options._progress.total,
               response = options._response;
            if (options._progress.loaded < total) {
               // Create a progress event if no final progress event
               // with loaded equaling total has been triggered:
               this._onProgress($.Event('progress', {
                  lengthComputable: true,
                  loaded: total,
                  total: total
               }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
         },

         _onFail: function(jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
               // Remove the failed (error or abort) file upload from
               // the global progress calculation:
               this._progress.loaded -= options._progress.loaded;
               this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
         },

         _onAlways: function(jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
         },

         _onSend: function(e, data) {
            if (!data.submit) {
               this._addConvenienceMethods(e, data);
            }
            var that = this,
               jqXHR,
               aborted,
               slot,
               pipe,
               options = that._getAJAXSettings(data),
               send = function() {
                  that._sending += 1;
                  // Set timer for bitrate progress calculation:
                  options._bitrateTimer = new that._BitrateTimer();
                  jqXHR = jqXHR || (
                     ((aborted || that._trigger(
                           'send',
                           $.Event('send', {
                              delegatedEvent: e
                           }),
                           options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                     that._chunkedUpload(options) || $.ajax(options)
                  ).done(function(result, textStatus, jqXHR) {
                     that._onDone(result, textStatus, jqXHR, options);
                  }).fail(function(jqXHR, textStatus, errorThrown) {
                     that._onFail(jqXHR, textStatus, errorThrown, options);
                  }).always(function(jqXHRorResult, textStatus, jqXHRorError) {
                     that._onAlways(
                        jqXHRorResult,
                        textStatus,
                        jqXHRorError,
                        options
                     );
                     that._sending -= 1;
                     that._active -= 1;
                     if (options.limitConcurrentUploads &&
                        options.limitConcurrentUploads > that._sending) {
                        // Start the next queued upload,
                        // that has not been aborted:
                        var nextSlot = that._slots.shift();
                        while (nextSlot) {
                           if (that._getDeferredState(nextSlot) === 'pending') {
                              nextSlot.resolve();
                              break;
                           }
                           nextSlot = that._slots.shift();
                        }
                     }
                     if (that._active === 0) {
                        // The stop callback is triggered when all uploads have
                        // been completed, equivalent to the global ajaxStop event:
                        that._trigger('stop');
                     }
                  });
                  return jqXHR;
               };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
               (this.options.limitConcurrentUploads &&
                  this.options.limitConcurrentUploads <= this._sending)) {
               if (this.options.limitConcurrentUploads > 1) {
                  slot = $.Deferred();
                  this._slots.push(slot);
                  pipe = slot.then(send);
               } else {
                  this._sequence = this._sequence.then(send, send);
                  pipe = this._sequence;
               }
               // Return the piped Promise object, enhanced with an abort method,
               // which is delegated to the jqXHR object of the current upload,
               // and jqXHR callbacks mapped to the equivalent Promise methods:
               pipe.abort = function() {
                  aborted = [undefined, 'abort', 'abort'];
                  if (!jqXHR) {
                     if (slot) {
                        slot.rejectWith(options.context, aborted);
                     }
                     return send();
                  }
                  return jqXHR.abort();
               };
               return this._enhancePromise(pipe);
            }
            return send();
         },

         _onAdd: function(e, data) {
            var that = this,
               result = true,
               options = $.extend({}, this.options, data),
               files = data.files,
               filesLength = files.length,
               limit = options.limitMultiFileUploads,
               limitSize = options.limitMultiFileUploadSize,
               overhead = options.limitMultiFileUploadSizeOverhead,
               batchSize = 0,
               paramName = this._getParamName(options),
               paramNameSet,
               paramNameSlice,
               fileSet,
               i,
               j = 0;
            if (!filesLength) {
               return false;
            }
            if (limitSize && files[0].size === undefined) {
               limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
               !this._isXHRUpload(options)) {
               fileSet = [files];
               paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
               fileSet = [];
               paramNameSet = [];
               for (i = 0; i < filesLength; i += limit) {
                  fileSet.push(files.slice(i, i + limit));
                  paramNameSlice = paramName.slice(i, i + limit);
                  if (!paramNameSlice.length) {
                     paramNameSlice = paramName;
                  }
                  paramNameSet.push(paramNameSlice);
               }
            } else if (!options.singleFileUploads && limitSize) {
               fileSet = [];
               paramNameSet = [];
               for (i = 0; i < filesLength; i = i + 1) {
                  batchSize += files[i].size + overhead;
                  if (i + 1 === filesLength ||
                     ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                     (limit && i + 1 - j >= limit)) {
                     fileSet.push(files.slice(j, i + 1));
                     paramNameSlice = paramName.slice(j, i + 1);
                     if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                     }
                     paramNameSet.push(paramNameSlice);
                     j = i + 1;
                     batchSize = 0;
                  }
               }
            } else {
               paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function(index, element) {
               var newData = $.extend({}, data);
               newData.files = fileSet ? element : [element];
               newData.paramName = paramNameSet[index];
               that._initResponseObject(newData);
               that._initProgressObject(newData);
               that._addConvenienceMethods(e, newData);
               result = that._trigger(
                  'add',
                  $.Event('add', {
                     delegatedEvent: e
                  }),
                  newData
               );
               return result;
            });
            return result;
         },

         _replaceFileInput: function(data) {
            var input = data.fileInput,
               inputClone = input.clone(true),
               restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
               inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function(i, el) {
               if (el === input[0]) {
                  return inputClone[0];
               }
               return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
               this.element = inputClone;
            }
         },

         _handleFileTreeEntry: function(entry, path) {
            var that = this,
               dfd = $.Deferred(),
               errorHandler = function(e) {
                  if (e && !e.entry) {
                     e.entry = entry;
                  }
                  // Since $.when returns immediately if one
                  // Deferred is rejected, we use resolve instead.
                  // This allows valid files and invalid items
                  // to be returned together in one set:
                  dfd.resolve([e]);
               },
               successHandler = function(entries) {
                  that._handleFileTreeEntries(
                     entries,
                     path + entry.name + '/'
                  ).done(function(files) {
                     dfd.resolve(files);
                  }).fail(errorHandler);
               },
               readEntries = function() {
                  dirReader.readEntries(function(results) {
                     if (!results.length) {
                        successHandler(entries);
                     } else {
                        entries = entries.concat(results);
                        readEntries();
                     }
                  }, errorHandler);
               },
               dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
               if (entry._file) {
                  // Workaround for Chrome bug #149735
                  entry._file.relativePath = path;
                  dfd.resolve(entry._file);
               } else {
                  entry.file(function(file) {
                     file.relativePath = path;
                     dfd.resolve(file);
                  }, errorHandler);
               }
            } else if (entry.isDirectory) {
               dirReader = entry.createReader();
               readEntries();
            } else {
               // Return an empy list for file system items
               // other than files or directories:
               dfd.resolve([]);
            }
            return dfd.promise();
         },

         _handleFileTreeEntries: function(entries, path) {
            var that = this;
            return $.when.apply(
               $,
               $.map(entries, function(entry) {
                  return that._handleFileTreeEntry(entry, path);
               })
            ).then(function() {
               return Array.prototype.concat.apply(
                  [],
                  arguments
               );
            });
         },

         _getDroppedFiles: function(dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                  items[0].getAsEntry)) {
               return this._handleFileTreeEntries(
                  $.map(items, function(item) {
                     var entry;
                     if (item.webkitGetAsEntry) {
                        entry = item.webkitGetAsEntry();
                        if (entry) {
                           // Workaround for Chrome bug #149735:
                           entry._file = item.getAsFile();
                        }
                        return entry;
                     }
                     return item.getAsEntry();
                  })
               );
            }
            return $.Deferred().resolve(
               $.makeArray(dataTransfer.files)
            ).promise();
         },

         _getSingleFileInputFiles: function(fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
               fileInput.prop('entries'),
               files,
               value;
            if (entries && entries.length) {
               return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
               value = fileInput.prop('value');
               if (!value) {
                  return $.Deferred().resolve([]).promise();
               }
               // If the files property is not available, the browser does not
               // support the File API and we add a pseudo File object with
               // the input value as name with path information removed:
               files = [{
                  name: value.replace(/^.*\\/, '')
               }];
            } else if (files[0].name === undefined && files[0].fileName) {
               // File normalization for Safari 4 and Firefox 3:
               $.each(files, function(index, file) {
                  file.name = file.fileName;
                  file.size = file.fileSize;
               });
            }
            return $.Deferred().resolve(files).promise();
         },

         _getFileInputFiles: function(fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
               return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
               $,
               $.map(fileInput, this._getSingleFileInputFiles)
            ).then(function() {
               return Array.prototype.concat.apply(
                  [],
                  arguments
               );
            });
         },

         _onChange: function(e) {
            var that = this,
               data = {
                  fileInput: $(e.target),
                  form: $(e.target.form)
               };
            this._getFileInputFiles(data.fileInput).always(function(files) {
               data.files = files;
               if (that.options.replaceFileInput) {
                  that._replaceFileInput(data);
               }
               if (that._trigger(
                     'change',
                     $.Event('change', {
                        delegatedEvent: e
                     }),
                     data
                  ) !== false) {
                  that._onAdd(e, data);
               }
            });
         },

         _onPaste: function(e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
               e.originalEvent.clipboardData.items,
               data = {
                  files: []
               };
            if (items && items.length) {
               $.each(items, function(index, item) {
                  var file = item.getAsFile && item.getAsFile();
                  if (file) {
                     data.files.push(file);
                  }
               });
               if (this._trigger(
                     'paste',
                     $.Event('paste', {
                        delegatedEvent: e
                     }),
                     data
                  ) !== false) {
                  this._onAdd(e, data);
               }
            }
         },

         _onDrop: function(e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
               dataTransfer = e.dataTransfer,
               data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
               e.preventDefault();
               this._getDroppedFiles(dataTransfer).always(function(files) {
                  data.files = files;
                  if (that._trigger(
                        'drop',
                        $.Event('drop', {
                           delegatedEvent: e
                        }),
                        data
                     ) !== false) {
                     that._onAdd(e, data);
                  }
               });
            }
         },

         _onDragOver: getDragHandler('dragover'),

         _onDragEnter: getDragHandler('dragenter'),

         _onDragLeave: getDragHandler('dragleave'),

         _initEventHandlers: function() {
            if (this._isXHRUpload(this.options)) {
               this._on(this.options.dropZone, {
                  dragover: this._onDragOver,
                  drop: this._onDrop,
                  // event.preventDefault() on dragenter is required for IE10+:
                  dragenter: this._onDragEnter,
                  // dragleave is not required, but added for completeness:
                  dragleave: this._onDragLeave
               });
               this._on(this.options.pasteZone, {
                  paste: this._onPaste
               });
            }
            if ($.support.fileInput) {
               this._on(this.options.fileInput, {
                  change: this._onChange
               });
            }
         },

         _destroyEventHandlers: function() {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
         },

         _setOption: function(key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
               this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
               this._initSpecialOptions();
               this._initEventHandlers();
            }
         },

         _initSpecialOptions: function() {
            var options = this.options;
            if (options.fileInput === undefined) {
               options.fileInput = this.element.is('input[type="file"]') ?
                  this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
               options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
               options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
               options.pasteZone = $(options.pasteZone);
            }
         },

         _getRegExp: function(str) {
            var parts = str.split('/'),
               modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
         },

         _isRegExpOption: function(key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
               /^\/.*\/[igm]{0,3}$/.test(value);
         },

         _initDataAttributes: function() {
            var that = this,
               options = this.options,
               data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
               this.element[0].attributes,
               function(index, attr) {
                  var key = attr.name.toLowerCase(),
                     value;
                  if (/^data-/.test(key)) {
                     // Convert hyphen-ated key to camelCase:
                     key = key.slice(5).replace(/-[a-z]/g, function(str) {
                        return str.charAt(1).toUpperCase();
                     });
                     value = data[key];
                     if (that._isRegExpOption(key, value)) {
                        value = that._getRegExp(value);
                     }
                     options[key] = value;
                  }
               }
            );
         },

         _create: function() {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
         },

         // This method is exposed to the widget API and allows to query
         // the number of active uploads:
         active: function() {
            return this._active;
         },

         // This method is exposed to the widget API and allows to query
         // the widget upload progress.
         // It returns an object with loaded, total and bitrate properties
         // for the running uploads:
         progress: function() {
            return this._progress;
         },

         // This method is exposed to the widget API and allows adding files
         // using the fileupload API. The data parameter accepts an object which
         // must have a files property and can contain additional options:
         // .fileupload('add', {files: filesList});
         add: function(data) {
            var that = this;
            if (!data || this.options.disabled) {
               return;
            }
            if (data.fileInput && !data.files) {
               this._getFileInputFiles(data.fileInput).always(function(files) {
                  data.files = files;
                  that._onAdd(null, data);
               });
            } else {
               data.files = $.makeArray(data.files);
               this._onAdd(null, data);
            }
         },

         // This method is exposed to the widget API and allows sending files
         // using the fileupload API. The data parameter accepts an object which
         // must have a files or fileInput property and can contain additional options:
         // .fileupload('send', {files: filesList});
         // The method returns a Promise object for the file upload call.
         send: function(data) {
            if (data && !this.options.disabled) {
               if (data.fileInput && !data.files) {
                  var that = this,
                     dfd = $.Deferred(),
                     promise = dfd.promise(),
                     jqXHR,
                     aborted;
                  promise.abort = function() {
                     aborted = true;
                     if (jqXHR) {
                        return jqXHR.abort();
                     }
                     dfd.reject(null, 'abort', 'abort');
                     return promise;
                  };
                  this._getFileInputFiles(data.fileInput).always(
                     function(files) {
                        if (aborted) {
                           return;
                        }
                        if (!files.length) {
                           dfd.reject();
                           return;
                        }
                        data.files = files;
                        jqXHR = that._onSend(null, data);
                        jqXHR.then(
                           function(result, textStatus, jqXHR) {
                              dfd.resolve(result, textStatus, jqXHR);
                           },
                           function(jqXHR, textStatus, errorThrown) {
                              dfd.reject(jqXHR, textStatus, errorThrown);
                           }
                        );
                     }
                  );
                  return this._enhancePromise(promise);
               }
               data.files = $.makeArray(data.files);
               if (data.files.length) {
                  return this._onSend(null, data);
               }
            }
            return this._getXHRPromise(false, data && data.context);
         }

      });

   }));
}

(function(___scope___) { var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

RegExp.prototype.execAll = function (string) {
   var match = null;
   var matches = new Array();
   while (match = this.exec(string)) {
      var matchArray = [];
      for (i in match) {
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

realm.module("frzr", function () {
   return $isBackend ? {} : window.frzr;
});
realm.module("morrr.editor.utils.Promise", function () {
   return $isBackend ? require("promise") : window.Promise;
});

realm.module("morrr.editor.utils.sharedImagePath", function () {
   return function (img, size) {
      return IMAGE_SERVER_FULL + img + "?width=" + (size || 150) + "&height=" + (size || 150) + "&mode=crop&quality=80";
   };
});

realm.module("morrr.editor.Engine", ["morrr.editor.bbcode.BBCodeEngine", "morrr.editor.bbcode.Generator", "morrr.editor.bbcode.BBCodeExtractor", "morrr.editor.bbcode.BBCodeHandlers", "morrr.editor.utils.lodash", "morrr.editor.utils"], function (BBCodeEngine, Generator, BBCodeExtractor, BBCodeHandlers, _, utils) {
   var $_exports;

   var SaneEditor = function () {
      function SaneEditor() {
         _classCallCheck(this, SaneEditor);
      }

      _createClass(SaneEditor, [{
         key: "initialize",
         value: function initialize(target, opts) {
            this.opts = opts || {};
            this.toolbarConfig = opts.toolbar || [];
            this.element = $('<div class="sane-editor"></div>');
            this.toolbar = $('<div class="sane-editor-toolbar-wrapper"><div class="toolbar"></div></div>');
            this.toolbar.appendTo(this.element);
            this.modalWrapper = $('<div class="sane-modal-wrapper"><div class="modal"></div></div>');
            this.modalWrapper.appendTo(this.element);
            this.contentWrapper = $('<div class="sane-editor-content-wrapper"></div>');
            this.contentWrapper.appendTo(this.element);
            this.content = $('<div class="sane-editor-content" contenteditable="true"></div>').appendTo(this.toolbar);
            this.content.appendTo(this.contentWrapper);
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
         }
      }, {
         key: "onActivity",
         value: function onActivity(cb) {
            this.activity_cb = cb;
         }
      }, {
         key: "triggerActivity",
         value: function triggerActivity() {
            if (this.activity_cb) {
               this.activity_cb();
            }
         }
      }, {
         key: "getValue",
         value: function getValue() {
            return this.generate();
         }
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
         key: "showError",
         value: function showError(message) {
            this.element.find(".notification").remove();
            var notification = $('<div class="notification"><div class="text"><i class="ui icon warning sign"></i>' + message + '</div></div>');
            notification.hide();
            notification.insertBefore(this.content);
            notification.fadeIn({
               duration: 200,
               queue: false
            }).css('display', 'none').slideDown(200, function () {
               setTimeout(function () {
                  notification.show();
                  notification.fadeOut({
                     duration: 200,
                     queue: false
                  }).css('display', 'block').slideIn(200, function () {
                     notification.remove();
                  });
               }, 2000);
            });
         }
      }, {
         key: "createModal",
         value: function createModal(header) {
            this.element.find(".sane-modal").remove();
            var modal = $('<div class="sane-modal"><div class="header">' + header + '</div><div class="modal-content"></div></div>');
            modal.insertBefore(this.content);
            return {
               element: modal,
               close: function close() {
                  modal.remove();
               }
            };
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
                                 parent = parent.parent();
                              }
                              iterations++;
                           }
                           if (found && target[0]) {
                              $(el).insertBefore(target);
                           }
                        } else {
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
            var bindHint = function bindHint(icon, text) {
               icon.mouseover(function (e) {
                  var offset = icon.position();
                  currentHint = $('<div class="toolbar-hint">' + text + '</div>');
                  currentHint.appendTo(self.toolbar);
                  currentHint.css({
                     top: offset.top + 35 + "px",
                     left: offset.left + "px",
                     position: "absolute"
                  });
               });
               icon.mouseout(function () {
                  if (currentHint) {
                     currentHint.remove();
                  }
               });
            };
            _.each(this.toolbarConfig, function (str) {
               var handler = BBCodeHandlers[str];
               if (handler) {
                  var icon = $('<div class="ui button"><i class="icon"></i></div>');
                  icon.find('i').addClass(handler.icon);

                  if (handler.hint) {
                     bindHint(icon, handler.hint);
                  }
                  $(self.toolbar).find('.toolbar').append(icon);
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
                  });
               }
            });
            var fScreen = $('<div class="ui button"><i class="icon maximize"></i></div>');
            fScreen.appendTo($(self.toolbar).find('.buttons'));
            fScreen.click(function () {
               self.toggleFullScreenMode();
            });
            bindHint(fScreen, "Full screen");
            this.bindFullScreenButtons();
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
            return document.getSelection();
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
            console.log(this.content[0]);
            document.execCommand(a, b || false, c || null);
         }
      }, {
         key: "setCaretPosition",
         value: function setCaretPosition(elem, caretPos) {
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
      }, {
         key: "bindFullScreenButtons",
         value: function bindFullScreenButtons() {
            var self = this;
            this.floatingSave = $('<div class="circular ui icon button primary small floating-save"><i class="icon save"></i></div>');
            this.floatingPreview = $('<div class="circular ui icon button small floating-preview"><i class="icon zoom"></i></div>');
            this.floatingPreview.click(function () {
               if (self.onFloatingPreview) {
                  self.onFloatingPreview();
               }
            });

            self.exitFullScreenModeButton = $('<div class="circular ui icon button small floating-exit"><i class="icon angle double down"></i></div>');
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

      var modal = editor.createModal('Insert image');
      var images = $('<div class="images"></div>');
      var modalContent = modal.element.find('.modal-content');
      var multiupLoadElement = $('<div class="multiupload"></div>');
      var buttonElements = $('<div class="actions"><div class="ui button cancel">Cancel</div><div class="ui button primary okay">Insert</div></div>');
      multiupLoadElement.appendTo(modalContent);
      images.appendTo(modalContent);
      buttonElements.appendTo(modal.element);
      var selected = [];
      var loader = $('<div class="image"><div class="ui active large inline loader image-loader"></div></div>');
      // fetching existing images ******
      var updateImageList = function updateImageList() {
         images.empty();
         $.get('/sys/user_images?parent=' + editor.parentId, function (data) {
            var initialImage;
            _.each(data, function (item) {
               var image = $('<div class="image"><img src="' + sharedImagePath(item.image, 70) + '"/></div>');
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
               });
            });
            if (initialImage) {
               initialImage.image.addClass('selected');
               selected.push(initialImage.item.image);
            }
         });
      };
      updateImageList();
      // cancel
      buttonElements.find('.cancel').click(function () {
         modal.close();
      });
      // Okay
      buttonElements.find('.okay').click(function () {
         done(selected);
         modal.close();
      });

      // Bind multi upload thingy *********************
      multiupLoadElement.uploadFile({
         url: "/api/editor/upload?parentId=" + editor.parentId,
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
         this.header = el('div', {
            class: "header",
            textContent: opts.title || "opts.title"
         });

         this.successButton = el('div', {
            class: 'button success',
            textContent: opts.successButton || "Done"
         });
         this.closeButton = el('div', {
            class: 'button close',
            textContent: opts.successButton || "Close"
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
            class: "morrr-modal",
            style: "z-index:" + modalIndex++
         }, [this.header, this.content, this.footer]);

         this.createOverlay();
         $(document.body).prepend(this.modal);
         instances++;
      }

      _createClass(Modal, [{
         key: "close",
         value: function close() {
            instances--;
            $(this.modal).remove();
            if (instances === 0) {
               $(this.overlay).remove();
            }
         }
      }, {
         key: "createOverlay",
         value: function createOverlay() {
            if (overlay === false) {
               this.overlay = el('div', {
                  class: "morrr-overlay"
               });
               $(document.body).prepend(this.overlay);
            }
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
            var handler;
            if (handler = $BBCodeHandlers[item.name]) {
               if (_.isFunction(handler.toProduction)) {

                  html = handler.toProduction(item, opts);
               } else {
                  html = '<' + handler.tag + '>';
               };
               input = input.replace(item.str, html);
            }
         });

         _.each(codes, function (item) {
            var handler;
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
            var handler;
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
                  var isBlockModule = text.match(/^\[(blockquote|gallery|intro|h3)/);
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
realm.module("morrr.editor.elements.blockquote", ["morrr.editor.utils"], function (utils) {
   var $_exports;
   var BlockQuote = {
      index: 1,
      tag: 'blockquote',
      menu: true,
      hint: 'Quote',
      icon: 'quote left',
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
      hint: 'Insert image gallery',
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
         });
      },
      _bindFigure: function _bindFigure(element, figure) {
         var removeIcon = $('<i class="ui icon remove"></i>');
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
               var addPlaceHolder = $('<div class="placeholder"><img src="https://images.morrr.com/test-shit/pukka/4kgKwN2Ucx.png?width=150&height=150&mode=crop"/></div>');
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
               gallery.push('[img id="' + $(element).data("id") + '"][/img]');
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
realm.module("morrr.editor.elements.h3", ["morrr.editor.utils"], function (utils) {
   var $_exports;
   var Heading3 = {
      tag: 'h3',
      icon: 'header',
      hint: 'Heading',
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
         return '<figure data-id="' + data.attrs.id + '"><img ' + (alt ? 'alt="' + alt + '" ' : '') + 'src="' + img + '">';
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
      icon: 'info',
      hint: 'Opening paragraph',
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
realm.module("morrr.editor.elements.italic", [], function () {
   var $_exports;

   var Italic = {
      tag: 'i',
      menu: true,
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
      icon: 'ordered list',
      hint: 'Ordered list',
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
         root.find('b').each(function (index, element) {
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
      icon: 'unordered list',
      hint: 'Unordered list',
      toBBCode: function toBBCode(root) {
         root.find('ul').each(function (index, element) {
            $(element).replaceWith('[ul]' + $(element).html() + '[/ul]');
         });
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
      icon: 'linkify',
      hint: 'Insert a link',
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
})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : self.realm}}(this));