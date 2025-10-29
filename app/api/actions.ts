'use server'

//TODO:: впоследствии избавиться от юзертаскс, будем пользоваться моделью ORM
type UserTasksCount = {
    project: number,
    completed: number,
    closedRecently: number,

}


export type UserTask = {
    id: number,
    relatedProject: number,
    description: string,
    shortDescription: string,
    status: "active" | "closed",
    priority: "high" | "medium" | "low"
}

export const getUserTasks = async () => {
//     const response = await 
    return [
        {
                id: 0,
                relatedProject: 14,
                description: "make wheel for lada granta",
                shortDescription: "make wheel",
                status: "active",
                priority: "high" 
        }, 
        {
                id: 0,
                relatedProject: 14,
                description: "make wheel for lada ziggranta",
                shortDescription: "make wheel",
                status: "active",
                priority: "low" 
        }, {
                id: 0,
                relatedProject: 14,
                description: "make wheel for lada ziggranta",
                shortDescription: "make wheel",
                status: "active",
                priority: "low" 
        }, {
                id: 0,
                relatedProject: 14,
                description: "make wheel for lada ziggranta",
                shortDescription: "make wheel",
                status: "active",
                priority: "low" 
        }, {
                id: 0,
                relatedProject: 14,
                description: "make wheel for lada ziggranta",
                shortDescription: "make wheel",
                status: "active",
                priority: "low" 
        }, 
    ] as UserTask[]
}
