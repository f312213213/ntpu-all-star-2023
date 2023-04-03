import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  COMMIT: string
  HOST_DOMAIN: string
  ENV: string
}

const heartBeat = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  return res.status(200).json({
    HOST_DOMAIN: process.env.HOST_DOMAIN ?? '',
    COMMIT: process.env.VERCEL_GIT_COMMIT_SHA ?? '-',
    ENV: process.env.NEXT_PUBLIC_VERCEL_ENV ?? '',
  })
}

export default heartBeat
