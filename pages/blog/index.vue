<template>
  <div class="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-amber-900 selection:text-white">
    <Navbar />
    
    <main class="max-w-6xl mx-auto px-6 py-24">
      <!-- Header -->
      <header class="mb-16 text-center max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Jurnal <span class="text-amber-500">&</span> Artikel</h1>
        <p class="text-zinc-400 text-lg">Berbagi pemikiran, tutorial, dan pengalaman seputar pengembangan web dan teknologi terbaru.</p>
      </header>

      <!-- Categories Filter (Simplified) -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button 
          @click="selectedCategory = 'All'" 
          :class="selectedCategory === 'All' ? 'bg-amber-500 text-zinc-950 border-amber-500' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-amber-500/50'"
          class="px-5 py-2 rounded-full text-sm font-semibold border transition-all shadow-lg"
        >
          Semua
        </button>
        <button 
          v-for="cat in categories" :key="cat"
          @click="selectedCategory = cat" 
          :class="selectedCategory === cat ? 'bg-amber-500 text-zinc-950 border-amber-500' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-amber-500/50'"
          class="px-5 py-2 rounded-full text-sm font-semibold border transition-all shadow-lg"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-zinc-900/50 rounded-3xl p-4 border border-white/5 animate-pulse">
          <div class="aspect-video bg-zinc-800 rounded-2xl mb-4"></div>
          <div class="h-6 bg-zinc-800 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-zinc-800 rounded w-full mb-2"></div>
          <div class="h-4 bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Blog Grid -->
      <div v-else-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          :to="`/blog/${blog.slug}`"
          class="group bg-zinc-900/30 hover:bg-zinc-900/50 rounded-3xl p-4 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col h-full shadow-xl hover:shadow-amber-500/5"
        >
          <!-- Cover -->
          <div class="aspect-video rounded-2xl overflow-hidden mb-6 relative">
            <img 
              v-if="blog.cover_image" 
              :src="blog.cover_image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div v-else class="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
               <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>
            <div class="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-zinc-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
               {{ blog.category }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex-grow flex flex-col">
            <div class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
               <span class="w-1 h-1 rounded-full bg-amber-500"></span>
               {{ new Date(blog.published_at || blog.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors leading-tight">{{ blog.title }}</h3>
            <p class="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-6">{{ blog.excerpt }}</p>
            
            <div class="mt-auto flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                 <span v-for="tag in blog.tags?.slice(0, 2)" :key="tag" class="text-[10px] text-zinc-500 italic">#{{ tag }}</span>
              </div>
              <div class="text-amber-500 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Baca Selengkapnya
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
        <p class="text-zinc-500">Belum ada artikel yang dipublikasikan untuk kategori ini.</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12 bg-zinc-950">
       <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-zinc-500 text-sm">© {{ new Date().getFullYear() }} Tio Mahesa. All rights reserved.</p>
       </div>
    </footer>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const blogs = ref([])
const loading = ref(true)
const selectedCategory = ref('All')

const categories = ['Tech', 'Dev', 'Design', 'Life', 'Tutorial']

const fetchBlogs = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  
  if (data) blogs.value = data
  loading.value = false
}

const filteredBlogs = computed(() => {
  if (selectedCategory.value === 'All') return blogs.value
  return blogs.value.filter(b => b.category === selectedCategory.value)
})

onMounted(() => {
  fetchBlogs()
})

useHead({
  title: 'Blog | Tio Mahesa',
  meta: [
    { name: 'description', content: 'Kumpulan artikel dan jurnal teknologi oleh Tio Mahesa.' }
  ]
})
</script>
