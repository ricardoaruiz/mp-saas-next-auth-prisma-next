import { IUserService } from "@/services/user/user-service.types";
import { registerUser } from "./register-form.actions";

export type RegisterFormViewProps = {
  action: typeof registerUser
}

type FormPrevState<TData> = {
  success?: boolean;
  message?: string
  data?: TData
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

export type RegisterFormPrevState = FormPrevState<RegisterFormData>