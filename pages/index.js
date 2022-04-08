import { useRecoilValue } from 'recoil'
import MyWordList from '../components/MyWordList'
import Top from '../components/Top'
import WordList from '../components/WordList'
import { loginState } from '../store'

export default function Home() {
  const loginUser = useRecoilValue(loginState)

  console.log(loginUser)

  return (
    <div className="px-5 py-6">
      <Top />
      <WordList />
      {/* {loginUser ? <MyWordList /> : <WordList />} */}
    </div>
  )
}
