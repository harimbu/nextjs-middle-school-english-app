import { ChevronLeftIcon } from '@heroicons/react/solid'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { loginState } from '../store'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Top() {
  const [userEmail, setUserEmail] = useRecoilState(loginState)

  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUserEmail(user.email)
    } else {
      setUserEmail(null)
    }
  })

  return (
    <div className="h-40 bg-accent p-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <a>
            <ChevronLeftIcon className="h-7 w-7 text-white" />
          </a>
        </Link>
        {userEmail && (
          <div className="flex items-center">
            <Link href="/dashboard">
              <a>
                <button className="text-xs py-2 px-3 rounded-full bg-white text-accent" onClick={() => handleLogout()}>
                  로그아웃
                </button>
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-white font-bold mt-4">
        <p className="text-md">harimbu@gmail.com</p>
        <p className="text-2xl">단어장</p>
      </div>
    </div>
  )
}
