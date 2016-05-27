<language-toolbar>
    <div class="sane-language-toolbar">
        <div class="tab active published">
            <span>English</span>
        </div>
        <div class="tab modified">
            <span>Swedish</span>
        </div>
        <div class="tab published">
            <span>Finnish</span>
        </div>
        <div class="toolbar-status">
            <div class="button labelled translate-mode" onclick={translate}>
                <span>Translate mode</span>
            </div>
        </div>
    </div>
    <script>
        var self = this;
        this.translate = function () {
            self.trigger('translate-toggle');
        }
    </script>
</language-toolbar>
