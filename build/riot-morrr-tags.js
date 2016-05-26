(function(___scope___) { "use strict"; var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;

riot.tag2('notifications', '<span></span>', '#growls { z-index: 9999999; position: fixed; } #growls.default { top: 10px; right: 10px; } #growls.tl { top: 10px; left: 10px; } #growls.tr { top: 10px; right: 10px; } #growls.bl { bottom: 10px; left: 10px; } #growls.br { bottom: 10px; right: 10px; } #growls.tc { top: 10px; right: 10px; left: 10px; } #growls.bc { bottom: 10px; right: 10px; left: 10px; } #growls.bc .growl, #growls.tc .growl { margin-left: auto; margin-right: auto; } .growl { opacity: 0.8; filter: alpha(opacity=80); position: relative; border-radius: 4px; -webkit-transition: all 0.4s ease-in-out; -moz-transition: all 0.4s ease-in-out; transition: all 0.4s ease-in-out; } .growl.growl-incoming { opacity: 0; filter: alpha(opacity=0); } .growl.growl-outgoing { opacity: 0; filter: alpha(opacity=0); } .growl.growl-small { width: 200px; padding: 5px; margin: 5px; } .growl.growl-medium { width: 250px; padding: 10px; margin: 10px; } .growl.growl-large { width: 300px; padding: 15px; margin: 15px; } .growl.growl-default { color: #FFF; background: #7f8c8d; } .growl.growl-error { color: #FFF; background: #C0392B; } .growl.growl-notice { color: #FFF; background: #2ECC71; } .growl.growl-warning { color: #FFF; background: #F39C12; } .growl .growl-close { cursor: pointer; float: right; font-size: 14px; line-height: 18px; font-weight: normal; font-family: helvetica, verdana, sans-serif; } .growl .growl-title { font-size: 18px; line-height: 24px; } .growl .growl-message { font-size: 14px; line-height: 18px; }', '', function(opts) {
      this.on("default", function (title, message) {
         $.growl({title: title, message: message});
      });

      this.on("notice", function (title, message) {
         $.growl.notice({title : title, message: message});
      });
      this.on("warning", function (title, message) {
         $.growl.warning({title : title, message: message});
      });
});


})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : window.realm}}());