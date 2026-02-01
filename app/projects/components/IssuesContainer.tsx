"use client"

import React, { useState } from "react"
import Popup from "reactjs-popup"
import { useDroppable } from "@dnd-kit/core"

import { Issue } from "@/app/types/issue"
import IssuePreview from "./IssuePreview"
import AddIssueModal from "./AddIssueModal"
import { Draggable } from "./Draggable"
import clsx from "clsx"
import { IssueGroup } from "@/app/types/issueGroup"
import { User } from "@/app/types/user"

interface IssueProgressContainerProps {
  id: number // уникальный id колонки
  title: string
  color: string
  issues: Issue[]
  issuesGroup: IssueGroup[]
  users: User[]
}

const IssuesKanban = ({
  id,
  title,
  color,
  issues,
  issuesGroup,
  users,
}: IssueProgressContainerProps) => {
  const [onAddIssueClicked, setOnIssueClicked] = useState(false)

  // Используем один droppable на всю колонку
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <>
      {onAddIssueClicked && (
        <div className="absolute w-full h-full left-0 top-0 bg-gray-400 opacity-40"></div>
      )}
      <div
        ref={setNodeRef}
        className={`flex flex-col items-center max-w-2/3 px-2 py-2 shadow  transition
          ${isOver ? "bg-blue-100" : "bg-gray-100"}`}
      >
        <div className="flex flex-col gap-2 w-full">
          <h1
            className={clsx(
              color ? `font-bold text-[${color}]` : `font-bold text-black]`
            )}
          >
            {title}
            <span className="ml-4 text-black">{issues.length}</span>
          </h1>

          <div className="flex flex-col gap-2">
            {issues.map((task) => (
              <Draggable key={task.id} id={task.id}>
                <IssuePreview issue={task} />
              </Draggable>
            ))}
          </div>
        </div>

        <Popup
          trigger={
            <button
              type="button"
              className="bg-sky-300 hover:bg-sky-400 shadow-sky-700 duration-200
                w-8 py-0.5 text-white rounded-full shadow font-bold mt-4 mb-2"
            >
              +
            </button>
          }
          onOpen={() => setOnIssueClicked(true)}
          onClose={() => setOnIssueClicked(false)}
          modal
        >
          <AddIssueModal
            issueGroupId={undefined}
            issuesGroup={issuesGroup}
            users={users}
          />
        </Popup>
      </div>
    </>
  )
}

export default IssuesKanban
