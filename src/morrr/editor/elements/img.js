"use realm";
import lodash as _, sharedImagePath, from morrr.editor.utils;

const ImgTag = {
   tag: 'figure',
   menu: false,
   toProduction: function(data, opts) {
      opts = opts || {};
      var alt = opts.imageTitle;
      var query = opts.query;
      var imgString = [];
      _.each(query, function(value, key) {
         if (key.indexOf("img") === 0) {
            imgString.push(key.split("img-")[1] + "=" + value);
         }

      });
      imgString = imgString.join('&');

      var img = sharedImagePath(data.attrs.id) + (imgString ? "?" + imgString : '');
      var html = '<figure data-id="' + data.attrs.id + '"><img ' + (alt ? 'alt="' + alt + '" ' : '') + 'src="' + img + '">';
      if (data.attrs.caption) {
         html += '<figcaption>' + data.attrs.caption + '</figcaption>';
      }
      return html;
   }
}
export ImgTag;
