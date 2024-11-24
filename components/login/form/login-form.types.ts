import { signIn } from "@/lib/auth";
import { ActionPrevState } from "@/types/actions";
import { loginAction } from "./login-form.action";

export type LoginFormViewProps = {
  action: typeof loginAction
}

export type ActionInjections = {
  signIn: typeof signIn
}

export type LoginFormData = {
  email: string;
  password: string;
}

export type LoginFormPrevState = ActionPrevState<LoginFormData>