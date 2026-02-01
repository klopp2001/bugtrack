import React from "react"

interface SmallAvatarProps {
  imgUrl: string
}

const SmallAvatar = ({ imgUrl }: SmallAvatarProps) => {
  return (
    <img
      className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
      src={imgUrl}
    />
  )
}

export default SmallAvatar
