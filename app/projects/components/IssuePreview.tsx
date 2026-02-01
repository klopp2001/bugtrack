import { Issue } from "@/app/types/issue"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"
import clsx from "clsx"
import React from "react"
import { FaCommentAlt } from "react-icons/fa"
interface IssuePreviewProps {
  issue: Issue
}

const IssuePreview = ({ issue }: IssuePreviewProps) => {
  return (
    <div className="flex flex-col bg-white max-w-2xs px-1 py-2 rounded-xl p-0.5">
      <div>
        <h2 className="truncate">{issue.title}</h2>
        <div className="text-sm flex flex-col gap-1">
          {/* <p>{issue.}</p> */}
          {/* <p>{issue.description}</p> */}
        </div>

        <div className="flex flex-row justify-end gap-2 mt-4">
          <a href="/" className="text-purple-600">
            #{issue.issue_key}
          </a>
          {issue.reporterUser?.avatarUrl ? (
            <SmallAvatar imgUrl={issue.reporterUser?.avatarUrl} />
          ) : (
            <p> {issue.reporterUser?.name[0]} </p>
          )}
          <div className="flex flex-row gap-2 items-center">
            <a href={`/issue?id=${issue.id}/issues/`}>
              {/* <FaCommentAlt /> */}
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
