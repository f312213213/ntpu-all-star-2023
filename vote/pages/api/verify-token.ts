import { getUserIdFromAuthorizationHeader } from '@/vote/lib/firebase'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
  data?: {
    userId?: string
    message?: string
  }
}

const VerifyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const userId = await getUserIdFromAuthorizationHeader(req.headers.authorization) as string

    return res
      .status(200)
      .json({
        status: '0',
        data: {
          userId,
          message: 'success',
        },
      })
  } catch (e: any) {
    return res
      .status(400)
      .json({
        status: '-1',
        data: {
          message: e.message || 'failed',
        },
      })
  }
}

export default VerifyHandler
