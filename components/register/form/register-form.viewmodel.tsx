'use client';

import { registerUser } from './register-form.actions';
import { RegisterFormView } from './register-form.view';

export const RegisterFormViewModel = () => {
  return (
    <RegisterFormView action={registerUser} />
  )
}
