<script setup>
const route = useRoute();
const { getProjectBySlug } = useProjects();

const project = getProjectBySlug(route.params.slug);

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found' });
}
</script>

<template>
  <div class="space-y-12 pb-16">
    <div class="pt-8 mb-4">
      <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Kembali ke Portofolio
      </NuxtLink>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-4 pb-12 flex flex-col items-start border-b border-slate-800">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        {{ project.subtitle }}
      </div>
      
      <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
        {{ project.title }}
      </h1>
      
      <p class="text-xl text-slate-300 max-w-4xl leading-relaxed mb-10">
        {{ project.desc }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent border border-slate-800 shadow-sm relative overflow-hidden group">
          <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Peran Utama
          </h3>
          <p class="text-lg text-white font-semibold">{{ project.role }}</p>
        </div>
        
        <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent border border-slate-800 shadow-sm relative overflow-hidden group">
          <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            Teknologi & Stack
          </h3>
          <div class="flex flex-wrap gap-2 relative z-10">
            <span v-for="tech in project.stack" :key="tech" class="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium shadow-sm hover:bg-slate-700 hover:text-white transition-colors cursor-default">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Presentation -->
    <section class="py-12">
      <!-- Image Placeholder (Since actual project screenshots are currently unavailable) -->
      <div class="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden relative group">
        <!-- Abstract background pattern placeholder -->
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#3b82f6 1px, transparent 1px); background-size: 32px 32px;"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <div class="relative z-10 text-center transform group-hover:scale-105 transition-transform duration-700">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border border-slate-700 mb-6 shadow-inner">
            <svg class="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Tampilan Visual Proyek</h2>
          <p class="text-slate-400 max-w-md mx-auto">Dokumentasi dan screenshot antarmuka sedang dipersiapkan untuk ditampilkan di halaman tunggal ini.</p>
        </div>
      </div>
    </section>
  </div>
</template>
