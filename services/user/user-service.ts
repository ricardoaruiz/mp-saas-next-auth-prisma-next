import { generateHash } from "@/lib/hash";
import { IUserRepository } from "@/repositories/user/user-repository.types";
import { UserAlreadyExistisException } from "../exceptions/UserAlreadyExistisException";
import { CreateUserParams, CreateUserReturn, IUserService } from "./user-service.types";

export class UserService implements IUserService {

  constructor(private readonly _userRepository: IUserRepository) { }

  static new(userRepository: IUserRepository) {
    return new UserService(userRepository);
  }

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

}