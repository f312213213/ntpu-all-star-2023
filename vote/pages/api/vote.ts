import { IPlayer } from '@/vote/interfaces/player'
import { db, getUserIdFromAuthorizationHeader } from '@/vote/lib/firebase'
import { firestore } from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import FieldValue = firestore.FieldValue;
import { ESports } from '@/vote/constants/sports'

interface Data {
  status: string
  data?: {
    message?: string
  }
}

interface IBody extends IPlayer {
  sport: ESports
}

interface IRequestQuery extends NextApiRequest {
  body: IBody
}

const VoteRequestHandler = async (
  req: IRequestQuery,
  res: NextApiResponse<Data>
) => {
  try {
    const userId = await getUserIdFromAuthorizationHeader(req.headers.authorization)

    const { sport, gender, id: playerId, collection = 'candidates' } = req.body

    const playerFirestoreRef = await db
      .collection(sport)
      .doc(gender)
      .collection(collection)
      .doc(playerId)

    const userFirestoreRef = await db
      .collection('users')
      .doc(userId)

    const userFirestoreObject = (await userFirestoreRef.get()).data()

    if (userFirestoreObject?.votedPlayer?.[playerId]) throw Error('Duplicate vote action.')

    // 該 player 的投票數加 1
    await playerFirestoreRef.update({
      voteCount: FieldValue.increment(1),
    })

    /*
      使用者要記錄
        1. 共投了幾票
        2. 投給誰
        3. 在每個分區個投了幾票
     */
    await userFirestoreRef.update({
      voteCount: FieldValue.increment(1),
      [`${sport}-${gender}-${collection}-voteCount`]: FieldValue.increment(1),
      votedPlayer: {
        ...userFirestoreObject?.votedPlayer,
        [playerId]: true,
      },
    })
  } catch (e: any) {
    return res
      .status(400)
      .json({
        status: '-1',
        data: {
          message: e.message || 'failed',
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
