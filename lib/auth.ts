import { ServiceFactory } from "@/services/service-factory"
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const userCredentials = {
          email: credentials.email as string,
          password: credentials.password as string
        }

        const user = await ServiceFactory.userService().login(userCredentials)
        if (!user) return null

        return {
          id: String(user.id),
          email: user.email,
          name: user.name
        } as User
      },
    })
  ],
})