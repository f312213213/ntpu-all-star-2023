import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { playerIsFemale } from '@/vote/utilis/player'
import omit from 'lodash/omit'
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

    if (!basketballVoted.empty) {
      basketballVoted.forEach(p => {
        if (playerIsFemale(p)) {
          basketballFemale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'candidates',
            gender: 'female',
          }, ['uid', 'votedPlayer']) as IPlayer)
        } else {
          basketballMale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'candidates',
            gender: 'male',
          }, ['uid', 'votedPlayer']) as IPlayer)
        }
      })
    }

    if (!volleyballSetterVoted.empty) {
      volleyballSetterVoted.forEach(p => {
        if (playerIsFemale(p)) {
          volleyballSetterFemale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'setter',
            gender: 'female',
          }, ['uid', 'votedPlayer']) as IPlayer)
        } else {
          volleyballSetterMale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'setter',
            gender: 'male',
          }, ['uid', 'votedPlayer']) as IPlayer)
        }
      })
    }

    if (!volleyballEdgelineVoted.empty) {
      volleyballEdgelineVoted.forEach(p => {
        if (playerIsFemale(p)) {
          volleyballEdgelineFemale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'edgeline',
            gender: 'female',
          }, ['uid', 'votedPlayer']) as IPlayer)
        } else {
          volleyballEdgelineMale.push(omit({
            ...p.data(),
            id: p.id,
            collection: 'edgeline',
            gender: 'male',
          }, ['uid', 'votedPlayer']) as IPlayer)
        }
      })
    }

    if (!volleyballSpikerVoted.empty) {
      volleyballSpikerVoted.forEach(p => {
        volleyballSpikerMale.push(omit({
          ...p.data(),
          id: p.id,
          collection: 'spiker',
          gender: 'male',
        }, ['uid', 'votedPlayer']) as IPlayer)
      })
    }

    if (!volleyballLiberoVoted.empty) {
      volleyballLiberoVoted.forEach(p => {
        volleyballLiberoMale.push(omit({
          ...p.data(),
          id: p.id,
          collection: 'libero',
          gender: 'male',
        }, ['uid', 'votedPlayer']) as IPlayer)
      })
    }

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
    console.log(e)
    return res.status(400).json({ status: '-1' })
  }
}

export default votedPlayerRequestHandler
