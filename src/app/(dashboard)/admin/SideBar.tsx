'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Nav } from './Nav'
import { conTenSideBar } from '@/app/(dashboard)/admin/ContentSideBar'
import { DataTableDemo } from './company/DataTable'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

interface SideBarProps {
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  children: React.ReactNode
}

export function SideBar({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children
}: SideBarProps) {
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
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
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
        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
        {/* <ResizablePanel defaultSize={defaultLayout[1]}>
          <DataTableDemo />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}></ResizablePanel>
        <ResizableHandle withHandle /> */}
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
