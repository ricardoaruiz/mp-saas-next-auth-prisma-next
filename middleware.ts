import { auth } from "@/lib/auth";
import { APP_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes";

export default auth((req) => {
  const session = req.auth;

  if (!session && PRIVATE_ROUTES.includes(req.nextUrl.pathname)) {
    const newUrl = new URL(APP_ROUTES.LOGIN, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (session && PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const newUrl = new URL(APP_ROUTES.DASHBOARD, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}