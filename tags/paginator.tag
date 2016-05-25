<paginator>
   <div class="paginator">
      <a class="item" show={data.distantFirst} page="1" onclick={change}>1</a>

      <a class="item disabled" show={data.distantFirst}>...</a>

      <virtual each={ range in data.range}>
         <a class="item {active: range == parent.data.current}" page="{range}" onclick={change}>
            {range}
         </a>
      </virtual>

      <a if={data.distantLast} class="item disabled">...</a>
      <a class="item" show={data.distantLast} page="{data.distantLast}" onclick={change}>
         {data.distantLast}
      </a>
   </div>
   <script>
      var needUpdate = true;
      var parent = this.parent;
      this.change = function (event) {
         needUpdate = false;
         var page = $(event.target).attr("page") * 1;
         $pushState.merge({page: page});
         self.trigger("page", page)
      }
      this.on("update", function () {
         if (needUpdate)
            this.data = opts.data;
         needUpdate = true;
      })
   </script>
</paginator>
