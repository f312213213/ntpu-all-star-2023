import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { playerIsFemale } from '@/vote/utilis/player'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  status: string
  voted?: any
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

    const basketballFemale: IPlayer[] = []
    const basketballMale: IPlayer[] = []

    const volleyballSetterFemale: IPlayer[] = []
    const volleyballSetterMale: IPlayer[] = []

    const volleyballEdgeLineFemale: IPlayer[] = []
    const volleyballEdgeLineMale: IPlayer[] = []

    const volleyballSpikerMale: IPlayer[] = []

    const volleyballLiberoMale: IPlayer[] = []

    basketballVoted.forEach(p => {
      if (playerIsFemale(p)) {
        basketballFemale.push(p.data() as IPlayer)
      } else {
        basketballMale.push(p.data() as IPlayer)
      }
    })

    volleyballSetterVoted.forEach(p => {
      if (playerIsFemale(p)) {
        volleyballSetterFemale.push(p.data() as IPlayer)
      } else {
        volleyballSetterMale.push(p.data() as IPlayer)
      }
    })

    volleyballEdgelineVoted.forEach(p => {
      if (playerIsFemale(p)) {
        volleyballEdgeLineFemale.push(p.data() as IPlayer)
      } else {
        volleyballEdgeLineMale.push(p.data() as IPlayer)
      }
    })

    volleyballSpikerVoted.forEach(p => {
      volleyballSpikerMale.push(p.data() as IPlayer)
    })

    volleyballLiberoVoted.forEach(p => {
      volleyballLiberoMale.push(p.data() as IPlayer)
    })

    return res
      .status(200)
      .json({
        status: '0',
        voted: {
          basketballFemale,
          basketballMale,
          volleyballSetterFemale,
          volleyballSetterMale,
          volleyballEdgeLineFemale,
          volleyballEdgeLineMale,
          volleyballSpikerMale,
          volleyballLiberoMale,
        },
      })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default votedPlayerRequestHandler
