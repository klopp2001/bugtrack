import React, { ReactNode } from "react"
import { useDraggable, UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface DraggableProps {
  id: UniqueIdentifier
  children?: ReactNode
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      type="button"
    >
      {children}
    </button>
  )
}
