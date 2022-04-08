import { HomeIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import Login from './Login'
import User from './User'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Top() {
  const router = useRouter()

  return (
    <div>
      <div className="flex items-center justify-between">
        {router.pathname === '/note' ? (
          <Link href="/">
            <a>
              <ChevronLeftIcon className="w-6 h-6" />
            </a>
          </Link>
        ) : (
          <HomeIcon className="w-6 h-6" />
        )}
        <Login />
      </div>
      <div>
        <User />
      </div>
    </div>
  )
}
