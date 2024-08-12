'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { DataTableColumnHeader } from '../../../../components/admin/DataTableColumnHeader'
import Link from 'next/link'
import { IJob } from '../job.interface'
import DeleteJob from './DeleteJob'
export const columns: ColumnDef<IJob>[] = [
  {
    accessorKey: 'job_name',
    header: 'Company Name'
  },
  {
    accessorKey: 'job_wage',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Lương' />
    },
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis whitespace-nowrap'>{row.getValue('job_wage')}</div>
  },
  {
    accessorKey: 'job_quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'job_isPublished',
    header: 'Publics'
  },
  {
    accessorKey: 'job_isPublished',
    header: 'Publish'
  },

  // {
  //   accessorKey: 'company_code_fiscal',
  //   header: ({ column }) => {
  //     return (
  //       <DataTableColumnHeader
  //         column={column}
  //         title='Mã số thuế'
  //         className='overflow-hidden text-ellipsis whitespace-nowrap'
  //       />
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className=' overflow-hidden text-ellipsis whitespace-nowrap'>{row.getValue('company_code_fiscal')}</div>
  //   )
  // },

  {
    id: 'actions',
    cell: ({ row }) => {
      const Job: IJob = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-3 w-3 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Link href={`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/dashboard/company/job/${Job._id}`}>Sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>{typeof window !== undefined && <DeleteJob job={Job} />}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
