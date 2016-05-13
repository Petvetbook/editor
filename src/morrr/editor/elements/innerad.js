"use realm";

const InnerAd = {
   tag: 'div',
   menu: false,
   toBBCode: function(root) {},
   toProduction: function(item, opts) {
      var attrs = item.attrs;
      var html = ['<span class="recommended">' + attrs.caption + '</span><div class="blog-item"><a href="' + attrs.link +
         '"><figure class="profile-image">'
      ];
      html.push('<img src="' + attrs.img + '?width=525&height=450&mode=crop&quality=60"></img>');
      html.push('<figcaption>');
      html.push(' <span class="category" style="background-color: ' + attrs.catcolor + ';">' + attrs.catname + '</span>');
      html.push('<h2 class="title">' + attrs.title + '</h2>');
      html.push('</figcaption></figure></a></div>');
      return '<div class="blog-list article-inline-promo hide-desktop">' + html.join('')
   }
}

export InnerAd;
