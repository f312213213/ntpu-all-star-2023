import { db } from '@/vote/lib/firebase'
import time from '@/vote/constants/time'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
  user?: any
}

interface IRequestBody extends NextApiRequest {
  body: {
    username: string
    password: string
  }
}

const userDataRequestHandler = async (
  req: IRequestBody,
  res: NextApiResponse<Data>
) => {
  try {
    const userId = req.headers.userid as string
    // get user data by userId get from jwt
    const userRef = await db.collection('users').doc(userId).get()
    return res.status(200).setHeader('Cache-Control', 'max-age=10, public').json({ status: '0', user: userRef.data() })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default userDataRequestHandler
