<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Manajemen Blog</h2>
        <p class="text-zinc-400">Tulis dan kelola artikel atau jurnal teknologi Anda.</p>
      </div>
      <button @click="openModal()" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tulis Artikel
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
              <th scope="col" class="px-6 py-4 font-medium">Artikel</th>
              <th scope="col" class="px-6 py-4 font-medium">Kategori</th>
              <th scope="col" class="px-6 py-4 font-medium">Status</th>
              <th scope="col" class="px-6 py-4 font-medium">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="blogs.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-zinc-500">Belum ada artikel yang ditulis.</td>
            </tr>
            <tr v-for="item in blogs" :key="item.id" class="hover:bg-zinc-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/5">
                      <img v-if="item.cover_image" :src="item.cover_image" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                   </div>
                   <div>
                      <div class="font-medium text-white mb-0.5">{{ item.title }}</div>
                      <div class="text-xs text-zinc-500 truncate max-w-xs">{{ item.excerpt || 'Tidak ada ringkasan...' }}</div>
                   </div>
                </div>
              </td>
              <td class="px-6 py-4 text-xs">
                <span class="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                  {{ item.category }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span v-if="item.is_published" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">
                   <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                </span>
                <span v-else class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                   <span class="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> Draft
                </span>
              </td>
              <td class="px-6 py-4 text-xs text-zinc-500">
                {{ item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : new Date(item.created_at).toLocaleDateString('id-ID') }}
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
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div class="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h3 class="text-xl font-bold text-white">{{ isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru' }}</h3>
          <button @click="closeModal()" class="text-zinc-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-if="errorMessage" class="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="saveItem" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Left Column: Settings -->
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Cover Image</label>
                <div class="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group cursor-pointer">
                   <img v-if="form.cover_image" :src="form.cover_image" class="w-full h-full object-cover" />
                   <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span class="text-[10px] font-bold uppercase tracking-wider">Upload Cover</span>
                   </div>
                   <input type="file" @change="uploadCover" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" :disabled="uploading" />
                   <div v-if="uploading" class="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div class="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                   </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Kategori</label>
                <select v-model="form.category" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 outline-none focus:border-amber-500">
                   <option value="Tech">Technology</option>
                   <option value="Dev">Development</option>
                   <option value="Design">Design</option>
                   <option value="Life">Life Style</option>
                   <option value="Tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Tags (Pisahkan dengan koma)</label>
                <input v-model="form.tags_input" type="text" placeholder="Vue, Nuxt, CSS" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 outline-none focus:border-amber-500" />
              </div>

              <div class="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                 <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-zinc-300">Status Publish</label>
                    <button type="button" @click="form.is_published = !form.is_published" 
                       :class="form.is_published ? 'bg-amber-500' : 'bg-zinc-700'"
                       class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                       <span :class="form.is_published ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                 </div>
                 <p class="text-[10px] text-zinc-500">Jika aktif, artikel akan langsung muncul di halaman publik.</p>
              </div>
            </div>

            <!-- Right Column: Content -->
            <div class="md:col-span-2 space-y-5">
              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Judul Artikel</label>
                <input v-model="form.title" type="text" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg font-bold text-white outline-none focus:border-amber-500" placeholder="Masukkan judul yang menarik..." />
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Slug URL</label>
                <input v-model="form.slug" type="text" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-mono text-amber-500/70 outline-none focus:border-amber-500" />
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-400 mb-1.5">Ringkasan Singkat (Excerpt)</label>
                <textarea v-model="form.excerpt" rows="2" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-300 outline-none focus:border-amber-500" placeholder="Tulis ringkasan singkat untuk list artikel..."></textarea>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                   <label class="block text-sm font-medium text-zinc-400">Konten Artikel (Markdown)</label>
                   <div class="flex gap-2">
                      <button type="button" @click="previewMode = false" :class="!previewMode ? 'text-amber-500' : 'text-zinc-500'" class="text-xs font-bold uppercase tracking-widest">Edit</button>
                      <button type="button" @click="previewMode = true" :class="previewMode ? 'text-amber-500' : 'text-zinc-500'" class="text-xs font-bold uppercase tracking-widest">Preview</button>
                   </div>
                </div>
                
                <div v-if="!previewMode">
                   <textarea v-model="form.content" rows="15" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-200 font-mono text-sm outline-none focus:border-amber-500 leading-relaxed" placeholder="Tulis konten artikel Anda di sini menggunakan Markdown..."></textarea>
                </div>
                <div v-else class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-6 py-6 text-zinc-300 prose prose-invert prose-amber max-w-none min-h-[400px]">
                   <!-- Simple markdown preview would go here, for now just text -->
                   <div class="whitespace-pre-wrap">{{ form.content || 'Pratinjau konten akan muncul di sini...' }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-white/5 flex justify-end gap-3">
            <button type="button" @click="closeModal()" class="px-5 py-2.5 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              Batal
            </button>
            <button type="submit" :disabled="saving" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
               <span v-if="saving" class="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin"></span>
               {{ isEditing ? 'Update Artikel' : 'Publish Sekarang' }}
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
const blogs = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const uploading = ref(false)
const errorMessage = ref('')
const previewMode = ref(false)

const form = ref({
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  category: 'Tech',
  tags_input: '',
  is_published: false
})

const fetchBlogs = async () => {
  loading.value = true
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (data) blogs.value = data
  loading.value = false
}

onMounted(() => {
  fetchBlogs()
})

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (!isEditing.value) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
})

const uploadCover = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const data = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (data && data.url) {
      form.value.cover_image = data.url
    }
  } catch (err) {
    console.error('Upload failed:', err)
    errorMessage.value = `Gagal mengunggah cover: ${err.message}`
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    form.value = { 
      ...item, 
      tags_input: item.tags ? item.tags.join(', ') : ''
    }
  } else {
    isEditing.value = false
    form.value = {
      id: null,
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      category: 'Tech',
      tags_input: '',
      is_published: false
    }
  }
  isModalOpen.value = true
  previewMode.value = false
}

const closeModal = () => {
  isModalOpen.value = false
  errorMessage.value = ''
}

const saveItem = async () => {
  saving.value = true
  try {
    const tagsArray = form.value.tags_input
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    const payload = {
      title: form.value.title,
      slug: form.value.slug,
      excerpt: form.value.excerpt,
      content: form.value.content,
      cover_image: form.value.cover_image,
      category: form.value.category,
      tags: tagsArray,
      is_published: form.value.is_published,
      published_at: form.value.is_published ? (form.value.published_at || new Date().toISOString()) : null
    }

    let result
    if (isEditing.value) {
      result = await supabase.from('blogs').update(payload).eq('id', form.value.id)
    } else {
      result = await supabase.from('blogs').insert([payload])
    }
    
    if (result.error) {
      errorMessage.value = `Gagal menyimpan: ${result.error.message}`
      return
    }

    closeModal()
    fetchBlogs()
  } catch (error) {
    errorMessage.value = "Terjadi kesalahan sistem saat menyimpan"
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Hapus artikel ini?')) {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (!error) fetchBlogs()
  }
}
</script>
