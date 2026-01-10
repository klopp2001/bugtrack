"use client"
type ProjectsPageProps = {
  params: {
    projectId: bigint
  }
}

import React, { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../context/NotificationContextProvider"
import TasksProgressContainer from "../components/TasksProgressContainer"
import { Task } from "../../types/tasks"
import { getRequest, ServiceRoutes } from "@/app/api/http"
import { IssueGroup } from "@/app/types/issueGroup"
import { Issue } from "@/app/types/issue"

const ProjectsPage = ({ params }: ProjectsPageProps) => {
  const { projectsNotifications } = useContext(NotificationContext)!
  const [issuesGroup, setIssuesGroup] = useState<null | IssueGroup[]>(null)
  const [issuesMap, setIssuesMap] = useState<null | Map<number, Issue[]>>(null)
  useEffect(() => {
    const loadIssueGroups = async () => {
      console.log("load issue groups")
      const respone = await getRequest(
        ServiceRoutes.issues + "issue_groups/?projectId=" + params.projectId
      )
      const responseBody = await respone.json()
      setIssuesGroup(responseBody)
      console.log(responseBody)
    }
    const loadIssues = async () => {
      console.log("load issues")
      const issueGroupIdToIssues = new Map<number, Issue[]>()
      console.log("Fetching all issues")
      const respone = await getRequest(
        ServiceRoutes.issues + "/?projectId=" + params.projectId
      )
      const issues = await respone.json() //as Issue[]
      console.log(issues)
      for (const issue of issues) {
        if (issueGroupIdToIssues.has(issue.issueGroup.id)) {
          issueGroupIdToIssues.get(issue.issueGroup.id)?.push(issue)
        } else {
          issueGroupIdToIssues.set(issue.issueGroup.id, [issue])
        }
      }
      console.log(issueGroupIdToIssues)
      setIssuesMap(issueGroupIdToIssues)
    }
    const loadContent = async () => {
      try {
        await loadIssues()
        await loadIssueGroups()
      } catch (e) {
        console.log("error")
        console.log(e)
      }
    }
    loadContent()
  }, [])

  const tasks = [
    {
      name: "Create Portal",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "HIGH",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
    {
      name: "Create ZIGA",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "LOW",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
  ]

  const mellstroy = [
    {
      name: "Create Portal",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "HIGH",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
    {
      name: "Create ZIGA",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "LOW",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
    {
      name: "Create Portal",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "HIGH",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
    {
      name: "Create ZIGA",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "LOW",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
    {
      name: "Create ZIGA",
      key: "Portal",
      description:
        "Very good nice, Very good nice Very good nice Very good nice Very good nice",
      owner: "Mister Beast",
      issues: ["Not working", "OO shit"],
      priority: "LOW",
      createdAt: new Date(),
      members: ["Adolf", "Stalin"],
    } as Task,
  ]

  return (
    <div className="flex w-full justify-between px-6 py-4">
      {issuesGroup &&
        issuesGroup.map((issuesGroup) => (
          <TasksProgressContainer
            color={issuesGroup.color}
            title={issuesGroup.name}
            tasks={tasks}
          />
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

export default ProjectsPage
