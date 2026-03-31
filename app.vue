<template>
  <div class="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
    <div class="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] mix-blend-screen pointer-events-none"></div>
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        <NuxtPage />
      </main>
      <footer class="text-center py-8 text-slate-500 text-sm mt-auto border-t border-slate-800/50 backdrop-blur-sm">
        <div class="flex items-center justify-center gap-2 mb-3">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-slate-400">Available for backend / fullstack roles</span>
        </div>
        &copy; {{ new Date().getFullYear() }} I Gede Tio Mahesa Diputra. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-slate-950;
  margin: 0;
}
</style>