class ConflictDataException extends Error{
    constructor(massge) {
        super(massge , {cause : 409})
    }
}
class BadRequestException extends Error {
  constructor(massge) {
    super(massge, { cause: 400 });
  }
}
class NotFoundException extends Error {
  constructor(massge) {
    super(massge, { cause: 404 });
  }
}
class UnAuthorizedException extends Error {
  constructor(massge) {
    super(massge, { cause: 401 });
  }
}