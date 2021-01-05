module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.name = data.name ? data.name : null;
      this.stock = data.stock ? data.stock : null;
      this.price = data.price ? data.price : null;
      this.description = data.description ? data.description : null;
      this.url_photo = data.url_photo ? data.url_photo : null;
      this.deleted = data.deleted ? data.deleted : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
};