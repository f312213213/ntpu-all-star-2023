import { currentSectionVoteLeftSelector } from '@/vote/features/user/selector'
import { genderMap } from '@/vote/constants/gender'
import { useAppSelector } from '@/vote/features/store'
import BulletinItem from '@/vote/components/VoteLeftBulletin/BulletinItem'

const VoteLeftBulletin = () => {
  const basketballFemaleLeft = useAppSelector(currentSectionVoteLeftSelector(
    'basketball-female-candidates-voteCount'
  ))
  const basketballMaleLeft = useAppSelector(currentSectionVoteLeftSelector(
    'basketball-male-candidates-voteCount'
  ))
  const volleyballFemaleSetterLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-female-setter-voteCount'
  ))
  const volleyballMaleSetterLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-setter-voteCount'
  ))
  const volleyballFemaleEdgeLineLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-female-edgeline-voteCount'
  ))
  const volleyballMaleEdgeLineLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-edgeline-voteCount'
  ))
  const volleyballMaleSpikerLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-spiker-voteCount'
  ))
  const volleyballMaleLiberoLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-libero-voteCount'
  ))

  return (
    <div className={'w-full flex justify-center'}>
      <div className={'grid grid-flow-col gap-5 text-center auto-cols-max'}>
        <div className={'flex flex-col items-center gap-4'}>
          <p className={'text-2xl'}>
            籃球
          </p>
          <div className={'flex gap-4'}>
            <BulletinItem value={basketballMaleLeft} gender={genderMap.male} />

            <BulletinItem value={basketballFemaleLeft} gender={genderMap.female} />
          </div>
        </div>

        <div className={'divider divider-horizontal'} />

        <div className={'flex flex-col items-center gap-4'}>
          <p className={'text-2xl'}>
            排球 - 邊線攻擊手
          </p>
          <div className={'flex gap-4'}>
            <BulletinItem value={volleyballMaleEdgeLineLeft} gender={genderMap.male} />

            <BulletinItem value={volleyballFemaleEdgeLineLeft} gender={genderMap.female} />
          </div>
        </div>

        <div className={'divider divider-horizontal'} />

        <div className={'flex flex-col items-center gap-4'}>
          <p className={'text-2xl'}>
            排球 - 舉球員
          </p>
          <div className={'flex gap-4'}>
            <BulletinItem value={volleyballMaleSetterLeft} gender={genderMap.male} />

            <BulletinItem value={volleyballFemaleSetterLeft} gender={genderMap.female} />
          </div>
        </div>

        <div className={'divider divider-horizontal'} />

        <div className={'flex flex-col items-center gap-4'}>
          <p className={'text-2xl'}>
            排球 - 中間手
          </p>
          <div className={'flex gap-4'}>
            <BulletinItem value={volleyballMaleSpikerLeft} gender={genderMap.male} />
          </div>
        </div>

        <div className={'divider divider-horizontal'} />

        <div className={'flex flex-col items-center gap-4'}>
          <p className={'text-2xl'}>
            排球 - 自由球員
          </p>
          <div className={'flex gap-4'}>
            <BulletinItem value={volleyballMaleLiberoLeft} gender={genderMap.male} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default VoteLeftBulletin
