import { useState, useCallback } from 'react'
import { SayButton } from 'react-say'
import { db } from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { EyeIcon, EyeOffIcon, PlusSmIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'

import Snackbar from '@mui/material/Snackbar'

export default function Word({ kor, eng, done, show }) {
  const [isKor, setIsKor] = useState(false)
  const userEmail = useRecoilValue(loginState)

  const [open, setOpen] = useState(false)

  const handleKor = () => {
    setIsKor(!isKor)
  }

  const handleAdd = () => {
    setOpen(!open)
    const data = { kor, eng, done, show, timestamp: serverTimestamp() }
    setDoc(doc(db, 'users', userEmail, 'word', eng), data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const selector = useCallback(voices => [...voices].find(v => v.lang === 'en-GB'), [])

  return (
    <div className="py-4 grid grid-cols-2">
      <div className="flex items-center">
        <SayButton rate={0.8} text={eng} voice={selector}>
          <p>{eng}</p>
        </SayButton>
      </div>

      <div className="flex items-center justify-between">
        <div>{isKor ? <div className="text-sm">{kor}</div> : ''}</div>
        <div className="flex items-center gap-2">
          {!isKor ? (
            <EyeIcon className="w-5 h-5" onClick={handleKor} />
          ) : (
            <EyeOffIcon className="w-5 h-5" onClick={handleKor} />
          )}

          {userEmail && (
            <div className="w-9 h-9 flex items-center justify-center ">
              <PlusSmIcon className="h-5 w-5" onClick={handleAdd} />
              <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={1000}
                message={`${eng} 가 단어장에 추가되었습니다.`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{
                  sx: {
                    background: '#474787'
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
