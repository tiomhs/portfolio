<script setup>
const supabase = useSupabaseClient()
const { getFeaturedProjects } = useProjects()

// Fetch Data dari Supabase
const { data: experiences } = await useAsyncData('experiences', async () => {
  const { data } = await supabase.from('experiences').select('*').order('created_at', { ascending: false })
  return data || []
})

const { data: featuredProjects } = await useAsyncData('featured-projects', () => getFeaturedProjects())

useHead({
  title: 'Tio Mahesa | Portfolio 2025',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { href: 'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap', rel: 'stylesheet' }
  ]
})

const softwares = [
  { name: 'Figma', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
  { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
  { name: 'Docker', icon: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg' },
  { name: 'GitHub', icon: 'https://www.vectorlogo.zone/logos/github/github-icon.svg' }
]

const projectColors = [
  'bg-[#4A90E2]', // Blue
  'bg-[#E8D5C4]', // Beige
  'bg-[#76BA99]', // Green
  'bg-[#EB5757]', // Red
  'bg-[#8F94FB]'  // Lavender
]
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-['Inter'] selection:bg-amber-100 pb-32 overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 flex flex-col items-center justify-center text-center">
       <div class="relative">
          <h1 class="text-[12rem] md:text-[20rem] font-['Passion_One'] font-black leading-[0.75] tracking-tighter text-black select-none">
            PORT<br/>FOLIO
          </h1>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] z-10">
             <img src="/hero_illustration_1776863802651.png" alt="Illustration" class="w-full h-auto drop-shadow-2xl" />
          </div>
          <div class="absolute top-[20%] -right-10 md:-right-20">
             <span class="text-amber-600 font-['Passion_One'] text-4xl md:text-6xl tracking-widest opacity-40">'25</span>
          </div>
       </div>
       <div class="mt-8 text-center">
          <p class="text-zinc-400 font-black tracking-[0.4em] uppercase text-xl">Tio Mahesa</p>
       </div>
    </section>

    <!-- Intro Section -->
    <section class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
       <div class="relative group">
          <!-- Lanyard / ID Card Visual -->
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-px h-32 bg-zinc-200"></div>
          <div class="relative bg-white p-4 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 max-w-[320px] mx-auto">
             <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-50 mb-4">
                <img src="/id_card_photo_1776863825924.png" class="w-full h-full object-cover" />
             </div>
             <div class="text-center pb-2">
                <div class="h-1.5 w-12 bg-zinc-100 rounded-full mx-auto mb-3"></div>
                <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400">Software Developer</p>
             </div>
          </div>
       </div>

       <div>
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight text-zinc-900">
            HI, I'm <span class="text-amber-600">Tio</span>
          </h2>
          <p class="text-xl text-zinc-500 leading-relaxed font-medium mb-12 italic">
            I am a Backend Developer driven by curiosity and precision. My goal is to build systems that aren't just functional, but feel effortless and reliable. If the architecture makes sense without overcomplicating, I've done my job.
          </p>
          
          <div class="grid grid-cols-2 gap-12 pt-12 border-t border-zinc-100">
             <div>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-zinc-300 mb-6">Experience</h3>
                <div class="space-y-6">
                   <div v-for="exp in experiences.slice(0, 3)" :key="exp.id">
                      <div class="font-bold text-sm text-zinc-900 leading-tight mb-1">{{ exp.role }} at {{ exp.company }}</div>
                      <div class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{{ exp.year }}</div>
                   </div>
                </div>
             </div>
             <div>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-zinc-300 mb-6">Contact</h3>
                <div class="space-y-4 text-sm font-bold text-zinc-500">
                   <a href="#" class="flex items-center gap-3 hover:text-amber-600 transition-colors">
                      <img src="https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" class="w-4 h-4 grayscale" />
                      LinkedIn
                   </a>
                   <a href="#" class="flex items-center gap-3 hover:text-amber-600 transition-colors">
                      <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" class="w-4 h-4 grayscale" />
                      GitHub
                   </a>
                   <a href="mailto:tiomahesa.work@gmail.com" class="flex items-center gap-3 hover:text-amber-600 transition-colors">
                      <img src="https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg" class="w-4 h-4 grayscale" />
                      Email
                   </a>
                </div>
                <div class="mt-10">
                   <h3 class="text-xs font-black uppercase tracking-[0.3em] text-zinc-300 mb-6">Softwares</h3>
                   <div class="flex flex-wrap gap-4">
                      <img v-for="s in softwares" :key="s.name" :src="s.icon" :title="s.name" class="w-6 h-6 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Projects Section -->
    <section class="max-w-7xl mx-auto px-4 pb-40">
       <div class="text-center mb-24 relative">
          <h2 class="text-[12rem] md:text-[18rem] font-['Passion_One'] leading-none text-transparent border-text select-none">CONTENT</h2>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div class="grid grid-cols-3 md:grid-cols-5 gap-20 opacity-20">
                <span v-for="i in 5" :key="i" class="text-4xl md:text-6xl font-['Passion_One'] text-amber-600">0{{ i }}</span>
             </div>
          </div>
       </div>

       <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
          <NuxtLink v-for="(project, index) in featuredProjects.slice(0, 5)" :key="project.id" :to="`/projects/${project.slug}`" class="group flex flex-col">
             <div :class="projectColors[index % projectColors.length]" class="relative aspect-[1/3] rounded-[2rem] p-6 overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                <!-- Device Visual -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] transform group-hover:scale-105 transition-transform duration-700">
                   <img v-if="project.image_urls?.[0]" :src="project.image_urls[0]" class="w-full h-auto rounded-3xl shadow-2xl rotate-[-10deg] group-hover:rotate-0 transition-transform" />
                </div>
                <!-- Project Number -->
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-['Passion_One'] text-9xl opacity-40 group-hover:opacity-100 transition-opacity">
                   {{ index + 1 }}
                </div>
             </div>
             <div class="mt-8 px-4">
                <h4 class="text-lg font-black text-zinc-900 uppercase tracking-tighter">{{ project.title }}</h4>
                <p class="text-xs text-zinc-400 font-medium leading-relaxed mt-2 line-clamp-2 italic">{{ project.subtitle }}</p>
             </div>
          </NuxtLink>
       </div>
    </section>
  </div>
</template>

<style scoped>
.border-text {
  -webkit-text-stroke: 2px #f4f4f5;
}

@media (max-width: 768px) {
  h1 { font-size: 8rem; }
  .border-text { font-size: 8rem; }
}
</style>