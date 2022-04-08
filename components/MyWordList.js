import { useEffect, useState } from 'react'
import MyWord from './MyWord'
import { db } from '../firebase'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'
import { useRouter } from 'next/router'

export default function MyWordList() {
  const userEmail = useRecoilValue(loginState)
  const [words, setWords] = useState([])
  const [doneCount, setDoneCount] = useState(0)
  const [remainCount, setRemainCount] = useState(0)

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

  useEffect(() => {
    setDoneCount(words.filter(word => word.done === true).length)
    setRemainCount(words.length - doneCount)
  }, [words, doneCount])

  const toggleDone = async (id, isDone) => {
    const docRef = doc(db, 'users', userEmail, 'word', id)
    await updateDoc(docRef, {
      done: isDone
    })
  }

  const toggleKor = async (id, isKor) => {
    const docRef = doc(db, 'users', userEmail, 'word', id)
    await updateDoc(docRef, {
      show: isKor
    })
  }

  const removeWord = async id => {
    await deleteDoc(doc(db, 'users', userEmail, 'word', id))
  }

  return (
    <div className="grid grid-cols-1 max-w-md m-auto">
      <div className="flex items-center justify-between text-xs mb-2">
        <p className="text-gray-400">전체 : {words.length}</p>
        <p className="text-gray-400">외운 단어 : {doneCount}</p>
        <p className="text-gray-400">남은 단어 : {remainCount}</p>
      </div>
      {words.map(word => (
        <MyWord
          key={word.id}
          id={word.id}
          eng={word.eng}
          kor={word.kor}
          done={word.done}
          show={word.show}
          toggleDone={toggleDone}
          toggleKor={toggleKor}
          removeWord={removeWord}
        />
      ))}
    </div>
  )
}
