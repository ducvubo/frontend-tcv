import { Metadata } from 'next'
import { task } from '../data'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { DataTableDemo } from './DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormAddCompany } from './FormAddCompany'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

export default async function TaskPage() {
  const tasks = task
  // const defaultLayout = [20, 32, 48]
  return (
    <>
      <div>
        <span className='font-bold text-2xl text-[#00b14f] pt-20'>Quản lý công ty</span>
      </div>
      <DataTableDemo />
    </>
  )
}
