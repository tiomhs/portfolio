<template>
  <div class="min-h-screen pb-32">
    <main class="max-w-6xl mx-auto px-4 py-20 md:py-32">
      <!-- Header -->
      <header class="mb-24 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
           <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
           Knowledge Base
        </div>
        <h1 class="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter mb-8 leading-none">
          Journal & <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-700">Insights</span>
        </h1>
        <p class="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed italic">"Documenting the architecture of systems and the philosophy of development."</p>
      </header>

      <!-- Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-24">
        <button 
          v-for="cat in ['All', ...categories]" :key="cat"
          @click="selectedCategory = cat" 
          :class="selectedCategory === cat ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-400/20' : 'bg-white text-zinc-400 hover:text-zinc-900 shadow-md border border-zinc-100'"
          class="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="i in 6" :key="i" class="bg-zinc-50 rounded-[2.5rem] animate-pulse h-[450px]"></div>
      </div>

      <!-- Grid -->
      <div v-else-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <NuxtLink 
          v-for="blog in filteredBlogs" 
          :key="blog.id" 
          :to="`/blog/${blog.slug}`"
          class="group flex flex-col h-full bg-white rounded-[3rem] border border-zinc-100 p-8 shadow-xl shadow-zinc-200/40 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500"
        >
          <div class="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 relative bg-zinc-50">
            <img 
              v-if="blog.cover_image" 
              :src="blog.cover_image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" 
            />
            <div class="absolute inset-0 bg-amber-900/5 group-hover:opacity-0 transition-opacity"></div>
          </div>

          <div class="flex-grow flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-black text-amber-600 uppercase tracking-widest">{{ blog.category }}</span>
              <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{{ new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }}</span>
            </div>
            <h3 class="text-3xl font-black text-zinc-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight tracking-tighter">{{ blog.title }}</h3>
            <p class="text-zinc-500 text-sm line-clamp-3 leading-relaxed mb-10 font-medium italic">"{{ blog.excerpt }}"</p>
            
            <div class="mt-auto flex items-center justify-between pt-8 border-t border-zinc-50">
              <div class="flex flex-wrap gap-3">
                 <span v-for="tag in blog.tags?.slice(0, 2)" :key="tag" class="text-[9px] text-zinc-300 font-black uppercase tracking-widest">#{{ tag }}</span>
              </div>
              <div class="text-zinc-900 text-[10px] font-black uppercase tracking-widest group-hover:text-amber-600 transition-all flex items-center gap-1">
                Open Article
                <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-40 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
        <p class="text-zinc-400 font-bold uppercase tracking-widest">No articles found.</p>
      </div>
    </main>
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
  const { data } = await supabase
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
  title: 'Journal | Tio Mahesa',
})
</script>
