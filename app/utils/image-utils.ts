export function resolveImagePath(src: string): string {
  if (!src) return "/images/placeholder.jpg"

  // If it's already a full URL or an absolute path, return it as is
  if (src.startsWith("http") || src.startsWith("/")) {
    return src
  }

  // Otherwise, assume it's a relative path to the images directory
  return `/images/${src}`
}

