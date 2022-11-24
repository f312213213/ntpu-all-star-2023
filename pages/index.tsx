import { getNumber } from '@/features/app/services'
import { useAppDispatch } from '@/features/store'
import React from 'react'

const Home = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getNumber())
  }, [dispatch])

  return (
    <></>
  )
}

export default Home
