export const useProjects = () => {
  const supabase = useSupabaseClient()

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  }

  const getProjectBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching project by slug:', error)
      return null
    }
    return data
  }

  const getFeaturedProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(3)
    
    if (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }
    return data || []
  }

  return {
    fetchProjects,
    getProjectBySlug,
    getFeaturedProjects
  }
}