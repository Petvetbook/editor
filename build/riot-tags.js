'use strict';

(function (___scope___) {
  var $isBackend = ___scope___.isNode;var realm = ___scope___.realm;

  riot.tag2('file-toolbar', '<div class="sane-file-toolbar"><span class="button translate">Translate</span><span class="button publish">Publish</span><span class="button save">Save</span></div>', '', '', function (opts) {});

  riot.tag2('language-toolbar', '<div class="sane-language-toolbar"><div class="tab flag gb active published"><span>EN</span><div class="button enabled"><span>Save</span></div></div><div class="tab flag sv unpublished"><span>SV</span><div class="button disabled"><span>Save</span></div></div><div class="tab flag fi published"><span>FI</span><div class="button enabled"><span>Save</span></div></div></div>', '', '', function (opts) {});

  riot.tag2('menu-toolbar', '<div class="main-toolbar" data-is="intel-toolbar" riot-tag="intel-toolbar"><span>Editing</span><div class="dropdown"><input class="dropdown-current" type="text" name="name" value="Item Title"><button class="dropdown-arrow" type="button" name="button">v</button><div class="dropdown-list-wrapper"><div class="dropdown-list"><div class="item "><span class="item-name">How is urinary incontinence treated in dogs?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What is sinus arrhythmia?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What is an ectopic ureter?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What is urinary incontinence in dogs?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">How are uroliths in dogs treated?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What are the symptoms of uroliths in dogs?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What types of uroliths are there?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What are uroliths?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What is the treatment for cystitis in dogs?</span><i class="flag gb "></i></div><div class="item "><span class="item-name">What are the symptoms of cystitis in dogs?</span><i class="flag gb "></i></div></div><div class="paginator"></div></div></div></div>', '', '', function (opts) {});
})(function (self) {
  var isNode = typeof exports !== 'undefined';return { isNode: isNode, realm: isNode ? require('realm-js') : window.realm };
}());