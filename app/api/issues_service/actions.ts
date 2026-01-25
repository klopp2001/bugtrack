import { Issue, IssueDTO } from "@/app/types/issue"
import { getRequest, postRequest, ServiceRoutes } from "../http"
import { IssueGroup } from "@/app/types/issueGroup"

export const loadIssueGroups = async (projectId : number) => {
    console.log("load issue groups")
    const respone = await getRequest(
    ServiceRoutes.issues + "issue_groups/?projectId=" + projectId
    )
    return await respone.json() as IssueGroup[]
}

export const loadIssues = async (projectId : number) => {
  console.log("load issues")
  console.log("Fetching all issues")
  const respone = await getRequest(
    ServiceRoutes.issues + "/?projectId=" + projectId
  )
  return await respone.json() as Issue[]
}

export const sendNewIssue = async (projectId : number, issueDto: IssueDTO) => {
  console.log("Sending new issue")
  const response = await postRequest(ServiceRoutes.issues + "/?projectId=" + projectId, JSON.stringify(issueDto))
  return response
}