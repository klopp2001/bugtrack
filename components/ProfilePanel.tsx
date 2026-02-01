import React from "react"
import SmallAvatar from "./media/avatars/SmallAvatar"

import { CiBellOn } from "react-icons/ci"

//TODO:: download avatar image
const ProfilePanel = () => {
  return (
    <div className="fixed top-6 right-6">
      <div className="flex flex-row items-center">
        <div className="bg-gray-50 hover:bg-gray-100 items-center transition-all duration-200 ease-in-out shadow shadow-gray-400 rounded-2xl hover:cursor-pointer px-4 py-2 flex flex-row justify-between gap-3.5 text-sm">
          <div className="flex flex-row gap-2">
            <SmallAvatar imgUrl="http://localhost:8085/api/users/media/avatar/kitten.webp" />
            <div className="text-xl">Степан</div>
          </div>
          <div className="relative">
            <CiBellOn className="text-5xl" />
            <p className="absolute top-[-8px] right-[-8px] rounded-2xl border-gray-100 px-2 py-1 shadow bg-white">
              3
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
