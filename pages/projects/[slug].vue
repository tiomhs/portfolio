<script setup>
const route = useRoute()
const { getProjectBySlug } = useProjects()
const { data: project, pending: loading } = await useAsyncData(`project-${route.params.slug}`, () => getProjectBySlug(route.params.slug))

useHead({
  title: project.value ? `${project.value.title} | Portfolio` : 'Project Detail',
})
</script>

<template>
  <div class="min-h-screen pb-32">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="w-10 h-10 border-4 border-zinc-100 border-t-amber-500 rounded-full animate-spin"></div>
    </div>

    <main v-else-if="project" class="relative">
      <!-- Header -->
      <header class="relative pt-20 md:pt-32 pb-20 px-4 text-center">
        <div class="absolute inset-0 z-0 opacity-10">
           <img v-if="project.image_urls?.[0]" :src="project.image_urls[0]" class="w-full h-full object-cover blur-3xl scale-110" />
        </div>
        
        <div class="max-w-4xl mx-auto relative z-10">
          <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-10 group text-[10px] font-black uppercase tracking-widest">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Collection
          </NuxtLink>
          
          <h1 class="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter mb-6 leading-[0.9]">
            {{ project.title }}
          </h1>
          <p class="text-lg md:text-2xl text-amber-600 font-bold uppercase tracking-[0.3em] mb-12">{{ project.subtitle }}</p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4 px-4">
             <a v-if="project.live_url" :href="project.live_url" target="_blank" class="px-10 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-400/20">
                Launch Project
             </a>
             <a v-if="project.github_url" :href="project.github_url" target="_blank" class="px-10 py-4 bg-white text-zinc-900 font-bold rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all shadow-lg">
                View Source
             </a>
          </div>
        </div>
      </header>

      <!-- Images -->
      <section class="max-w-6xl mx-auto px-4 mb-32">
        <div class="grid grid-cols-1 gap-12">
          <div v-for="(url, index) in project.image_urls" :key="index" class="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-zinc-200/50 border border-zinc-100">
             <img :src="url" class="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <!-- Details -->
      <section class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div class="lg:col-span-2 space-y-16">
            <div>
              <h2 class="text-xs font-black uppercase tracking-[0.5em] text-amber-600 mb-8">Concept & Execution</h2>
              <p class="text-xl md:text-2xl text-zinc-500 leading-relaxed font-medium whitespace-pre-wrap">
                {{ project.description }}
              </p>
            </div>

            <div v-if="project.tech_stack?.length">
              <h2 class="text-xs font-black uppercase tracking-[0.5em] text-amber-600 mb-8">Architecture</h2>
              <div class="flex flex-wrap gap-4">
                <span v-for="tech in project.tech_stack" :key="tech" class="px-6 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-black text-zinc-900 uppercase tracking-widest">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <aside class="space-y-12">
             <div class="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40">
                <h3 class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8">Metadata</h3>
                <div class="space-y-8">
                  <div>
                    <div class="text-[9px] text-zinc-400 font-black uppercase tracking-widest mb-2">My Role</div>
                    <div class="text-xl font-black text-zinc-900">{{ project.role }}</div>
                  </div>
                  <div>
                    <div class="text-[9px] text-zinc-400 font-black uppercase tracking-widest mb-2">Build Type</div>
                    <div class="text-xl font-black text-zinc-900">{{ project.is_featured ? 'Core System' : 'Regular Build' }}</div>
                  </div>
                  <div>
                    <div class="text-[9px] text-zinc-400 font-black uppercase tracking-widest mb-2">Released</div>
                    <div class="text-xl font-black text-zinc-900">{{ new Date(project.created_at).getFullYear() }}</div>
                  </div>
                </div>
             </div>
             
             <!-- Balinese Motif Accent -->
             <div class="opacity-[0.05] text-zinc-900 flex justify-center">
                <svg class="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                   <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
                   <path d="M 50 10 L 50 90 M 10 50 L 90 50" stroke="currentColor" stroke-width="1" />
                </svg>
             </div>
          </aside>
        </div>
      </section>
    </main>
  </div>
</template>
