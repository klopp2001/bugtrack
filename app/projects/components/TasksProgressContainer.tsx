import { Task } from "@/app/types/tasks"
import Button from "@/components/Button"
import ButtonForModal from "@/components/ButtonForModal"
import React from "react"
import Popup from "reactjs-popup"
import TaskComponent from "./TaskComponent"

interface TasksProgressContainerProps {
  title: string
  color: string
  tasks: Task[]
}

const TasksProgressContainer = ({
  title,
  color,
  tasks,
}: TasksProgressContainerProps) => {
  console.log(color)
  return (
    <div className={"flex flex-col max-w-1/4 " + `bg-[${color}]`}>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-xs">{tasks.length} tasks available</div>
        </div>
        <Popup
          trigger={
            <ButtonForModal buttonType="DEFAULT">Add New Task</ButtonForModal>
          }
          position="right center"
        >
          <div className="bg-red-700">Hello world</div>
        </Popup>
      </div>
      <div className="flex flex-col mt-10 gap-8">
        {tasks.map((task) => {
          return <TaskComponent key={task.key} task={task} />
        })}
      </div>
    </div>
  )
}

export default TasksProgressContainer
