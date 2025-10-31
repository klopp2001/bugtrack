"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'


const NotificationContext = createContext<NotificationContextInterface | null>(null)

interface NotificationContextInterface {
    tasksNotifications: [any]
    projectsNotifications: [any]
}

type Notification = {
    type: string
    userId: string
    payload: string
}


const NotificationContextProvider = ({children} ) => {
    const [projectsNotifications, setProjectsNotifications] = useState([]) 
    const [tasksNotifications, setTasksNotifications] = useState([])

    useEffect(() => {
      const es = new EventSource("/api/notification_client")
      es.onopen = (e) => {
        console.log("connection established")
      }
      es.onmessage = (event) => {
        const payload = JSON.parse(event.data) as Notification

        switch (payload.type) {
          case "tasks":
          {
            setTasksNotifications((prev) => [...prev, payload])
            break;
          }

          case "projects":
          {
            setProjectsNotifications((prev) => [...prev, payload])
            break;
          }
        }
      }
      es.onerror = (err) => {
        console.error("SSE error:", err)
        es.close()
      }
      return () => es.close()
    }, [])
    const notifications = {tasksNotifications, projectsNotifications}
    return (
      <NotificationContext.Provider value={notifications}>
        {children}
      </NotificationContext.Provider>
    )
}

export default NotificationContextProvider