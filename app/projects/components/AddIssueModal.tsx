"use client"
import { createIssueDTO, IssueDTO } from "@/app/types/issue"
import React, { useState } from "react"
import { useProject } from "../context/ProjectContext"
import { sendNewIssue } from "@/app/api/issues_service/actions"

interface AddIssueModalProps {
  issueGroupId: any
}

const AddIssueModal = ({ issueGroupId }: AddIssueModalProps) => {
  const [onCreated, setOnCreated] = useState(false)
  const { projectId } = useProject()
  const inputNames = [
    // "projectId",
    "reporterId",
    "assigneeId",
    "title",
    "key",
    "status",
    "issueGroupId",
    "description",
  ]
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const projectIdDto = projectId as string
    const reporterIdDto = formData.get("reporterId") as string
    const assigneeIdDto = formData.get("assigneeId") as string
    const titleDto = formData.get("title") as string
    const keyDto = formData.get("key") as string
    const statusDto = formData.get("status") as string
    const issueGroupIdDto = issueGroupId
    const descriptionDto = formData.get("description") as string

    let isseDto = createIssueDTO(
      projectIdDto,
      reporterIdDto,
      assigneeIdDto,
      titleDto,
      keyDto,
      statusDto,
      issueGroupIdDto,
      descriptionDto
    )

    await sendNewIssue(Number(projectId), isseDto)
  }

  return (
    // assignee_id
    // created_at
    // description
    // issue_key
    // project_id
    // reporter_id
    // status
    // title
    // updated_at

    <div className="absolute bg-white p-2.5 left-[-250px] w-[450px] top-[-250px] ">
      <div className="font-bold">Создать новую issue</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {inputNames.map((name) => (
          <div>
            <p>{name}</p>
            <input
              name={name}
              type="text"
              className="border-2 p-2 rounded-lg"
            />
          </div>
        ))}
        {/* <p>assignee_id</p>
        <input
          name="assignee_id"
          type="text"
          className="border-2 p-2 rounded-lg"
        />

        <p>description</p>
        <input
          name="description"
          type="text"
          className="border-2 p-2 rounded-lg"
        />

        <p>issue_key</p>
        <input
          name="issue_key"
          type="text"
          className="border-2 p-2 rounded-lg"
        />

        <p>reporter_id</p>
        <input
          name="reporter_id"
          type="text"
          className="border-2 p-2 rounded-lg"
        /> */}

        <div className="flex justify-center">
          <button type="submit" className="border-2 p-2 rounded-2xl">
            Создать
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddIssueModal
