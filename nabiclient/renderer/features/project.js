export async function saveProjectDataToLocalStorage(projectData) {
  localStorage.setItem('projectData', JSON.stringify(projectData))
}

export async function loadProjectDataFromLocalStorage() {
  const rawProjectData = localStorage.getItem('projectData')
  const projectData = JSON.parse(rawProjectData)

  const result = await validateProjectData(projectData)
  if (!result.valid) {
    throw new Error(result.toString())
  }

  return projectData
}

export async function validateProjectData(projectData) {
  // const resp = await axios.get('/api/schema/project.json')
  // const schema = resp.data
  //
  // const validator = new Validator()
  // return validator.validate(projectData, schema)

  return {
    valid: true
  }
}
