import { useState } from 'react'
import Image from 'next/image'

/**
 * Handling blur Image with tailwindcss
 * @param props
 * @param {string} props.src Source url of the image.
 * @param {string} props.alt Alternative text of the image.
 * @returns {JSX.Element} Image with blur effect.
 */
const BlurImage = ({ src, alt }: {src: string, alt: string}) => {
  const [isLoading, setLoading] = useState(true)

  const cn = (...classes: string[]) => {
    return classes.join(' ')
  }

  return (
    <Image
      className={cn('duration-700 ease-in-out object-contain',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      )}
      fill
      src={src}
      alt={alt}
      onLoadingComplete={() => { setLoading(false) }}
    />
  )
}

export default BlurImage
