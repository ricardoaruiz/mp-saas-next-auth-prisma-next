import { IUserService } from "@/services/user/user-service.types";
import { ActionPrevState } from "@/types/actions";
import { registerUser } from "./register-form.actions";

export type RegisterFormViewProps = {
  action: typeof registerUser
}

// Actions
export type ActionInjections = {
  userService: IUserService
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
}

export type RegisterFormPrevState = ActionPrevState<RegisterFormData>