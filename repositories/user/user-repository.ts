import { User } from "@/domain/user-domain";
import db from "@/lib/db";
import { PrismaClient } from "@prisma/client/extension";
import { IUserRepository } from "./user-repository.types";

export class UserRepository implements IUserRepository {

  constructor(private readonly _db: typeof db) { }

  static new(db: PrismaClient) {
    return new UserRepository(db);
  }

  async create(user: User): Promise<User> {
    return this._db.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._db.user.findUnique({
      where: {
        email
      }
    })
  }

}