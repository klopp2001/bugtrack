'use client'
import React, { useCallback, useState } from 'react'

interface ButtonWithImageProps {
    onButtonClicked: () => void
    buttonType : "DEFAULT" | "DANGER",
    children: React.ReactNode
    //TODO:: make basic colors
}

const ButtonWithImage = ({onButtonClicked, buttonType, children} : ButtonWithImageProps ) => {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = useCallback( () =>  {
        onButtonClicked(),
        setIsClicked(!isClicked)
    },  [isClicked])
    return (
    <div onClick={handleClick}>{children}</div>
  )
}

export default ButtonWithImage