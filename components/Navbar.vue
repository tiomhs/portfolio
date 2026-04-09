<template>
  <nav class="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
    <!-- Balinese Tridatu Accent Line -->
    <div class="absolute top-0 left-0 w-full h-[2px] flex opacity-80">
      <div class="w-1/3 bg-red-600"></div>
      <div class="w-1/3 bg-slate-100"></div>
      <div class="w-1/3 bg-zinc-900"></div>
    </div>
    <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-xl tracking-tight text-white group flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
          <span class="text-white text-sm font-black">TM</span>
        </div>
        <span>Tio Mahesa<span class="text-amber-500">.</span></span>
      </NuxtLink>
      <div class="flex items-center gap-8 text-sm font-medium">
        <NuxtLink to="/" class="text-slate-400 hover:text-white transition-colors py-2 relative group" exact-active-class="!text-white">
          Beranda
          <span class="absolute -bottom-[19px] left-0 w-full h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full"></span>
        </NuxtLink>
        <NuxtLink to="/projects" class="text-slate-400 hover:text-white transition-colors py-2 relative group" exact-active-class="!text-white">
          Proyek
          <span class="absolute -bottom-[19px] left-0 w-full h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full"></span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Active link styles using NuxtLink's exact-active-class fallback */
a.router-link-active {
  color: white;
}
a.router-link-active span.bg-amber-500 {
  transform: scaleX(1);
}
</style>