<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Keahlian (Skills)</h2>
        <p class="text-zinc-400">Kelola kemampuan teknis dan soft-skills Anda.</p>
      </div>
      <button @click="openModal()" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Skill
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="w-8 h-8 border-4 border-zinc-800 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm text-zinc-400">
          <thead class="text-xs text-zinc-500 uppercase bg-zinc-950/50 border-b border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium">Nama Keahlian</th>
              <th scope="col" class="px-6 py-4 font-medium">Kategori</th>
              <th scope="col" class="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="skills.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-zinc-500">Belum ada data keahlian.</td>
            </tr>
             <tr v-for="item in skills" :key="item.id" class="hover:bg-zinc-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-white">{{ item.name }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs">{{ item.category }}</span>
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
      <div class="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-sm my-8 shadow-2xl relative">
        <div class="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h3 class="text-xl font-bold text-white">{{ isEditing ? 'Edit Skill' : 'Tambah Skill' }}</h3>
          <button @click="closeModal()" class="text-zinc-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-if="errorMessage" class="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="saveItem" class="p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1.5">Nama Keahlian</label>
            <input v-model="form.name" type="text" placeholder="Misal: Laravel" required class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
          </div>
          <div>
             <label class="block text-sm font-medium text-zinc-400 mb-1.5">Kategori / Topik</label>
             <select v-model="form.category" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer">
                <option value="Main">Utama / Utama</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tools">Tools / DevOps</option>
             </select>
          </div>

          <div class="pt-6 border-t border-white/5 flex justify-end gap-3">
            <button type="button" @click="closeModal()" class="px-5 py-2.5 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">Batal</button>
            <button type="submit" :disabled="saving" class="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2">
               <span v-if="saving" class="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin"></span>
               Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: ['auth'] })

const supabase = useSupabaseClient()
const skills = ref([])
const loading = ref(true)

const isModalOpen = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const form = ref({ id: null, name: '', category: 'Main' })

const fetchSkills = async () => {
  loading.value = true
  const { data } = await supabase.from('skills').select('*').order('created_at', { ascending: false })
  if (data) skills.value = data
  loading.value = false
}

onMounted(() => fetchSkills())

// Prevent body scroll when modal is open
watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const openModal = (item = null) => {
  isEditing.value = !!item
  form.value = item ? { ...item } : { id: null, name: '', category: 'Main' }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  errorMessage.value = ''
}

const saveItem = async () => {
  saving.value = true
  errorMessage.value = ''
  try {
    const payload = { name: form.value.name, category: form.value.category }
    
    let result
    if (isEditing.value) {
      result = await supabase.from('skills').update(payload).eq('id', form.value.id)
    } else {
      result = await supabase.from('skills').insert([payload])
    }

    if (result.error) {
      errorMessage.value = `Gagal menyimpan: ${result.error.message}`
      console.error('Supabase error:', result.error)
      return
    }

    closeModal()
    fetchSkills()
  } catch (err) {
    console.error('Unexpected error:', err)
    errorMessage.value = "Terjadi kesalahan sistem saat menyimpan data"
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Hapus keahlian ini?')) {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) {
      alert(`Gagal menghapus: ${error.message}`)
    } else {
      fetchSkills()
    }
  }
}
</script>
