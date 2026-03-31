<script setup>
const webApps = [
  {
    title: "Pemira.co.id",
    subtitle: "Platform E-Voting",
    role: "Front-End & Back-End Developer",
    stack: ["NestJS", "Next.js", "Vue.js", "Tailwind CSS"],
    desc: "Platform pemungutan suara digital berskala kampus untuk memfasilitasi pemilihan Presiden & Wakil Presiden Mahasiswa secara aman, real-time, dan transparan."
  },
  {
    title: "Tixgro.com",
    subtitle: "Ticketing Management",
    role: "Front-End & Back-End Developer",
    stack: ["Laravel", "Livewire", "Tailwind CSS", "Midtrans", "Xendit"],
    desc: "Platform manajemen tiket komprehensif yang memfasilitasi pembelian, penukaran tiket, hingga event check-in terintegrasi dengan berbagai payment gateway."
  },
  {
    title: "Membership Dreamy",
    subtitle: "Sistem Manajemen MLM",
    role: "Front-End & Back-End Developer",
    stack: ["Laravel", "Livewire", "MySQL"],
    desc: "Sistem manajemen keanggotaan berbasis Multi-Level Marketing (MLM) dengan kalkulasi pencapaian dan distribusi bonus otomatis secara rekursif antar level jaringan."
  },
  {
    title: "Radio Streaming Web",
    subtitle: "Aplikasi Real-time Broadcasting",
    role: "Full-Stack & DevOps",
    stack: ["NuxtJS", "Vue.js", "Express.js"],
    desc: "Aplikasi web berbasis streaming stasiun radio real-time yang dirancang agar terintegrasi dengan OBS dan mendukung siaran interaktif."
  }
];

const cmsProjects = [
  "Cat & Sashimi Studio (Web Dev & UI/UX)",
  "Ubud Wellness Bali (Web Dev)",
  "Asanka Corporate & Digital (Web Dev)",
  "Muktamar Peraboi 2025 (Web Dev)"
];
</script>

<template>
  <div class="space-y-16 pb-12">
    <div class="text-center pt-8">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Portfolio
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Karya & <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Inovasi</span></h1>
      <p class="text-slate-400 max-w-2xl mx-auto text-lg">Eksplorasi kumpulan sistem web kompleks, aplikasi, dan eksplorasi digital yang telah saya bangun.</p>
    </div>

    <section>
      <div class="flex items-center gap-4 mb-8">
        <h2 class="text-2xl font-bold text-white shrink-0">Sistem Web & Aplikasi</h2>
        <div class="h-px bg-gradient-to-r from-slate-800 to-transparent flex-grow"></div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="(project, index) in webApps" :key="index" class="group p-1 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent hover:from-blue-600/30 transition-all duration-300">
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 h-full shadow-lg group-hover:shadow-blue-900/20 transition-all flex flex-col">
            <div class="mb-4">
              <h3 class="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{{ project.title }}</h3>
              <p class="text-blue-500 font-medium text-sm mt-1 mb-4">{{ project.subtitle }}</p>
              <p class="text-slate-300 leading-relaxed">{{ project.desc }}</p>
            </div>
            
            <div class="mt-auto pt-6 border-t border-slate-800/50">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                <span class="text-slate-400 text-sm font-medium shrink-0">Peran:</span>
                <span class="text-slate-200 text-sm font-semibold ml-1">{{ project.role }}</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.stack" :key="tech" class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center gap-4 mb-8 border-t border-slate-800/50 pt-16 mt-16">
        <h2 class="text-2xl font-bold text-white shrink-0">Pengembangan CMS & Web Publik</h2>
        <div class="h-px bg-gradient-to-r from-slate-800 to-transparent flex-grow"></div>
      </div>
      
      <div class="p-1 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent">
        <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
            <li v-for="(cms, index) in cmsProjects" :key="index" class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span class="font-medium hover:text-white transition-colors cursor-default">{{ cms }}</span>
            </li>
          </ul>
          <div class="mt-8 p-4 rounded-xl bg-slate-800/30 border border-slate-800/60 inline-flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-sm text-slate-400 leading-relaxed italic">Menampilkan sebagian dari keseluruhan proyek pengembangan CMS dari berbagai klien industri pariwisata hingga korporat medis.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>