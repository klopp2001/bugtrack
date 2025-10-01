import React from 'react'

interface OverallTaskRectProps {
    count: number,
    caption: string
}

const OverallTaskRect = ({count, caption} : OverallTaskRectProps) => {
  return (
    <div className='text-black border-2 p-2 border-green-900'>
        <p className='text-xl'>{count} Tasks</p>
        <p className='text-sm'>{caption}</p>
    </div>
  )
}

export default OverallTaskRect