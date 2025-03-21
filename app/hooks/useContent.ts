import { useCallback } from "react"
import type { ContentStructure } from "../types/content"
import plContent from "../content/pl.json"

type ContentLanguage = "pl"
type ContentPath = string | string[]

/**
 * A hook that provides access to the site content
 */
export function useContent(language: ContentLanguage = "pl") {
  // Get the content for the specified language
  const getContent = useCallback(() => {
    switch (language) {
      case "pl":
      default:
        return plContent as ContentStructure
    }
  }, [language])

  // Get a specific part of the content using a path
  const getContentByPath = useCallback(
    (path: ContentPath) => {
      const content = getContent()

      if (typeof path === "string") {
        return content[path as keyof ContentStructure]
      }

      // Handle array path for nested access
      if (Array.isArray(path)) {
        return path.reduce((obj: unknown, key: string) => {
          if (obj && typeof obj === "object" && key in obj) {
            return (obj as Record<string, unknown>)[key]
          }
          return undefined
        }, content)
        }
        return undefined
      },
    [getContent],
  )

  return {
    content: getContent(),
    getContentByPath,
  }
}

