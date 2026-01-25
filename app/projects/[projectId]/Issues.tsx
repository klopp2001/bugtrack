"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../context/NotificationContextProvider"
import IssuesContainer from "../components/IssuesContainer"
import { getRequest, ServiceRoutes } from "@/app/api/http"
import { IssueGroup } from "@/app/types/issueGroup"
import { Issue } from "@/app/types/issue"
import { loadIssueGroups, loadIssues } from "@/app/api/issues_service/actions"
import IssuePreview from "../components/IssuePreview"
import { useProject } from "../context/ProjectContext"

interface IssuesProps {
  issues?: Issue[]
  issuesGroup?: IssueGroup[]
}

export const Issues = ({ issues, issuesGroup }: IssuesProps) => {
  const { projectId, setProjectId } = useProject()

  if (issues) {
    setProjectId(1)
  } else {
    setProjectId("")
  }

  const { projectsNotifications } = useContext(NotificationContext)!

  const [issuesGroupState, setIssuesGroupState] = useState<
    IssueGroup[] | undefined
  >(issuesGroup)

  const [issuesMap, setIssuesMap] = useState<null | Map<IssueGroup, Issue[]>>(
    null
  )

  const matchIssuesToGroup = useCallback((issues: Issue[]) => {
    const issueGroupIdToIssues = new Map<IssueGroup, Issue[]>()
    for (const issue of issues) {
      if (issueGroupIdToIssues.has(issue.issueGroup)) {
        issueGroupIdToIssues.get(issue.issueGroup)?.push(issue)
      } else {
        issueGroupIdToIssues.set(issue.issueGroup, [issue])
      }
    }
    console.log(issueGroupIdToIssues)
    setIssuesMap(issueGroupIdToIssues)
  }, [])
  useEffect(() => {
    if (issues) {
      matchIssuesToGroup(issues)
      setIssuesGroupState(issuesGroup)
    }
  }, [])

  return (
    <div className="flex w-full justify-between px-6 py-4">
      {issuesMap &&
        Array.from(issuesMap.entries()).map(([group, issues]) => (
          <IssuesContainer
            title={group.name}
            color={group.color}
            issues={issues}
          ></IssuesContainer>
        ))}
      {/* <TasksProgressContainer color={"#008000"} title={"TODO"} tasks={tasks} />
      <TasksProgressContainer
        color={"#008000"}
        title={"IN PROGRESS"}
        tasks={mellstroy}
      />
      <TasksProgressContainer
        color={"#008000"}
        title={"IN REVIEW"}
        tasks={[]}
      />
      <TasksProgressContainer color={"#008000"} title={"DONE"} tasks={[]} /> */}
    </div>
  )
}

export default Issues
