import { readMultipartFormData } from 'h3'
import { v2 as cloudinary } from 'cloudinary'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check authentication
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const config = useRuntimeConfig()
  
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })

  try {
    // Parse multipart form data
    const files = await readMultipartFormData(event)
    
    if (!files || files.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    // Usually the file input is named 'file'
    const uploadedFile = files.find(f => f.name === 'file') || files[0]

    // Upload to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      uploadStream.end(uploadedFile.data)
    })

    return {
      url: result.secure_url
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to upload image' })
  }
})
