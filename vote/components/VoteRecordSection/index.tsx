import { ESports } from '@/vote/constants/sports'
import { IPlayer } from '@/vote/interfaces/player'
import { useEffect, useState } from 'react'
import CandidateCard from '@/vote/components/Cards/CandidateCard'

const VoteRecordSection = ({
  headerText,
  votedPlayer,
}: {
  headerText: string
  votedPlayer: IPlayer[]
}) => {
  const [votedPlayerList, setVotedPlayerList] = useState<IPlayer[]>([])
  const onCancelVote = (id: string) => {
    setVotedPlayerList((v) => {
      return v.filter(player => {
        return player.id !== id
      })
    })
  }

  useEffect(() => {
    setVotedPlayerList(votedPlayer)
  }, [votedPlayer])

  return (
    <div className={'my-4'}>
      <h3 className={'text-xl'}>
        {headerText}
      </h3>
      {
        votedPlayerList.length === 0
          ? (
            <p className={'my-4 text-center'}>暫無資料</p>
            )
          : (
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 my-8'}>
              {
                votedPlayerList.map((player) => {
                  return (
                    <CandidateCard
                      onCancelVote={onCancelVote}
                      key={player.id}
                      id={player.id}
                      photoURL={player.photoURL}
                      username={player.username}
                      introduction={player.introduction}
                      gender={player.gender}
                      collection={player.collection}
                      voteCount={player.voteCount}
                      sportType={player.collection === 'candidates' ? ESports.BASKETBALL : ESports.VOLLEYBALL}
                    />
                  )
                })
              }
            </div>
            )
      }
    </div>
  )
}

export default VoteRecordSection
