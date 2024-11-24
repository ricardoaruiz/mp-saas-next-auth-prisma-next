import { User } from "@/domain/user-domain";

export interface IUserService {
  create(params: CreateUserParams): Promise<CreateUserReturn>
  login(params: LoginParams): Promise<LoginReturn>
}

export type CreateUserParams = {
  user: Omit<User, 'id'>
}
export type CreateUserReturn = User

export type LoginParams = {
  email: string
  password: string
}
export type LoginReturn = Omit<User, 'password'>