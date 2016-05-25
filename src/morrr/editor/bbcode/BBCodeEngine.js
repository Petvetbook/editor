"use realm";

import BBCodeExtractor from morrr.editor.bbcode
import lodash as _ from morrr.editor.utils;
import BBCodeHandlers from morrr.editor.bbcode;

import utils from morrr.editor;

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
         if ((handler = BBCodeHandlers[item.name])) {
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

export BBCodeEngine;
