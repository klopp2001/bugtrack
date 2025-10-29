"use client"
import { UserTask } from "@/app/api/actions"
import React, { useEffect, useState } from "react"
import OverallTaskRect from "./OverallTaskRect"
import TaskDescriptor from "./TaskDescriptor"
import ShowAllTasksButton from "./ShowAllTasksButton"
import { getRequest, ServiceRoutes } from "@/app/api/http"

interface TasksRectProps {
  userTasks: UserTask[]
}

const TasksRect = ({ userTasks }: TasksRectProps) => {
  const tasksToRender = userTasks.filter((el, k) => k < 4)
  const tasksUpcoming = tasksToRender.slice(2)

  console.log(tasksToRender.length)
  const projects = new Set(userTasks.map((task) => task.relatedProject))

  const [notifications, setNotifications] = useState<Notification[]>([])
  useEffect(() => {
    const userId = localStorage.getItem("userId")
  
    const es = new EventSource(
      `/api/notification_client/render/tasks?userId=${userId}`
    ) 

    es.onopen = (e) => {
      console.log("connection established")
    }

    es.onmessage = (event) => {
      const payload = JSON.parse(event.data) as Notification
      setNotifications((prev) => [...prev, payload])
    }
    
    es.onerror = (err) => {
      console.error("SSE error:", err)
      es.close()
    }

    getRequest(ServiceRoutes.getProjects + "?userId=" + userId )

    //return () => es.close()
  }, [])

  useEffect(() => {
    //TODO:: здесь надо приводить к типу для рендера задач
    console.log(notifications)
  }, [notifications])

  return (
    <div className="w-1/2 p-10 flex flex-col gap-9">
      <div className="flex mb-3 flex-row w-full justify-between">
        <OverallTaskRect count={projects.size} caption="Project" />
        <OverallTaskRect
          count={userTasks.filter((task) => task.status == "closed").length}
          caption="Completed"
        />
        <OverallTaskRect
          count={userTasks.filter((task) => task.status == "closed").length}
          caption="Closed recently"
        />
        <OverallTaskRect
          count={userTasks.filter((task) => task.status == "active").length}
          caption="Open Tickets"
        />
      </div>
      <div className="flex flex-col gap-4 bg-gray-50 border-solid border-0 border-gray-400 shadow shadow-gray-600 p-4 rounded-2xl">
        <h1 className="">My Tasks</h1>
        {tasksToRender.map((el, i) => (
          <TaskDescriptor
            key={el + "_" + i}
            priority={el.priority}
            deadline={"12.12.2025"}
            description={el.description}
          />
        ))}
        <ShowAllTasksButton />
      </div>

      <div className="flex flex-col gap-4 p-4 bg-amber-50 rounded-2xl shadow shadow-amber-200 border-solid border-0 border-amber-600 ">
        <h1>Upcoming deadlines</h1>
        {tasksToRender.map((el, i) => (
          <TaskDescriptor
            key={el + "_" + i}
            priority={el.priority}
            deadline={"12.12.2025"}
            description={el.description}
          />
        ))}
        <ShowAllTasksButton />
      </div>
    </div>
  )
}

export default TasksRect
