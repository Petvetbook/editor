<paginator>
    <div class="paginator">
        <a class="item" page="1" style="display: none;">1</a>
        <a class="item" style="display: none;">...</a>
        <a class="item active" page="1">
            1
        </a>
        <a class="item " page="2">
            2
        </a>
        <a class="item " page="3">
            3
        </a>
        <a class="item " page="4">
            4
        </a>
        <a class="item " page="5">
            5
        </a>
        <a class="item " page="6">
            6
        </a>
        <a class="item " page="7">
            7
        </a>
        <a class="item " page="8">
            8
        </a>
        <a class="item " page="9">
            9
        </a>
        <a class="item " page="10">
            10
        </a>
        <a class="disabled item">...</a>
        <a class="item" page="50">
            50
        </a>
    </div>
    <script>
        // var needUpdate = true; var parent = this.parent; this.change = function (event) {     needUpdate = false;     var page = $(event.target).attr("page") * 1;     $pushState.merge({page: page});     self.trigger("page", page) } this.on("update",
        // function () {     if (needUpdate)         this.data = opts.data;     needUpdate = true; })
    </script>
</paginator>
