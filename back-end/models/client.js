module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.user_id = data.user_id ? data.user_id : null;
   }
}