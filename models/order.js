module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.address = data.address ? data.address : null;
      this.zip_code = data.zip_code ? data.zip_code : null;
      this.date = data.date ? data.date : null;
      this.vat = data.vat ? data.vat : null;
      this.pick_up_fee = data.pick_up_fee ? data.pick_up_fee : null;
      this.total = data.total ? data.total : null;
      this.accepted = data.accepted ? data.accepted : null;
      this.canceled = data.canceled ? data.canceled : null;
      this.product_id = data.product_id ? data.product_id : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
};