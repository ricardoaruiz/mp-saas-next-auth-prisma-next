import { User } from "@/domain/user-domain";

export interface IUserRepository {
  create(user: CreateUser): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export type CreateUser = Omit<User, 'id'>