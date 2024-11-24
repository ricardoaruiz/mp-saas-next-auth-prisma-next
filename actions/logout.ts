'use server'

import { signOut } from "@/lib/auth";
import { APP_ROUTES } from "@/routes";

export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: APP_ROUTES.LOGIN
  });
}