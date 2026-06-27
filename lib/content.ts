import fs from 'fs/promises'
import path from 'path'
import { LandingPageContent } from '@/types/landing'

export async function getLandingPageContent(slug: string): Promise<LandingPageContent | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', `${slug}.json`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContent) as LandingPageContent
  } catch (error) {
    console.error(`Error loading content for slug: ${slug}`, error)
    return null
  }
}
