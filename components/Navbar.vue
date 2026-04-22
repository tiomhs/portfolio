<template>
  <nav class="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300" :class="[scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent']">
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <div class="bg-zinc-950 text-white font-['Passion_One'] px-2 py-1 rounded-lg text-xl tracking-tighter group-hover:scale-110 transition-transform">TM.</div>
      <span class="font-black text-xs uppercase tracking-widest text-zinc-900 hidden sm:block">Portfolio 2025</span>
    </NuxtLink>
    
    <div class="flex gap-6 sm:gap-10">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-zinc-950 transition-colors py-2 relative group" exact-active-class="!text-zinc-900">
        {{ link.label }}
        <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" :class="{'scale-x-100': $route.path === link.to}"></span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const scrolled = ref(false)
const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Works' },
  { to: '/blog', label: 'Blog' }
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})
</script>