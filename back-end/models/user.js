module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.username = data.username ? data.username : null;
      this.password = data.password ? data.password : null;
      this.name = data.name ? data.name : null;
      this.email = data.email ? data.email : null;
      this.birth_date = data.birth_date ? data.birth_date : null;
      this.gender = data.gender ? data.gender : null;
      this.phone_number = data.phone_number ? data.phone_number : null;
      this.city = data.city ? data.city : null;
      this.address = data.address ? data.address : null;
      this.zip_code = data.zip_code ? data.zip_code : null;
      this.nif = data.nif ? data.nif : null;
      this.accepted = data.accepted ? data.accepted : null;
      this.locked = data.locked ? data.locked : null;
      this.deleted = data.deleted ? data.deleted : null;
      this.type = data.type ? data.type : null;
   }
};