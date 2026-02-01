type ProjectsPageProps = {
  params: {
    projectId: number
  }
}

import React, { useCallback, useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../context/NotificationContextProvider"
import IssuesKanban from "../components/IssuesContainer"
import { getRequest, ServiceRoutes } from "@/app/api/http"
import { IssueGroup } from "@/app/types/issueGroup"
import { Issue } from "@/app/types/issue"
import {
  getIssueGroups,
  getProjectIssues,
  getProjectMembers,
  getUsers,
} from "@/app/api/issues_service/actions"
import IssuePreview from "../components/IssuePreview"
import Issues from "./Issues"
import {
  ProjectContext,
  ProjectContextProvider,
} from "../context/ProjectContext"
import BoardHeader from "./BoardHeader"

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const issues = await getProjectIssues(params.projectId)
  const members = await getProjectMembers(params.projectId)

  issues.forEach((issue) => {
    for (const member of members) {
      if (issue.reporterId == member.id) {
        issue.reporterUser = member
      }
      if (issue.assigneeId == member.id) {
        issue.assigneeUser = member
      }
    }
  })

  console.log(members)
  const issuseGroup = await (async () => {
    let issuesGroupArray = await getIssueGroups(params.projectId)

    const setIs = new Set<number>()
    const g: IssueGroup[] = []
    issuesGroupArray.forEach((is) => {
      if (!setIs.has(is.id)) {
        setIs.add(is.id)
        g.push(is)
      }
    })
    return g
  })()

  return (
    <ProjectContextProvider>
      <div className="flex flex-col">
        <div className="w-full">
          <BoardHeader users={members} />
          <div className="flex flex-row w-full">
            <Issues issues={issues} issuesGroup={issuseGroup} users={members} />
          </div>
        </div>
      </div>
    </ProjectContextProvider>
  )
}

export default ProjectsPage
