import { useState, useCallback } from 'react'
import { SayButton } from 'react-say'
import { EyeIcon, EyeOffIcon, CheckIcon, XIcon } from '@heroicons/react/outline'

export default function MyWord({ id, eng, kor, done, show, toggleDone, toggleKor, removeWord }) {
  const [isKor, setIsKor] = useState(show)
  const [isDone, setIsDone] = useState(done)
  const selector = useCallback(voices => [...voices].find(v => v.lang === 'en-GB'), [])

  const handleKor = () => {
    setIsKor(!isKor)
    toggleKor(id, !isKor)
  }

  const handleDone = id => {
    setIsDone(!isDone)
    toggleDone(id, !isDone)
  }

  const handleReomve = id => {
    removeWord(id)
  }

  return (
    <div className="py-4 grid grid-cols-2">
      <div className="flex items-center gap-2">
        <CheckIcon onClick={() => handleDone(id)} className={`h-5 w-5 ${isDone && 'text-gray-500'}`} />
        <SayButton rate={0.8} text={eng} voice={selector}>
          <p className={`${isDone && 'text-gray-500'}`}>{eng}</p>
        </SayButton>
      </div>

      {!isDone && (
        <div className="flex items-center justify-between">
          <div className="text-sm">{isKor && `${kor}`}</div>
          <div className="flex items-center gap-3">
            {!isKor ? (
              <EyeIcon className="w-5 h-5" onClick={handleKor} />
            ) : (
              <EyeOffIcon className="w-5 h-5" onClick={handleKor} />
            )}
            <XIcon className="w-5 h-5" onClick={() => handleReomve(id)} />
          </div>
        </div>
      )}
    </div>
  )
}
