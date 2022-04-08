import { useState, useCallback } from 'react'
import { SayButton } from 'react-say'
import { EyeIcon, EyeOffIcon, CheckIcon, XIcon } from '@heroicons/react/outline'

export default function MyWord({ id, eng, kor, done, show }) {
  const [isKor, setIsKor] = useState(false)
  const selector = useCallback(voices => [...voices].find(v => v.lang === 'en-GB'), [])

  const handleKor = () => {
    setIsKor(!isKor)
  }

  return (
    <div className="py-4 grid grid-cols-2">
      <div className="flex items-center gap-2">
        <CheckIcon className="h-5 w-5" />
        <SayButton rate={0.8} text={eng} voice={selector}>
          <p>{eng}</p>
        </SayButton>
      </div>

      <div className="flex items-center justify-between">
        <div>{isKor ? <div className="text-sm">{kor}</div> : ''}</div>
        <div className="flex items-center gap-3">
          {isKor ? (
            <EyeIcon className="w-5 h-5" onClick={handleKor} />
          ) : (
            <EyeOffIcon className="w-5 h-5" onClick={handleKor} />
          )}
          <XIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
