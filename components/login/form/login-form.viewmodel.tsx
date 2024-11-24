'use client';

import { loginAction } from "./login-form.action";
import { LoginFormView } from "./login-form.view";

export const LoginFormViewModel = () => {
  return (
    <LoginFormView action={loginAction} />
  )
}
