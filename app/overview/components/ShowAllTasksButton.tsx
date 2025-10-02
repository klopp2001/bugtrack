"use client"

import Button from "@/components/Button"
import React from "react"

const ShowAllTasksButton = () => {
  return (
    <div className="max-w-3xs mx-auto">
      <Button
        onButtonClicked={() => {
          console.log("Show all")
        }}
        buttonType={"DEFAULT"}
      >
        {" "}
        Show all tasks
      </Button>
    </div>
  )
}

export default ShowAllTasksButton
