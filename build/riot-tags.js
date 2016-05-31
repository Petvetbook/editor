(function(___scope___) { "use strict"; var $isBackend = ___scope___.isNode; var realm  = ___scope___.realm;

riot.tag2('file-toolbar', '<div class="sane-file-toolbar"><div class="button labelled metadata"><span>Metadata</span></div><div class="button labelled translate"><span>Translate</span></div><div class="button labelled publish"><span>Publish</span></div><div class="button labelled save"><span>Save</span></div></div>', '', '', function(opts) {
});

riot.tag2('item-navigation', '<div class="sane-item-navigation"><div class="item"><a class="item-name active">Classifications</a><div class="item-content"><div class="wrapper symptoms"><label>symptoms</label><span>mastitis, milk</span></div><div class="wrapper definition"><label>definition</label><span>mastitis, milk, infection</span></div><div class="wrapper condition"><label>condition</label><span>mastitis</span></div><div class="button-wrapper"><div class="button"><span>Classify</span></div><div class="button"><span>Edit</span></div></div></div></div><div class="item"><a class="item-name active">Metadata</a><div class="item-content"><div class="wrapper meta"><label>meta</label><ul class="tags"><li>paraneoplastic diseases<span class="remove button"></span></li><li>tumours<span class="remove button"></span></li><li>fever<span class="remove button"></span></li><li>weight loss<span class="remove button"></span></li></ul><input type="text" name="name" placeholder="Add a tag" value=""><span class="add button"></span></div></div></div></div>', '', '', function(opts) {
});

riot.tag2('language-toolbar', '<div class="sane-language-toolbar"><div class="tab active published"><span>English</span></div><div class="tab modified"><span>Swedish</span></div><div class="tab published"><span>Finnish</span></div><div class="toolbar-status"><div class="button labelled translate-mode" onclick="{translate}"><span>Translate mode</span></div></div></div>', '', '', function(opts) {
        var self = this;
        this.translate = function () {
            self.trigger('translate-toggle');
        }
});

riot.tag2('menu-toolbar', '<span class="prev-item"><div class="button labelled prev"><span>Previous</span></div></span><div class="dropdown {active : isShown}"><span class="dropdown-current" onclick="{show}"><span class="index">1 / 758</span><span class="item-name">Title</span></span><div class="dropdown-list-wrapper {active : isShown}"><div class="dropdown-list"><div class="search-bar"><input type="search" name="item-search" placeholder="Search" value=""><div class="button search"></div></div><div class="header"><span class="item-name">Title</span><span class="assigned-to">Assigned to</span><span class="edited">Edited</span><span class="status">Status</span></div><div class="item "><span class="item-name">How is urinary incontinence treated in dogs?</span><span class="assigned-to"><div class="button"><span>Demo</span></div></span><span class="edited">22.02.2016</span><span class="status"><span class="published">EN</span><span class="published">SV</span><span class="">FI</span></span></div><div class="item "><span class="item-name">How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs?</span><span class="assigned-to">Lynda</span><span class="edited">22.02.2016</span><span class="status"><span class="published">EN</span><span class="published">SV</span><span class="">FI</span></span></div><div class="item "><span class="item-name">How is urinary incontinence treated in dogs?</span><span class="assigned-to">Lynda</span><span class="edited">22.02.2016</span><span class="status"><span class="published">EN</span><span class="published">SV</span><span class="">FI</span></span></div></div><paginator></paginator></div></div><span class="next-item"><div class="button labelled next"><span>Next</span></div></span>', '', '', function(opts) {
        riot.mount('paginator');
        this.show = function () {
            this.isShown = this.isShown
                ? false
                : true;
        }
});

riot.tag2('paginator', '<div class="paginator"><a class="item" page="1" style="display: none;">1</a><a class="item" style="display: none;">...</a><a class="item active" page="1"> 1 </a><a class="item " page="2"> 2 </a><a class="item " page="3"> 3 </a><a class="item " page="4"> 4 </a><a class="item " page="5"> 5 </a><a class="item " page="6"> 6 </a><a class="item " page="7"> 7 </a><a class="item " page="8"> 8 </a><a class="item " page="9"> 9 </a><a class="item " page="10"> 10 </a><a class="disabled item">...</a><a class="item" page="50"> 50 </a></div>', '', '', function(opts) {
});

riot.tag2('primary-navigation', '<div class="sane-primary-navigation"><a class="active">Users</a><a>Articles</a><a>Whatevers</a></div>', '', '', function(opts) {
});

riot.tag2('translate-pane-toolbar', '<div class="sane-translate-pane-toolbar"><a class="item active">EN</a><a class="item">SV</a><a class="item">FI</a></div>', '', '', function(opts) {
});

riot.tag2('user-toolbar', '<div class="sane-user-toolbar"><span class="username">Lynda</span><div class="button logout"><span>Logout</span></div></div>', '', '', function(opts) {
});


})(function(self){ var isNode = typeof exports !== 'undefined'; return { isNode : isNode, realm : isNode ? require('realm-js') : window.realm}}());