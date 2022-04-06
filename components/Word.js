import { useState, useCallback, Fragment } from 'react'
import { SayButton } from 'react-say'
import { CheckCircleIcon, EyeIcon, EyeOffIcon, FolderAddIcon, FolderIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

import Snackbar from '@mui/material/Snackbar'

export default function Word({ id, no, kor, eng, done, show }) {
  const [isKor, setIsKor] = useState(true)
  const [isCheck, setIsCheck] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const email = useRecoilValue(loginState)

  const [open, setOpen] = useState(false)

  const handleKor = () => {
    setIsKor(!isKor)
  }

  const handleCheck = () => {
    setIsCheck(!isCheck)
  }

  const handleAdd = async id => {
    if (isAdd) return

    setIsAdd(!isAdd)
    setOpen(!open)
    const data = { kor, eng, done, show }
    await setDoc(doc(db, 'users', email, 'mywords', id), data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const selector = useCallback(voices => [...voices].find(v => v.lang === 'en-GB'), [])

  return (
    <div className={`py-4 px-2 border-b grid grid-cols-2 ${isCheck ? 'bg-bg' : 'bg-white'} `}>
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <CheckCircleIcon className={`w-5 h-5 ${isCheck ? 'text-secondry' : 'text-primary'}`} onClick={handleCheck} />
        </div>
        <SayButton rate={0.8} text={eng} voice={selector}>
          <p className={`font-bold ${isCheck ? 'text-gray-400  line-through' : 'text-gray-900'}`}>{eng}</p>
        </SayButton>
      </div>
      {!isCheck && (
        <div className="flex items-center justify-between">
          <div>{isKor ? <div className="text-sm">{kor}</div> : ''}</div>
          <div className="flex items-center">
            {isKor ? (
              <div className="w-9 h-9 flex items-center justify-center">
                <EyeOffIcon className="w-5 h-5 text-gray-400" onClick={handleKor} />
              </div>
            ) : (
              <div className="w-9 h-9 flex items-center justify-center">
                <EyeIcon className="w-5 h-5 text-gray-400" onClick={handleKor} />
              </div>
            )}

            {email &&
              (isAdd ? (
                <div className="w-9 h-9 flex items-center justify-center">
                  <FolderAddIcon className="h-6 w-6 text-primary" onClick={() => handleAdd(id)} />
                  <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={1000}
                    message={`${eng} 가 단어장에 추가되었습니다.`}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  />
                </div>
              ) : (
                <div className="w-9 h-9 flex items-center justify-center">
                  <FolderIcon className="h-6 w-6 text-gray-400" onClick={() => handleAdd(id)} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
