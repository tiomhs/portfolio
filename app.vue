<script setup>
useHead({
  title: 'Tio Mahesa | Back-End Developer',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  meta: [
    { name: 'description', content: 'Portfolio Tio Mahesa, seorang Back-End Developer & Mahasiswa Sistem Informasi yang membangun sistem andal dan performa tinggi.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white">
    <!-- Subtle glow background matching new theme -->
    <div class="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))] mix-blend-screen pointer-events-none"></div>
    
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        <NuxtPage />
      </main>
      
      <!-- Footer matches the new glass-like minimalistic theme -->
      <footer class="text-center py-8 text-zinc-500 text-sm mt-auto border-t border-white/5 backdrop-blur-sm bg-[#0a0a0a]/50">
        <div class="flex items-center justify-center gap-2 mb-3">
          <span class="relative flex h-2 w-2">
            <!-- Sleek pulse effect -->
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-zinc-100"></span>
          </span>
          <span class="text-zinc-400 font-light tracking-wide">Available for backend / fullstack roles</span>
        </div>
        &copy; {{ new Date().getFullYear() }} <span class="text-zinc-400 font-medium">I Gede Tio Mahesa Diputra</span>. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-[#0a0a0a];
  margin: 0;
}
</style>