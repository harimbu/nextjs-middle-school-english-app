import { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { db } from '../firebase'
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import Word from './Word'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export default function WordList() {
  const [words, setWords] = useState([])
  const [range, setRange] = useState([])
  const [selected, setSelected] = useState('1 ~ 100')

  useEffect(() => {
    onSnapshot(doc(db, 'range', 'id'), doc => {
      setRange(doc.data().text)
    })
  }, [])

  useEffect(() => {
    if (selected === '1 ~ 100') {
      getFirstDate()
      return
    }
    const q = query(collection(db, 'words'), where('range', '==', selected))
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }, [selected])

  useEffect(() => {
    getFirstDate()
  }, [])

  const getFirstDate = () => {
    const q = query(collection(db, 'words'), where('range', '==', '1 ~ 100'))
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }

  return (
    <>
      <div className="p-4 max-w-sm m-auto">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white dark:bg-gray-700 rounded-lg cursor-default shadow-md">
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute w-full m-auto py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {range.map(item => (
                <Listbox.Option
                  key={item}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-green-600 bg-green-100' : 'text-gray-600'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      <div className="max-w-md m-auto">
        {words.map(word => (
          <Word
            key={word.id}
            id={word.id}
            no={word.no}
            eng={word.eng}
            kor={word.kor}
            done={word.done}
            show={word.show}
          />
        ))}
      </div>
    </>
  )
}
