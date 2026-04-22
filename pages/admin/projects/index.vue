<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Manajemen Proyek</h2>
        <p class="text-zinc-400">Kelola daftar portofolio proyek yang akan ditampilkan di halaman utama.</p>
      </div>
      <button @click="openModal()" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Proyek
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="w-8 h-8 border-4 border-zinc-800 border-t-amber-500 rounded-full animate-spin"></div>
    </div>

    <!-- Data Table -->
    <div v-else class="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-zinc-400">
          <thead class="text-xs text-zinc-500 uppercase bg-zinc-950/50 border-b border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium">Judul Proyek</th>
              <th scope="col" class="px-6 py-4 font-medium">Tech Stack</th>
              <th scope="col" class="px-6 py-4 font-medium">Featured (Utama)</th>
              <th scope="col" class="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="projects.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-zinc-500">Belum ada proyek yang ditambahkan.</td>
            </tr>
            <tr v-for="item in projects" :key="item.id" class="hover:bg-zinc-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-white mb-1">{{ item.title }}</div>
                <div class="text-xs truncate max-w-xs">{{ item.description }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span v-for="tech in item.tech_stack" :key="tech" class="px-2 py-0.5 rounded bg-zinc-800 text-xs border border-zinc-700">
                    {{ tech }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span v-if="item.is_featured" class="inline-flex w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                <span v-else class="inline-flex w-3 h-3 rounded-full bg-zinc-700"></span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openModal(item)" class="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <button @click="deleteItem(item.id)" class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex justify-center items-start">
      <div class="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl my-8 shadow-2xl relative">
        <div class="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h3 class="text-xl font-bold text-white">{{ isEditing ? 'Edit Proyek' : 'Tambah Proyek Baru' }}</h3>
          <button @click="closeModal()" class="text-zinc-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-if="errorMessage" class="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="saveItem" class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">Judul Proyek</label>
              <input v-model="form.title" type="text" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">Slug (URL friendly)</label>
              <input v-model="form.slug" type="text" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="misal: pemira-co-id" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">Subtitle (Tagline)</label>
              <input v-model="form.subtitle" type="text" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="misal: Platform E-Voting" />
            </div>
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">Role (Peran Anda)</label>
              <input v-model="form.role" type="text" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="misal: Front-End & Back-End Developer" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1.5">Deskripsi Singkat</label>
            <textarea v-model="form.description" rows="3" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1.5">Tech Stack (Pisahkan dengan koma)</label>
            <input v-model="form.tech_stack_input" type="text" placeholder="Vue.js, Laravel, Tailwind" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
          </div>

          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-3">Galeri Proyek (Gambar)</label>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <!-- Image Previews -->
              <div v-for="(url, index) in form.image_urls" :key="index" class="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                <img :src="url" class="w-full h-full object-cover" />
                <button type="button" @click="removeImage(index)" class="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>

              <!-- Upload Button Placeholder -->
              <div class="relative aspect-video rounded-xl border-2 border-dashed border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group">
                <input type="file" @change="uploadImage" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" :disabled="uploadingImage" />
                
                <div v-if="!uploadingImage" class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-1 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                  <span class="text-[10px] uppercase tracking-wider font-bold text-zinc-500 group-hover:text-zinc-300">Unggah Gambar</span>
                </div>
                
                <div v-else class="flex flex-col items-center">
                  <div class="w-8 h-8 border-3 border-zinc-700 border-t-amber-500 rounded-full animate-spin mb-2"></div>
                  <span class="text-[10px] uppercase tracking-wider font-bold text-amber-500">Mengunggah...</span>
                </div>
              </div>
            </div>
            
            <p class="text-xs text-zinc-500">Klik kotak di atas untuk mengunggah gambar baru ke Cloudinary. Gambar pertama akan menjadi thumbnail utama.</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">GitHub URL (Opsional)</label>
              <input v-model="form.github_url" type="url" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-zinc-400 mb-1.5">Live URL (Opsional)</label>
              <input v-model="form.live_url" type="url" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 outline-none" />
            </div>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <input v-model="form.is_featured" type="checkbox" id="featured" class="w-5 h-5 bg-zinc-950 border-zinc-800 rounded text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900" />
            <label for="featured" class="text-sm font-medium text-zinc-300">Tampilkan di halaman utama (Featured)</label>
          </div>

          <div class="pt-6 border-t border-white/5 flex justify-end gap-3">
            <button type="button" @click="closeModal()" class="px-5 py-2.5 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              Batal
            </button>
            <button type="submit" :disabled="saving" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
               <span v-if="saving" class="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin"></span>
               Simpan Proyek
            </button>
          </div>
        </form>
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
const projects = ref([])
const loading = ref(true)

const isModalOpen = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const uploadingImage = ref(false)
const errorMessage = ref('')

const uploadImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadingImage.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const data = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    if (data && data.url) {
      if (!form.value.image_urls) {
        form.value.image_urls = []
      }
      form.value.image_urls.push(data.url)
    }
  } catch (err) {
    console.error('Upload failed:', err)
    errorMessage.value = `Gagal mengunggah gambar: ${err.message}`
  } finally {
    uploadingImage.value = false
    event.target.value = ''
  }
}

const removeImage = (index) => {
  form.value.image_urls.splice(index, 1)
}

const form = ref({
  id: null,
  title: '',
  slug: '',
  subtitle: '',
  role: '',
  description: '',
  tech_stack_input: '',
  github_url: '',
  live_url: '',
  image_urls: [],
  is_featured: false
})

const fetchProjects = async () => {
  loading.value = true
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (data) projects.value = data
  loading.value = false
}

onMounted(() => {
  fetchProjects()
})

// Prevent body scroll when modal is open
watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (!isEditing.value) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Hapus karakter non-word
      .replace(/\s+/g, '-')      // Ganti spasi dengan -
      .replace(/-+/g, '-')       // Hapus- ganda
      .trim()
  }
})

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    form.value = { 
      ...item, 
      tech_stack_input: item.tech_stack ? item.tech_stack.join(', ') : '',
      image_urls: item.image_urls || []
    }
  } else {
    isEditing.value = false
    form.value = {
      id: null,
      title: '',
      slug: '',
      subtitle: '',
      role: '',
      description: '',
      tech_stack_input: '',
      github_url: '',
      live_url: '',
      image_urls: [],
      is_featured: false
    }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  errorMessage.value = ''
}

const saveItem = async () => {
  saving.value = true
  try {
    const techStackArray = form.value.tech_stack_input
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    const payload = {
      title: form.value.title,
      slug: form.value.slug,
      subtitle: form.value.subtitle,
      role: form.value.role,
      description: form.value.description,
      tech_stack: techStackArray,
      github_url: form.value.github_url,
      live_url: form.value.live_url,
      image_urls: form.value.image_urls,
      is_featured: form.value.is_featured
    }

    errorMessage.value = ''

    let result
    if (isEditing.value) {
      result = await supabase.from('projects').update(payload).eq('id', form.value.id)
    } else {
      result = await supabase.from('projects').insert([payload])
    }
    
    if (result.error) {
      errorMessage.value = `Gagal menyimpan: ${result.error.message}`
      console.error('Supabase error:', result.error)
      return
    }

    closeModal()
    fetchProjects()
  } catch (error) {
    console.error('Unexpected error:', error)
    errorMessage.value = "Terjadi kesalahan sistem saat menyimpan data"
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Yakin ingin menghapus proyek ini?')) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert(`Gagal menghapus: ${error.message}`)
    } else {
      fetchProjects()
    }
  }
}
</script>
