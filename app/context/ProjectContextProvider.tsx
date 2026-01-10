"use client"
import { createContext, useState } from "react"
import { Project } from "../types/project"

interface ProjectContextProviderProps {
  projects: Project[]
  children: any
}

interface ProjectContextInterface {
  projectsState: any[]
  setProjectsState: (any) => void
}
export const ProjectContext = createContext<ProjectContextInterface | null>(
  null
)

export const ProjectContextProvider = ({
  projects,
  children,
}: ProjectContextProviderProps) => {
  const [projectsState, setProjectsState] = useState(projects)
  console.log(projectsState)
  return (
    <ProjectContext.Provider value={{ projectsState, setProjectsState }}>
      {children}
    </ProjectContext.Provider>
  )
}
