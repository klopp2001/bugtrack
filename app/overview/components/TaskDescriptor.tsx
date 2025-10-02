import clsx from "clsx"
import React from "react"

interface TaskDescriptorProps {
  priority: "high" | "medium" | "low"
  deadline: string
  description: string
}

const TaskDescriptor = ({
  priority,
  deadline,
  description,
}: TaskDescriptorProps) => {
  return (
    <div className="flex bg-white text-sm transition-all duration-200 ease-in-out flex-row py-2 px-4 rounded-lg items-center justify-between gap-2.5 shadow border-solid hover:cursor-pointer hover:bg-gray-100">
      <p className="truncate max-w-fit ">{description}</p>
      <div>{deadline}</div>

      <div
        className={clsx(
          priority == "high" && "bg-orange-400 shadow-orange-800",
          priority == "medium" && "bg-orange-300 shadow-orange-600",
          priority == "low" && "bg-green-400 shadow-green-600",
          "px-2 py-1 rounded-3xl min-w-14 text-center font-bold text-white shadow "
        )}
      >
        {priority.toUpperCase()}
      </div>
    </div>
  )
}

export default TaskDescriptor
