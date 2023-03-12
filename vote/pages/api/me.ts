import { db, getUserIdFromAuthorizationHeader } from '@/vote/lib/firebase'
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
    const userId = await getUserIdFromAuthorizationHeader(req.headers.authorization)
    // get user data by userId get from jwt
    const userRef = await db.collection('users').doc(userId).get()
    return res.status(200).json({ status: '0', user: userRef.data() })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default userDataRequestHandler
