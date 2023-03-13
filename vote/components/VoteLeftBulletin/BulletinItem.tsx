import { genderMap } from '@/vote/constants/gender'

const BulletinItem = ({
  value,
  gender,
}: {
  value: number
  gender?: genderMap
}) => {
  return (
    <div className={'flex flex-col p-2 bg-neutral rounded-box text-neutral-content'}>
      <span className={'countdown font-mono text-5xl'}>
        {/* @ts-ignore */}
        <span style={{ '--value': value }}></span>
      </span>
      {gender}
    </div>
  )
}

export default BulletinItem
