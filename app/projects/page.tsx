"use client"
import React, { useContext } from "react"
import { NotificationContext } from "../context/NotificationContextProvider"
import TasksProgressContainer from "./components/TasksProgressContainer"
import { Task } from "../types/tasks"

const ProjectsPage = () => {
  const { projectsNotifications } = useContext(NotificationContext)!
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
      {/* <TasksProgressContainer title={"TODO"} tasks={tasks} />
      <TasksProgressContainer title={"IN PROGRESS"} tasks={mellstroy} />
      <TasksProgressContainer title={"IN REVIEW"} tasks={[]} />
      <TasksProgressContainer title={"DONE"} tasks={[]} /> */}
    </div>
  )
}

export default ProjectsPage
