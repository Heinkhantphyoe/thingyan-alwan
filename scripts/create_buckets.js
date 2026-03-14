import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    env[key.trim()] = value.trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createBuckets() {
  const buckets = ['memory-images', 'thangyan-songs']
  
  for (const bucketName of buckets) {
    console.log(`Checking bucket: ${bucketName}...`)
    const { data: bucket, error: getError } = await supabase.storage.getBucket(bucketName)
    
    if (getError && getError.message.includes('not found')) {
      console.log(`Bucket ${bucketName} not found. Attempting to create...`)
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: bucketName === 'memory-images' ? ['image/*'] : ['audio/*', 'image/*'],
        fileSizeLimit: 52428800 // 50MB
      })
      
      if (error) {
        console.error(`Error creating bucket ${bucketName}:`, error.message)
      } else {
        console.log(`Successfully created bucket: ${bucketName}`)
      }
    } else if (getError) {
      console.error(`Error checking bucket ${bucketName}:`, getError.message)
    } else {
      console.log(`Bucket ${bucketName} already exists.`)
    }
  }
}

createBuckets()
