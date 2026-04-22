<template>
  <div class="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-amber-900 selection:text-white">
    <Navbar />
    
    <main v-if="blog" class="relative">
      <!-- Hero Section with Cover Image -->
      <div class="h-[60vh] relative overflow-hidden flex items-end">
        <div class="absolute inset-0 z-0">
          <img 
            v-if="blog.cover_image" 
            :src="blog.cover_image" 
            class="w-full h-full object-cover blur-[2px] scale-105 opacity-40" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 w-full pb-16 relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <span class="px-3 py-1 bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              {{ blog.category }}
            </span>
            <span class="text-zinc-500 text-xs uppercase tracking-widest font-bold">
               {{ new Date(blog.published_at || blog.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            {{ blog.title }}
          </h1>
          <p class="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            {{ blog.excerpt }}
          </p>
        </div>
      </div>

      <!-- Article Content -->
      <article class="max-w-4xl mx-auto px-6 py-16">
        <div class="bg-zinc-900/20 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <!-- Texture -->
           <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.015]" style="background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 20px);"></div>
           
           <div class="relative z-10 prose prose-invert prose-amber prose-lg max-w-none prose-headings:text-white prose-headings:tracking-tight prose-a:text-amber-500 prose-strong:text-zinc-100 prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl prose-img:rounded-3xl">
              <!-- Content Rendering (Simplified Markdown style) -->
              <div class="whitespace-pre-wrap leading-relaxed">{{ blog.content }}</div>
           </div>

           <!-- Tags -->
           <div v-if="blog.tags?.length" class="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-2">
              <span v-for="tag in blog.tags" :key="tag" class="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 font-medium">
                #{{ tag }}
              </span>
           </div>
        </div>

        <!-- Back Link -->
        <div class="mt-12 text-center">
           <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Kembali ke Blog
           </NuxtLink>
        </div>
      </article>
    </main>

    <!-- Not Found State -->
    <div v-else-if="!loading" class="min-h-screen flex items-center justify-center">
       <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-4">Artikel Tidak Ditemukan</h2>
          <NuxtLink to="/blog" class="text-amber-500 hover:underline">Kembali ke Blog</NuxtLink>
       </div>
    </div>

    <!-- Loading State -->
    <div v-else class="min-h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-zinc-800 border-t-amber-500 rounded-full animate-spin"></div>
    </div>

    <footer class="border-t border-white/5 py-12 bg-zinc-950">
       <div class="max-w-4xl mx-auto px-6 text-center">
          <p class="text-zinc-500 text-sm">© {{ new Date().getFullYear() }} Tio Mahesa. All rights reserved.</p>
       </div>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const blog = ref(null)
const loading = ref(true)

const fetchBlog = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', route.params.slug)
    .eq('is_published', true)
    .single()
  
  if (data) {
    blog.value = data
  }
  loading.value = false
}

onMounted(() => {
  fetchBlog()
})

// SEO
watch(blog, (newBlog) => {
  if (newBlog) {
    useHead({
      title: `${newBlog.title} | Tio Mahesa Blog`,
      meta: [
        { name: 'description', content: newBlog.excerpt },
        { property: 'og:title', content: newBlog.title },
        { property: 'og:description', content: newBlog.excerpt },
        { property: 'og:image', content: newBlog.cover_image },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    })
  }
})
</script>

<style>
/* Custom prose styles if needed */
.prose pre {
  padding: 1.5rem !important;
}
</style>
