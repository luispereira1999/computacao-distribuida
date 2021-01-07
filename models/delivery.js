module.exports = class {
   constructor(data) {
      this.order_id = data.order_id ? data.order_id : null;
      this.pending = data.pending ? data.pending : null;
      this.complete = data.complete ? data.complete : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
}