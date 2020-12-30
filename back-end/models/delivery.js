module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.pending = data.pending ? data.pending : null;
      this.order_id = data.order_id ? data.order_id : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
}