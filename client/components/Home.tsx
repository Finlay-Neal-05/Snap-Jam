import { useProject } from '../hooks/useUsers'

export default function Home() {
  const projectHook = useProject()

  const {
    data: projects,
    isPending,
    isError,
    error,
  } = projectHook.getProjects()

  isPending && <p>Loading...</p>

  if (isError) {
    console.log({ message: error })
    return <p>There was an error: {`${error}`}</p>
  }

  return (
    <div>
      {projects?.map((project) => (
        <div className="project-div" key={project.id}>
          <div>
            <h1>Project Name: {project.project_name}</h1>
            <p>Contributors: {project.contributor_id}</p>
            <p>Tempo: {project.tempo}</p>
          </div>
          <div>
            <p>Comments: {project.comments}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
