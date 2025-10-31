const gateway = "http://localhost:8085"

export const enum ServiceRoutes {
  createProject = gateway + "/api/project/create",
  deleteProject = gateway + "/api/project/delete",
  getProjects = gateway + "/api/project/get",
  //notifications = gateway + "/api/notification_client/"
} 

export const getRequest = async (url : string, body = undefined) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

    body: body
  })

  return response
}

export const postRequest = async (url : string, body: string) => {
  console.log(url)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: body
  })

  return response
}

export const updateRequest = async (url : string, body = undefined) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: body
  })

  return response
}