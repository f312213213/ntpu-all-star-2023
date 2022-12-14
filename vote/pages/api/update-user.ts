import { getAuth } from 'firebase-admin/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
}

interface IRequestBody extends NextApiRequest {
  body: {
    username: string
    password: string
    uid: string
    photoURL: string
  }
}

const DAY = 86400

const loginRequestHandler = async (
  req: IRequestBody,
  res: NextApiResponse<Data>
) => {
  try {
    const createResult = await getAuth().updateUser(req.body.uid, {
      displayName: req.body.username,
      photoURL: req.body.photoURL,
    })
    return res
      .status(200)
      .json({ status: '0' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ status: '-1' })
  }
}

export default loginRequestHandler
