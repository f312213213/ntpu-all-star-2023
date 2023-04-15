import { db } from '@/vote/lib/firebase'
import { firestore } from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import DocumentData = firestore.DocumentData;
import omit from 'lodash/omit'

interface Data {
  status: string
  data?: {
    player?: DocumentData
  }
}

interface IRequestQuery extends NextApiRequest {
  query: {
    sport: string
    gender: string
    playerId: string
    collection: string
  }
}

const SinglePlayerRequestHandler = async (
  req: IRequestQuery,
  res: NextApiResponse<Data>
) => {
  const { sport, gender, playerId, collection = 'candidates' } = req.query
  const playerFromFirestore = await db.collection(sport).doc(gender).collection(collection).doc(playerId).get()
  if (!playerFromFirestore.exists) {
    return res
      .status(404)
      .json({ status: '-1' })
  }
  return res
    .setHeader('Cache-Control', 'max-age=30, public')
    .status(200)
    .json({
      status: '0',
      data: {
        player: omit(playerFromFirestore.data(), 'votedPlayer'),
      },
    })
}

export default SinglePlayerRequestHandler
