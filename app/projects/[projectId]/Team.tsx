import { User } from "@/app/types/user"
import React from "react"

interface TeamProps {
  users?: User[]
}

const Team = ({ users }: TeamProps) => {
  console.log(users)
  return (
    <div className="bg-sky-100 p-3">
      <h1>Team in Project</h1>
      <div>
        {users?.map((user) => (
          <div className="my-2">
            <a href={"/user/" + user.id}>{user.name}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
