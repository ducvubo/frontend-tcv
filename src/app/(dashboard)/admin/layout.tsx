// 'use client'
import * as React from 'react'
import { SideBar } from './SideBar'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultLayout = [20, 32, 48]
  return (
    <main>
      <SideBar>
        <ResizablePanel defaultSize={defaultLayout[2]} className='p-4'>
          {children}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <div>sadgsg</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
      </SideBar>
    </main>
  )
}
