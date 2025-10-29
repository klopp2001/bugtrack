"use client"

import { useEffect, useState } from "react"

import { Notification } from "@/app/types/notification"

export default function NotificationClient() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const es = new EventSource("/api/notification_client")
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
    return () => es.close()
  }, [])

  return (
    <div className="p-4">

    </div>
  )
}
