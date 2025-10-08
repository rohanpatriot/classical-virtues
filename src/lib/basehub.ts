import { basehub } from 'basehub'
import type { StoriesItem } from '../../basehub-types'
import '../../basehub.config' // Import the config to ensure it's loaded

// Use BaseHub's generated types for full type safety
export type Story = StoriesItem

// Fetch all stories with proper BaseHub caching
export async function getAllStories(): Promise<Story[]> {
  try {
    // Use BaseHub's recommended query method (draft config handled in basehub.config.ts)
    const data = await basehub().query({
      stories: {
        items: {
          _id: true,
          _slug: true,
          _title: true,
          virtue: true,
          image: {
            url: true,
            alt: true,
          },
          summary: true,
          virtueDescription: true,
          audioUrl: true,
          content: {
            markdown: true,
            plainText: true,
            readingTime: true,
          },
        },
      },
    })

    return data.stories.items as Story[]
  } catch (error) {
    console.error('Error fetching stories from Basehub:', error)
    return []
  }
}

// Fetch a single story by slug with proper BaseHub caching
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const data = await basehub().query({
      stories: {
        __args: {
          filter: {
            _slug: {
              eq: slug
            }
          },
          first: 1,
        },
        items: {
          _id: true,
          _slug: true,
          _title: true,
          virtue: true,
          image: {
            url: true,
            alt: true,
          },
          summary: true,
          virtueDescription: true,
          audioUrl: true,
          content: {
            markdown: true,
            plainText: true,
            readingTime: true,
          },
        },
      },
    })

    return data.stories.items[0] ? data.stories.items[0] as Story : null
  } catch (error) {
    console.error('Error fetching story from Basehub:', error)
    return null
  }
}   