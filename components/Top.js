import { useState } from 'react'
import { UserCircleIcon, EmojiHappyIcon } from '@heroicons/react/solid'
import { auth, db } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { loginState } from '../store'
import { setDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

export default function Top() {
  const [userEmail, setUserEmail] = useRecoilState(loginState)
  const router = useRouter()
  const provider = new GoogleAuthProvider()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleLogin = async () => {
    await signInWithPopup(auth, provider).then(result => {
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      }
      setDoc(doc(db, 'users', result.user.email), data)
    })
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUserEmail(user.email)
    } else {
      setUserEmail(null)
    }
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
  }

  return (
    <div className="h-40 bg-primary p-6">
      <div className="flex items-center justify-between">
        <EmojiHappyIcon className="h-9 w-9 text-white" onClick={handleOpen} />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </div>
          </Box>
        </Modal>

        {userEmail ? (
          <div className="flex items-center">
            <Link href="/dashboard">
              <a>
                <button className="text-xs py-2 px-3 rounded-full bg-white text-primary">단어장</button>
              </a>
            </Link>
          </div>
        ) : (
          <button className="text-xs py-2 px-3 rounded-full bg-white text-primary" onClick={handleLogin}>
            Google Login
          </button>
        )}
      </div>
      <div className="flex flex-col items-center text-white font-bold mt-4">
        <p className="text-md">중학필수</p>
        <p className="text-2xl">영단어 1000</p>
      </div>
    </div>
  )
}
