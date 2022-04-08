import { useEffect, useState } from 'react'
import MyWord from './MyWord'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'
import { useRouter } from 'next/router'
import { ArrowSmDownIcon } from '@heroicons/react/outline'

export default function MyWordList() {
  const [timeActive, setTimeActive] = useState(true)
  const [abcActive, setAbcActive] = useState(false)
  const userEmail = useRecoilValue(loginState)
  const [words, setWords] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (!userEmail) {
      router.push('/')
      return
    }
    const q = query(collection(db, 'users', userEmail, 'word'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot =>
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    )
  }, [router, userEmail])

  const wordSort = (text, sort) => {
    if (text === 'timestamp') {
      setTimeActive(true)
      setAbcActive(false)
    } else {
      setTimeActive(false)
      setAbcActive(true)
    }

    const q = query(collection(db, 'users', userEmail, 'word'), orderBy(text, sort))
    onSnapshot(q, snapshot =>
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    )
  }

  return (
    <div className="grid grid-cols-1 max-w-md m-auto">
      <div className="flex items-center justify-between text-xs mb-2">
        <p className="text-gray-400">현재 : {words.length} 단어</p>
        <div className="flex items-center gap-3">
          <div
            className={`text-primary px-2 py-1 flex items-center gap-1 rounded-full ${
              abcActive ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-gray-500'
            } `}
            onClick={() => wordSort('eng', 'asc')}
          >
            <span>abc</span>
            <ArrowSmDownIcon className="w-4 h-4" />
          </div>

          <div
            className={`text-primary px-2 py-1 flex items-center gap-1 rounded-full ${
              timeActive ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-gray-500'
            } `}
            onClick={() => wordSort('timestamp', 'desc')}
          >
            <span>time</span>
            <ArrowSmDownIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      {words.map(word => (
        <MyWord key={word.id} id={word.id} eng={word.eng} kor={word.kor} done={word.done} show={word.show} />
      ))}
    </div>
  )
}
