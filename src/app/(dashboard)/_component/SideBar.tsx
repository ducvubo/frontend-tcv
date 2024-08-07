'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Nav } from './Nav'
import { conTenSideBar } from '@/app/(dashboard)/_component/ContentSideBar'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { usePathname } from 'next/navigation'
import { cookies } from 'next/headers'

interface SideBarProps {
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  children: React.ReactNode
}

export function SideBar({
  // defaultLayout = [20, 10, 20],
  defaultLayout = [10, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children
}: SideBarProps) {
  const path = usePathname()
  const segments = path.split('/')
  const pathname = segments.slice(0, 3).join('/')
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const inforUser = useSelector((state: RootState) => state.inforUser)
    ? useSelector((state: RootState) => state.inforUser)
    : null

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {}}
        className='h-full max-h-[800px] items-stretch'
      >
        {/* <ResizablePanel
          defaultSize={defaultLayout[2]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={55}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onResize={() => {
            setIsCollapsed(false)
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
            {inforUser ? inforUser.name : null}
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} link={conTenSideBar} />
          <Separator />
          <Nav isCollapsed={isCollapsed} link={conTenSideBar} />
        </ResizablePanel> */}
        {/* <ResizableHandle withHandle /> */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={55}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onResize={() => {
            setIsCollapsed(false)
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out !max-w-16')}
        >
          <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
            {inforUser ? inforUser.name : null}
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} link={conTenSideBar} pathname={pathname} />
          <Separator />
          <Nav isCollapsed={isCollapsed} link={conTenSideBar} pathname={pathname} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
