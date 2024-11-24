import db from "@/lib/db";
import { UserRepository } from "./user/user-repository";

export class RepositoryFactory {
  static userRespository() {
    return UserRepository.new(db);
  }
}