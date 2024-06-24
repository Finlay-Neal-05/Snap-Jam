//import { Audio } from "../../models/Audio"
import { audio, comments } from '../hooks/useUsers'
import { Project } from '../../models/project'
//import { useState } from "react"
import { whatever } from './AudioMerge'
import { usePlayer } from '../player'


interface Props {
  project: Project
  key: number
}

export default function SingleProject(props: Props) {
  //const {commentsBool, setCommentsBool} = useState(false)
const player = usePlayer()

  const {
    data: audioData,
    isPending: isPendingAudio,
    isError: isAudioError,
    error: audioError,
  } = audio.useGetAudioByProjectId(Number(props.project.id))
  //const {data: commentsData, isPending: isPendingComments, isError: isCommentsError, error: commentError} = comments.useGetAllComments() //TODO get comments by project id //TODO add pending and error test
  async function handleJam() {
    if (!audioData) {
      return
    }
    await player.load(audioData.map((data) => data.filepath))
    player.play()
  }

  if (isPendingAudio) {
    console.log('loading audio')
    return <p>Audio Loading...</p>
  }
  if (isAudioError) {
    return <p>{`${audioError}`}</p>
  }

  return (
    <>
      <div className="relative mx-auto mt-5 h-auto w-1/2 overflow-auto rounded-lg border border-slate-300 bg-white pb-4 shadow-lg">
        <div className="flex w-full items-center justify-between rounded-t-lg border-b border-slate-200 bg-gradient-to-r from-blue-200 to-[#5ac0d9] p-4">
          <p className="text-2xl font-semibold text-slate-800">
            {props.project.project_name}
          </p>
          <p className="text-lg font-semibold text-slate-800">
            By: {props.project.created_by}
          </p>
        </div>

        <div className="p-4">
          {audioData.map((aud) => (
            <div key={aud.id} className="mb-2">
              <p className="text-gray-800">{aud.filepath}</p>
              <p className="font-normal text-gray-500">
                Duration: {aud.length}s
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 space-x-2">
          <button
            onClick={handleJam}
            className="w-26 rounded-md bg-slate-100 py-2 font-medium text-slate-700 shadow-md duration-100 ease-in-out hover:scale-105"
          >
            Jam
          </button>
          <button className="w-26 rounded-md bg-slate-100 py-2 font-medium text-slate-700 shadow-md duration-100 ease-in-out hover:scale-105">
            Comments
          </button>
        </div>
      </div>
    </>
  )
}

//bg-[#5ac0d9
