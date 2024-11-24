import { compareHash, generateHash } from "@/lib/hash";
import { IUserRepository } from "@/repositories/user/user-repository.types";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { UserAlreadyExistisException } from "../exceptions/UserAlreadyExistisException";
import { CreateUserParams, CreateUserReturn, IUserService, LoginParams, LoginReturn } from "./user-service.types";

export class UserService implements IUserService {

  constructor(private readonly _userRepository: IUserRepository) { }

  /**
   * Creates a new instance of UserService.
   *
   * @param {IUserRepository} userRepository - The user repository instance to be used by the service.
   * @returns {UserService} A new instance of UserService.
   */
  static new(userRepository: IUserRepository) {
    return new UserService(userRepository);
  }

  /**
   * Creates a new user with the given data.
   *
   * @param {CreateUserParams} params - The data to be used to create the user.
   * @returns {Promise<CreateUserReturn>} The created user.
   * @throws {UserAlreadyExistisException} If the user already exists.
   */
  async create(params: CreateUserParams): Promise<CreateUserReturn> {
    const { user } = params;

    const existingUser = await this._userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new UserAlreadyExistisException('Usuário já cadastrado');
    }

    const createdUser = await this._userRepository.create({
      ...user,
      password: generateHash(user.password)
    });
    return createdUser
  }


  /**
   * Authenticates a user given the email and password.
   *
   * @param {LoginParams} params - The email and password to be used to authenticate the user.
   * @returns {Promise<LoginReturn>} The authenticated user.
   * @throws {InvalidCredentialsException} If the user or password is invalid.
   */
  async login(params: LoginParams): Promise<LoginReturn> {
    const { email, password } = params
    const foundUser = await this._userRepository.findByEmail(email)

    if (!foundUser || !compareHash(password, foundUser.password)) {
      throw new InvalidCredentialsException('Usuário ou senha inválidos');
    }

    return foundUser;
  }
}