<template>
  <nav class="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
    <NuxtLink to="/" class="pointer-events-auto">
      <div class="text-white font-['Passion_One'] text-2xl tracking-tighter">TM.</div>
    </NuxtLink>
    
    <div class="flex gap-8 pointer-events-auto">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-white text-[10px] font-black uppercase tracking-[0.3em] hover:text-amber-500 transition-colors">
        {{ link.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Works' },
  { to: '/blog', label: 'Blog' }
]
</script>