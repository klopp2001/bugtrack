"use client"
import { createIssueDTO, IssueDTO } from "@/app/types/issue"
import React, { useState } from "react"
import { useProjectContext } from "../context/ProjectContext"
import { sendNewIssue } from "@/app/api/issues_service/actions"
import { IssueGroup } from "@/app/types/issueGroup"
import { User } from "@/app/types/user"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"

interface AddIssueModalProps {
  issueGroupId: any
  issuesGroup: IssueGroup[]
  users: User[]
}

const AddIssueModal = ({
  issueGroupId,
  issuesGroup,
  users,
}: AddIssueModalProps) => {
  const [onCreated, setOnCreated] = useState(false)
  const { projectId } = useProjectContext()
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
  const inputNamesDesc = {
    // "projectId",
    reporterId: "Z",
    assigneeId: "Z",
    title: "",
    key: "",
    status: "",
    issueGroupId: "",
    description: "",
  }

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        {/* {inputNames.map((name) => (
          <div>
            <p>{inputNamesDesc[name]}</p>
            <input
              name={name}
              type="text"
              className="border-2 p-2 rounded-lg"
            />
          </div>
        ))} */}
        <label>Тип Задачи</label>
        <select className="border-2" name="issueGroup" id="">
          {issuesGroup.map((issueGroup) => (
            <option>
              <p>{issueGroup.name}</p>
            </option>
          ))}
        </select>

        <label>Название</label>
        <input type="text" className="border-2 px-2" name="user" id=""></input>

        <label>Описание</label>
        <textarea className="border-2 px-2" name="user" id=""></textarea>

        <label>Исполнитель</label>
        <select className="border-2" name="user" id="">
          {users.map((user) => (
            <option>
              <p>{user.name}</p>
            </option>
          ))}
        </select>

        <label>Принимающий</label>
        <select className="border-2" name="user" id="">
          {users.map((user) => (
            <option>
              <p>{user.name}</p>
            </option>
          ))}
        </select>

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
