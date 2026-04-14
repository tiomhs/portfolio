<template>
  <div class="min-h-screen bg-zinc-950 font-sans text-zinc-300 selection:bg-amber-900 selection:text-white flex">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-zinc-900 border-r border-white/5 flex flex-col shrink-0 sticky top-0 h-screen transition-all">
      <div class="p-6 border-b border-white/5 flex justify-between items-center">
        <h2 class="font-bold text-xl text-white tracking-tight">Admin <span class="text-amber-500">Panel</span></h2>
      </div>
      
      <nav class="flex-grow p-4 space-y-1">
        <NuxtLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-amber-500/10 hover:text-amber-500" exact-active-class="bg-amber-500/20 text-amber-500 border border-amber-500/20">
          <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/projects" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-amber-500/10 hover:text-amber-500" active-class="bg-amber-500/20 text-amber-500 border border-amber-500/20">
          <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          Data Projects
        </NuxtLink>
        <NuxtLink to="/admin/experiences" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-amber-500/10 hover:text-amber-500" active-class="bg-amber-500/20 text-amber-500 border border-amber-500/20">
          <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Pengalaman (Karir)
        </NuxtLink>
        <NuxtLink to="/admin/education" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-amber-500/10 hover:text-amber-500" active-class="bg-amber-500/20 text-amber-500 border border-amber-500/20">
          <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
          Riwayat Pendidikan
        </NuxtLink>
        <NuxtLink to="/admin/skills" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-amber-500/10 hover:text-amber-500" active-class="bg-amber-500/20 text-amber-500 border border-amber-500/20">
          <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Skills / Keahlian
        </NuxtLink>
      </nav>
      
      <!-- Footer Sidebar Logout -->
      <div class="p-4 border-t border-white/5 space-y-2">
        <NuxtLink to="/" class="flex items-center justify-center gap-2 px-4 py-2 w-full rounded-lg text-xs font-semibold bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all border border-transparent">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali ke Depan
        </NuxtLink>
        <button @click="handleLogout" class="flex items-center justify-center gap-2 px-4 py-2.5 w-full rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Keluar Lengkap
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col relative w-full h-full min-h-screen bg-[#0a0a0a]">
      <!-- subtle texture background like frontend -->
       <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style="background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 20px);"></div>
      
      <!-- Header -->
      <header class="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <h1 class="text-white font-semibold flex items-center gap-2 text-lg">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span> Kontrol Panel
        </h1>
        <div class="flex items-center gap-4">
          <div class="text-sm text-zinc-400">Selamat datang, <span class="text-zinc-200">Admin</span></div>
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-zinc-800">TM</div>
        </div>
      </header>

      <!-- Scoped Pages Content -->
      <div class="p-8 pb-20 relative z-10 overflow-y-auto w-full">
        <slot />
      </div>

    </main>

  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
