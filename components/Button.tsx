"use client"
import React, { useCallback, useState } from "react"
import clsx from "clsx"
interface ButtonProps {
  onButtonClicked: () => void
  buttonType: "DEFAULT" | "DANGER"
  children?: React.ReactNode
  icon?: any
  //TODO:: make basic colors
}

const Button = ({
  onButtonClicked,
  buttonType,
  children,
  icon,
}: ButtonProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleClick = useCallback(() => {
    onButtonClicked(), setIsClicked(!isClicked)
  }, [isClicked])
  return (
    <div
      className={clsx(
        buttonType == "DEFAULT" &&
          "bg-green-400 hover:bg-green-600 hover:cursor-pointer  shadow-green-700",
        buttonType == "DANGER" &&
          "bg-red-400 shadow shadow-red-400 hover:bg-red-600 hover:cursor-pointer ",

        "flex  transition-all duration-200 ease-in-out flex-row min-w-[180px] gap-2 px-4 py-2 text-center items-center text-white justify-center rounded-xl shadow font-bold"
      )}
      onClick={handleClick}
    >
      {icon}
      {children}
    </div>
  )
}
export default Button
