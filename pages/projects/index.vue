<script setup>
const { fetchProjects } = useProjects()
const { data: projects, pending: loading } = await useAsyncData('all-projects', () => fetchProjects())

useHead({
  title: 'Portfolio | Tio Mahesa',
  meta: [
    { name: 'description', content: 'Explore the digital works and systems built by Tio Mahesa.' }
  ]
})
</script>

<template>
  <div class="min-h-screen pb-32 px-4 md:px-0 pt-24">
    <!-- Header -->
    <header class="relative pt-12 md:pt-24 pb-20 text-center">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        Works Showcase
      </div>
      
      <h1 class="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter mb-6 leading-none">
        Karya & <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-700">Sistem</span>
      </h1>
      <p class="text-zinc-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
        Building robust solutions for complex problems. Here is a curated collection of my technical journey.
      </p>
    </header>

    <!-- Grid -->
    <div class="max-w-7xl mx-auto">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="i in 6" :key="i" class="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] animate-pulse"></div>
      </div>

      <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <NuxtLink 
          v-for="project in projects" 
          :key="project.id" 
          :to="`/projects/${project.slug}`"
          class="group flex flex-col h-full bg-white rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-amber-900/10"
        >
          <!-- Image -->
          <div class="relative aspect-[4/5] overflow-hidden bg-zinc-50 border-b border-zinc-100">
            <img 
              v-if="project.image_urls?.[0]" 
              :src="project.image_urls[0]" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
            
            <!-- Category Tag -->
            <div class="absolute top-8 left-8 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-[9px] font-black text-zinc-900 uppercase tracking-widest">
               {{ project.role }}
            </div>
          </div>

          <!-- Info -->
          <div class="p-10 flex flex-col flex-grow">
            <h3 class="text-3xl font-black text-zinc-900 mb-4 group-hover:text-amber-600 transition-colors tracking-tighter leading-tight">{{ project.title }}</h3>
            <p class="text-zinc-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3 italic">
              {{ project.description }}
            </p>
            
            <div class="mt-auto flex flex-wrap gap-2">
              <span v-for="tech in project.tech_stack?.slice(0, 4)" :key="tech" class="px-4 py-1.5 bg-zinc-50 rounded-xl text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:bg-amber-50 transition-colors">
                {{ tech }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-40 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
        <p class="text-zinc-400 font-bold uppercase tracking-widest">No projects found.</p>
      </div>
    </div>
  </div>
</template>