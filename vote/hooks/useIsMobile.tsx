import { isMobile as detectIsMobile } from 'react-device-detect'
import React, { useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(detectIsMobile)
  }, [])

  return isMobile
}

export default useIsMobile
