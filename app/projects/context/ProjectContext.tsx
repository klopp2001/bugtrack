"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"

type ProjectContextType = {
  projectId: string | number | null
  setProjectId: React.Dispatch<React.SetStateAction<string | number | null>>
}

// создаём контекст через undefined + приведение типа
export const ProjectContext = createContext(
  undefined as ProjectContextType | undefined
)

type ContextProviderProps = {
  children: ReactNode
}

export const ProjectContextProvider = ({ children }: ContextProviderProps) => {
  const [projectId, setProjectId] = useState<string | number | null>(null)

  const value: ProjectContextType = { projectId, setProjectId }

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectContextProvider")
  }
  return context
}
