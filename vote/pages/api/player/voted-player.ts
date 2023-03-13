import { db } from '@/vote/lib/firebase'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
  voted?: any[]
}

interface IRequestBody extends NextApiRequest {
  body: {
    username: string
    password: string
  }
}

const votedPlayerRequestHandler = async (
  req: IRequestBody,
  res: NextApiResponse<Data>
) => {
  try {
    const userId = req.headers.userid as string
    // get user data by userId get from jwt
    const userRef = await db.collection('users').doc(userId).get()
    const userObject = userRef.data()
    return res.status(200).json({ status: '0', voted: Object.keys(userObject?.votedPlayer) })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default votedPlayerRequestHandler
