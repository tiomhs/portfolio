<template>
  <div class="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-amber-900 selection:text-white">
    <!-- Subtle Poleng Pattern Background -->
    <div class="fixed inset-0 z-0 bg-poleng mix-blend-screen pointer-events-none opacity-50"></div>
    <!-- Subtle glow background matching new theme -->
    <div class="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.05),rgba(255,255,255,0))] mix-blend-screen pointer-events-none"></div>
    
    <!-- Surya Majapahit / Balinese Mandala Watermark -->
    <div class="fixed -bottom-40 -right-40 z-0 w-[800px] h-[800px] opacity-[0.02] text-amber-500 pointer-events-none" style="animation: spin 90s linear infinite;">
      <svg viewBox="0 0 100 100" fill="currentColor" class="w-full h-full">
        <path d="M50 0 L55 35 L90 10 L65 45 L100 50 L65 55 L90 90 L55 65 L50 100 L45 65 L10 90 L35 55 L0 50 L35 45 L10 10 L45 35 Z" />
        <circle cx="50" cy="50" r="20" fill="transparent" stroke="currentColor" stroke-width="1.5" />
        <circle cx="50" cy="50" r="14" fill="transparent" stroke="currentColor" stroke-width="1" />
      <circle cx="50" cy="50" r="8" fill="currentColor" />
      </svg>
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        <slot />
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
/* Poleng Pattern: A modern dark representation of the traditional Balinese Rwa Bhineda checkerboard */
.bg-poleng {
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.02)), 
    linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.02));
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
