"use client"
import { User } from "@/app/types/user"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"
import React, { useState } from "react"
import Popup from "reactjs-popup"
import Team from "./Team"
import { useProjectContext } from "../context/ProjectContext"

interface BoardHeaderProps {
  users?: User[]
}

const BoardHeader = ({ users }: BoardHeaderProps) => {
  console.log(users)
  const context = useProjectContext()

  const [viewValue, setViewValue] = useState("KANBAN")
  const [teamModalShowed, setTeamModalShowed] = useState(false)

  return (
    <>
      {teamModalShowed && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-40 z-20"></div>
      )}
      <div className="flex gap-44 items-center">
        <div className="text-2xl">Борд</div>
        <div className="flex  gap-12 justify-between items-center">
          <form className="flex flex-row gap-2">
            <input
              type="text"
              className="border-2 rounded-2xl px-2 h-1/2"
            ></input>
            <input type="submit" value="Поиск" />
          </form>
          <Popup
            trigger={
              <button type="button" className="">
                <div className="flex flex-row my-2 bg-gray-100 rounded-2xl shadow gap-2 p-2">
                  {users?.slice(0, 3).map((user, i) => (
                    <div className="">
                      {user.avatarUrl && (
                        <SmallAvatar imgUrl={user.avatarUrl} />
                      )}
                    </div>
                  ))}
                </div>
              </button>
            }
            onOpen={() => {
              setTeamModalShowed(true)
            }}
            onClose={() => {
              setTeamModalShowed(false)
            }}
            modal
          >
            <Team users={users!} />
          </Popup>
        </div>
        <div className="border-2 border-gray-100 rounded-xl shadow p-1 pr-4">
          <select
            id="dropdown"
            value={viewValue}
            onChange={(e) => {
              if (e.target.value == "KANBAN") {
                context.setView(e.target.value)
              } else {
                context.setView("LIST")
              }
              setViewValue(e.target.value)
            }}
          >
            <option value="KANBAN">Канбан</option>
            <option value="LIST">Список</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default BoardHeader
