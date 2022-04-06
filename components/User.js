import { UserCircleIcon } from '@heroicons/react/solid'
import { auth, db } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { loginState } from '../store'
import { setDoc, doc } from 'firebase/firestore'
import Link from 'next/link'

export default function User() {
  const [userEmail, setUserEmail] = useRecoilState(loginState)
  const provider = new GoogleAuthProvider()

  const handleLogin = () => {
    signInWithPopup(auth, provider).then(result => {
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      }
      setDoc(doc(db, 'users', result.user.email), data)
    })
  }

  const handleLogout = () => {
    signOut(auth)
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUserEmail(user.email)
    } else {
      setUserEmail(null)
    }
  })

  return (
    <div className="flex items-center gap-2">
      {userEmail ? (
        <div className="flex items-center">
          <Link href="/dashboard">
            <a>
              <button className="text-xs py-1 px-3 rounded-full bg-white text-black">대시보드</button>
            </a>
          </Link>
          <UserCircleIcon className="h-7 w-7 text-black" onClick={() => handleLogout()} />
        </div>
      ) : (
        <UserCircleIcon className="h-7 w-7 text-white" onClick={() => handleLogin()} />
      )}
    </div>
  )
}
