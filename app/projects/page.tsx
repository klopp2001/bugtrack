"use client"
import React, { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContextProvider'

const ProjectsPage = () => {
  const { projectsNotifications } = useContext(NotificationContext)!

  return (
    <div>ProjectsPage</div>
  )
}

export default ProjectsPage