import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { playerIsFemale } from '@/vote/utilis/player'
import omitBy from 'lodash/omitBy'
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

    const volleyballEdgelineFemale: IPlayer[] = []
    const volleyballEdgelineMale: IPlayer[] = []

    const volleyballSpikerMale: IPlayer[] = []

    const volleyballLiberoMale: IPlayer[] = []

    basketballVoted.forEach(p => {
      if (playerIsFemale(p)) {
        basketballFemale.push({
          ...p.data(),
          id: p.id,
          collection: 'candidates',
          gender: 'female',
        } as IPlayer)
      } else {
        basketballMale.push({
          ...p.data(),
          id: p.id,
          collection: 'candidates',
          gender: 'male',
        } as IPlayer)
      }
    })

    volleyballSetterVoted.forEach(p => {
      if (playerIsFemale(p)) {
        volleyballSetterFemale.push({
          ...p.data(),
          id: p.id,
          collection: 'setter',
          gender: 'female',
        } as IPlayer)
      } else {
        volleyballSetterMale.push({
          ...p.data(),
          id: p.id,
          collection: 'setter',
          gender: 'male',
        } as IPlayer)
      }
    })

    volleyballEdgelineVoted.forEach(p => {
      if (playerIsFemale(p)) {
        volleyballEdgelineFemale.push({
          ...p.data(),
          id: p.id,
          collection: 'edgeline',
          gender: 'female',
        } as IPlayer)
      } else {
        volleyballEdgelineMale.push({
          ...p.data(),
          id: p.id,
          collection: 'edgeline',
          gender: 'male',
        } as IPlayer)
      }
    })

    volleyballSpikerVoted.forEach(p => {
      volleyballSpikerMale.push({
        ...p.data(),
        id: p.id,
        collection: 'spiker',
        gender: 'male',
      } as IPlayer)
    })

    volleyballLiberoVoted.forEach(p => {
      volleyballLiberoMale.push({
        ...p.data(),
        id: p.id,
        collection: 'libero',
        gender: 'male',
      } as IPlayer)
    })

    return res
      .status(200)
      .json({
        status: '0',
        voted: omitBy({
          basketballFemale,
          basketballMale,
          volleyballSetterFemale,
          volleyballSetterMale,
          volleyballEdgelineFemale,
          volleyballEdgelineMale,
          volleyballSpikerMale,
          volleyballLiberoMale,
        }, (section) => section.length === 0),
      })
  } catch (e) {
    return res.status(400).json({ status: '-1' })
  }
}

export default votedPlayerRequestHandler
