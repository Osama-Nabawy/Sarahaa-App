export class ConflictDataException extends Error{
    constructor(massge) {
        super(massge , {cause : 409})
    }
}
export class BadRequestException extends Error {
  details;
  constructor(massge, details = []) {
    super(massge,details, { cause: 400 });
    this.details = details;
  }
  
}
export class NotFoundException extends Error {
  constructor(massge) {
    super(massge, { cause: 404 });
  }
}
export  class UnAuthorizedException extends Error {
  constructor(massge) {
    super(massge, { cause: 401 });
  }
}