"use realm backend";

import Model from realm.mongo;

const UserImages = Model.extend({
   collection: "user_images",
   schema: {
      _id: [],
      parent: {
         required: true,
         reference: true,
         index: true
      },
      image: {
         required: true
      },
      created_time: {}
   },
   onBeforeCreate: function(resolve, reject) {
      this.attrs.created_time = new Date();
      return resolve();
   },
});
export UserImages
