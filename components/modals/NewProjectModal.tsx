"use client"

import { postRequest, ServiceRoutes } from '@/app/api/http'
import React, { FormEvent, useState } from 'react'

interface NewProjectModalProps {
  setNewProjModalShowed: React.Dispatch<React.SetStateAction<boolean>>
}  

const NewProjectModal = ({ setNewProjModalShowed } : NewProjectModalProps) => {
  const [result, serResult] = useState<"PENDING" | "NOT_SENT" | "ERROR" | "SUCCESSFULL">("NOT_SENT") 

  const sendForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userId = localStorage.getItem("userId")

    const formData = new FormData(event.currentTarget)

    const body = {userId, ...Object.fromEntries(formData)}

    console.log(body)
    const response = postRequest(
      ServiceRoutes.createProject + `?userId={userId}`,
      JSON.stringify(body)
    )
    console.log(response)
  }

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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewProjectModal