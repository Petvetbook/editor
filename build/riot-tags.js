(function(___scope___) { "use strict"; var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;

riot.tag2('file-toolbar', '<div class="sane-file-toolbar"><div class="button labelled metadata"><span>Metadata</span></div><div class="button labelled translate"><span>Translate</span></div><div class="button labelled publish"><span>Publish</span></div><div class="button labelled save"><span>Save</span></div></div>', '', '', function(opts) {
});

riot.tag2('language-toolbar', '<div class="sane-language-toolbar"><div class="tab active published"><span>English</span></div><div class="tab modified"><span>Swedish</span><div class="button save"><span>Save</span></div></div><div class="tab published"><span>Finnish</span></div><div class="toolbar-status"><div class="button labelled translate-mode"><span>Translate mode</span></div></div></div>', '', '', function(opts) {
});

riot.tag2('menu-toolbar', '<span class="currently">Editing</span><div class="dropdown {active : isShown}"><span class="dropdown-current" onclick="{show}"><span class="index">1 / 758</span>Item Title</span><div class="dropdown-list-wrapper {active : isShown}"><div class="dropdown-list"><div class="header"><span class="item-name">Title</span><span class="assigned-to">Assigned to</span><span class="edited">Edited</span><span class="status">Status</span></div><div class="item "><span class="item-name">How is urinary incontinence treated in dogs?</span><span class="assigned-to">Lynda</span><span class="edited">22.02.2016</span><span class="status"><span class="published">EN</span><span class="published">SV</span><span class="">FI</span></span></div></div><paginator></paginator></div></div>', '', '', function(opts) {
        riot.mount('paginator');
        this.show = function () {
            this.isShown = this.isShown
                ? false
                : true;
        }
});

riot.tag2('paginator', '<div class="paginator"><a class="item" page="1" style="display: none;">1</a><a class="item" style="display: none;">...</a><a class="item active" page="1"> 1 </a><a class="item " page="2"> 2 </a><a class="item " page="3"> 3 </a><a class="item " page="4"> 4 </a><a class="item " page="5"> 5 </a><a class="item " page="6"> 6 </a><a class="item " page="7"> 7 </a><a class="item " page="8"> 8 </a><a class="item " page="9"> 9 </a><a class="item " page="10"> 10 </a><a class="disabled item">...</a><a class="item" page="50"> 50 </a></div>', '', '', function(opts) {
});

riot.tag2('user-toolbar', '<div class="sane-user-toolbar"><span class="username">Lynda</span><div class="button logout"><span>Logout</span></div></div>', '', '', function(opts) {
});


})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : window.realm}}());