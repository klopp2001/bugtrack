"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { getRequest, ServiceRoutes } from "../api/http"

export const NotificationContext =
  createContext<NotificationContextInterface | null>(null)

interface NotificationContextInterface {
  tasksNotifications: any[]
  projectsNotifications: any[]
}

type Notification = {
  userId: string
  type: string
  payload: string
}

const NotificationContextProvider = ({ children }) => {
  const [projectsNotifications, setProjectsNotifications] = useState([])
  const [tasksNotifications, setTasksNotifications] = useState([])

  useEffect(() => {
    console.log("New render")
    const es = new EventSource(
      "http://localhost:3001/notification_client/sse?userId=1234"
    )
    es.onopen = (e) => {
      console.log("connection established")

      const userId = 1234 //localStorage.getItem("userId")
      console.log("sending request for init notifications")
      getRequest(ServiceRoutes.project + "?userId=" + userId)
    }
    es.onmessage = (event) => {
      console.log("New Notification")

      const payload = JSON.parse(event.data) as Notification
      console.log(`${payload}`)
      switch (payload.type) {
        case "tasks": {
          setTasksNotifications((prev) => [...prev, payload])
          break
        }

        case "projects": {
          setProjectsNotifications((prev) => [...prev, payload])
          break
        }
      }
    }
    es.onerror = (err) => {
      console.error("SSE error:", err)
      es.close()
    }
    return () => es.close()
  }, [])

  const notifications = { tasksNotifications, projectsNotifications }
  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
