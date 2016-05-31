<menu-toolbar>
    <span class="prev-item">
        <div class="button labelled prev">
            <span>Previous</span>
        </div>
    </span>
    <div class="dropdown {active : isShown}">
        <span class="dropdown-current" onclick={show}>
            <span class="index">1 / 758</span>
            <span class="item-name">Title</span>
        </span>
        <div class="dropdown-list-wrapper {active : isShown}">
            <div class="dropdown-list">
                <div class="search-bar">
                    <input type="search" name="item-search" placeholder="Search" value="">
                    <div class="button search"></div>
                </div>
                <div class="header">
                    <span class="item-name">Title</span>
                    <span class="assigned-to">Assigned to</span>
                    <span class="edited">Edited</span>
                    <span class="status">Status</span>
                </div>
                <div class="item ">
                    <span class="item-name">How is urinary incontinence treated in dogs?</span>
                    <span class="assigned-to">
                        <div class="button">
                            <span>Demo</span>
                        </div>
                    </span>
                    <span class="edited">22.02.2016</span>
                    <span class="status">
                        <span class="published">EN</span>
                        <span class="published">SV</span>
                        <span class="">FI</span>
                    </span>
                </div>
                <div class="item ">
                    <span class="item-name">How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs? How is urinary incontinence treated in dogs?</span>
                    <span class="assigned-to">Lynda</span>
                    <span class="edited">22.02.2016</span>
                    <span class="status">
                        <span class="published">EN</span>
                        <span class="published">SV</span>
                        <span class="">FI</span>
                    </span>
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
    <span class="next-item">
        <div class="button labelled next">
            <span>Next</span>
        </div>
    </span>
    <script>
        riot.mount('paginator');
        this.show = function () {
            this.isShown = this.isShown
                ? false
                : true;
        }
    </script>
</menu-toolbar>
