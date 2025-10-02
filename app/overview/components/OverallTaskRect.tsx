import React from "react"

interface OverallTaskRectProps {
  count: number
  caption: string
}

const OverallTaskRect = ({ count, caption }: OverallTaskRectProps) => {
  return (
    <div className="text-black  p-2 border-black bg-gray-50 rounded-2xl shadow">
      <p className="text-xl">{count} Tasks</p>
      <p className="text-sm">{caption}</p>
    </div>
  )
}

export default OverallTaskRect
