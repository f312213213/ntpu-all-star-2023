import { getAuth } from 'firebase-admin/auth'
import admin from '@/vote/lib/firebase'
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

const DAY = 86400

const loginRequestHandler = async (
  req: IRequestBody,
  res: NextApiResponse<Data>
) => {
  const {
    username,
    password,
  } = req.body
  const searchParams = new URLSearchParams()

  searchParams.append('stud_num', username)
  searchParams.append('passwd', password)
  searchParams.append('x', '109')
  searchParams.append('y', '15')
  const response = await fetch('https://cof.ntpu.edu.tw/pls/pm/stud_system.login', {
    method: 'post',
    body: searchParams,
  })
  const responseText = await response.text()

  if (responseText.indexOf('window.open') !== -1 && admin.app.length) {
    try {
      const queryResult = await getAuth().getUserByEmail(`s${username}@gm.ntpu.edu.tw`)
      if (queryResult) {
        const {
          displayName,
          photoURL,
          uid,
        } = queryResult
        return res
          .setHeader('Set-Cookie', `stdla=123444;max-Age=${2 * DAY}`)
          .status(200)
          .json({ status: '0', user: { displayName, photoURL, uid, username } })
      }
    } catch (error: any) {
      if (!/ no user record corresponding/u.test(error.message)) {
        console.log('Error fetching user data:', error.stack)
      }
    }

    try {
      const createResult = await getAuth().createUser({
        email: `s${username}@gm.ntpu.edu.tw`,
        emailVerified: false,
        password,
        displayName: username,
        disabled: false,
      })
      const {
        displayName,
        photoURL = '',
        uid,
      } = createResult
      return res
        .setHeader('Set-Cookie', `stdla=123444;max-Age=${2 * DAY}`)
        .status(200)
        .json({ status: '0', user: { displayName, photoURL, uid, username } })
    } catch (error) {
      console.error(error)
    }
  }
  return res
    .status(403)
    .json({ status: '-1' })
}

export default loginRequestHandler
