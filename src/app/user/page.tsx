'use client'
import React, { useState } from 'react'
import TestInput from './test'

export default function UserPage() {
  const DataTest1 = ['PHP', 'Java', 'Angular', 'React', 'Python', 'Machine Learning', 'Visual', 'JavaScript', 'Go']
  const [data, setData] = useState<string[]>(DataTest1)
  return (
    <div>
      <TestInput data={data} setData={setData} className='w-96' tag={'Thêm abc.........'}/>
    </div>
  )
}
