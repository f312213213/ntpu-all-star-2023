import React from 'react'

const usePageScrollLock = (lock: boolean) => {
  React.useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [lock])
}

export default usePageScrollLock
