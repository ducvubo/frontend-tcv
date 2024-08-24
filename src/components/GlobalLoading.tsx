'use client'
import { useLoading } from '@/context/LoadingContext'
import React from 'react'
export default function GlobalLoading() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='loader ease-linear rounded-full border-t-4 border-gray-200 h-12 w-12'></div>
    </div>
  )
}
