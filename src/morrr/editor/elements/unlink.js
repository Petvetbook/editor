"use realm";

const Unlink = {
   menu: true,
   inline: true,
   icon: 'unlink',
   hint: 'Remove link',
   cmd: function() {
      this.execCommand("unlink", false, []);
   }
}
export Unlink;
