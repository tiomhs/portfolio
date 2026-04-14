export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  // Jika tidak ada user (belum login) dan mencoba mengakses route admin, redirect ke login
  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/login')
  }

  // Jika sudah login dan mencoba mengakses page login, redirect ke admin
  if (user.value && to.path === '/login') {
    return navigateTo('/admin')
  }
})
