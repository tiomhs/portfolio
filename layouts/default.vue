<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-100">
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow w-full">
        <slot />
      </main>
      
      <footer class="text-center py-20 text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] mt-auto">
        &copy; {{ new Date().getFullYear() }} Tio Mahesa &bull; Harmony in Code
      </footer>
    </div>
  </div>
</template>

<style>
/* Clean reset for the new design */
body {
  @apply bg-white;
  margin: 0;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
