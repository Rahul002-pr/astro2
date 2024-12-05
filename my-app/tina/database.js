import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'

// Change this to your chosen git provider
import  {GitHubProvider}  from 'tinacms-gitprovider-github'

// Change this to your chosen database adapter
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'false'
console.log('Running in local mode:', isLocal)

const branch =
  process.env.GITHUB_BRANCH  || 'main'
  console.log('Branch being used:', branch)

if (!branch) {
  throw new Error(
    'No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.'
  )
}

export default isLocal
  ? // If we are running locally, use a local database that stores data in memory and writes to the locac filesystem on save
(function() {
      console.log('Using local database')  // Log when using the local database
      return createLocalDatabase()
    })()
  : // If we are not running locally, use a database that stores data in redis and Saves data to github
  createDatabase({
    // May very depending on your git provider
    gitProvider: new GitHubProvider({
      repo: process.env.GITHUB_REPO ,
      owner: process.env.GITHUB_OWNER ,
      token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      branch,
    }),
      // May very depending on your git provider
    
      // May very depending on your database adapter
      databaseAdapter: new RedisLevel({
        redis: new Redis({
          url:
            (process.env.KV_REST_API_URL ) || 'http://localhost:8079',
          token: (process.env.KV_REST_API_TOKEN ) || 'example_token',
        }),
        
        debug: process.env.DEBUG === 'true' || false,
        namespace: branch,
      }),
      
    })