const gateway = "http:/localhost:8085"

export const enum ServiceRoutes {
  createProject = gateway + "/api/project/create_project",
  deleteProject = gateway + "/api/project/delete_project",
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