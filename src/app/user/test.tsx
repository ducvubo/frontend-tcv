'use client'
import { Button } from '@/components/ui/button'
import { Input, InputBanner } from '@/components/ui/input'
import React, { useState } from 'react'

const DataTest1 = ['PHP', 'Java', 'Angular', 'React', 'Python', 'Machine Learning', 'Visual', 'JavaScript', 'Go']

export default function TestInput() {
  const [dataTest, setDataTest] = useState(DataTest1)
  const [inputValue, setInputValue] = useState('')
  const deleteArr = (index: number) => {
    const newDataTest = [...dataTest]
    newDataTest.splice(index, 1)
    setDataTest(newDataTest)
  }
  const addToArr = () => {
    if (inputValue.trim() !== '') {
      setDataTest([...dataTest, inputValue])
      setInputValue('')
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      addToArr()
    }
  }
  return (
    <div className=''>
      <div className='flex gap-2 mb-4'>
        <span className='font-bold text-2xl'>Tìm kiếm</span>
        <div className='bg-red-500 w-40 h-9 flex justify-center items-center'>
          <span className='font-bold text-2xl text-white'>JavaScript</span>
        </div>
      </div>
      <div className='relative rounded border border-solid border-white bg-white p-2 shadow-sm max-w-[70rem]  min-w-[70rem] '>
        <div className='flex items-center gap-2'>
          <div className='flex flex-1 flex-wrap items-center gap-2 pl-2'>
            <ul className='flex flex-wrap items-center gap-2'>
              {dataTest.map((language, index) => {
                return (
                  <li key={index}>
                    <span className='whitespace-nowrap rounded border border-solid font-normal transition-all group/tw-chip inline-flex items-center justify-center gap-0 overflow-hidden hover:gap-2 border-gray-200 bg-gray-200 text-gray-600 h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base'>
                      {language}
                      <span
                        className=' transition-all group-hover/tw-chip:max-w-none cursor-pointer max-w-none overflow-auto'
                        onClick={() => deleteArr(index)}
                      >
                        <svg
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth={0}
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          height='1em'
                          width='1em'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <InputBanner
              type='text'
              id='search'
              className='ml-2 w-full min-w-[20rem] flex-1 border-none text-sm outline-none focus:border-none focus:outline-none focus:ring-0 lg:text-base'
              placeholder='Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,...'
              name='search'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <Button
              type='button'
              variant='destructive'
              className='inline-flex items-center justify-center gap-1 border border-solid text-sm transition-all disabled:cursor-not-allowed lg:gap-3 lg:text-base  text-white hover:border-primary-400 hover:bg-primary-400 disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-100 h-9 rounded px-4 font-semibold lg:h-14 lg:px-8'
            >
              <span className='flex items-center justify-center text-lg lg:text-2xl h-6 w-6'>
                <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </span>
              <span>Tìm kiếm</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
