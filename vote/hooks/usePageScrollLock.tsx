import React from 'react'

const usePageScrollLock = (lock: boolean) => {
  React.useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lock])
}

export default usePageScrollLock
