"use client"

import { useEffect, useState } from "react"

type Notification = {
  userId?: string
  type: string
  data: unknown
}

export default function NotificationClient() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  
  const userId = 123
  useEffect(() => {
    const es = new EventSource(`/api/notification_client?userId=${userId}`)

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
      <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((n, i) => (
          <li key={i} className="bg-gray-100 rounded p-2">
            <b>{n.type}</b>: {JSON.stringify(n.data)}
          </li>
        ))}
      </ul>
    </div>
  )
}
