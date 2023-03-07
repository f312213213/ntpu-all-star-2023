import { GetServerSideProps } from 'next'

import { useAppSelector } from '@/vote/features/store'
import { userInfoSelector } from '@/vote/features/user/selector'
import Layout from '@/vote/components/Layout'

const UserPage = () => {
  const userInfo = useAppSelector(userInfoSelector)
  return (
    <Layout
      customMeta={{
        title: '我的頁面 - 北大明星賽 2023',
        description: '',
      }}
    >
      {userInfo.displayName}
    </Layout>
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies
  if (!accessToken) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }
  return {
    props: {
    },
  }
}
