import { Task } from "@/app/types/tasks"
import clsx from "clsx"
import React from "react"
import { FaCommentAlt } from "react-icons/fa"
interface TaskComponentProps {
  task: Task
}

const TaskComponent = ({ task }: TaskComponentProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <div
          className={clsx(
            task.priority === "HIGH" && "bg-red-400",
            task.priority === "MIDDLE" && "bg-amber-400",
            task.priority === "LOW" && "bg-green-400",
            "h-1 w-full"
          )}
        ></div>
        <h2 className="text-lg font-bold">{task.name}</h2>
        <div className="text-sm flex flex-col gap-1">
          <p>{task.owner}</p>
          <p>{task.description}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-purple-600">#{task.key}</p>
          <div className="flex flex-row gap-2 items-center">
            <a href={`/task?id=${task.taskId}/issues/`}>
              <FaCommentAlt />
            </a>
            <span>{task.issues.length}</span>
          </div>
        </div>
        {/* <p>{task.createdAt}</p> */}
      </div>
    </div>
  )
}

export default TaskComponent
