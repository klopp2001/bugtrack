"use client"

import { postRequest, ServiceRoutes } from '@/app/api/http'
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Popup from 'reactjs-popup'

interface NewProjectModalProps {
  setNewProjModalShowed: React.Dispatch<React.SetStateAction<boolean>>
}  

type Notification = {
  userId?: string
  type: string
  data: unknown
}

const NewProjectModal = ({ setNewProjModalShowed } : NewProjectModalProps) => {
  const [result, setResult] = useState<"PENDING" | "NOT_SENT" | "ERROR" | "SUCCESSFULL">("NOT_SENT") 
  const resRef = useRef(null)

  const [notifications, setNotifications] = useState< Notification[]>([])
  const userId = 123

  useEffect(() => {
    const userId = localStorage.getItem("userId")

    console.log("use effect")
    const es = new EventSource(`/api/notification_client?userId=${userId}`)

    es.onopen = (e) => {
      console.log("connection established")
    }

    es.onmessage = (event) => {
      console.log("new message")
      const payload = JSON.parse(JSON.parse(event.data).payload) 
      console.log(payload)
      setNotifications((prev) => [...prev, payload])
    }

    es.onerror = (err) => {
      console.error("SSE error:", err)
      es.close()
    }

    // return () => es.close()
  }, [])

  // useEffect(()=> {
  //   console.log("effect")
  //   if (notifications.at(-1)?.data == "success") {
  //     setTimeout(() => setNewProjModalShowed(false), 400)
  //   }
  // }, [notifications])

  const sendForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const userId = localStorage.getItem("userId")

      const formData = new FormData(event.currentTarget)

      const body = { ownerId: userId, ...Object.fromEntries(formData) }

      console.log(body)
      const response = await postRequest(
        ServiceRoutes.createProject,
        JSON.stringify(body)
      )
      console.log(response)
    },
    []
  )

  const closeModal = (event, callback)  => {
    
    if (event.target.id == "proj-modal") {
      callback() 
    }
  }

  return (
    <div
      className="absolute w-full h-full bg-[rgba(0,0,0,0.26)]"
      onClick={(e) => closeModal(e, () => setNewProjModalShowed(false))}
    >
      <div className="flex h-full justify-center items-center " id="proj-modal">
        <div className="bg-white w-[30%] p-3">
          <form
            onSubmit={sendForm}
            className="bg-white flex flex-col"
            // onClick={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="bg-black/5 p-0.5 m-0.5"
            ></input>

            <input
              type="text"
              name="key"
              placeholder="Project Key"
              className="bg-black/5 p-0.5 m-0.5"
            ></input>

            <input
              type="text"
              name="description"
              placeholder="description"
              className="bg-black/5 p-0.5 m-0.5"
            ></input>
            <Popup
              trigger={
                <button type="submit" className='bg-amber-300'>
                  Submit
                </button>
              }
              onOpen={()=>{
                console.log("zig hi")
                setTimeout(()=> {setNewProjModalShowed(false)}, 3000)
              }}
            >
              <div>{JSON.stringify(notifications[0]?.data)}</div>
            </Popup>
          </form>
          <div ref={resRef}></div>
        </div>
      </div>
    </div>
  )
}

export default NewProjectModal