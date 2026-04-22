<template>
  <div class="min-h-screen pb-32">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="w-10 h-10 border-4 border-zinc-100 border-t-amber-500 rounded-full animate-spin"></div>
    </div>

    <main v-else-if="blog" class="relative">
      <!-- Article Hero -->
      <div class="min-h-[70vh] relative overflow-hidden flex items-end pt-32">
        <div class="absolute inset-0 z-0">
          <img 
            v-if="blog.cover_image" 
            :src="blog.cover_image" 
            class="w-full h-full object-cover blur-[8px] scale-110 opacity-30" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/80 to-transparent"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 w-full pb-20 relative z-10">
          <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-10 group text-[10px] font-black uppercase tracking-widest">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Journal
          </NuxtLink>
          
          <div class="flex items-center gap-4 mb-8">
            <span class="px-6 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/20">
              {{ blog.category }}
            </span>
            <span class="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
               {{ new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </span>
          </div>
          
          <h1 class="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-[0.9] mb-10">
            {{ blog.title }}
          </h1>
          <p class="text-xl md:text-3xl text-zinc-500 font-medium max-w-3xl leading-relaxed italic border-l-4 border-amber-500 pl-8">
            "{{ blog.excerpt }}"
          </p>
        </div>
      </div>

      <!-- Article Content -->
      <article class="max-w-4xl mx-auto px-4 py-24">
        <div class="relative">
           <div class="relative z-10 prose prose-amber prose-xl max-w-none 
              prose-headings:text-zinc-900 prose-headings:tracking-tighter prose-headings:font-black
              prose-a:text-amber-600 prose-strong:text-zinc-900 prose-p:text-zinc-500 prose-p:leading-relaxed
              prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:border prose-img:border-zinc-100
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-3xl prose-pre:p-10 prose-pre:shadow-2xl">
              
              <div class="whitespace-pre-wrap leading-[1.8] font-medium">{{ blog.content }}</div>
           </div>

           <!-- Tags -->
           <div v-if="blog.tags?.length" class="mt-32 pt-16 border-t border-zinc-100 flex flex-wrap gap-3">
              <span v-for="tag in blog.tags" :key="tag" class="px-6 py-2.5 bg-zinc-50 border border-zinc-100 rounded-2xl text-[10px] text-zinc-400 font-black uppercase tracking-widest hover:text-amber-600 hover:border-amber-500/30 transition-all cursor-default">
                #{{ tag }}
              </span>
           </div>
        </div>

        <!-- Footer Card -->
        <div class="mt-32 p-12 md:p-20 rounded-[4rem] bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 flex flex-col items-center text-center relative overflow-hidden">
           <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-amber-500 to-orange-600"></div>
           
           <div class="w-24 h-24 rounded-3xl bg-zinc-950 flex items-center justify-center mb-10 shadow-xl rotate-3 group hover:rotate-0 transition-transform">
              <span class="text-3xl font-black text-white">TM</span>
           </div>
           <h4 class="text-3xl font-black text-zinc-900 mb-4 tracking-tighter">I Gede Tio Mahesa Diputra</h4>
           <p class="text-zinc-500 text-lg max-w-sm mb-12 font-medium leading-relaxed italic">"Simplicity is the ultimate sophistication in software design."</p>
           
           <NuxtLink to="/blog" class="inline-flex items-center gap-4 text-amber-600 font-black text-[10px] uppercase tracking-[0.4em] hover:tracking-[0.5em] transition-all group">
              <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Return to Journal Index
           </NuxtLink>
        </div>
      </article>
    </main>

    <!-- Scroll Progress -->
    <div class="fixed top-0 left-0 h-1 bg-amber-500 z-[100] transition-all duration-300" :style="{ width: scrollPercent + '%' }"></div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const blog = ref(null)
const loading = ref(true)
const scrollPercent = ref(0)

const fetchBlog = async () => {
  loading.value = true
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', route.params.slug)
    .eq('is_published', true)
    .single()
  
  if (data) blog.value = data
  loading.value = false
}

const handleScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollPercent.value = (winScroll / height) * 100
}

onMounted(() => {
  fetchBlog()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(blog, (newBlog) => {
  if (newBlog) {
    useHead({ title: `${newBlog.title} | Journal` })
  }
})
</script>
