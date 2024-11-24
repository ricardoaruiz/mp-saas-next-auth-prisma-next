import { RepositoryFactory } from "@/repositories/repository-factory";
import { UserService } from "./user/user-service";

export class ServiceFactory {
  static userService() {
    return UserService.new(RepositoryFactory.userRespository());
  }
}