'use client'
import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
interface ButtonProps {
    onButtonClicked: () => void
    buttonType : "DEFAULT" | "DANGER",
    children: React.ReactNode
    icon?: any
    //TODO:: make basic colors
}

const Button = ({onButtonClicked, buttonType, children, icon} : ButtonProps ) => {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = useCallback( () =>  {
        onButtonClicked(),
        setIsClicked(!isClicked)
    },  [isClicked])
    return (
    <div className={
        clsx(
            buttonType=='DEFAULT' && 'bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white ',
            buttonType=='DANGER' && 'bg-red-900 hover:bg-red-600 hover:cursor-pointer text-black '
        
            ,"flex flex-row min-w-[180px] gap-2 px-4 py-4 rounded-xl border-gray-700 border-2"
    )} onClick={handleClick}>
        {icon}
        {children}
    </div>
  )
}
export default Button