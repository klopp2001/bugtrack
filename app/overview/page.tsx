import React, { useEffect, useState } from "react"
import OverallTaskRect from "./components/OverallTaskRect"
import { getUserTasks, UserTask } from "../api/actions"
import TaskDescriptor from "./components/TaskDescriptor"
import Button from "@/components/Button"
import ShowAllTasksButton from "./components/ShowAllTasksButton"
import StatisticsField from "./components/StatisticsField"
import { Notification } from "@/app/types/notification"
import TasksRect from "./components/TasksRect"


const OverviewPage = async () => {
  //TODO:: делать запрос к бд чтобы доставать задачи
  const userTasks: UserTask[] = await getUserTasks()
  
  return (
    <div className="flex flex-row h-full gap-4">
      <TasksRect userTasks={userTasks}/>

      <div className="flex flex-col p-10">
        <div>
          <h1>Statistics</h1>
          <StatisticsField />
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
