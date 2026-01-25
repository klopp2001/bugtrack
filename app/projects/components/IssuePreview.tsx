import { Issue } from "@/app/types/issue"
import clsx from "clsx"
import React from "react"
import { FaCommentAlt } from "react-icons/fa"
interface IssuePreviewProps {
  issue: Issue
}

const IssuePreview = ({ issue }: IssuePreviewProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <div
          className={clsx(
            issue.status === "IN_PROGRESS" && "bg-red-400",
            issue.status === "IN_PROGRESS" && "bg-amber-400",
            issue.status === "IN_PROGRESS" && "bg-green-400",
            "h-1 w-full"
          )}
        ></div>
        <h2 className="text-lg font-bold">{issue.title}</h2>
        <div className="text-sm flex flex-col gap-1">
          <p>{issue.assigneeId}</p>
          <p>{issue.description}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-purple-600">#{issue.key}</p>
          <div className="flex flex-row gap-2 items-center">
            <a href={`/issue?id=${issue.id}/issues/`}>
              <FaCommentAlt />
            </a>
            {/* <span>{issue.issues.length}</span> */}
          </div>
        </div>
        {/* <p>{task.createdAt}</p> */}
      </div>
    </div>
  )
}

export default IssuePreview
