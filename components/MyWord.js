import React from 'react'
import {
  VolumeUpIcon,
  MoonIcon,
  SunIcon,
  EyeOffIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/solid'

export default function MyWord({ id, eng, kor, done, show }) {
  return (
    <div className="bg-white py-6 px-4 grid grid-cols-2 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-5 h-5 text-primary" />
        <p className="font-bold">{eng}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-gray-400" />
          <p className="text-sm text-gray-400">{kor}</p>
        </div>
        <TrashIcon className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  )
}
