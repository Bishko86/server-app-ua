class UserDto {
    constructor(model){
     this.email = model.email;
     this.id = model._id;
     this.status = model.status;
     this.confirmationCode = model.confirmationCode;
     this.roles = model.roles
    }
 }
 
 module.exports = UserDto;