import { IUserService } from "@/services/user/user-service.types";
import { ActionPrevState } from "@/types/actions";
import { loginAction } from "./login-form.action";

export type LoginFormViewProps = {
  action: typeof loginAction
}

export type ActionInjections = {
  userService: IUserService
}

export type LoginFormData = {
  email: string;
  password: string;
}

export type LoginFormPrevState = ActionPrevState<LoginFormData>