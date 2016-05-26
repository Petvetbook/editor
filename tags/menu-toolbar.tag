<menu-toolbar>
    <span class="currently">Editing</span>
    <div class="dropdown {active : isShown}">
        <span class="dropdown-current" onclick={show}>
            <span class="index">1 / 758</span>Item Title</span>
        <div class="dropdown-list-wrapper {active : isShown}">
            <div class="dropdown-list">
                <div class="header">
                    <span class="item-name">Title</span>
                    <span class="assigned-to">Assigned to</span>
                    <span class="edited">Edited</span>
                    <span class="status">Status</span>
                </div>
                <div class="item ">
                    <span class="item-name">How is urinary incontinence treated in dogs?</span>
                    <span class="assigned-to">Lynda</span>
                    <span class="edited">22.02.2016</span>
                    <span class="status">
                        <span class="published">EN</span>
                        <span class="published">SV</span>
                        <span class="">FI</span>
                    </span>
                </div>
            </div>
            <paginator></paginator>
        </div>
    </div>
    <script>
        riot.mount('paginator');
        this.show = function () {
            this.isShown = this.isShown
                ? false
                : true;
        }
    </script>
</menu-toolbar>
