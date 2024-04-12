/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import AuthService from '@/services/AuthService'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})
router.addRoute('LoginPage', { path: '/login', component: ()=>import("@/components/LoginPage.vue") })
router.addRoute('RegisterPage', { path: '/register', component: ()=>import("@/components/RegisterPage.vue") })
// router.addRoute('LoginPage', { path: '/login', component: LoginPage })

export default router
