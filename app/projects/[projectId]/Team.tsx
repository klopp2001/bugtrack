import { User } from "@/app/types/user"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"
import React from "react"

interface TeamProps {
  users: User[]
}

const Team = ({ users }: TeamProps) => {
  return (
    <div className="absolute bg-white p-2.5 left-[-250px] w-[450px] top-[-250px] rounded-3xl shadow px-4 gap-4">
      <h1>Команда Проекта</h1>
      <div className="flex flex-col gap-4 my-4 max-h-1/4 overflow-y-scroll">
        {users.map((user) => (
          <a
            href={`/user/id?=${user.id}`}
            className="w-full bg-gray-100 px-4 py-2 rounded-2xl hover:bg-gray-300 transition-colors duration-300  shadow"
          >
            <div className="flex flex-row justify-between">
              <SmallAvatar imgUrl={user.avatarUrl ? user.avatarUrl : ""} />
              <div>
                <p>{user.name}</p>
                <p>{user.role}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Team
