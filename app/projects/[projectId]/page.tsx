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
import { loadIssueGroups, loadIssues } from "@/app/api/issues_service/actions"
import IssuePreview from "../components/IssuePreview"
import Issues from "./Issues"
import {
  ProjectContext,
  ProjectContextProvider,
} from "../context/ProjectContext"

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const issues = await loadIssues(params.projectId)

  const issuseGroup = await (async () => {
    if (issues.length != 0) return issues.map((issue) => issue.issueGroup)
    else return await loadIssueGroups(params.projectId)
  })()
  // const { projectsNotifications } = useContext(NotificationContext)!
  // const [issuesGroup, setIssuesGroup] = useState<null | IssueGroup[]>(null)
  // const [issuesMap, setIssuesMap] = useState<null | Map<IssueGroup, Issue[]>>(
  //   null
  // )

  // const matchIssuesToGroup = useCallback((issues: Issue[]) => {
  //   const issueGroupIdToIssues = new Map<IssueGroup, Issue[]>()
  //   for (const issue of issues) {
  //     if (issueGroupIdToIssues.has(issue.issueGroup)) {
  //       issueGroupIdToIssues.get(issue.issueGroup)?.push(issue)
  //     } else {
  //       issueGroupIdToIssues.set(issue.issueGroup, [issue])
  //     }
  //   }
  //   console.log(issueGroupIdToIssues)
  //   setIssuesMap(issueGroupIdToIssues)
  // }, [])

  // useEffect(() => {
  //   const loadContent = async () => {
  //     try {
  //       const issues = await loadIssues(params.projectId)
  //       console.log(issues)
  //       const issuesGroups = await loadIssueGroups(params.projectId)
  //       matchIssuesToGroup(issues)
  //       setIssuesGroup(issuesGroup)
  //     } catch (e) {
  //       console.log("error")
  //       console.log(e)
  //     }
  //   }
  //   loadContent()
  // }, [])

  // const tasks = [
  //   {
  //     name: "Create Portal",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "HIGH",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  //   {
  //     name: "Create ZIGA",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "LOW",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  // ]

  // const mellstroy = [
  //   {
  //     name: "Create Portal",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "HIGH",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  //   {
  //     name: "Create ZIGA",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "LOW",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  //   {
  //     name: "Create Portal",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "HIGH",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  //   {
  //     name: "Create ZIGA",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "LOW",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  //
  //     name: "Create ZIGA",
  //     key: "Portal",
  //     description:
  //       "Very good nice, Very good nice Very good nice Very good nice Very good nice",
  //     owner: "Mister Beast",
  //     issues: ["Not working", "OO shit"],
  //     priority: "LOW",
  //     createdAt: new Date(),
  //     members: ["Adolf", "Stalin"],
  //   } as Task,
  // ]

  return (
    <ProjectContextProvider>
      <Issues issues={issues} issuesGroup={issuseGroup} />
    </ProjectContextProvider>
  )
}

export default ProjectsPage
