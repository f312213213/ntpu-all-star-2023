import { getAuth } from 'firebase-admin/auth'
import admin, { db } from '@/vote/lib/firebase'
import fetch from 'node-fetch'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
  user?: any
  error?: any
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

  // 學校系統如果有回傳 window.open 相關字樣則為登入成功 & firebase lib init 完成
  if (responseText.indexOf('window.open') !== -1 && admin.app.length) {
    try {
      const queryResult = await getAuth().getUserByEmail(`s${username}@gm.ntpu.edu.tw`)
      if (queryResult) {
        const {
          displayName,
          photoURL,
          uid,
        } = queryResult
        const customToken = await getAuth().createCustomToken(uid)
        return res
          .status(200)
          .json({ status: '0', user: { displayName, photoURL, uid, username, customToken } })
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
        email,
      } = createResult
      const customToken = await getAuth().createCustomToken(uid)
      await db.collection('users').doc(uid).set({
        displayName,
        photoURL,
        uid,
        email,
      })
      return res
        .status(200)
        .json({ status: '0', user: { displayName, photoURL, uid, username, customToken } })
    } catch (error) {
      return res
        .status(403)
        .json({ status: '-1' })
    }
  }
  return res
    .status(403)
    .json({ status: '-1' })
}

export default loginRequestHandler
