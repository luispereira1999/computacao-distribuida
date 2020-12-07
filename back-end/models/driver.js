 module.exports = class {
    constructor(data) {
       this.id = data.id ? data.id : null;
       this.registration_request = data.registration_request ? data.registration_request : null;
       this.user_id = data.user_id ? data.user_id : null;
    }
 }