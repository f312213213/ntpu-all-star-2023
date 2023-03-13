import { firestore } from 'firebase-admin'
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export const playerIsFemale = (playerRef: QueryDocumentSnapshot) => {
  return playerRef.ref.path.includes('female')
}
