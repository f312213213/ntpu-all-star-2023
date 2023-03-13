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

    const votedPlayerIdList = Object.keys(userObject?.votedPlayer)

    const basketballVoted = await db
      .collectionGroup('candidates')
      .where('votedPlayer', 'array-contains', userId)
      .get()

    const volleyballSpikerVoted = await db
      .collectionGroup('spiker')
      .where('votedPlayer', 'array-contains', userId)
      .get()

    const volleyballEdgelineVoted = await db
      .collectionGroup('edgeline')
      .where('votedPlayer', 'array-contains', userId)
      .get()

    const volleyballSetterVoted = await db
      .collectionGroup('setter')
      .where('votedPlayer', 'array-contains', userId)
      .get()

    const volleyballLiberoVoted = await db
      .collectionGroup('libero')
      .where('votedPlayer', 'array-contains', userId)
      .get()

    console.log({
      basketballVoted: basketballVoted.size,
      volleyballSpikerVoted: volleyballSpikerVoted.size,
      volleyballEdgelineVoted: volleyballEdgelineVoted.size,
      volleyballSetterVoted: volleyballSetterVoted.size,
      volleyballLiberoVoted: volleyballLiberoVoted.size,
    })

    return res.status(200).json({ status: '0', voted: votedPlayerIdList })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default votedPlayerRequestHandler
