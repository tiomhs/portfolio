<script setup>
const supabase = useSupabaseClient()

// Nilai default jika database Supabase belum diisi / error
const defaultSkills = [
  "Laravel", "NestJS", "Express.js", "CodeIgniter", "Vue.js", "React.js", "NuxtJS", "Next.js", "Tailwind CSS", "WordPress"
];

const defaultExperiences = [
  { role: "Ketua Umum", company: "UKM PROGRESS", year: "2026 \u2013 Sekarang", desc: "Memimpin pergerakan dan inovasi riset teknologi di lingkungan kampus." },
  { role: "Back-End & Front-End Developer", company: "PT. Gretiva", year: "2025 \u2013 Sekarang", desc: "Mengembangkan solusi web kompleks dan mengintegrasikan API pihak ketiga." },
  { role: "Anggota Research & Development", company: "UKM PROGRESS", year: "2025 \u2013 2026", desc: "Berkontribusi dalam riset pengembangan sistem dan IoT." },
  { role: "CMS & Back-End Developer", company: "PT. Asanka", year: "2023 \u2013 2025", desc: "Membangun sistem CMS dan mengoptimalkan performa backend." }
];

const defaultEducation = [
  { role: "S1 Sistem Informasi", company: "ITB STIKOM Bali", year: "2023 \u2013 Sekarang", desc: "Mempelajari analisis, pengembangan, dan kepemimpinan dalam teknologi informasi." },
  { role: "Rekayasa Perangkat Lunak (RPL)", company: "SMK Negeri 1 Denpasar", year: "2020 \u2013 2023", desc: "Mempelajari rekayasa, basis data, dan praktik terbaik dalam pengembangan aplikasi perangkat lunak." }
];

// Fetch Data dari Supabase
const { data: skills } = await useAsyncData('skills', async () => {
  const { data, error } = await supabase.from('skills').select('name')
  if (error || !data || data.length === 0) return defaultSkills;
  return data.map(s => s.name);
}, { default: () => defaultSkills });

const { data: experiences } = await useAsyncData('experiences', async () => {
  const { data, error } = await supabase.from('experiences').select('role, company, year, desc').order('id', { ascending: false })
  if (error || !data || data.length === 0) return defaultExperiences;
  return data;
}, { default: () => defaultExperiences });

const { data: education } = await useAsyncData('education', async () => {
  const { data, error } = await supabase.from('education').select('role, company, year, desc').order('id', { ascending: false })
  if (error || !data || data.length === 0) return defaultEducation;
  return data;
}, { default: () => defaultEducation });
</script>

