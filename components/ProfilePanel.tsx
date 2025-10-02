import React from "react"

//TODO:: download avatar image
const ProfilePanel = () => {
  return (
    <div className="ml-[80%] max-w-50">
      <div className="bg-gray-50 hover:bg-gray-100 transition-all duration-200 ease-in-out shadow shadow-gray-400 rounded-2xl hover:cursor-pointer px-4 py-2 flex flex-row justify-between gap-3.5 text-sm">
        <div className="flex flex-row gap-2">
          <div>Image</div>
          <div>Name</div>
        </div>
        <div>Notification</div>
      </div>
    </div>
  )
}

export default ProfilePanel
