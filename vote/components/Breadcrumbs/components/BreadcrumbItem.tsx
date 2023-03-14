import Dropdown from '@/vote/components/Dropdown'
import React from 'react'
import Tooltip from '@/vote/components/Tooltip'
import useIsMobile from '@/vote/hooks/useIsMobile'

const BreadcrumbItem = ({
  trigger,
  content,
}: {
  content: any
  trigger: any
}) => {
  const isMobile = useIsMobile()
  if (isMobile) {
    return (
      <Dropdown
        side={'bottom'}
        trigger={trigger}
        content={content}
      />
    )
  }
  return (
    <Tooltip
      side={'bottom'}
      trigger={trigger}
      content={content}
    />
  )
}

export default BreadcrumbItem