<template>
  <div class="space-y-24 pb-12">
    <!-- Hero Section -->
    <section class="relative pt-12 pb-8 flex flex-col items-center text-center">
      <!-- Ambient Glow & Balinese Candi Bentar Watermark -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] -z-20"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[550px] h-[550px] opacity-[0.04] -z-10 pointer-events-none text-amber-500">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <!-- Batur (Base of the temple) -->
          <path d="M 5 95 h 90 v -6 h -5 v -4 h -80 v 4 h -5 z" />
          <!-- Candi Bentar Left -->
          <path d="M 47 85 V 15 L 43 15 L 42 22 H 39 L 38 29 H 35 L 34 36 H 31 L 30 43 H 27 L 26 50 H 23 L 22 57 H 19 L 18 64 H 15 L 14 71 H 11 L 10 78 H 9 V 85 Z" />
          <!-- Candi Bentar Right -->
          <path d="M 53 85 V 15 L 57 15 L 58 22 H 61 L 62 29 H 65 L 66 36 H 69 L 70 43 H 73 L 74 50 H 77 L 78 57 H 81 L 82 64 H 85 L 86 71 H 89 L 90 78 H 91 V 85 Z" />
        </svg>
      </div>
      
      <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-semibold mb-8 tracking-wider shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span>OM SWASTIASTU</span>
        <span class="opacity-50 text-xs">|</span>
        <span class="text-amber-500/80 font-medium tracking-normal">Welcome</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
        Turning Vision into <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">Robust Systems</span>
      </h1>
      
      <p class="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
        Halo, saya <strong>Tio Mahesa</strong>. Seorang Back-End Developer & Mahasiswa Sistem Informasi yang berdedikasi membangun arsitektur web skalabel dan performa tinggi.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <a href="mailto:tiomahesa.work@gmail.com" class="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
          Mari Diskusi
        </a>
        <a href="https://github.com/tiomhs" target="_blank" class="px-8 py-3.5 bg-slate-800/80 text-white font-semibold rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
          GitHub
        </a>
        <a href="https://linkedin.com/in/i-gede-tio-mahesa-diputra-39429524b" target="_blank" class="px-8 py-3.5 bg-amber-600/20 text-amber-500 font-semibold rounded-xl border border-amber-500/30 hover:bg-amber-600/30 transition-all flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path></svg>
          LinkedIn
        </a>
      </div>
    </section>

    <!-- About Section -->
    <section class="max-w-4xl mx-auto">
      <div class="p-1 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent">
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-slate-800/80">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-1 bg-amber-500 rounded-full"></span>
            Tentang Saya
          </h2>
          <p class="text-slate-300 leading-relaxed text-lg">
            Saya memiliki ketertarikan yang mendalam terhadap teknologi, khususnya dalam pengembangan website, <strong>Internet of Things (IoT)</strong>, dan <strong>Artificial Intelligence (AI)</strong>. Dengan rekam jejak langsung di industri perangkat lunak dan pengalaman memimpin organisasi kampus, saya terbiasa membangun sistem yang skalabel dan merancang arsitektur aplikasi yang kompleks.
          </p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section>
      <h2 class="text-2xl font-bold text-center text-white mb-10">Teknologi & Keahlian</h2>
      <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        <div v-for="skill in skills" :key="skill" class="group relative px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-default overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span class="relative z-10 text-slate-300 group-hover:text-white font-medium">{{ skill }}</span>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section>
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl font-bold text-white">Perjalanan Karir</h2>
        <div class="h-px bg-gradient-to-r from-slate-800 to-transparent flex-grow ml-6"></div>
      </div>
      
      <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
        <div v-for="(exp, index) in experiences" :key="index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <!-- Timeline point -->
          <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-500 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <div class="w-2 h-2 rounded-full bg-current"></div>
          </div>
          
          <!-- Card -->
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-1 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent group-hover:from-amber-600/20 transition-all duration-300">
            <div class="relative bg-slate-900 border border-slate-800 rounded-xl p-6 h-full shadow-lg hover:shadow-amber-900/10 transition-shadow overflow-hidden">
              
              <!-- Balinese Ornamen Siku-siku (Corner Accents with inner details) -->
              <div class="absolute inset-0 pointer-events-none rounded-xl">
                <div class="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-amber-600/30 rounded-tl-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600/20 rounded-tl-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-amber-600/30 rounded-tr-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600/20 rounded-tr-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-amber-600/30 rounded-bl-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-600/20 rounded-bl-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-amber-600/30 rounded-br-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-600/20 rounded-br-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
              </div>

              <div class="flex flex-col xl:flex-row xl:items-start justify-between gap-2 mb-2 relative z-10">
                <h3 class="font-bold text-xl text-white">{{ exp.role }}</h3>
                <span class="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 w-fit shrink-0">{{ exp.year }}</span>
              </div>
              <p class="text-amber-500 font-medium mb-3 relative z-10">{{ exp.company }}</p>
              <p class="text-slate-400 text-sm leading-relaxed relative z-10">{{ exp.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="mt-16">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl font-bold text-white">Riwayat Pendidikan</h2>
        <div class="h-px bg-gradient-to-r from-slate-800 to-transparent flex-grow ml-6"></div>
      </div>
      
      <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
        <div v-for="(edu, index) in education" :key="'edu-'+index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <!-- Timeline point -->
          <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-500 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <div class="w-2 h-2 rounded-full bg-current"></div>
          </div>
          
          <!-- Card -->
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-1 rounded-2xl bg-gradient-to-b from-slate-800/50 to-transparent group-hover:from-amber-600/20 transition-all duration-300">
            <div class="relative bg-slate-900 border border-slate-800 rounded-xl p-6 h-full shadow-lg hover:shadow-amber-900/10 transition-shadow overflow-hidden">
              
              <!-- Balinese Ornamen Siku-siku (Corner Accents with inner details) -->
              <div class="absolute inset-0 pointer-events-none rounded-xl">
                <div class="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-amber-600/30 rounded-tl-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600/20 rounded-tl-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-amber-600/30 rounded-tr-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600/20 rounded-tr-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-amber-600/30 rounded-bl-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-600/20 rounded-bl-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
                
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-amber-600/30 rounded-br-xl transition-all duration-300 group-hover:border-amber-500 group-hover:w-8 group-hover:h-8"></div>
                <div class="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-600/20 rounded-br-md transition-all duration-300 group-hover:border-amber-500/60 group-hover:w-4 group-hover:h-4"></div>
              </div>

              <div class="flex flex-col xl:flex-row xl:items-start justify-between gap-2 mb-2 relative z-10">
                <h3 class="font-bold text-xl text-white">{{ edu.role }}</h3>
                <span class="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 w-fit shrink-0">{{ edu.year }}</span>
              </div>
              <p class="text-amber-500 font-medium mb-3 relative z-10">{{ edu.company }}</p>
              <p class="text-slate-400 text-sm leading-relaxed relative z-10">{{ edu.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>