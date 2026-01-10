"use client"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useState } from "react"
import SideBarLink from "./SideBarLink"
import Button from "./Button"
import { FaHome } from "react-icons/fa"
import { MdFormatListBulletedAdd } from "react-icons/md"
import { MdOutlineReport } from "react-icons/md"
import { IoSettingsOutline } from "react-icons/io5"
import { GoProjectRoadmap } from "react-icons/go"
import NewProjectModal from "./modals/NewProjectModal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Project } from "@/app/types/project"
import { ProjectContext } from "@/app/context/ProjectContextProvider"

// type SideBarProps {

// }
interface SideBarProject {
  name: string
  description: string
  key: string
}

interface SideBarProps {
  projects: Project[]
}

const SideBar = ({ projects }: SideBarProps) => {
  const [newProjModalShowed, setNewProjModalShowed] = useState(false)
  useEffect(() => {
    localStorage.setItem("userId", "1234")
  }, [])
  const projectsContext = useContext(ProjectContext)
  console.log(projectsContext?.projectsState)
  return (
    <>
      <div className="bg-gray-50 sticky border-r-2 border-gray-200 w-1/6 min-w-48 flex flex-col justify-between h-full items-center py-7 px-4 ">
        <div className="flex flex-col gap-2">
          <SideBarLink hrefValue="/overview" icon={<FaHome />}>
            Overview
          </SideBarLink>

          {/* TODO::make projects a dropdown button */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="px-4">
              <AccordionTrigger>Projects</AccordionTrigger>
              <AccordionContent>
                {projectsContext?.projectsState &&
                  projectsContext?.projectsState.map((project) => (
                    <a key={project.key} href={`projects/${project.projectId}`}>
                      {project.name}
                    </a>
                  ))}
                {/* <div>Hello</div>
                <div>Hello</div> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <SideBarLink hrefValue="/projects" icon={<GoProjectRoadmap />}>
            Projects
          </SideBarLink> */}
          <SideBarLink hrefValue="/reports" icon={<MdOutlineReport />}>
            Reports
          </SideBarLink>
          <SideBarLink hrefValue="/settings" icon={<IoSettingsOutline />}>
            Settings
          </SideBarLink>
        </div>

        <div className="flex flex-col mb-42 gap-5">
          {/* TODO::add proj */}
          <Button
            onButtonClicked={() => setNewProjModalShowed(true)}
            buttonType="DEFAULT"
            icon={<MdFormatListBulletedAdd size="2em" />}
          >
            Add Project
          </Button>

          {/* TODO::LOGOUT */}
          <Button
            onButtonClicked={() => console.log("logout button")}
            buttonType="DANGER"
          >
            Logout
          </Button>
        </div>
      </div>

      {newProjModalShowed && (
        <NewProjectModal setNewProjModalShowed={setNewProjModalShowed} />
      )}
    </>
  )
}

export default SideBar
