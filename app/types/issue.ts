import { IssueGroup } from "./issueGroup";

export type Issue = {
    'id'?: string;
    'projectId': string;
    'assigneeId'?: number;
    'title': string;
    'description'?: string;
    'status'?: IssueStatusEnum;
    'issueGroup': IssueGroup;
}


export enum IssueStatusEnum {
    Open = 'OPEN',
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
    Closed = 'CLOSED'
}