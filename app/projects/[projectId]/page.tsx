type ProjectsPageProps = {
  params: {
    projectId: number
  }
}

import React, { useCallback, useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../context/NotificationContextProvider"
import IssuesContainer from "../components/IssuesContainer"
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
import Team from "./Team"

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const issues = await getProjectIssues(params.projectId)
  // const users = await getUsers()
  // const []
  const members = await getProjectMembers(params.projectId)
  console.log(members)
  const issuseGroup = await (async () => {
    if (issues.length != 0) return issues.map((issue) => issue.issueGroup)
    else return await getIssueGroups(params.projectId)
  })()

  return (
    <ProjectContextProvider>
      <div className="flex flex-row w-full justify-between mt-20">
        <Issues issues={issues} issuesGroup={issuseGroup} />
        <Team users={members} />
      </div>
    </ProjectContextProvider>
  )
}

export default ProjectsPage
