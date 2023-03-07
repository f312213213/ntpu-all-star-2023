import { db } from '@/vote/lib/firebase'
import { getAuth } from 'firebase-admin/auth'
import fetch from 'node-fetch'
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
    const jwt = req.headers?.authorization?.split(' ')[1]
    if (!jwt) throw Error('')
    // get userId from jwt
    const decodedToken = await getAuth().verifyIdToken(jwt)
    const userId = decodedToken.uid
    // get user data by userId get from jwt
    const playerFromFirestore = await db.collection('users').doc(userId).get()
    console.log(userId, playerFromFirestore.data())
    return res.status(200).json({ status: '0', user: playerFromFirestore.data() })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default userDataRequestHandler
