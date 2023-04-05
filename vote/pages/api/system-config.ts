import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  timestamp: number
  startTimeStamp: number
  endTimeStamp: number
}

const systemConfig = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  return res.status(200).json({
    timestamp: Date.now(),
    startTimeStamp: Number(process.env.START_TIME_STAMP ?? 0),
    endTimeStamp: Number(process.env.END_TIME_STAMP ?? 0),
  })
}

export default systemConfig
