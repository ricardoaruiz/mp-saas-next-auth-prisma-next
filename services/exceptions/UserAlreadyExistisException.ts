export class UserAlreadyExistisException extends Error {
  constructor(message: string) {
    super(message);
  }
}