// 'use client'
import React, { useState } from 'react'
import TestInput from './test'
import { auth } from '@/auth'

export default async function UserPage() {
  // const DataTest1 = ['PHP', 'Java', 'Angular', 'React', 'Python', 'Machine Learning', 'Visual', 'JavaScript', 'Go']
  // const [data, setData] = useState<string[]>(DataTest1)
  const session = await auth()
  console.log('session:::::::::;;; ', session)
  return (
    <div>{JSON.stringify(session)}</div>
    // <div>
    //   <TestInput data={data} setData={setData} className='w-96' tag={'Thêm abc.........'}/>
    // </div>
  )
}
