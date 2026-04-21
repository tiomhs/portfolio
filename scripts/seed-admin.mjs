import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Helper to manually parse .env if dotenv isn't available
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found!')
    process.exit(1)
  }

  const envContent = fs.readFileSync(envPath, 'utf-8')
  const env = {}
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
    }
  })
  return env
}

const env = loadEnv()

const supabaseUrl = env.SUPABASE_URL
const supabaseServiceKey = env.NUXT_SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or NUXT_SUPABASE_SECRET_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedAdmin() {
  const email = 'admin@example.com'
  const password = 'admin-password-123'

  console.log(`Seeding admin user: ${email}...`)

  // Check if user already exists
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

  if (listError) {
    console.error('Error listing users:', listError.message)
    return
  }

  const existingUser = users.find(u => u.email === email)

  if (existingUser) {
    console.log('Admin user already exists. Updating password...')
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: password }
    )
    if (updateError) {
      console.error('Error updating user:', updateError.message)
    } else {
      console.log('Admin user password updated successfully.')
    }
  } else {
    console.log('Creating new admin user...')
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    })

    if (createError) {
      console.error('Error creating user:', createError.message)
    } else {
      console.log('Admin user created successfully!')
      console.log('User ID:', newUser.user.id)
    }
  }
}

seedAdmin().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
