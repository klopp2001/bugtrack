import { getIssue, getUsers } from "@/app/api/issues_service/actions"
import React from "react"
interface IssuePageProps {
  params: {
    id: number
  }
}

const IssuePage = async ({ params }: IssuePageProps) => {
  const issue = await getIssue(params.id)
  const users = await getUsers([issue.reporterId, issue.assigneeId])
  // const issueMessages =
  // console.log(reporter)
  // console.log(assignee)

  return (
    <div>
      <div>t</div>
    </div>
  )
}

export default IssuePage
