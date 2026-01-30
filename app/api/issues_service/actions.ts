import { Issue, IssueDTO } from "@/app/types/issue"
import { getRequest, postRequest, ServiceRoutes } from "../http"
import { IssueGroup } from "@/app/types/issueGroup"
import { User, UserDto } from "@/app/types/user"
import { IssueMessageDto } from "@/app/types/dto/issueMessageDto"

export const getIssueGroups = async (projectId : number) => {
    console.log("load issue groups")
    const response = await getRequest(
    ServiceRoutes.issues + "issue_groups/?projectId=" + projectId
    )
    return await response.json() as IssueGroup[]
}

export const getProjectIssues = async (projectId : number) => {
  console.log("load issues")
  console.log("Fetching all issues")
  const response = await getRequest(
    ServiceRoutes.issues + "/?projectId=" + projectId
  )
  return await response.json() as Issue[]
}

export const getProjectMembers = async (projectId: number) => {
  console.log("load issues")
  console.log("Fetching all issues")
  const response = await getRequest(
    ServiceRoutes.project + `/${projectId}/members` 
  )
  const userDto = await response.json() as UserDto[]
  return userDto.map((dto) => ({id : dto.projectId, name: dto.userName})) as User[]
}

export const getIssue = async (id : number) => {
  console.log('fetching issue')
  const response = await getRequest(
    ServiceRoutes.issues + "/id/" + id
  )
  return await response.json() as Issue
}

export const getUser = async (id : number) => {
  console.log('fetching user')
  const response = await getRequest(
    ServiceRoutes.users + `/?ids=${id}`
  )
  return await response.json() as User
}

export const getUsers = async (ids : number[]) => {
  console.log('fetching user')
  const response = await getRequest(
    ServiceRoutes.users + `/?ids=${ids.join()}`
  )
  return await response.json() as User[]
}

export const postIssueMessage = async (message: IssueMessageDto) => {
  console.log('fetching user')
  const response = await postRequest(
    ServiceRoutes.issues + `/issue_messages/`,
    JSON.stringify(message)
  )
  return await response.json() as User[]
}


export const sendNewIssue = async (projectId : number, issueDto: IssueDTO) => {
  console.log("Sending new issue")
  const response = await postRequest(ServiceRoutes.issues + "/?projectId=" + projectId, JSON.stringify(issueDto))
  return response
}