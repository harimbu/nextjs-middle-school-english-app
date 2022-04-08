import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function User() {
  const [userEmail, setUserEmail] = useState(null)
  const [userURL, setUserURL] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserEmail(user.email)
        setUserURL(user.photoURL)
      } else {
        setUserEmail(null)
        setUserURL(null)
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center">
      {userEmail ? (
        <div className="flex flex-col items-center my-8">
          <img src={userURL} width={36} alt="user" className="rounded-full mb-1" />
          <p className="text-sm text-gray-200">{userEmail}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center my-6">
          <p className="text-sm">중학필수</p>
          <p className="font-bold">영단어 1000</p>
        </div>
      )}
    </div>
  )
}
