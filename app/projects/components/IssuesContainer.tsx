"use client"
import { Task } from "@/app/types/tasks"
import Button from "@/components/Button"
import ButtonForModal from "@/components/ButtonForModal"
import React, { useState } from "react"
import Popup from "reactjs-popup"
import IssuePreview from "./IssuePreview"
import { Issue } from "@/app/types/issue"
import AddIssueModal from "./AddIssueModal"

interface IssueProgressContainerProps {
  title: string
  color: string
  issues: Issue[]
}

const IssuesContainer = ({
  title,
  color,
  issues,
}: IssueProgressContainerProps) => {
  const [onAddIssueClicked, setOnIssueClicked] = useState(false)
  const closeModal = () => setOnIssueClicked(false)
  return (
    <div className={"flex flex-col max-w-1/4 " + `bg-[${color}]`}>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-xs">{issues.length} tasks available</div>
        </div>
        <Popup
          trigger={
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-600 hover:cursor-pointer  shadow-green-700 duration-200 ease-in-out flex-row min-w-[140px] gap-2 px-4 py-2 text-center items-center text-white justify-center rounded-xl shadow font-bold"
            >
              Add Issue
            </button>
          }
          onOpen={() => setOnIssueClicked(true)}
          onClose={closeModal}
          modal
          position="top center"
        >
          <AddIssueModal />
        </Popup>
      </div>
      <div className="flex flex-col mt-10 gap-8">
        {issues.map((task) => (
          <IssuePreview key={task.key} issue={task} />
        ))}
      </div>
      {onAddIssueClicked && (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10"></div>
      )}
    </div>
  )
}

export default IssuesContainer
