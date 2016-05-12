(function(___scope___) { var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

realm.module("morrr.Editor", [], function () {
	var $_exports;

	var Editor = function Editor() {
		_classCallCheck(this, Editor);
	};

	$_exports = Editor;

	return $_exports;
});
})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : self.realm}}(this));