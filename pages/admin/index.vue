<template>
  <div>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Ikhtisar Dashboard</h2>
      <p class="text-zinc-400">Pusat kendali untuk mengelola konten portfolio Anda.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <!-- Card Projects -->
      <div class="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          </div>
          <span class="text-2xl font-bold text-white">{{ stats.projects }}</span>
        </div>
        <div class="relative z-10">
          <h3 class="text-zinc-400 font-medium">Total Proyek</h3>
          <p class="text-xs text-zinc-500 mt-1">Dikelola di portofolio</p>
        </div>
      </div>

      <!-- Card Experience -->
      <div class="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="p-3 rounded-xl bg-green-500/10 text-green-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <span class="text-2xl font-bold text-white">{{ stats.experiences }}</span>
        </div>
        <div class="relative z-10">
          <h3 class="text-zinc-400 font-medium">Pengalaman Karir</h3>
          <p class="text-xs text-zinc-500 mt-1">Jejak profesional</p>
        </div>
      </div>

      <!-- Card Education -->
      <div class="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="p-3 rounded-xl bg-purple-500/10 text-purple-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>
          </div>
          <span class="text-2xl font-bold text-white">{{ stats.education }}</span>
        </div>
        <div class="relative z-10">
          <h3 class="text-zinc-400 font-medium">Riwayat Pendidikan</h3>
          <p class="text-xs text-zinc-500 mt-1">Latar belakang studi</p>
        </div>
      </div>

      <!-- Card Skills -->
      <div class="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="p-3 rounded-xl bg-amber-500/10 text-amber-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <span class="text-2xl font-bold text-white">{{ stats.skills }}</span>
        </div>
        <div class="relative z-10">
          <h3 class="text-zinc-400 font-medium">Keahlian (Skills)</h3>
          <p class="text-xs text-zinc-500 mt-1">Hard & soft skills</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h3 class="text-lg font-bold text-white mb-4">Aksi Cepat</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink to="/admin/projects" class="p-4 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex items-center justify-between group">
          <span class="font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">Tambah Proyek</span>
          <svg class="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </NuxtLink>
        <NuxtLink to="/admin/experiences" class="p-4 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex items-center justify-between group">
          <span class="font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">Kelola Karir</span>
          <svg class="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </NuxtLink>
        <NuxtLink to="/admin/education" class="p-4 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex items-center justify-between group">
          <span class="font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">Kelola Edukasi</span>
          <svg class="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </NuxtLink>
        <NuxtLink to="/admin/skills" class="p-4 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors flex items-center justify-between group">
          <span class="font-medium text-zinc-300 group-hover:text-amber-500 transition-colors">Tambah Skill</span>
          <svg class="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabaseClient()

// State untuk stats
const stats = ref({
  projects: 0,
  experiences: 0,
  education: 0,
  skills: 0
})

// Mengambil jumlah data (count) saja
const fetchStats = async () => {
  try {
    const [prj, exp, edu, skl] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('experiences').select('*', { count: 'exact', head: true }),
      supabase.from('education').select('*', { count: 'exact', head: true }),
      supabase.from('skills').select('*', { count: 'exact', head: true }),
    ])
    
    stats.value.projects = prj.count || 0
    stats.value.experiences = exp.count || 0
    stats.value.education = edu.count || 0
    stats.value.skills = skl.count || 0
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script>
