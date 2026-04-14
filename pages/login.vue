<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-zinc-300 selection:bg-amber-900 font-sans p-6">
    <div class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.05),rgba(255,255,255,0))] mix-blend-screen pointer-events-none"></div>

    <div class="w-full max-w-md bg-zinc-900 border border-white/5 p-8 rounded-2xl shadow-2xl relative z-10">
      <div class="text-center mb-8">
        <div class="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">Admin Auth</h2>
        <p class="text-zinc-500 text-sm mt-1">Sistem Manajemen Portofolio Tio Mahesa</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1.5">Alamat Email</label>
          <input v-model="email" type="email" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-zinc-600" placeholder="admin@tiomahesa.dev" />
        </div>
        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1.5">Kata Sandi</label>
          <input v-model="password" type="password" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-zinc-600" placeholder="••••••••" />
        </div>

        <div v-if="errorMsg" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-start gap-2">
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ errorMsg }}
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-xl px-4 py-3.5 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span v-else>Masuk ke Dashboard</span>
          <svg v-if="!loading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false // Don't use any layout for login
})

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    errorMsg.value = ''
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    
    if (error) throw error
    
    // Sukses login
    router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message.includes('Invalid login credentials') 
        ? 'Kredensial tidak valid. Silakan cek kembali email dan password Anda.'
        : error.message
  } finally {
    loading.value = false
  }
}
</script>
