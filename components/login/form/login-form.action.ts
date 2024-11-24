'use server';

import { signIn } from "@/lib/auth";
import { APP_ROUTES } from "@/routes";
import { InvalidCredentialsException } from "@/services/exceptions/InvalidCredentialsException";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { ActionInjections, LoginFormData, LoginFormPrevState } from "./login-form.types";

export async function loginActionWithInjections(
  injections: ActionInjections,
  _prevState: LoginFormPrevState,
  formData: FormData
) {
  const data = Object.fromEntries(formData) as LoginFormData
  const { signIn } = injections

  try {
    const { email, password } = data

    if (!email || !password) {
      return {
        data,
        success: false,
        message: "Preencha todos os campos"
      }
    }

    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: APP_ROUTES.DASHBOARD
    })

    return {
      success: true
    }
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsException || error instanceof CredentialsSignin) {
      return {
        data,
        success: false,
        message: 'Usuário ou senha incorretos'
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

export const loginAction = loginActionWithInjections.bind(null, { signIn })