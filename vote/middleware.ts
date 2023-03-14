import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/api/vote',
    '/api/cancel-vote',
    '/api/me',
    '/api/player/voted-player',
  ],
}

const middleware = async (req: NextRequest) => {
  try {
    const response = await fetch(`${process.env.HOST_DOMAIN}/api/verify-token`, {
      headers: {
        authorization: req.headers.get('authorization') || '',
      },
    })

    const data = await response.json()
    if (response.status !== 200 || data.status !== '0') throw Error()

    const requestHeaders = new Headers(req.headers)

    requestHeaders.set('userId', data.data.userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (e) {
    return new NextResponse(JSON.stringify({ msg: 'Invalid Token!', status: '-1' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export default middleware
