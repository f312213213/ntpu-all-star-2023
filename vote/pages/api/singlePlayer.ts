import { db } from '@/vote/lib/firebase'
import { firestore } from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import DocumentData = firestore.DocumentData;

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
  }
}

const SinglePlayerRequestHandler = async (
  req: IRequestQuery,
  res: NextApiResponse<Data>
) => {
  const { sport, gender, playerId } = req.query
  const playerFromFirestore = await db.collection(sport).doc(gender).collection('player').doc(playerId).get()
  if (!playerFromFirestore.exists) {
    return res
      .status(404)
      .json({ status: '-1' })
  }
  return res
    .setHeader('Cache-Control', 'max-age=10, public')
    .status(200)
    .json({
      status: '0',
      data: {
        player: playerFromFirestore.data(),
      },
    })
}

export default SinglePlayerRequestHandler
