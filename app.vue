<script setup>
useHead({
  title: 'Tio Mahesa | Back-End Developer',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  meta: [
    { name: 'description', content: 'Portfolio Tio Mahesa, seorang Back-End Developer & Mahasiswa Sistem Informasi yang membangun sistem andal dan performa tinggi.' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  @apply bg-[#0a0a0a];
  margin: 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>