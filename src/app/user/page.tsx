'use client'
import React, { useEffect, useState } from 'react'
import TestInput from './test'
import { authenticate } from '../actions/action'

export default function UserPage() {
  const DataTest1 = ['PHP', 'Java', 'Angular', 'React', 'Python', 'Machine Learning', 'Visual', 'JavaScript', 'Go']
  const [data, setData] = useState<string[]>(DataTest1)

  useEffect(() => {
    async function fetchData() {
      const result = await authenticate() // Await the Promise to resolve
      console.log(result)
    }

    fetchData()
  }, [])
  return (
    <div>
      <TestInput data={data} setData={setData} className='w-96' tag={'Thêm abc.........'} />
    </div>
  )
}
