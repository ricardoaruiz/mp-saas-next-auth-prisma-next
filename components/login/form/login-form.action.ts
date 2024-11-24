'use server';

import { APP_ROUTES } from "@/routes";
import { InvalidCredentialsException } from "@/services/exceptions/InvalidCredentialsException";
import { ServiceFactory } from "@/services/service-factory";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ActionInjections, LoginFormData, LoginFormPrevState } from "./login-form.types";

export async function loginActionWithInjections(
  injections: ActionInjections,
  _prevState: LoginFormPrevState,
  formData: FormData
) {
  const data = Object.fromEntries(formData) as LoginFormData
  const { userService } = injections

  try {
    const { email, password } = data

    if (!email || !password) {
      return {
        data,
        success: false,
        message: "Preencha todos os campos"
      }
    }

    await userService.login({ email, password })

    return redirect(APP_ROUTES.DASHBOARD)
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsException) {
      return {
        data,
        success: false,
        message: error.message
      }
    }

    if (isRedirectError(error)) {
      throw error
    }

    return {
      data,
      success: false,
      message: "Ops... Ocorreu um erro ao efetuar o login!"
    }
  }
}

export const loginAction = loginActionWithInjections.bind(null, {
  userService: ServiceFactory.userService()
})