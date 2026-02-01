import { IssueGroup } from "./issueGroup";
import { User } from "./user";

export type Issue = {
    id: string;
    projectId: string;
    reporterId: number;
    assigneeId: number;
    title: string;
    issue_key: string;
    'description'?: string;
    status: IssueStatusEnum;
    issueGroup: IssueGroup;

    reporterUser?: User;
    assigneeUser?: User;
}

export type IssueDTO = {
    projectId: string;
    reporterId: string;
    assigneeId: string;
    title: string;
    issueKey: string;
    issueStatus: string;
    issueGroupId: string;
    'description'?: string;
}



export const createIssueDTO = (
    projectId: string,
    reporterId: string,
    assigneeId: string,
    title: string,
    issueKey: string,
    issueStatus: string,
    issueGroupId: string,
    description?: string,
) => {
    return {
        projectId,
        reporterId,
        assigneeId,
        title,
        issueKey,
        issueStatus,
        issueGroupId,
        description
    } as IssueDTO
}

export enum IssueStatusEnum {
    Open = 'OPEN',
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
    Closed = 'CLOSED'
}


export interface IssueMessage{
	id: number; 
	issue: Issue; 
	message: string; 
	userId: number; 
    avatarUrl: string;
	userName: string; 
	createdAt: string; 
}

