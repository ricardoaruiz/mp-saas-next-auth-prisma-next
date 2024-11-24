import { User } from "@/domain/user-domain";

export interface IUserService {
  create(params: CreateUserParams): Promise<CreateUserReturn>
}

export type CreateUserParams = {
  user: Omit<User, 'id'>
}
export type CreateUserReturn = User