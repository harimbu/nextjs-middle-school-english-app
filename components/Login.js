import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { LogoutIcon, LoginIcon } from '@heroicons/react/outline'
import { AiOutlineGoogle } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useRecoilState } from 'recoil'
import { loginState } from '../store'

export default function Login() {
  const [userEmail, setUserEmail] = useRecoilState(loginState)
  const provider = new GoogleAuthProvider()
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserEmail(user.email)
      } else {
        setUserEmail(null)
      }
    })
  }, [setUserEmail])

  const handleLogin = () => {
    signInWithPopup(auth, provider).then(result => {
      const data = {
        email: result.user.email,
        uid: result.user.uid
      }
      setDoc(doc(db, 'users', result.user.email), data)
    })
  }

  const handleLogout = () => {
    signOut(auth)
    setUserEmail(null)
  }

  return (
    <div>
      {userEmail ? (
        <div className="flex items-center gap-4">
          {router.pathname === '/note' ? (
            ''
          ) : (
            <div>
              <Link href="/note">
                <a className="text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 rounded-full">
                  단어장 보기
                </a>
              </Link>
            </div>
          )}
          <LogoutIcon className="w-6 h-6" onClick={handleLogout} />
        </div>
      ) : (
        <AiOutlineGoogle className="w-6 h-6" onClick={handleLogin} />
      )}
    </div>
  )
}
