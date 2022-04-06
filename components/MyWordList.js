import { useEffect, useState } from 'react'
import MyWord from './MyWord'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export default function MyWordList() {
  const email = useRecoilValue(loginState)
  const [words, setWords] = useState([])

  useEffect(() => {
    if (email) {
      const q = query(collection(db, 'users', email, 'mywords'), orderBy('eng', 'asc'))
      onSnapshot(q, snapshot =>
        setWords(
          snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
        )
      )
    }
  }, [email])

  console.log(words)

  return (
    <div className="grid grid-cols-1 gap-2 p-4 max-w-md m-auto">
      {words.map(word => (
        <MyWord key={word.id} id={word.id} eng={word.eng} kor={word.kor} done={word.done} show={word.show} />
      ))}
    </div>
  )
}
