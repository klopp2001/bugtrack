"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../context/NotificationContextProvider"
import IssuesKanban from "../components/IssuesContainer"
import { getRequest, ServiceRoutes } from "@/app/api/http"
import { IssueGroup } from "@/app/types/issueGroup"
import { Issue } from "@/app/types/issue"
import {
  getIssueGroups,
  getProjectIssues,
} from "@/app/api/issues_service/actions"
import IssuePreview from "../components/IssuePreview"
import { useProjectContext } from "../context/ProjectContext"
import { Droppable } from "../components/Droppable"
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
  DragCancelEvent,
} from "@dnd-kit/core"
import { group } from "console"
import SmallAvatar from "@/components/media/avatars/SmallAvatar"
import { User } from "@/app/types/user"

interface IssuesProps {
  issues?: Issue[]
  issuesGroup?: IssueGroup[]
  users: User[]
}

export const Issues = ({ issues, issuesGroup, users }: IssuesProps) => {
  const { view } = useProjectContext()

  const { projectsNotifications } = useContext(NotificationContext)!

  const [issuesGroupState, setIssuesGroupState] = useState<
    IssueGroup[] | undefined
  >(issuesGroup)

  const [issuesMap, setIssuesMap] = useState<null | Map<IssueGroup, Issue[]>>(
    null
  )

  const matchIssuesToGroup = useCallback(
    (issues: Issue[], issueGroups: IssueGroup[]) => {
      const issueGroupToIssues = new Map<IssueGroup, Issue[]>()
      const issueGroupIdToIssues = new Map<number, Issue[]>()
      const issueGroupIdToIssuesGroup = new Map<number, IssueGroup>()

      issueGroups.forEach((group) => issueGroupToIssues.set(group, []))
      issueGroups.forEach((group) =>
        issueGroupIdToIssuesGroup.set(group.id, group)
      )

      // const issueGroupIdToIssues = new Map<IssueGroup, Issue[]>()
      for (const issue of issues) {
        const group = issueGroupIdToIssuesGroup.get(issue.issueGroup.id)
        if (group) issueGroupToIssues.get(group)?.push(issue)
        //for
        // if (issueGroupIdToIssues.has(issue.issueGroup.id)) {
        //   issueGroupIdToIssues.get(issue.issueGroup.id)?.push(issue)
        //   // issueGroupToIssues.get(issue.issueGroup)?.push(issue)
        // } else {
        //   issueGroupIdToIssues.set(issue.issueGroup.id, [issue])
        //   issueGroupIdToIssuesGroup.set(issue.issueGroup.id, issue.issueGroup)
        // }
      }
      // for (const [k, v] of issueGroupIdToIssues) {
      //   const issueGroup = issueGroupIdToIssuesGroup.get(k)
      //   if (issueGroup) issueGroupToIssues.set(issueGroup, v)
      // }

      // console.log(issueGroupToIssues)
      setIssuesMap(issueGroupToIssues)
    },
    []
  )
  useEffect(() => {
    if (issues && issuesGroup) {
      matchIssuesToGroup(issues, issuesGroup)
      setIssuesGroupState(issuesGroup)
    }
  }, [])

  const onDragEnd = (event: DragEndEvent) => {
    if (!issuesMap) return
    const copyIssuesMap = new Map(issuesMap.entries())

    let fromIssues: Issue[] = []
    let overIssues: Issue[] = []
    let draggedIssue: Issue | null = null

    let fromGroup: IssueGroup | null = null
    let overGroup: IssueGroup | null = null
    for (const [issueGroup, issues] of copyIssuesMap) {
      if (issueGroup.id == event.over?.id) {
        overIssues = issues
        overGroup = issueGroup
      } else {
        for (let i = 0; i < issues.length; i++) {
          if (issues[i].id == event.active.id) {
            draggedIssue = issues[i]

            fromIssues = issues.filter((issue) => {
              if (draggedIssue) return issue.id != draggedIssue.id
            })
            fromGroup = issueGroup
          }
        }
      }
    }

    if (draggedIssue) overIssues.push(draggedIssue)
    if (fromGroup && fromIssues) {
      copyIssuesMap.set(fromGroup, fromIssues)
    }
    if (overGroup && overIssues) {
      copyIssuesMap.set(overGroup, overIssues)
    }

    setIssuesMap(copyIssuesMap)
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START")
  }
  return (
    <div>
      {view === "KANBAN" && (
        <div className="flex w-full gap-4  py-4 bg-white px-2 rounded-xl shadow">
          <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            {issuesMap &&
              Array.from(issuesMap.entries())
                .sort(([k1, v1], [k2, v2]) => k1.position - k2.position)
                .map(([group, issues]) => (
                  <IssuesKanban
                    title={group.name}
                    color={group.color}
                    issues={issues}
                    id={group.id}
                    issuesGroup={issuesGroup!}
                    users={users}
                  ></IssuesKanban>
                ))}
          </DndContext>
        </div>
      )}

      {view === "LIST" && (
        <div className="w-full border-gray-100 border-2 rounded-2xl">
          <div className="grid grid-cols-4 gap-8 justify-between  border-gray-100 p-4 font-bold border-b-4">
            <p className="">Тип</p>
            <p className="truncate">Название</p>
            <p className="mx-20">Ответственный</p>
          </div>
          {issuesMap &&
            Array.from(issuesMap.entries())
              .sort(([k1, v1], [k2, v2]) => k1.position - k2.position)
              .map(([group, issues]) =>
                issues.map((issue) => (
                  <div className="grid grid-cols-4 gap-4 justify-between odd:bg-gray-100 p-4 ">
                    <p>{issue.issueGroup.name}</p>
                    <p className="truncate">{issue.title}</p>
                    <p className="mx-20">{issue.reporterUser?.name}</p>
                    <SmallAvatar imgUrl={issue.reporterUser?.avatarUrl!} />
                  </div>
                ))
              )}
        </div>
      )}

      {/* <TasksProgressContainer color={"#008000"} title={"TODO"} tasks={tasks} />
      <TasksProgressContainer
        color={"#008000"}
        title={"IN PROGRESS"}
        tasks={mellstroy}
      />
      <TasksProgressContainer
        color={"#008000"}
        title={"IN REVIEW"}
        tasks={[]}
      />
      <TasksProgressContainer color={"#008000"} title={"DONE"} tasks={[]} /> */}
    </div>
  )
}

export default Issues
