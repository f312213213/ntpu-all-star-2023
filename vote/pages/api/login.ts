import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
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
  const searchParams = new URLSearchParams()

  searchParams.append('stud_num', req.body.username)
  searchParams.append('passwd', req.body.password)
  searchParams.append('x', '109')
  searchParams.append('y', '15')
  const response = await fetch('https://cof.ntpu.edu.tw/pls/pm/stud_system.login', {
    method: 'post',
    body: searchParams,
  })
  const responseText = await response.text()
  if (responseText.indexOf('window.open') !== -1) {
    return res
      .setHeader('Set-Cookie', `stdla=123444;max-Age=${2 * DAY}`)
      .status(200)
      .json({ status: '0' })
  }
  return res
    .status(403)
    .json({ status: '-1' })
}

export default loginRequestHandler
