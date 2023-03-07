import { db } from '@/vote/lib/firebase'
import { firestore } from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import DocumentData = firestore.DocumentData;
import { IPlayer } from '@/vote/interfaces/player'

interface Data {
  status: string
  data?: {
    players?: DocumentData[]
    startAfter?: string
  }
}

interface IRequestQuery extends NextApiRequest {
  query: {
    sport: string
    gender: string
    collection: string
    startAfter: string
  }
}

const SportPlayerRequestHandler = async (
  req: IRequestQuery,
  res: NextApiResponse<Data>
) => {
  const { sport, gender, startAfter, collection = 'candidates' } = req.query

  if (gender) {
    const playersToPage: IPlayer[] = []

    const genderPlayersFromFirestore = await db
      .collection(sport)
      .doc(gender)
      .collection(collection)
      .orderBy('uid')
      .startAfter(startAfter)
      .limit(10)
      .get()

    genderPlayersFromFirestore.forEach((player) => {
      playersToPage.push({
        voteCount: 0,
        gender,
        introduction: '',
        photoURL: '',
        username: '',
        collection,
        id: player.id,
        ...player.data(),
      })
    })

    console.log(playersToPage)

    return res
      .setHeader('Cache-Control', 'max-age=30, public')
      .status(200)
      .json({
        status: '0',
        data: {
          players: playersToPage,
          startAfter: playersToPage[playersToPage.length - 1]?.id ?? undefined,
        },
      })
  } else {
    const femalePlayersCollectionList: string[] = []
    const malePlayersCollectionList: string[] = []
    const playersToPage: IPlayer[] = []

    const femalePlayersCollectionListFromFirestore = await db
      .collection(sport)
      .doc('female')
      .listCollections()

    femalePlayersCollectionListFromFirestore.forEach(col => femalePlayersCollectionList.push(col.id))

    const malePlayersCollectionListFromFirestore = await db
      .collection(sport)
      .doc('male')
      .listCollections()

    malePlayersCollectionListFromFirestore.forEach(col => malePlayersCollectionList.push(col.id))

    for (const collection of malePlayersCollectionList) {
      const malePlayersFromFirestore = await db
        .collection(sport)
        .doc('male')
        .collection(collection)
        .limit(5)
        .get()

      malePlayersFromFirestore.forEach((player) => {
        playersToPage.push({
          voteCount: 0,
          gender: 'male',
          introduction: '',
          photoURL: '',
          username: '',
          collection,
          id: player.id,
          ...player.data(),
        })
      })
    }

    for (const collection of femalePlayersCollectionList) {
      const femalePlayersFromFirestore = await db
        .collection(sport)
        .doc('female')
        .collection(collection)
        .limit(5)
        .get()

      femalePlayersFromFirestore.forEach((player) => {
        playersToPage.push({
          voteCount: 0,
          gender: 'female',
          introduction: '',
          photoURL: '',
          username: '',
          collection,
          id: player.id,
          ...player.data(),
        })
      })
    }

    return res
      .setHeader('Cache-Control', 'max-age=30, public')
      .status(200)
      .json({
        status: '0',
        data: {
          players: playersToPage.sort((playerA, playerB) => {
            if (playerA.voteCount > playerB.voteCount) return -1
            if (playerA.voteCount < playerB.voteCount) return 1
            return 0
          }),
          startAfter: undefined,
        },
      })
  }
}

export default SportPlayerRequestHandler
