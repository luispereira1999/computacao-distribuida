module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.accepted = data.accepted ? data.accepted : null;
      this.canceled = data.canceled ? data.canceled : null;
      this.client_id = data.client_id ? data.client_id : null;
      this.driver_id = data.driver_id ? data.driver_id : null;
   }
};