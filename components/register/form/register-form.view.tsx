'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from 'next/form';
import { useActionState } from 'react';
import { RegisterFormPrevState, RegisterFormViewProps } from './register-form.types';

const initialFormState: RegisterFormPrevState = {}

export const RegisterFormView = ({ action }: RegisterFormViewProps) => {
  const [formState, formAction, isPending ] = useActionState(action, initialFormState)

  return (
    <Form action={formAction}>
      {formState.success === true && formState.message && (
        <div>
          <p className="text-sm text-green-500 p-2 border border-green-500 rounded-md bg-green-200  mb-4">{formState.message}</p>
        </div>
      )}
      {formState.success === false && (
        <div>
          <p className="text-sm text-red-500 p-2 border border-red-500 rounded-md bg-red-200  mb-4">{formState.message}</p>
        </div>
      )}

      <div>
        <Label>Nome</Label>
        <Input type="text" name="name" placeholder="Fulano de Tal" defaultValue={formState.data?.name} />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" name="email" placeholder="eu@exemplo.com" defaultValue={formState.data?.email} />
      </div>
      <div>
        <Label>Senha</Label>
        <Input type="password" name="password" placeholder="********" defaultValue={formState.data?.password} />
      </div>
      <div>
        <Button className="w-full mt-6" type="submit" disabled={isPending}>
          Registrar
        </Button>
      </div>
    </Form>
  )
}
