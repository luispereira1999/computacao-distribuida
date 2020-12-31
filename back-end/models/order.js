module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.accepted = data.accepted ? data.accepted : null;
      this.canceled = data.canceled ? data.canceled : null;
      this.product_id = data.product_id ? data.product_id : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
};