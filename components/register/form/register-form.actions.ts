'use server';

import { UserAlreadyExistisException } from "@/services/exceptions/UserAlreadyExistisException";
import { ServiceFactory } from "@/services/service-factory";
import { ActionInjections, RegisterFormData, RegisterFormPrevState } from "./register-form.types";

/**
 * Registers a user given the form data.
 *
 * @param {ActionInjections} injections - Dependencies.
 * @param {RegisterFormPrevState} _prevState - Previous state.
 * @param {FormData} formData - Form data.
 * @returns {Promise<RegisterFormPrevState>} The new state.
 */
export async function registerUserWithInjections(
  injections: ActionInjections,
  _prevState: RegisterFormPrevState,
  formData: FormData
): Promise<RegisterFormPrevState> {
  const data = Object.fromEntries(formData) as RegisterFormData

  try {

    if (!data.name || !data.email || !data.password) {
      return {
        data,
        success: false,
        message: "Preencha todos os campos"
      }
    }

    await injections.userService.create({
      user: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })

    return {
      success: true,
      message: "Cadastro realizado com sucesso"
    }
  } catch (error: unknown) {
    if (error instanceof UserAlreadyExistisException) {
      return {
        data,
        success: false,
        message: error.message
      }
    }

    return {
      data,
      success: false,
      message: "Erro ao cadastrar usuário"
    }
  }
}

export const registerUser = registerUserWithInjections.bind(null, {
  userService: ServiceFactory.userService()
})