"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export function ImageComponent({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
}: ImageComponentProps) {
  const [isError, setIsError] = useState(false)

  // Handle image paths - convert content paths to actual image paths
  const imagePath = src.startsWith("/")
    ? src // Already a local path
    : src.startsWith("http")
      ? src // External URL
      : `/images/${src}` // Local image in the public/images directory

  // Fallback image if the specified image fails to load
  const fallbackImage = "/images/placeholder.jpg"

  return (
    <Image
      src={isError ? fallbackImage : imagePath}
      alt={alt}
      width={fill ? undefined : width || 1200}
      height={fill ? undefined : height || 800}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setIsError(true)}
    />
  )
}

