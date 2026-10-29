import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import App from "../App"
import Dashboard from "../dashbaord"
import  Guard from "./gaurd"

const rootRoute = createRootRoute({
  component: ()=><Guard/>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

