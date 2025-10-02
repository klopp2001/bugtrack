import React, { useState } from "react"
import OverallTaskRect from "./components/OverallTaskRect"
import { getUserTasks, UserTask } from "../api/actions"
import TaskDescriptor from "./components/TaskDescriptor"
import Button from "@/components/Button"
import ShowAllTasksButton from "./components/ShowAllTasksButton"
import StatisticsField from "./components/StatisticsField"

const OverviewPage = async () => {
  //TODO:: делать запрос к бд чтобы доставать задачи
  const userTasks: UserTask[] = await getUserTasks()
  const tasksToRender = userTasks.filter((el, k) => k < 4)
  const tasksUpcoming = tasksToRender.slice(2)

  console.log(tasksToRender.length)
  const projects = new Set(userTasks.map((task) => task.relatedProject))

  return (
    <div className="flex flex-row h-full gap-4">
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
