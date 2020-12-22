module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.name = data.name ? data.name : null;
      this.stock = data.stock ? data.stock : null;
      this.deleted = data.deleted ? data.deleted : null;
      this.merchant_id = data.merchant_id ? data.merchant_id : null;
   }
};