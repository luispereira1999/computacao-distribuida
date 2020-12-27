module.exports = class {
   constructor(data) {
      this.id = data.id ? data.id : null;
      this.username = data.username ? data.username : null;
      this.password = data.password ? data.password : null;
      this.name = data.name ? data.name : null;
      this.surname = data.surname ? data.surname : null;
      this.email = data.email ? data.email : null;
      this.phone_number = data.phone_number ? data.phone_number : null;
      this.address = data.address ? data.address : null;
      this.zip_code = data.zip_code ? data.zip_code : null;
      this.nif = data.nif ? data.nif : null;
      this.description = data.description ? data.description : null;
      this.url_photo = data.url_photo ? data.url_photo : null;
      this.url_driving_license = data.url_driving_license ? data.url_driving_license : null;
      this.driving_license = data.driving_license ? data.driving_license : null;
      this.receive_advertising = data.receive_advertising ? data.receive_advertising : 0;
      this.old_type = data.old_type ? data.old_type : null;
      this.accepted = data.accepted ? data.accepted : null;
      this.locked = data.locked ? data.locked : null;
      this.deleted = data.deleted ? data.deleted : null;
      this.type = data.type ? data.type : null;
   }
};