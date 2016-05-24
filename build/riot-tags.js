'use strict';

(function (___scope___) {
    var $isBackend = ___scope___.isNode;var realm = ___scope___.realm;

    riot.tag2('file-toolbar', '<div class="sane-file-toolbar"><div class="button translate"><span>Translate</span></div><div class="button publish"><span>Publish</span></div><div class="button save"><span>Save</span></div></div>', '', '', function (opts) {});

    riot.tag2('language-toolbar', '<div class="sane-language-toolbar"><div class="tab active published"><span>English</span></div><div class="tab modified"><span>Swedish</span></div><div class="tab published"><span>Finnish</span></div></div>', '', '', function (opts) {});

    riot.tag2('menu-toolbar', '<span class="currently">Editing</span><div class="dropdown {active : isShown}"><span class="dropdown-current" onclick="{show}">Item Title</span><div class="dropdown-list-wrapper {active : isShown}"><div class="dropdown-list"><div class="header"><span class="item-name">Title</span><span class="assigned-to">Assigned to</span><span class="edited">Edited</span><span class="status">Status</span></div><div class="item "><span class="item-name">How is urinary incontinence treated in dogs?</span><span class="assigned-to">Lynda</span><span class="edited">22.02.2016</span><span class="status"><span class="published">EN</span><span class="published">SV</span><span class="">FI</span></span></div></div><paginator></paginator></div></div>', '', '', function (opts) {
        riot.mount('ui-paginator');
        this.show = function () {
            this.isShown = this.isShown ? false : true;
        };
    });

    riot.tag2('paginator', '<div class="paginator"><a class="item" show="{data.distantFirst}" page="1" onclick="{change}">1</a><a class="item disabled" show="{data.distantFirst}">...</a><virtual each="{range in data.range}"><a class="item {active: range == parent.data.current}" page="{range}" onclick="{change}"> {range} </a></virtual><a if="{data.distantLast}" class="item disabled">...</a><a class="item" show="{data.distantLast}" page="{data.distantLast}" onclick="{change}"> {data.distantLast} </a></div>', '', '', function (opts) {
        var needUpdate = true;
        var parent = this.parent;
        this.change = function (event) {
            needUpdate = false;
            var page = $(event.target).attr("page") * 1;
            $pushState.merge({ page: page });
            parent.trigger("paginator-changed", page);
        };
        this.on("update", function () {
            if (needUpdate) this.data = opts.data;
            needUpdate = true;
        });
    });
})(function (self) {
    var isNode = typeof exports !== 'undefined';return { isNode: isNode, realm: isNode ? require('realm-js') : window.realm };
}());