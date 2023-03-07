import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { firestore } from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import FieldValue = firestore.FieldValue;

interface Data {
  status: string
  data?: {
    message?: string
  }
}

interface IRequestQuery extends NextApiRequest {
  body: {
    vote: IPlayer
    sport: string
  }
}

const VoteRequestHandler = async (
  req: IRequestQuery,
  res: NextApiResponse<Data>
) => {
  const { gender, id: playerId, collection = 'candidates' } = req.body.vote
  const { sport } = req.body
  const playerFirestoreRef = await db.collection(sport).doc(gender).collection(collection).doc(playerId)

  try {
    await playerFirestoreRef.update({
      voteCount: FieldValue.increment(1),
    })
  } catch (e) {
    return res
      .status(400)
      .json({
        status: '-1',
        data: {
          message: 'failed',
        },
      })
  }

  return res
    .status(200)
    .json({
      status: '0',
      data: {
        message: 'success',
      },
    })
}

export default VoteRequestHandler
