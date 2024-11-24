import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Form from "next/form"
import { useActionState } from "react"
import { LoginFormPrevState, LoginFormViewProps } from "./login-form.types"

const initialFormState: LoginFormPrevState = {}

export const LoginFormView = ({ action }: LoginFormViewProps) => {
  const [formState, formAction, isPending ] = useActionState(action, initialFormState)

  return (
    <Form action={formAction}>
      {formState.success === false && (
        <div>
          <p className="text-sm text-red-500 p-2 border border-red-500 rounded-md bg-red-200  mb-4">{formState.message}</p>
        </div>
      )}

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
          Login
        </Button>
      </div>
    </Form>
  )
}
