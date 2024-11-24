export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/cadastro',
  DASHBOARD: '/dashboard',
}

export const PUBLIC_ROUTES = [APP_ROUTES.LOGIN, APP_ROUTES.REGISTER]
export const PRIVATE_ROUTES = [APP_ROUTES.DASHBOARD]