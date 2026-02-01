import {
  getIssue,
  getIssueMessages,
  getProjectIssues,
  getUsers,
} from "@/app/api/issues_service/actions"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"
import React from "react"
interface IssuePageProps {
  params: {
    id: number
  }
}

const IssuePage = async ({ params }: IssuePageProps) => {
  const issue = await getIssue(params.id)
  //  const project = await getProject
  const users = await getUsers([issue.reporterId, issue.assigneeId])

  const messages = await getIssueMessages(3)
  // const issueMessages =
  // console.log(reporter)
  // console.log(assignee)

  return (
    <div className="border-2 rounded-2xl shadow p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">{issue.title}</h1>
        <p className="text-purple-400 text-2xl bg-purple-100 px-4 rounded-2xl shadow">
          #{issue.issue_key}
        </p>
      </div>
      <h2 className="text-lg mt-12 text-bold">Описание</h2>
      <div>{issue.description}</div>
      <div className="mt-12 ">
        <h1>Обсуждение:</h1>
        <div className="flex flex-col gap-4 mt-4">
          {messages.map((message) => (
            <div className="flex flex-row justify-between max-w-1/2 bg-gray-100 border-2 rounded-2xl shadow px-4 py-2">
              <div className="flex flex-row">
                <SmallAvatar imgUrl={message.avatarUrl} />
                <div className="flex flex-col ml-4">
                  <div>{message.userName} </div>
                  <div className="text-2xl bg-white p-4 rounded border-2">
                    {message.message}{" "}
                  </div>
                </div>
              </div>
              <div>{message.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="text-2xl mt-4 border-2 rounded-2xl shadow px-4 py-2">
        Отправить сообщение
      </button>
    </div>
  )
}

export default IssuePage
